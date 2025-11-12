import { StyleSheet, Text, ActivityIndicator, FlatList, View, Button, TextInput } from 'react-native';
import { useMe } from '@/hooks/useMe';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStyles } from '@/styles/globalStyles';
import { useCreateChallenge } from '@/lib/api/challenges/challengesMutations';
import { ChallengeInput } from '@/__generated__/types';
import { useState } from 'react';

export default function TabTwoScreen() {
  const { user, loading, error } = useMe();
  const { createChallenge } = useCreateChallenge();
  const [ newChallenge, setNewChallenge ] = useState<ChallengeInput>({ title: ''})

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
    <SafeAreaProvider>
        <Text>Challenges</Text>
        <View style={styles.wrapper}>
          <View style={styles.ChallengesContainer}>
            <Text>Your Challenges</Text>
            
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
              <FlatList data={createdChallenges}
                      style={styles.ChallengeList}
                      renderItem={({ item }) => {
                        return <View style={styles.Challenge}>
                                    <Text>{item?.challenge.title}</Text>
                                    <Text>{item?.done.toString()}</Text>
                                </View>
                        }}
                        keyExtractor={item => item?.id ?? ''}
              />
            )}
          </View>
          <View style={styles.ChallengesContainer}>
            <Text>Default Challenges</Text>
            {defaultChallenges && (
              <FlatList data={defaultChallenges}
                      style={styles.ChallengeList}
                      renderItem={({ item }) => {
                        return <View style={styles.Challenge}>
                                    <Text>{item?.challenge.title}</Text>
                                    <Text>{item?.done?.toString()}</Text>
                                </View>
                        }}
                        keyExtractor={item => item?.id ?? ''}
              />
            )}
          </View>
        </View>
        
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // ChallengeList: {
  //   backgroundColor: '#c5c5c5',
  //     flexDirection: 'column',
  //     flex: 1,
  //     gap: 8,

  // },
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    gap: 24,
    padding: 16,
    backgroundColor: '#c5c5c5'
  },
  ChallengesContainer: {
    width: '100%',
    flexDirection: 'column',
    
  },
  Challenge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#c5c5c5',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000000ff',
  },
});
