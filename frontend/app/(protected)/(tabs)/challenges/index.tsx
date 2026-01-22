import { Text, View, SectionList, Pressable } from 'react-native';
import { useGlobalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { useMe } from '@/api/user/userQueries';
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
                {t('tabs.challenges.completedOn')}: {formatDate(activeChallenge.completedAt ?? '')}
              </ThemedText>
              <MaterialIcons name={activeChallenge.done ? "check-circle-outline" : "remove-circle-outline"} size={24} color="green" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <ThemedText style={{ fontSize: 18 }} type='subtitle'>
                {activeChallenge.challenge.title}
              </ThemedText>
            </View>
          </View>
          <View style={{width: '100%', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
              <ThemedText type='subtitle'>
                {t('tabs.challenges.bottomSheet.notes')}
              </ThemedText>
              {activeChallenge.notes && activeChallenge.notes.length > 0 ? 
                  <ThemedText style={{ maxWidth: 300}}>
                    {activeChallenge.notes}
                  </ThemedText> : 
                  <ThemedText>
                    {t('tabs.challenges.bottomSheet.noNotes')}
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
            <Pressable aria-label="Create new challenge button" 
                        style={({pressed}) => [{ opacity: pressed ? 0.7 : 1}, globalStyles.createChallengeButton]}
                        onPress={() => {router.push("/challenges/create-challenge")}}>
              <MaterialIcons name="add" size={24} color="white" />
              <ThemedText type="buttonText">{t('tabs.challenges.createButton')}</ThemedText>
            </Pressable>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', alignSelf: "flex-end", gap: 4}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
              <MaterialIcons name="check-circle-outline" size={22} color="green" />
              <ThemedText style={{fontSize: 12}}>{t('tabs.challenges.completed')}</ThemedText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2}}>
              <MaterialIcons name="remove-circle-outline" size={22} color="red" />
              <ThemedText style={{fontSize: 12}}>{t('tabs.challenges.notCompleted')}</ThemedText>
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
                          <MaterialIcons name={item.done ? "check-circle-outline" : "remove-circle-outline"} size={24} color={item.done ? "green" : "red"} />
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
