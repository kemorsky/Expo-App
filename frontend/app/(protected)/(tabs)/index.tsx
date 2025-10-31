import { StyleSheet, Text, View, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { Card } from 'react-native-paper'
import { formatDate } from '@/utils/formatDate';

// import { HelloWave } from '@/components/HelloWave';

import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '@/styles/globalStyles';

export default function HomeScreen() {
  const { user, loading, error } = useMe();

  console.log(user)

  if (!user || loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const date = new Date();

  const completedChallenges = user.challenges?.filter((challenge) => challenge?.done === true).length || 0;
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.isPredefined === false).length || 0;

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Home</Text>
      <Text>Welcome, {user.name}</Text>
      <Card mode="elevated">
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardTitleContainer}>
            <Text style={globalStyles.subtitle}>Today&apos;s challenge</Text>
            <Text style={globalStyles.date}>{formatDate(date.toString())}</Text>
          </View>
          <View style={styles.cardContentContainer}>
            <Text style={styles.title}>ddsds</Text>
            <Pressable style={styles.buttonMarkAsDone}>
              <Text style={styles.buttonMarkAsDoneText}>Mark as done</Text>
            </Pressable>
            {/* <View style={styles.cardButtonContainer}>
              {/* <View style={styles.stepContainer}>
                <Text>Want to add notes?</Text>
                <Pressable style={styles.buttonAddNotes}>
                  <Text style={styles.buttonAddNotesText}>More</Text>
                </Pressable>
              </View> */}
              {/* <View>
                <Pressable style={styles.buttonMarkAsDone}>
                  <Text style={styles.buttonMarkAsDoneText}>Mark as done</Text>
                </Pressable>
              </View> 
            </View> */}
          </View>
        </Card.Content>
        
      </Card>
      <Card mode="contained">
        <Card.Content style={styles.cardContent}>
          <Text style={globalStyles.subtitle}>Stats</Text>
          <View style={styles.statsContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
              <View style={{width: 160, height: 80, padding: 8, justifyContent: 'space-between', borderRadius: 8, backgroundColor: 'red'}}>
                <Text style={{fontSize: 12,}}>Challenges completed</Text>
                <Text style={styles.title}>{completedChallenges}</Text>
              </View>
              <View style={{width: 160, height: 80, padding: 8, justifyContent: 'space-between', borderRadius: 8, backgroundColor: 'red'}}>
                <Text style={globalStyles.subtitle}>Challenges created</Text>
                <Text style={styles.title}>{createdChallenges}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
              <View style={{width: 160, height: 80, padding: 8, justifyContent: 'space-between', borderRadius: 8, backgroundColor: 'red'}}>
                <Text style={{fontSize: 12,}}>Current streak</Text>
                <Text style={styles.title}>{completedChallenges}</Text>
              </View>
              <View style={{width: 160, height: 80, padding: 8, justifyContent: 'space-between', borderRadius: 8, backgroundColor: 'red'}}>
                <Text style={globalStyles.subtitle}>Highest streak</Text>
                <Text style={styles.title}>{createdChallenges}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Card mode='elevated'>
        <Card.Content style={styles.cardContent}>
          <View>
            <Text style={styles.title}>Your previous challenges</Text>
            <FlatList
              data={user?.challenges}
              renderItem={(item) => {
                  return <View style={styles.previousChallenge}>
                              <View style={styles.previousChallengeTitle}>
                                <Text style={styles.previousChallengeTitleText}>{item.item?.updatedAt}</Text>
                                <Pressable>
                                  <Text style={styles.previousChallengeTitleText}>View -&gt; </Text>
                                </Pressable>
                              </View>
                              <Text>{item.item?.title}</Text>
                              <Text>{item.item?.done}</Text>
                          </View>
              }}
              keyExtractor={item => item?.id ?? ''}
            />
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    gap: 24,
    padding: 12,
    backgroundColor: '#c5c5c5'
  },
  buttonMarkAsDone: {
    height: 32,
    justifyContent: 'center',
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 24
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  stepContainer: {
    gap: 6,
  },
  previousChallenge: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000000ff'
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
    
  }
});
