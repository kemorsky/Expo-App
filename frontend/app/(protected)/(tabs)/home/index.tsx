import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useMe } from '@/lib/api/user/userQueries';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/formatDate';
import { useAssignRandomChallenge } from '@/lib/api/challenges/challengesMutations';
import { useGlobalStyles } from '@/styles/globalStyles';
import { Wrapper } from '@/components/Wrapper';
import { ThemedText } from '@/components/ThemedText';
import { Container } from '@/components/Container';
import React, { useState } from 'react';
import ChallengeDoneModal from '@/components/ChallengeDoneModal';
import { HorizontalRule } from '@/components/HorizontalRule';
import HomePageSkeleton from '@/components/skeleton/pages/HomePageSkeleton';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [openModal, setOpenModal] = useState(false);
  const { user, loading, error } = useMe();
  const globalStyles = useGlobalStyles();
  const { assignRandomChallenge } = useAssignRandomChallenge();
  const { t } = useTranslation();

  if (!user ||loading) return <HomePageSkeleton />;
  if (error) return <Text>Error: {error.message}</Text>;

  const date = new Date();

  const completedChallenges = user.challenges?.filter((challenge) => challenge?.done === true).length || 0;
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false).length || 0;
  const currentChallenge = user.challenges?.find((challenge) => challenge?.currentChallenge === true)
  const recentChallenges = user.challenges?.filter((ch) => ch?.done === true).sort((a, b) => Number(b?.updatedAt) - Number(a?.updatedAt)).slice(0, 5)

  const isDisabled = (user.assignmentsToday ?? 1) === (user.settings?.numberOfChallengesPerDay ?? 1);

  const handleAssignRandomChallenge = async () => {
    try {
      const data = await assignRandomChallenge();
      if (!data) return;
      console.log(data)
      return {
        id: data.id,
        challenge: {
          id: data.challenge.id,
          title: data.challenge.title,
        },
        currentChallenge: data.currentChallenge,
        assignedAt: data.assignedAt
      }
    } catch (error: any) {
      throw new Error (`Error assigning random challenge: ${error}`)
    }
  }

  return (
    <Wrapper>
      <ChallengeDoneModal openModal={openModal} setOpenModal={setOpenModal}/>
      <Container>
        <ThemedText type='title'>{t('home.welcome')}, {user.name}</ThemedText>
        <Link href="/Onboarding">Go to onboarding</Link>
      </Container>
      <Container>
        <View style={styles.cardTitleContainer}>
            <ThemedText type='subtitle'>Today&apos;s challenge</ThemedText>
            <ThemedText type='date'>{formatDate(date.toString())}</ThemedText>
        </View>
        
        <View style={globalStyles.card}>
          {currentChallenge ? (
            <>
              <ThemedText style={{maxWidth: 235}} type='challenge'>{currentChallenge.challenge.title}</ThemedText>
              <Pressable style={[globalStyles.buttonMarkAsDone, isDisabled && globalStyles.buttonDisabled]} onPress={() => setOpenModal(true)}>
                <ThemedText>Mark as done</ThemedText>
              </Pressable>
            </>
          ) : (
            <>
              <ThemedText type='challenge'>No active challenge</ThemedText>
              <Pressable style={[globalStyles.buttonMarkAsDone, isDisabled && globalStyles.buttonDisabled]} onPress={() => handleAssignRandomChallenge()}>
                {(user.assignmentsToday ?? 1) >= 1 ? (
                  <ThemedText>Get another challenge</ThemedText>
                ) : (
                  <ThemedText>Get a challenge</ThemedText>
                )}
              </Pressable>
            </>
          )}
        </View>
      </Container>
      <Container>
        <ThemedText type='subtitle'>Stats</ThemedText>
        <View style={globalStyles.card}>
          <View style={styles.statsContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
              <View style={styles.stats}>
                <ThemedText style={{fontSize: 14,}}>Challenges completed</ThemedText>
                <ThemedText type='title'>{completedChallenges}</ThemedText>
              </View>
              <View style={styles.stats}>
                <ThemedText type='subtitle'>Challenges created</ThemedText>
                <ThemedText type='title'>{createdChallenges}</ThemedText>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
              <View style={styles.stats}>
                <ThemedText style={{fontSize: 12,}}>Current streak</ThemedText>
                <ThemedText type='title'>{completedChallenges}</ThemedText>
              </View>
              <View style={styles.stats}>
                <ThemedText type='subtitle'>Highest streak</ThemedText>
                <ThemedText type='title'>{createdChallenges}</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </Container>
      <Container>
        <ThemedText type='subtitle'>Your previous challenges</ThemedText>
        <View style={globalStyles.card}>
            <FlatList
              data={recentChallenges}
              maxToRenderPerBatch={5}
              ItemSeparatorComponent={HorizontalRule}
              scrollEnabled={false}
              renderItem={({ item }) => {
                  return <View style={styles.previousChallenge}>
                              <View style={styles.previousChallengeTitle}>
                                <ThemedText type="date" style={{ fontSize: 14 }}>{formatDate(item?.completedAt ?? '')}</ThemedText>
                                <Pressable>
                                  <ThemedText>View -&gt; </ThemedText>
                                </Pressable>
                              </View>
                              <ThemedText>{item?.challenge.title}</ThemedText>
                          </View>
              }}
              keyExtractor={item => item?.id ?? ''}
            />
        </View>
      </Container>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
   ChallengeList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  stepContainer: {
    gap: 6,
  },
  previousChallenge: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    paddingVertical: 8,
  },
  previousChallengeTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  stats: {
    width: 160, 
    height: 80, 
    padding: 8, 
    justifyContent: 'space-between',
    borderRadius: 8, 
    backgroundColor: 'red'
  }
});
