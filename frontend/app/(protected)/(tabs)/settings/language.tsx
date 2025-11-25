import { Link } from "expo-router";
import { View, Button, Text } from "react-native";

export default function Language() {
    return (
        <View>
            <Text>Language</Text>
            <Link href='/settings' dismissTo asChild>
                <Button title="Dismiss to Settings" />
            </Link>
        </View>
    )
}