import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/formatDate';
import { useAssignRandomChallenge } from '@/lib/api/challenges/challengesMutations';
import { globalStyles } from '@/styles/globalStyles';
import { Wrapper } from '@/components/Wrapper';
import { ThemedText } from '@/components/ThemedText';
import { Container } from '@/components/Container';
import React, { useState } from 'react';
import ChallengeDoneModal from '@/components/ChallengeDoneModal';
import { HorizontalRule } from '@/components/HorizontalRule';
import HomePageSkeleton from '@/components/skeleton/pages/HomePageSkeleton';

export default function HomeScreen() {
  const [openModal, setOpenModal] = useState(false);
  const { user, loading, error } = useMe();
  const { assignRandomChallenge } = useAssignRandomChallenge();
  const { t } = useTranslation();

  if (!user ||loading) return <HomePageSkeleton />;
  if (error) return <Text>Error: {error.message}</Text>;

  const date = new Date();

  const completedChallenges = user.challenges?.filter((challenge) => challenge?.done === true).length || 0;
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false).length || 0;
  const currentChallenge = user.challenges?.find((challenge) => challenge?.currentChallenge === true)
  const recentChallenges = user.challenges?.filter((ch) => ch?.done === true).sort((a, b) => Number(b?.updatedAt) - Number(a?.updatedAt)).slice(0, 5)

  const handleAssignRandomChallenge = async () => {
    try {
      const data = await assignRandomChallenge();
      if (data) {
        console.log(data)
        return {
          id: data.id,
          challenge: {
            title: data.challenge.title,
          },
          currentChallenge: data.currentChallenge,
          curentChallengeExpiresAt: data.currentChallengeExpiresAt,
        }
      }
      console.log(data)
    } catch (error) {
      throw new Error (`Error marking challenge as done: ${error}`)
    }
  }

  return (
    <Wrapper>
      <Container>
        <ChallengeDoneModal openModal={openModal} setOpenModal={setOpenModal}/>
        <ThemedText type='title'>{t('home.welcome')}, {user.name}</ThemedText>
        <View style={styles.cardTitleContainer}>
            <ThemedText type='subtitle'>Today&apos;s challenge</ThemedText>
            <ThemedText type='date'>{formatDate(date.toString())}</ThemedText>
        </View>
        <View style={styles.cardContent}>
          {currentChallenge && (
            <>
              <ThemedText style={{maxWidth: 235}} type='challenge'>{currentChallenge.challenge.title}</ThemedText>
              <Pressable style={styles.buttonMarkAsDone} onPress={() => setOpenModal(true)}>
                <ThemedText>Mark as done</ThemedText>
              </Pressable>
            </>
          )}
          {!currentChallenge && (
            <>
              <ThemedText type='challenge'>No active challenge</ThemedText>
              <Pressable style={styles.buttonMarkAsDone} onPress={() => handleAssignRandomChallenge()}>
                <ThemedText>Get a challenge</ThemedText>
              </Pressable>
            </>
          )}
        </View>
        <ThemedText type='subtitle'>Stats</ThemedText>
        <View style={styles.cardContent}>
          <View style={styles.statsContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
              <View style={styles.stats}>
                <ThemedText style={{fontSize: 14,}}>Challenges completed</ThemedText>
                <ThemedText type='title'>{completedChallenges}</ThemedText>
              </View>
              <View style={styles.stats}>
                <ThemedText style={globalStyles.subtitle}>Challenges created</ThemedText>
                <ThemedText type='title'>{createdChallenges}</ThemedText>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
              <View style={styles.stats}>
                <ThemedText style={{fontSize: 12,}}>Current streak</ThemedText>
                <ThemedText type='title'>{completedChallenges}</ThemedText>
              </View>
              <View style={styles.stats}>
                <ThemedText style={globalStyles.subtitle}>Highest streak</ThemedText>
                <ThemedText type='title'>{createdChallenges}</ThemedText>
              </View>
            </View>
          </View>
        </View>
        <ThemedText type='subtitle'>Your previous challenges</ThemedText>
        <View style={styles.cardContent}>
            <FlatList
              data={recentChallenges}
              contentContainerStyle={styles.ChallengeList}
              maxToRenderPerBatch={5}
              ItemSeparatorComponent={HorizontalRule}
              scrollEnabled={false}
              renderItem={({ item }) => {
                  return <View style={styles.previousChallenge}>
                              <View style={styles.previousChallengeTitle}>
                                <ThemedText style={styles.previousChallengeTitleText}>{formatDate(item?.updatedAt ?? '')}</ThemedText>
                                <Pressable>
                                  <ThemedText style={styles.previousChallengeTitleText}>View -&gt; </ThemedText>
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
  buttonMarkAsDone: {
    height: 40,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 4,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#ffffffff',
  },
  buttonMarkAsDoneText: {
    fontSize: 14,
    color: '#000000ff',
  },
  cardContent: {
    backgroundColor: '#dbdbdbff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 8,
    borderRadius: 8
  },
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
  previousChallengeTitleText: {
    fontSize: 14,
    color: '#000000ff'
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
