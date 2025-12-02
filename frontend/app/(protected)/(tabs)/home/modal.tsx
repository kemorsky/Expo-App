import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Platform, ActivityIndicator} from "react-native";
import { useMe } from "@/hooks/useMe";

export default function Modal() {
    const { user, loading, error } = useMe();
    
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <View style={styles.content}>
                <Text>Modal</Text>
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 90,
    },
    bottomSheet: {
        height: 600,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#854141ff',
        zIndex: 100
    },
    content: {
        padding: 12,
        width: '100%',
        backgroundColor: '#862e2eff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    handle: {
        alignSelf: "center",
        width: 40,
        height: 6,
        borderRadius: 3,
        marginVertical: 12,
        backgroundColor: "#888",
    },
})