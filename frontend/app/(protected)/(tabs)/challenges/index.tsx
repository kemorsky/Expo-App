import { Text, View, SectionList, Pressable } from 'react-native';
import { useGlobalStyles } from '@/styles/globalStyles';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { useMe } from '@/lib/api/user/userQueries';
import { useTranslation } from 'react-i18next';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetContext } from '../../_layout';
import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import ChallengesPageSkeleton from '@/components/skeleton/pages/ChallengesPageSkeleton';
import { HorizontalRule } from '@/components/HorizontalRule';
import type { UserChallenge } from '@/__generated__/graphql';
import { formatDate } from '@/utils/formatDate';

export default function Challenges() {
  const { user, loading, error } = useMe();
  const { t } = useTranslation();
  const [ activeChallenge, setActiveChallenge ] = useState<UserChallenge | null>(null);
  const { setContent, controller } = useContext(BottomSheetContext);
  const globalStyles = useGlobalStyles();

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
                {formatDate(activeChallenge.updatedAt ?? '')}
              </ThemedText>
              {activeChallenge.done && activeChallenge.done === true ? 
                  <MaterialIcons name="check-circle-outline" size={24} color="green" /> : 
                  <MaterialIcons name="remove-circle-outline" size={24} color="red" />
              }
              <Pressable onPress={controller?.close}>
                <ThemedText>Close BottomSheet (debug)</ThemedText>
              </Pressable>
            </View>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <ThemedText style={{ fontSize: 22 }} type='subtitle'>
                {activeChallenge.challenge.title}
              </ThemedText>
            </View>
          </View>
          <View style={{width: '100%', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
              <ThemedText type='subtitle'>
                Notes
              </ThemedText>
              {activeChallenge.notes && activeChallenge.notes.length > 0 ? 
                  <ThemedText style={{ maxWidth: 300}}>
                    {activeChallenge.notes}
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
        <View style={globalStyles.challengesContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
            <ThemedText type='subtitle'>{t('tabs.challenges.title')}</ThemedText>
            {defaultChallenges?.length === 0 && (
              <Text>You have not created any challenges of your own yet.</Text>
            )}
            <Link href='/challenges/create-challenge' push asChild>
              <Pressable style={globalStyles.createChallengeButton}>
                <MaterialIcons name="add-circle" size={24} color="black" />
                <ThemedText>Create Challenge</ThemedText>
              </Pressable>
            </Link>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
              <MaterialIcons name="check-circle-outline" size={24} color="green" />
              <ThemedText>Completed</ThemedText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
              <MaterialIcons name="remove-circle-outline" size={24} color="red" />
              <ThemedText>Not Completed</ThemedText>
            </View>
          </View>
          <SectionList 
                      sections={DATA}
                      keyExtractor={item => item?.id ?? ''}
                      contentContainerStyle={globalStyles.challengesSectionList}
                      ItemSeparatorComponent={HorizontalRule}
                      scrollEnabled={false}
                      renderItem={({ item }) => {
                        if (item === null) {
                          return null; // fallback check in case item is null or something unintended
                        }
                        return <View>
                                <Pressable style={globalStyles.challenge} onPress={() => { setActiveChallenge(item); openChallenge(item) }}>
                                    <View style={globalStyles.challengeItem}>
                                      {item?.done === true ? 
                                          <MaterialIcons name="check-circle-outline" size={24} color="green" /> : 
                                          <MaterialIcons name="remove-circle-outline" size={24} color="red" />
                                        }
                                        <ThemedText type='subtitle' style={{maxWidth: 275, color: item?.done === true ? '#444444ff' : 'black' }}>
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
};
