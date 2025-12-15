import { useState } from 'react';
import { useMe } from '@/hooks/useMe';
import { formatDate } from '@/utils/formatDate';
import { View, Modal, Pressable, ActivityIndicator, TextInput } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useMarkChallengeAsDone } from '@/lib/api/challenges/challengesMutations';
import { ThemedText } from './ThemedText';
import { ChallengeDoneInput } from '@/__generated__/graphql';
import { useGlobalStyles } from '@/styles/globalStyles';

type ModalProps = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChallengeDoneModal(props: ModalProps) {
    const { openModal, setOpenModal } = props;
    const { user, loading } = useMe();
    const globalStyles = useGlobalStyles();
    const { markChallengeAsDone } = useMarkChallengeAsDone();

    const [notes, setNotes] = useState<ChallengeDoneInput>({notes: '', currentChallenge: true, done: false});

    if (!user || loading) return <ActivityIndicator />;

    const date = new Date();

    const currentChallenge = user.challenges?.find((challenge) => challenge?.currentChallenge === true)

    const handleMarkChallengeAsDone = async (id: string, notes: string, done: boolean, currentChallenge: boolean) => {
        try {
            const data = await markChallengeAsDone(id, notes, done, currentChallenge);
            if (data) {
                console.log("success")
                console.log(data)
                setNotes({
                    notes: data.notes,
                    done: data.done,
                    currentChallenge: data.currentChallenge
                })
                setOpenModal(!openModal)
            };
            setNotes({notes: '', done: false, currentChallenge: false});
            } catch (error) {
                throw new Error (`Error marking challenge as done: ${error}`)
            };
    };

    return (
        <Modal
            transparent
            allowSwipeDismissal
            visible={openModal}
            animationType="slide"
            onRequestClose={() => {
                setOpenModal(!openModal)
            }}>
            <View style={globalStyles.modalContainer}>
                <View style={globalStyles.modalHeader}>
                    <ThemedText type='subtitle'>Complete challenge</ThemedText>
                    <Pressable onPress={() => setOpenModal(!openModal)}>
                        <AntDesign name="close" size={24} color="white" />
                    </Pressable>
                </View>
                <View style={globalStyles.modalTitle}>
                    <ThemedText type="date">{formatDate(date.toString())}</ThemedText>
                    <ThemedText type='title'>{currentChallenge?.challenge.title}</ThemedText>
                </View>
                <TextInput 
                    style={[globalStyles.input, {height: 150, }]}
                    multiline
                    editable
                    onChangeText={(notes: string) => setNotes((prev) => ({...prev, notes}))}
                    value={notes.notes ?? ''}
                    placeholder="Add notes to this challenge (not required)"/>
                <Pressable style={globalStyles.buttonMarkAsDone} onPress={() => handleMarkChallengeAsDone(currentChallenge?.id ?? '', notes.notes ?? '', currentChallenge?.done === true ? false : true, currentChallenge?.currentChallenge === false ? true : false)}>
                    <ThemedText>Mark as done</ThemedText>
                </Pressable>
            </View>
        </Modal>
    )
};