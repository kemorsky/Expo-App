import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { globalStyles } from '@/styles/globalStyles';
import { Button, View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { useAuth } from '@/utils/auth-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

export default function Test() {
    const { user, loading, error } = useMe();
    const  { logOut } = useAuth();

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <SafeAreaView style={styles.wrapper}>
            <Text>Settings</Text>
            <View style={styles.SettingsContainer}>
                <Text style={globalStyles.subtitle}>Account</Text>
                <View style={styles.SettingsList}>
                    <View style={styles.Setting}>
                        <Text>Manage Account</Text>
                        <Feather name="arrow-right" size={16} color="black" />
                    </View>
                    <View style={styles.Setting}>
                        <Text>Password & Security</Text>
                        <Feather name="arrow-right" size={16} color="black" />
                    </View>
                    <View style={styles.Setting}>
                        <Text>Notifications</Text>
                        <Feather name="arrow-right" size={16} color="black" />
                    </View>
                </View>
            </View>
            <View style={styles.SettingsContainer}>
                <Text style={globalStyles.subtitle}>Preferences</Text>
                <View style={styles.SettingsList}>
                    <View style={styles.Setting}>
                        <Text>Language</Text>
                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                            <Text>{user?.settings?.language}</Text>
                            <Feather name="arrow-right" size={16} color="black" />
                        </View>
                    </View>
                     <View style={styles.Setting}>
                        <Text>Theme</Text>
                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                            <Text>{user?.settings?.theme}</Text>
                            <Feather name="arrow-right" size={16} color="black" />
                        </View>
                    </View>
                     <View style={styles.Setting}>
                        <Text>Max Challenges Per Day</Text>
                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                            <Text>{user?.settings?.numberOfChallengesPerDay}</Text>
                            <Feather name="arrow-right" size={16} color="black" />
                        </View>
                    </View>
                </View>
            </View>
            <Button title="Log Out" onPress={logOut} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    gap: 24,
    padding: 16,
    backgroundColor: '#c5c5c5'
  },
  SettingsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8
  },
  SettingsList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000ff',
  },
  Setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#000000ff',
  }
});