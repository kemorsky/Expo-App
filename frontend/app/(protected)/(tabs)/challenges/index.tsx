import { Text, View, SectionList, Pressable } from 'react-native';
import { useGlobalStyles } from '@/styles/globalStyles';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { useMe } from '@/lib/api/user/userQueries';
import { useTranslation } from 'react-i18next';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetContext } from '../../_layout';
import { Wrapper } from '@/components/shared/Wrapper';
import { Container } from '@/components/shared/Container';
import { ThemedText } from '@/components/ThemedText';
import ChallengesPageSkeleton from '@/components/skeleton/pages/ChallengesPageSkeleton';
import { HorizontalRule } from '@/components/shared/HorizontalRule';
import type { UserChallenge } from '@/__generated__/graphql';
import { formatDate } from '@/utils/formatDate';
import { useThemeConfig } from '@/hooks/useThemeConfig';

export default function Challenges() {
  const { user, loading, error } = useMe();
  const { theme } = useThemeConfig();
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
  ];

  const openChallenge = (activeChallenge: UserChallenge) => { // Selected challenge opened in a bottom sheet
      setContent(
        <View style={{width: '100%', flexDirection: 'column', gap: 28}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <ThemedText type='date'>
                Completed At: {formatDate(activeChallenge.completedAt ?? '')}
              </ThemedText>
              {activeChallenge.done && activeChallenge.done === true ? 
                  <MaterialIcons name="check-circle-outline" size={24} color="green" /> : 
                  <MaterialIcons name="remove-circle-outline" size={24} color="red" />
              }
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <ThemedText style={{ fontSize: 18 }} type='subtitle'>
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
            <Link href='/challenges/create-challenge' push asChild>
              <Pressable aria-label="Create new challenge button" style={globalStyles.createChallengeButton}>
                <MaterialIcons name="add" size={24} color="white" />
                <ThemedText type="buttonText">Create Challenge</ThemedText>
              </Pressable>
            </Link>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', alignSelf: "flex-end", gap: 4}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
              <MaterialIcons name="check-circle-outline" size={22} color="green" />
              <ThemedText style={{fontSize: 12}}>Completed</ThemedText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
              <MaterialIcons name="remove-circle-outline" size={22} color="red" />
              <ThemedText style={{fontSize: 12}}>Not Completed</ThemedText>
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
                      <Pressable style={globalStyles.challenge} onPress={() => { setActiveChallenge(item); if (item.done  === true) {
                          openChallenge(item);
                        } 
                      }}>
                        <View style={globalStyles.challengeItem}>
                          {item?.done === true ? 
                              <MaterialIcons name="check-circle-outline" size={24} color="green" /> : 
                              <MaterialIcons name="remove-circle-outline" size={24} color="red" />
                            }
                            <ThemedText type='challengeTitle' style={{color: item?.done === false ? '#5a5a5aff' : theme.colors.text }}>
                              {item?.challenge.title}
                            </ThemedText>
                        </View>  
                        {item?.done === true ?       
                          <Feather name="arrow-right" size={16} color={theme.colors.text} /> : null }
                      </Pressable>
                    </View>
            }}
            renderSectionHeader={({section: {title}}) => (
              <ThemedText style={{paddingVertical: 14, fontFamily: 'PoppinsMedium'}}>{title}</ThemedText>
            )}
          />
        </View>
      </Container>
    </Wrapper>
  );
};
