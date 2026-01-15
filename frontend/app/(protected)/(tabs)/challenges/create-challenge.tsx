import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from "react-native";
import { Wrapper } from "@/components/shared/Wrapper";
import { Container } from "@/components/shared/Container";
import { ThemedText } from "@/components/ThemedText";
import { useCreateChallenge } from "@/lib/api/challenges/challengesMutations";
import { useMe } from '@/lib/api/user/userQueries';
import { useRef } from "react";
import { useGlobalStyles } from '@/styles/globalStyles';
import { useRouter } from "expo-router";

export default function CreateChallenge() {
    const { user, loading, error } = useMe();
    const { createChallenge, error: createChallengeError } = useCreateChallenge();
    const globalStyles = useGlobalStyles();
    const router = useRouter();
    const titleRef = useRef({title: ""});

    if (!user || loading) return <ActivityIndicator />;
    if (error) return <ThemedText>Error: {error.message}</ThemedText>;

    const handleCreateChallenge = async () => {
        const { title } = titleRef.current;
        const data = await createChallenge(title);
        if (data) {
            router.push('/challenges');
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
                            onChangeText={(title) => {
                                titleRef.current.title = title;
                            }}
                            autoCapitalize="sentences"
                            selectTextOnFocus={false}
                    />
                    <Pressable style={globalStyles.createChallengeButton} onPress={() => handleCreateChallenge()}>
                        <ThemedText>Create Challenge</ThemedText>
                    </Pressable>
                    {createChallengeError && <ThemedText type="error">{createChallengeError.message}</ThemedText>}
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