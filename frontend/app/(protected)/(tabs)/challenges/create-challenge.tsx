import { StyleSheet, View, Text, Pressable, ActivityIndicator, TextInput } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { Container } from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { useCreateChallenge } from "@/lib/api/challenges/challengesMutations";
import { useMe } from "@/hooks/useMe";
import { useState } from "react";
import { ChallengeInput } from "@/__generated__/graphql";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";

export default function CreateChallenge() {
    const { user, loading, error } = useMe();
    const { createChallenge } = useCreateChallenge();
    const router = useRouter();

    const [ newChallenge, setNewChallenge ] = useState<ChallengeInput>({ title: ''})

    if (!user ||loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleCreateChallenge = async (title: string) => {
        try {
            const data = await createChallenge(title);
            if (data) {
                console.log(data)
                setNewChallenge({
                    title: data.challenge.title
                })
                console.log("New challenge created!" + newChallenge.title);
                router.push('/challenges');
            }
        setNewChallenge({title: ''});
        } catch (error) {
            throw new Error (`Error creating challenge: ${error}`)
        }
    }
    
    return (
        <Wrapper>
            <Container>
                <View>
                    <ThemedText type='title'>Create Challenge</ThemedText>
                    <TextInput 
                            placeholder="Title"
                            style={globalStyles.input}
                            value={newChallenge.title}
                            onChangeText={(title: string) => setNewChallenge((prev) => ({...prev, title}))}
                            autoCapitalize="sentences"
                    />
                    <Pressable onPress={() => handleCreateChallenge(newChallenge.title)}>
                        <ThemedText >Create Challenge</ThemedText>
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
}