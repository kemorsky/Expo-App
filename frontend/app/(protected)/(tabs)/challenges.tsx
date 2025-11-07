import { StyleSheet, Text, ActivityIndicator, FlatList, View } from 'react-native';
import { useMe } from '@/hooks/useMe';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStyles } from '@/styles/globalStyles';

export default function TabTwoScreen() {
  const { user, loading, error } = useMe();

  if (!user ||loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const defaultChallenges = user.challenges?.find((challenge) => challenge?.isPredefined === true);

  return (
    <SafeAreaProvider>
        <Text>Challenges</Text>
        <View style={styles.wrapper}>
          <View style={styles.ChallengesContainer}>
            <Text>Your Challenges</Text>
            {defaultChallenges && (
              <Text>You have not created any challenges of your own yet.</Text>
            )}  
            {!defaultChallenges && (
              <FlatList data={user?.challenges}
                      style={styles.ChallengeList}
                      renderItem={(item) => {
                        return <View style={styles.Challenge}>
                                    <Text>{item?.item?.title}</Text>
                                    <Text>{item?.item?.done.toString()}</Text>
                                </View>
                        }}
                        keyExtractor={item => item?.id ?? ''}
              />
            )}
          </View>
          <View style={styles.ChallengesContainer}>
            <Text>Default Challenges</Text>
            {defaultChallenges && (
              <FlatList data={user?.challenges}
                      style={styles.ChallengeList}
                      renderItem={(item) => {
                        return <View style={styles.Challenge}>
                                    <Text>{item?.item?.title}</Text>
                                    <Text>{item?.item?.done?.toString()}</Text>
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
    backgroundColor: '#c5c5c5',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000000ff',
  }
});
