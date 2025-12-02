import { StyleSheet, Text, View, Button, SectionList, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { useMe } from '@/hooks/useMe';
import { BottomSheetContext } from './_layout';
import { useTranslation } from 'react-i18next';
import { globalStyles } from '@/styles/globalStyles';
import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HorizontalRule } from '@/components/HorizontalRule';
import type { UserChallenge } from '@/__generated__/graphql';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { formatDate } from '@/utils/formatDate';
import ChallengesPageSkeleton from '@/components/skeleton/pages/ChallengesPageSkeleton';

export default function TabTwoScreen() {
  const { user, loading, error } = useMe();
  const { t } = useTranslation();
  const [ activeChallenge, setActiveChallenge ] = useState<UserChallenge | null>(null);
  const { setContent, controller } = useContext(BottomSheetContext);

  if (!user ||loading) return <ChallengesPageSkeleton />;
  if (error) return <Text>Error: {error.message}</Text>;
  
  const defaultChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === true);
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false);

  const DATA = [
    {
      title: t('tabs.challenges.headers.created'),
      data: createdChallenges ?? []
    },
    {
      title: t('tabs.challenges.headers.default'),
      data: defaultChallenges ?? []
    }
  ]

  const openChallenge = (activeChallenge: UserChallenge) => {
      setContent(
        <View style={{flexDirection: 'column', gap: 20}}>
          <View style={{width: '100%', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <ThemedText type='date'>
                {formatDate(activeChallenge?.updatedAt ?? '')}
              </ThemedText>
              {activeChallenge.done && activeChallenge.done === true ? 
                  <MaterialIcons name="check-circle-outline" size={24} color="green" /> : 
                  <MaterialIcons name="remove-circle-outline" size={24} color="red" />
              }
            </View>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <ThemedText style={{ fontSize: 22 }} type='subtitle'>
                {activeChallenge?.challenge.title}
              </ThemedText>
            </View>
          </View>
          <View style={{width: '100%', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
              <ThemedText type='subtitle'>
                Notes
              </ThemedText>
              {activeChallenge.notes && activeChallenge.notes.length > 0 ? 
                  <ThemedText style={{ maxWidth: 300}}>
                    {activeChallenge?.notes}
                  </ThemedText> : 
                  <ThemedText>
                    You haven&apos;t added notes to this challenge.
                  </ThemedText>
              }
            </View>
        </View>
      );

    controller?.open();
  };

  return (
    <Wrapper>
      <Container>  
        <View style={styles.challengesContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
            <ThemedText type='subtitle'>{t('tabs.challenges.title')}</ThemedText>
            {defaultChallenges?.length === 0 && (
              <Text>You have not created any challenges of your own yet.</Text>
            )}
            <Pressable style={styles.createButton} >
              <MaterialIcons name="add-circle" size={24} color="black" />
              <Link href='/challenges/create-challenge' push asChild>
                <Button accessibilityLabel="Create Challenge Button"
                        title="Create Challenge" />
              </Link>
            </Pressable>
          </View>
          <SectionList 
                      sections={DATA}
                      keyExtractor={item => item?.id ?? ''}
                      contentContainerStyle={styles.sectionList}
                      ItemSeparatorComponent={HorizontalRule}
                      scrollEnabled={false}
                      renderItem={({ item }) => {
                        if (item === null) {
                          return null; // fallback check in case item is null or something unintended
                        }
                        return <View>
                                <Pressable style={styles.challenge} onPress={() => { setActiveChallenge(item); openChallenge(item) }}>
                                    <View style={styles.challengeItem}>
                                      {item?.done === true ? 
                                          <MaterialIcons name="check-circle-outline" size={24} color="green" /> : 
                                          <MaterialIcons name="remove-circle-outline" size={24} color="red" />
                                        }
                                        <ThemedText type='subtitle' style={{maxWidth: 275, fontSize: 16, color: item?.done === true ? 'black' : '#444444ff' }}>
                                          {item?.challenge.title}
                                        </ThemedText>
                                    </View>                               
                                    <Feather name="arrow-right" size={16} color="black" />                                
                                </Pressable>
                              </View>
                      }}
                      renderSectionHeader={({section: {title}}) => (
                        <Text style={{paddingVertical: 14}}>{title}</Text>
                      )}
          />
        </View>
      </Container>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 8
  },
  challengesContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8
  },
  challengeList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  challenge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  challengeItem: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  }
});
