import { StyleSheet, Text, ActivityIndicator, FlatList, View, Button, TextInput, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { useMe } from '@/hooks/useMe';
import { useCreateChallenge } from '@/lib/api/challenges/challengesMutations';
import { ChallengeInput } from '@/__generated__/types';
import { globalStyles } from '@/styles/globalStyles';
import { Wrapper } from '@/components/Wrapper';
import { ThemedText } from '@/components/ThemedText';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { HorizontalRule } from '@/components/HorizontalRule';
import { BottomSheet } from '@/components/BottomSheet';
import type { UserChallenge } from '@/__generated__/graphql';
import { formatDate } from '@/utils/formatDate';

export default function TabTwoScreen() {
  const { user, loading, error } = useMe();
  const { createChallenge } = useCreateChallenge();
  const [ newChallenge, setNewChallenge ] = useState<ChallengeInput>({ title: ''})
  const [ activeChallenge, setActiveChallenge ] = useState<UserChallenge | null>(null);
  let toggleSheetRef: (() => void) | undefined;

  if (!user ||loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  

  const defaultChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === true);
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false);

  const handleCreateChallenge = async (title: string) => {
    try {
      const data = await createChallenge(title);
      if (data) {
        console.log(data)
        setNewChallenge({
          title: data.challenge.title
        })
        console.log("New challenge created!" + newChallenge.title);
      }
      setNewChallenge({title: ''});
    } catch (error) {
      throw new Error (`Error creating challenge: ${error}`)
    }
  }

  return (
    <Wrapper>
      <Button title="Open Sheet" onPress={() => toggleSheetRef?.()}/>
      <BottomSheet snapTo={'75%'}
                   toggleSheetRef={(fn) => { toggleSheetRef = fn; }}
      >
        <View style={{flexDirection: 'column', gap: 20}}>
          <View style={{width: '100%', flexDirection: 'column', alignItems: 'flex-start'}}>
            <ThemedText> {/* currently broken, will come back to this at the next opportunity */}
              {formatDate(activeChallenge?.updatedAt ?? '')}
            </ThemedText>
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
      <ThemedText type='title' style={{alignSelf: 'center'}}>Challenges</ThemedText>
        <View style={styles.ChallengesContainer}>
          <ThemedText type='subtitle'>Your Challenges</ThemedText>
          {defaultChallenges?.length === 0 && (
            <Text>You have not created any challenges of your own yet.</Text>
          )}  
          <TextInput 
                    placeholder="Title"
                    style={globalStyles.input}
                    value={newChallenge.title}
                    onChangeText={(title: string) => setNewChallenge((prev) => ({...prev, title}))}
                    autoCapitalize="none"
          />
          <Button title="Create Challenge" onPress={() => handleCreateChallenge(newChallenge.title)} />
          {createdChallenges && (
            <FlatList 
                    data={createdChallenges}
                    contentContainerStyle={styles.ChallengeList}
                    ItemSeparatorComponent={HorizontalRule}
                    renderItem={({ item }) => {
                      return <View style={styles.Challenge}>
                                <ThemedText>{item?.challenge.title}</ThemedText>
                                {item?.done === true ? 
                                  <FontAwesome name="check-circle" size={24} color="green" /> : 
                                  <FontAwesome6 name="circle-xmark" size={24} color="red"/>
                                }
                              </View>
                      }}
                      keyExtractor={item => item?.id ?? ''}
            />
          )}
        </View>
        <View style={styles.ChallengesContainer}>
          <ThemedText type='subtitle'>Default Challenges</ThemedText>
          {defaultChallenges && (
            <FlatList 
                    data={defaultChallenges}
                    contentContainerStyle={styles.ChallengeList}
                    ItemSeparatorComponent={HorizontalRule}
                    renderItem={({ item }) => {
                      return <View style={styles.Challenge}>
                                <ThemedText>{item?.challenge.title}</ThemedText>
                                <Pressable onPress={() => { setActiveChallenge(item); toggleSheetRef?.() }}>
                                  <Text>Open</Text>
                                </Pressable>
                                {item?.done === true ? 
                                  <FontAwesome name="check-circle" size={24} color="green" /> : 
                                  <FontAwesome6 name="circle-xmark" size={24} color="red"/>
                                }
                              </View>
                      }}
                      keyExtractor={item => item?.id ?? ''}
            />
          )}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  ChallengesContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8
  },
  ChallengeList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  Challenge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  }
});
