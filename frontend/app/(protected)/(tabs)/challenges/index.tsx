import { useContext, useState } from "react";
import { StyleSheet, Text, View, SectionList, Pressable } from "react-native";
import Animated, { Easing, FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useMe } from "@/api/user/userQueries";
import { useTranslation } from "react-i18next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomSheetContext } from '@/utils/BottomSheetContext';
import { Container } from "@/components/shared/Container";
import { ThemedText } from "@/components/shared/ThemedText";
import ChallengesPageSkeleton from "@/components/skeleton/pages/ChallengesPageSkeleton";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import type { UserChallenge } from "@/__generated__/graphql";
import { ChallengeIcon } from "@/components/shared/ChallengeIcon";
import { useDeleteChallenges, useDeleteChallenge } from "@/api/challenges/challengesMutations";

export default function Challenges() {
  const { user, loading, error } = useMe();
  const { deleteChallenges, error: deleteChallengesError } = useDeleteChallenges();
  const { deleteChallenge, error: deleteChallengeError } = useDeleteChallenge();
  const { theme } = useThemeConfig();
  const { t } = useTranslation();
  const [ selectedChallenges, setSelectedChallenges ] = useState<UserChallenge[]>([]);
  const [ deleteMode, setDeleteMode ] = useState(false);
  const { setState, controller } = useContext(BottomSheetContext);
  const globalStyles = useGlobalStyles();

  if (!user || loading) return <ChallengesPageSkeleton />;
  if (error) return <Text>Error: {error.message}</Text>;

  const defaultChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === true);
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false);

  const ids = selectedChallenges.map((challenge) => challenge.id);

  const DATA = [
    {
      title: t("tabs.challenges.headers.created"),
      data: createdChallenges ?? []
    },
    {
      title: t("tabs.challenges.headers.default"),
      data: defaultChallenges ?? []
    }
  ];

  const handleToggleDeleteMode = () => { // toggles mode for mass deletion of challenges
    setSelectedChallenges([]);
    setDeleteMode(!deleteMode ? true : false);
  }

  const handleSelectChallenge = (newSelect: UserChallenge) => {
    setSelectedChallenges(prevSelectedChallenges => {
      if (prevSelectedChallenges.some(challenge => challenge.id === newSelect.id)) { // if challenge is clicked on again when in the array, remove
        return prevSelectedChallenges.filter(challenge => challenge.id !== newSelect.id)
      } else {
        return [...prevSelectedChallenges, newSelect]; // otherwise add
      }
    })
  }

  const handleDeleteChallenge = async (id: string) => {
    const data = await deleteChallenge(id);
    if (!data) {
      throw deleteChallengeError;
    }
  }

  const handleDeleteChallenges = async (ids: string[]) => {
    const data = await deleteChallenges(ids);
    if (!data) {
      throw deleteChallengesError;
    }
    setSelectedChallenges([]);
    setDeleteMode(false);
  }

  const openChallenge = (challenge: UserChallenge) => {
    setState({ mode: "viewChallenge", challenge });
    controller?.open();
  };

  const createChallenge = () => {
    setState({ mode: "createChallenge", challenge: null });
    controller?.open();
  };

  return (
      <Container style={{ flex: 1 }}>
        <View style={[globalStyles.challengesContainer, { flex: 1 }]}>
          <View style={styles.header}>
            <ThemedText type="subtitle">{t("tabs.challenges.title")}</ThemedText>
            <Pressable aria-label="Create new challenge button" 
                        style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.createChallengeButton]}
                        onPress={() => createChallenge()}>
              <MaterialIcons name="add" size={24} color="white" />
              <ThemedText type="buttonText">{t("tabs.challenges.createButton")}</ThemedText>
            </Pressable>
          </View>
          
          <View style={styles.challengeIconsContainer}>
            <View style={styles.challengeIcon}>
              <ChallengeIcon type="complete" />
              <ThemedText style={{ fontSize: 12 }}>{t("tabs.challenges.completed")}</ThemedText>
            </View>
            <View style={styles.challengeIcon}>
              <ChallengeIcon type="incomplete" />
              <ThemedText style={{ fontSize: 12 }}>{t("tabs.challenges.notCompleted")}</ThemedText>
            </View>
            <View style={styles.challengeIcon}>
              <ChallengeIcon type="repeatable" />
              <ThemedText style={{ fontSize: 12 }}>{t("tabs.challenges.repeatable")}</ThemedText>
            </View>
            
          </View>
          {deleteChallengesError && <ThemedText>{deleteChallengesError.message}</ThemedText>}

          <View style={styles.deleteButtonsContainer}>
            <Pressable aria-label="Delete challenges button" 
              style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.createChallengeButton, { paddingHorizontal: 12, height: 44, minWidth: 80 }]}
              onPress={() => handleToggleDeleteMode()}>
              <ThemedText type="buttonText">{deleteMode ? t("tabs.challenges.cancel") : t("tabs.challenges.editButton")}</ThemedText>
            </Pressable>
            {deleteMode && 
              <Animated.View 
                entering={ FadeInLeft.duration(100).delay(200).easing(Easing.inOut(Easing.linear))}
                exiting={FadeOutLeft.duration(100).easing(Easing.inOut(Easing.linear))}>
                  <Pressable aria-label="Delete challenges button" 
                    style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.createChallengeButton, { paddingHorizontal: 12, height: 44, width: 80, backgroundColor: theme.colors.card }]}
                    onPress={() => handleDeleteChallenges(ids)}>
                    <ThemedText type="buttonText" style={{color: "#ff2c2c", fontFamily: "PoppinsSemiBold"}}>{t("tabs.challenges.deleteButton")}</ThemedText>
                  </Pressable>
              </Animated.View>
            }
          </View>

          <SectionList 
            sections={DATA}
            keyExtractor={item => item?.id ?? ""}
            contentContainerStyle={globalStyles.challengesSectionList}
            style={globalStyles.challengeList}
            ItemSeparatorComponent={HorizontalRule}
            initialNumToRender={8}
            stickyHeaderHiddenOnScroll={false}
            scrollEnabled
            renderItem={({ item }) => {
              if (item === null) {
                return null; // fallback check in case item is null or something unintended
              }
              return <View>
                        <Pressable style={[{ backgroundColor: ids.includes(item.id) ? theme.colors.background : "" }, globalStyles.challenge]} 
                                  onPress={() => { 
                                    if (!deleteMode) {
                                      openChallenge(item)
                                    }; 
                                    {deleteMode && handleSelectChallenge(item)}
                                  }}>
                          <View style={globalStyles.challengeItem}>
                            <ChallengeIcon type={item.done ? "complete" : "incomplete"} />
                            <ThemedText type="challengeTitle" style={{color: item?.done === false ? "#5a5a5aff" : theme.colors.text }}>
                              {item?.challenge.title}
                            </ThemedText>
                          </View>
                          {deleteMode && <Pressable onPress={() => handleDeleteChallenge(item.id)} >
                                            <ChallengeIcon type="remove" />
                                          </Pressable>}
                        </Pressable>
                    </View>
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ paddingVertical: 14, paddingHorizontal: 8, backgroundColor: theme.colors.card, borderRadius: 8, overflow: "hidden" }}>
                <ThemedText style={{fontFamily: "PoppinsMedium"}}>{title}</ThemedText>
              </View>
            )}
          />
        </View>
      </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    marginBottom: 20
  },
  challengeIconsContainer: {
    flexDirection: "row", 
    alignItems: "flex-start", 
    alignSelf: "flex-start", 
    justifyContent: "center", 
    gap: 6, 
    marginBottom: 20
  },
  challengeIcon: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 4
  },
  deleteButtonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8
  }
});