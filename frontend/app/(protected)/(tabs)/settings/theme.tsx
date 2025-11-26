import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from "@/hooks/useMe";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

export default function Theme() {
    const { user, loading, error } = useMe();

    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={styles.settingsList}>
                    <Pressable style={styles.setting}>
                        <ThemedText>Light</ThemedText>
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.setting}>
                        <ThemedText>Dark</ThemedText>
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
  settingsList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  }
});