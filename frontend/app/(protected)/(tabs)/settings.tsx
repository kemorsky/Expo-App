import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { globalStyles } from '@/styles/globalStyles';
import { Button, View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { useAuth } from '@/utils/auth-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Test() {
    const { user, loading, error } = useMe();
    const  { logOut } = useAuth();

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <SafeAreaProvider>
            <Text>Settings</Text>
            <View style={styles.wrapper}>
                <View style={styles.SettingsContainer}>
                    <Text style={globalStyles.subtitle}>Account</Text>
                    <View style={styles.SettingsList}>
                        <Text style={styles.Setting}>Manage Account</Text>
                        <Text style={styles.Setting}>Password & Security</Text>
                        <Text style={styles.Setting}>Notifications</Text>
                    </View>
                </View>
                <View style={styles.SettingsContainer}>
                    <Text style={globalStyles.subtitle}>Preferences</Text>
                    <View style={styles.SettingsList}>
                        <Text style={styles.Setting}>Language{user?.settings?.language}</Text>
                        <Text style={styles.Setting}>Theme{user?.settings?.theme}</Text>
                        <Text style={styles.Setting}>Max Challenges Per Day{user?.settings?.numberOfChallengesPerDay}</Text>
                    </View>
                </View>
                <Button title="Log Out" onPress={logOut} />
            </View>
        </SafeAreaProvider>
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
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#000000ff',
  }
});