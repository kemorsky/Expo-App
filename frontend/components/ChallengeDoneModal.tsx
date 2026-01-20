import { useState } from 'react';
import { useMe } from '@/hooks/useMe';
import { formatDate } from '@/utils/formatDate';
import { View, Modal, Pressable, ActivityIndicator, TextInput } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useMarkChallengeAsDone } from '@/api/challenges/challengesMutations';
import { ThemedText } from './ThemedText';
import { ChallengeDoneInput } from '@/__generated__/graphql';
import { useGlobalStyles } from '@/styles/globalStyles';
import { useTranslation } from 'react-i18next';

type ModalProps = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChallengeDoneModal(props: ModalProps) {
    const { openModal, setOpenModal } = props;
    const { user, loading } = useMe();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const { markChallengeAsDone } = useMarkChallengeAsDone();

    const [notes, setNotes] = useState<ChallengeDoneInput>({notes: '', currentChallenge: true, done: false});

    if (!user || loading) return <ActivityIndicator />;

    const date = new Date();

    const currentChallenge = user.challenges?.find((challenge) => challenge?.currentChallenge === true);

    const handleMarkChallengeAsDone = async (id: string, notes: string, done: boolean, currentChallenge: boolean) => {
        try {
            const data = await markChallengeAsDone(id, notes, done, currentChallenge);
            if (data) {
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
                    <ThemedText type='subtitle'>{t('home.completeChallenge.title')}</ThemedText>
                    <Pressable aria-label="Close modal button" onPress={() => setOpenModal(!openModal)}>
                        <AntDesign name="close" size={24} color="white" />
                    </Pressable>
                </View>
                <View style={globalStyles.modalTitle}>
                    <ThemedText type="date">{formatDate(date.toString())}</ThemedText>
                    <ThemedText style={{ fontSize: 18 }} type='subtitle'>{currentChallenge?.challenge.title}</ThemedText>
                </View>
                <TextInput 
                    aria-label="Challenge notes input field"
                    style={[globalStyles.input, {height: 150, }]}
                    multiline
                    editable
                    onChangeText={(notes: string) => setNotes((prev) => ({...prev, notes}))}
                    value={notes.notes ?? ''}
                    placeholder={t('home.completeChallenge.inputPlaceholder')}
                    placeholderTextColor={"#8b8b8bff"}/>
                <Pressable aria-label="Mark challenge as done button" style={globalStyles.buttonMarkAsDone} onPress={() => handleMarkChallengeAsDone(currentChallenge?.id ?? '', notes.notes ?? '', currentChallenge?.done === true ? false : true, currentChallenge?.currentChallenge === false ? true : false)}>
                    <ThemedText>{t('home.completeChallenge.button')}</ThemedText>
                </Pressable>
            </View>
        </Modal>
    )
};