import { StyleSheet, Text, ActivityIndicator, FlatList, View, Button, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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
            <Text style={globalStyles.subtitle}>Your Challenges</Text>
            
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
                      renderItem={({ item }) => {
                        return <View style={styles.Challenge}>
                                    <Text style={{maxWidth: 300, }}>{item?.challenge.title}</Text>
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
            <Text style={globalStyles.subtitle}>Default Challenges</Text>
            {defaultChallenges && (
              <FlatList 
                      data={defaultChallenges}
                      contentContainerStyle={styles.ChallengeList}
                      renderItem={({ item }) => {
                        return <View style={styles.Challenge}>
                                    <Text style={{maxWidth: 280}}>{item?.challenge.title}</Text>
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
        </View>
        
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
    gap: 8
  },
  ChallengeList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000ff',
  },
  Challenge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#000000ff',
  }
});
