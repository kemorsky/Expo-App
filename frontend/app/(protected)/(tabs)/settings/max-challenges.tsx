import { Link } from "expo-router";
import { View, Button, Text } from "react-native";

export default function MaxChallengesPerDay() {
    return (
        <View>
            <Text>Max Challenges Per Day</Text>
            <Link href='/settings' dismissTo asChild>
                <Button title="Dismiss to Settings" />
            </Link>
        </View>
    )
}