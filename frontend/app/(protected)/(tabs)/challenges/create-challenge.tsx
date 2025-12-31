import { StyleSheet, View, Text, Pressable, ActivityIndicator, TextInput } from "react-native";
import { Wrapper } from "@/components/shared/Wrapper";
import { Container } from "@/components/shared/Container";
import { ThemedText } from "@/components/ThemedText";
import { useCreateChallenge } from "@/lib/api/challenges/challengesMutations";
import { useMe } from '@/lib/api/user/userQueries';
import { useState } from "react";
import { ChallengeInput } from "@/__generated__/graphql";
import { useGlobalStyles } from '@/styles/globalStyles';
import { useRouter } from "expo-router";

export default function CreateChallenge() {
    const { user, loading, error } = useMe();
    const { createChallenge } = useCreateChallenge();
    const globalStyles = useGlobalStyles();
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
                <View style={styles.content}>
                    <ThemedText style={{ maxWidth: 250 }} type='subtitle'>Add your own challenge. You call the shots here!</ThemedText>
                    <TextInput 
                            aria-label="Create Challenge Input Field"
                            placeholder="Title"
                            style={globalStyles.input}
                            value={newChallenge.title}
                            onChangeText={(title: string) => setNewChallenge((prev) => ({...prev, title}))}
                            autoCapitalize="sentences"
                    />
                    <Pressable style={globalStyles.createChallengeButton} onPress={() => handleCreateChallenge(newChallenge.title)}>
                        <ThemedText>Create Challenge</ThemedText>
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 20
    },
    button: {
        backgroundColor: 'yellow',
        padding: 16,
        borderRadius: 8,
        alignSelf: 'flex-end',
        
    }
})