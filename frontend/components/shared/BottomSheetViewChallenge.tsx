import { StyleSheet, View, Pressable, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { useContext, useState, useRef } from "react";
import { formatDate } from "@/utils/formatDate";
import { Checkbox } from 'expo-checkbox';
import { BottomSheetContext } from "@/utils/BottomSheetContext";
import { useGlobalStyles } from "@/styles/globalStyles";
import { ChallengeIcon } from "@/components/shared/ChallengeIcon";
import { ChallengeInput } from "@/__generated__/graphql";
import { useTranslation } from "react-i18next";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useUpdateChallenge, useDeleteChallenge } from "@/api/challenges/challengesMutations";
import AntDesign from "@expo/vector-icons/AntDesign";

export const BottomSheetViewChallenge = () => {
  const { controller, state, setState } = useContext(BottomSheetContext);
  const { deleteChallenge, error: deleteChallengeError } = useDeleteChallenge();
  const { updateChallenge, error: updateChallengeError } = useUpdateChallenge();
  const { theme } = useThemeConfig();
  const globalStyles = useGlobalStyles();
  const { t } = useTranslation();
  const [ checkbox, setCheckbox ] = useState<boolean>(state.challenge?.repeatable ?? false);
  const [ edit, setEdit ] = useState(false);
  const updateRef = useRef<ChallengeInput>({ title: "", notes: "" })

  if (!state.challenge) return;

  const initUpdateRef = () => { // cleans up state ref
    if (!state.challenge) return;

    updateRef.current.title = state.challenge.challenge.title;
    updateRef.current.notes = state.challenge.notes;
    setCheckbox(state.challenge.repeatable ?? false);
  };

  const closeSheet = () => { // closes the bottom sheet and clears out values imbedded alongside the controller command
    setEdit(false);
    controller?.close();
    setState({ mode: null, challenge: null })
  };

  const handleEditChallenge = async (id: string) => {
    const { title, notes } = updateRef.current;
    const data = await updateChallenge(id, title ?? "", notes ?? "", checkbox);
    if (!data) {
      throw updateChallengeError;
    }
    console.log("edit successful", data);
    closeSheet();
    setCheckbox(false);
  }

  const handleDeleteChallenge = async (id: string) => {
    const data = await deleteChallenge(id);
    if (!data) {
        throw deleteChallengeError;
    }
    closeSheet();
  }

  return (
    // TouchableWithoutFeedback added to allow for keyboard dismissal via tapping anywhere outside of the keyboard
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.bottomSheetWrapper}>
        <View style={styles.bottomSheetContainer}>
          <Pressable style={styles.buttonClose} onPress={() => closeSheet()}>
            <AntDesign name="close" size={24} color={theme.colors.text} />
          </Pressable>
          <View style={styles.bottomSheetContent} accessibilityRole="header">
            {state.challenge.done ? 
              <ThemedText type="date">
                {t("tabs.challenges.completedOn")}: {formatDate(state.challenge.completedAt ?? "")}
              </ThemedText> : 
              <ThemedText type="date">
                {t("tabs.challenges.notYetCompleted")}
              </ThemedText>
            }
            <View style={styles.bottomSheetIconsContainer}>
              <ChallengeIcon type={state.challenge.done ? "complete" : "incomplete"}/>
              {state.challenge.repeatable && <ChallengeIcon type="repeatable" />}
            </View>
            
          </View>
          <View style={styles.bottomSheetContent}>
            {!edit ?   
              <ThemedText style={{ fontSize: 18 }} type="subtitle">
                {state.challenge.challenge.title}
              </ThemedText>
              : 
              <TextInput
                accessibilityLabel="Edit challenge title input field"
                accessibilityHint="Enter updates to your challenge title here"
                placeholder={t("tabs.challenges.createChallenge.title")}
                placeholderTextColor={"#8b8b8bff"}
                defaultValue={state.challenge.challenge.title}
                style={globalStyles.input}
                onChangeText={(title) => {
                    updateRef.current.title = title;
                }}
                autoCapitalize="none"
              />
            }
          </View>
        </View>
        <View style={styles.bottomSheetContentText}>
          <ThemedText type="subtitle">
            {t("tabs.challenges.bottomSheet.notes")}
          </ThemedText>
          {!edit ? 
              <ThemedText style={{ maxWidth: 300 }}>
              {state.challenge.notes && state.challenge.notes.length > 0 ?
                state.challenge.notes : t("tabs.challenges.bottomSheet.noNotes")
              }
              </ThemedText> 
          :
            <TextInput
              accessibilityLabel="Edit challenge notes input field"
              accessibilityHint="Enter updates to your challenge notes here"
              placeholder={t("tabs.challenges.bottomSheet.notes")}
              placeholderTextColor={"#8b8b8bff"}
              defaultValue={state.challenge.notes ?? ""}
              style={[globalStyles.input, { height: 150 }]}
              onChangeText={(notes) => {
                  updateRef.current.notes = notes;
              }}
              multiline
              editable
              autoCapitalize="none"
            />
          }
          <View style={[globalStyles.repeatable, { marginTop: 8 }]}>
            {edit && <>
              <Checkbox
                accessibilityRole="checkbox"
                accessibilityState={{ checked: checkbox }}
                accessibilityLabel="Make challenge repeatable checkbox"
                style={globalStyles.checkbox}
                value={checkbox}
                onValueChange={setCheckbox}
                color={checkbox ? '#4630EB' : undefined}
            />
            <ThemedText>{t("home.completeChallenge.checkboxText")}</ThemedText> 
            </>}
          </View>
        </View>
        <View style={styles.bottomSheetButtonsContainer}>
          {!edit ? 
            <>
              <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.bottomSheetEditButton]} onPress={() => {setEdit(true); initUpdateRef();}}>
                <ThemedText type="buttonText" style={{ fontSize: 14 }}>
                  {t("tabs.challenges.editButton")}
                </ThemedText>
              </Pressable>
            </> :
            <View style={styles.editButtonsContainer}>
              <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, styles.editButtons, { backgroundColor: theme.colors.background}]} onPress={() => setEdit(!edit)}>
                <ThemedText type="buttonText" style={{ color: "#ff2c2c" }}>
                  {t("tabs.challenges.cancel")}
                </ThemedText>
              </Pressable>
              <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, styles.editButtons, { backgroundColor: theme.colors.primary }]} onPress={() => handleEditChallenge(state.challenge?.id ?? "")}>
                <ThemedText type="buttonText">
                  {t("tabs.challenges.save")}
                </ThemedText>
              </Pressable>
            </View> 
          }
        
          {!edit && 
            <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, styles.bottomSheetDeleteButton, { backgroundColor: theme.colors.background }]} 
                        onPress={() => handleDeleteChallenge(state.challenge?.id ?? "")}>
              <ThemedText type="buttonText" style={{color: "#ff2c2c", fontFamily: "PoppinsSemiBold"}}>
                {t("tabs.challenges.deleteButton")}
              </ThemedText>
            </Pressable>
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    bottomSheetWrapper: {
      width: "100%",
      flexDirection: "column", 
      gap: 28
    },
    bottomSheetContainer: {
      flexDirection: "column", 
      gap: 8
    },
    bottomSheetContent: {
      width: "100%", 
      flexDirection: "row", 
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    bottomSheetContentText: {
      width: "100%",
      height: 280,
      flexDirection: "column", 
      alignItems: "flex-start", 
      gap: 8
    },
    bottomSheetDeleteButton: {
      width: 240,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      padding: 12,
    },
    bottomSheetButtonsContainer: {
      gap: 12
    },
    bottomSheetIconsContainer: {
      flexDirection: "row", 
      gap: 8,
    },
    buttonClose: {
      position: "absolute", 
      top: -49, 
      right: -7, 
      padding: 8, 
    },
    editButtonsContainer: {
      flexDirection: "row",
      gap: 12,
      alignSelf: "center",
      marginTop: 16
    },
    editButtons: {
      minWidth: 100,
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRadius: 4,
      backgroundColor: "#dbdbdbff",
    }
})