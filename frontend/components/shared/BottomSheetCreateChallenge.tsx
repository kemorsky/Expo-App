import { StyleSheet, View, Pressable, ActivityIndicator, TextInput } from "react-native";
import { ThemedText } from "@/components/shared/ThemedText";
import { useContext, useRef, useState } from "react";
import { Checkbox } from 'expo-checkbox';
import { BottomSheetContext } from "@/utils/BottomSheetContext";
import { useGlobalStyles } from "@/styles/globalStyles";
import { ChallengeDoneInput } from "@/__generated__/graphql";
import { useTranslation } from "react-i18next";
import { useCreateChallenge } from "@/api/challenges/challengesMutations";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useMe } from "@/hooks/useMe";
import AntDesign from '@expo/vector-icons/AntDesign';

export const BottomSheetCreateChallenge = () => {
  const { controller, setState } = useContext(BottomSheetContext);
  const { user, loading, error } = useMe();
  const { createChallenge, error: createChallengeError } = useCreateChallenge();
  const { t } = useTranslation();
  const { theme } = useThemeConfig();
  const globalStyles = useGlobalStyles();
  const [ checkbox, setCheckbox ] = useState<ChallengeDoneInput>({ repeatable: false });
  const titleRef = useRef({title: ""});

  if (!user || loading) return <ActivityIndicator />;

  const handleCreateChallenge = async () => {
      const { title } = titleRef.current;
      const data = await createChallenge(title);
      if (!data) {
          throw error;
      }
      controller?.close();
      setState({ mode: null, challenge: null });
  }

  return (
    <View style={styles.bottomSheetWrapper}>
      <View style={styles.container}>
        <ThemedText style={{ maxWidth: 250 }} type="subtitle">{t("tabs.challenges.createChallenge.header")}</ThemedText>
        <Pressable style={{ position: "absolute", top: -49, right: 0, padding: 8, }} onPress={() => controller?.close()}>
          <AntDesign name="close" size={24} color={theme.colors.text} />
        </Pressable>
        <View style={styles.content}>
          <TextInput 
              aria-label="Create Challenge Input Field"
              placeholder={t("tabs.challenges.createChallenge.title")}
              placeholderTextColor={"#8b8b8bff"}
              style={globalStyles.input}
              onChangeText={(title) => {
                  titleRef.current.title = title;
              }}
              autoCapitalize="sentences"
              selectTextOnFocus={false}
          />
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
          <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.buttonAction]} onPress={() => handleCreateChallenge()}>
              <ThemedText type="buttonText">{t("tabs.challenges.createButton")}</ThemedText>
          </Pressable>
          {createChallengeError && <ThemedText type="error">{createChallengeError.message}</ThemedText>}
          {error && <ThemedText type="error">{error.message}</ThemedText>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bottomSheetWrapper: {
        width: "100%",
        flexDirection: "column", 
        gap: 28
    },
    container: {
        gap: 20,
    },
    content: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 20,
        width: "100%",
    },
    button: {
        backgroundColor: "yellow",
        padding: 16,
        borderRadius: 8,
        alignSelf: "flex-end",
        
    }
})