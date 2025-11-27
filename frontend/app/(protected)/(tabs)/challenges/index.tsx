import { StyleSheet, Text, ActivityIndicator, View, Button, TextInput, SectionList, Pressable } from 'react-native';
import { useState } from 'react';
import { useMe } from '@/hooks/useMe';
import { ChallengeInput } from '@/__generated__/types';
import { globalStyles } from '@/styles/globalStyles';
import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HorizontalRule } from '@/components/HorizontalRule';
import { BottomSheet, BottomSheetController } from '@/components/BottomSheet';
import type { UserChallenge } from '@/__generated__/graphql';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { formatDate } from '@/utils/formatDate';

export default function TabTwoScreen() {
  const { user, loading, error } = useMe();
  const [ newChallenge, setNewChallenge ] = useState<ChallengeInput>({ title: ''})
  const [ activeChallenge, setActiveChallenge ] = useState<UserChallenge | null>(null);
  const [ sheetController, setSheetController ] = useState<BottomSheetController | null>(null);

  if (!user ||loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  
  const defaultChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === true);
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false);

  const DATA = [
    {
      title: 'Created Challenges',
      data: createdChallenges ?? []
    },
    {
      title: 'Default Challenges',
      data: defaultChallenges ?? []
    }
  ]

  return (
    <Wrapper>
      <Container>  
        <BottomSheet snapPoints={[150]}
                    initialIndex={1}
                    controller={setSheetController}>
          <View style={{flexDirection: 'column', gap: 20}}>
            <View style={{width: '100%', flexDirection: 'column', alignItems: 'flex-start'}}>
              {/* <ThemedText> {/*  currently broken, will come back to this at the next opportunity */}
                {/* {formatDate(activeChallenge?.updatedAt ?? '')}
              </ThemedText> */}
              <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <ThemedText type='subtitle'>
                  {activeChallenge?.challenge.title}
                </ThemedText>
                {activeChallenge?.done === true ? 
                  <FontAwesome name="check-circle" size={24} color="green" /> : 
                  <FontAwesome6 name="circle-xmark" size={24} color="red"/>
                }
              </View>
            </View>
            <ThemedText>
              {activeChallenge?.notes}
            </ThemedText>
          </View>
        </BottomSheet>
        <View style={styles.challengesContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
            <ThemedText type='subtitle'>My Challenges</ThemedText>
            {defaultChallenges?.length === 0 && (
              <Text>You have not created any challenges of your own yet.</Text>
            )}  
            <Link href='/challenges/create-challenge' push asChild>
              <Button title="Create Challenge" />
            </Link>
          </View>
          <SectionList 
                      sections={DATA}
                      keyExtractor={item => item?.id ?? ''}
                      contentContainerStyle={styles.sectionList}
                      ItemSeparatorComponent={HorizontalRule}
                      scrollEnabled={false}
                      renderItem={({ item }) => {
                        return <View>
                                <Pressable style={styles.challenge} onPress={() => { setActiveChallenge(item); sheetController?.open() }}>
                                    <View style={styles.challengeItem}>
                                    {item?.done === true ? 
                                        <FontAwesome name="check-circle" size={24} color="green" /> : 
                                        <FontAwesome6 name="circle-xmark" size={24} color="red"/>
                                      }
                                    <ThemedText type='subtitle' style={{maxWidth: 275, color: item?.done === true ? 'green' : 'red' }}>{item?.challenge.title}</ThemedText>
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
    height: 500,
    overflow: 'scroll',
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  }
});
