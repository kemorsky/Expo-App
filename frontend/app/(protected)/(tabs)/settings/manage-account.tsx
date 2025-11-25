import { Link } from "expo-router";
import { View, Button, Text } from "react-native";

export default function ManageAccount() {
    return (
        <View>
            <Text>SettingsDetail</Text>
            <Link href='/settings' dismissTo asChild>
                <Button title="Dismiss to Settings" />
            </Link>
        </View>
    )
}