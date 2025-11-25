import { Link } from "expo-router";
import { View, Button, Text } from "react-native";

export default function Theme() {
    return (
        <View>
            <Text>Theme</Text>
            <Link href='/settings' dismissTo asChild>
                <Button title="Dismiss to Settings" />
            </Link>
        </View>
    )
}