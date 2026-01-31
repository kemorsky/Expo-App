import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { useContext, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Checkbox } from 'expo-checkbox';
import { BottomSheetContext } from "@/utils/BottomSheetContext";
import { useGlobalStyles } from "@/styles/globalStyles";
import { ChallengeIcon } from "@/components/shared/ChallengeIcon";
import { ChallengeDoneInput } from "@/__generated__/graphql";
import { useTranslation } from "react-i18next";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useDeleteChallenge } from "@/api/challenges/challengesMutations";

export const BottomSheetContent = () => {
  const { controller, state } = useContext(BottomSheetContext);
  const { deleteChallenge, error: deleteChallengeError } = useDeleteChallenge();
  const { theme } = useThemeConfig();
  const globalStyles = useGlobalStyles();
  const { t } = useTranslation();
  const [ checkbox, setCheckbox ] = useState<ChallengeDoneInput>({ repeatable: false });

  if (!state.challenge) return;

const handleDeleteChallenge = async (id: string) => {
    const data = await deleteChallenge(id);
    if (!data) {
        throw deleteChallengeError;
    }
    controller?.close();
}

  return (
    <View style={styles.bottomSheetWrapper}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetContent}>
            {state.challenge.done ? 
              <ThemedText type="date">
                {t("tabs.challenges.completedOn")}: {formatDate(state.challenge.completedAt ?? "")}
              </ThemedText> : 
              <ThemedText type="date">
                {t("tabs.challenges.notYetCompleted")}
              </ThemedText>
            }
            <ChallengeIcon type={state.challenge.done ? "complete" : "incomplete"}/>
          </View>
          <View style={styles.bottomSheetContent}>
            <ThemedText style={{ fontSize: 18 }} type="subtitle">
              {state.challenge.challenge.title}
            </ThemedText>
          </View>
        </View>
        <View style={styles.bottomSheetContentText}>
            <ThemedText type="subtitle">
              {t("tabs.challenges.bottomSheet.notes")}
            </ThemedText>
            {state.challenge.notes && state.challenge.notes.length > 0 ? 
                <ThemedText style={{ maxWidth: 300 }}>
                  {state.challenge.notes}
                </ThemedText> : 
                <ThemedText>
                  {t("tabs.challenges.bottomSheet.noNotes")}
                </ThemedText>
            }
          </View>
          <View style={globalStyles.repeatable}>
            <Checkbox
                style={globalStyles.checkbox}
                value={checkbox.repeatable ?? false}
                onValueChange={(value) =>
                    setCheckbox(prev => ({ ...prev, repeatable: value }))
                }
                color={checkbox.repeatable ? '#4630EB' : undefined}
            />
            <ThemedText>{t("home.completeChallenge.checkboxText")} - currently doesn&apos;t work because I need to add another function (editing)</ThemedText>
          </View>
          <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, styles.bottomSheetDeleteButton, { backgroundColor: theme.colors.background }]} 
                      onPress={() => handleDeleteChallenge(state.challenge?.id ?? "")}>
            <ThemedText type="buttonText" style={{color: "#ff2c2c", fontFamily: "PoppinsSemiBold"}}>
              {t("tabs.challenges.deleteButton")}
            </ThemedText>
          </Pressable>
      </View>
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
      backgroundColor: "#4e4e4e"
    },
})