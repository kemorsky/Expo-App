import { StyleSheet, View, Pressable, FlatList } from "react-native";
import { useMe } from "@/api/user/userQueries";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/formatDate";
import { useGlobalStyles } from "@/styles/globalStyles";
import { Wrapper } from "@/components/shared/Wrapper";
import { ThemedText } from "@/components/shared/ThemedText";
import { Container } from "@/components/shared/Container";
import { StatsCard } from "@/components/home/StatsCard";
import React, { useState } from "react";
import ChallengeDoneModal from "@/components/challenges/ChallengeDoneModal";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import HomePageSkeleton from "@/components/skeleton/pages/HomePageSkeleton";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [openModal, setOpenModal] = useState(false);
  const { user, loading, error } = useMe();
  const globalStyles = useGlobalStyles();
  const { t } = useTranslation();

  if (!user || loading) return <HomePageSkeleton />;

  const date = new Date();

  const completedChallenges = user.challenges?.filter((challenge) => challenge?.done === true).length || 0;
  const createdChallenges = user.challenges?.filter((challenge) => challenge?.challenge.isPredefined === false).length || 0;
  const currentChallenge = user.challenges?.find((challenge) => challenge?.currentChallenge === true)
  const recentChallenges = user.challenges?.filter((ch) => ch?.done === true).sort((a, b) => new Date(b?.completedAt).getTime() - new Date(a?.completedAt).getTime()).slice(0, 5)
  const unavailableChallenges = user.challenges?.filter((challenge) => challenge?.done === false).length === 0;

  if (!user.settings?.numberOfChallengesPerDay) return;

  const isDisabled = user.assignmentsToday >= user.settings?.numberOfChallengesPerDay;

  return (
    <Wrapper>
      <ChallengeDoneModal openModal={openModal} setOpenModal={setOpenModal}/>
      <View style={globalStyles.welcomeCard}>
        <Container>
          <ThemedText style={{alignSelf: "center"}} type="title">{t("home.welcome")}, {user.name}!</ThemedText>
        </Container>
        <Container>
          <View style={styles.cardTitleContainer}>
              <ThemedText type="date">{formatDate(date.toString())}</ThemedText>
          </View>
          <View style={[globalStyles.card, {gap: 32, backgroundColor: "transparent", flexDirection: "column", justifyContent: "flex-start", padding: 0, paddingBottom: 8}]}>
            {currentChallenge ? (
              <>
                <ThemedText style={{ maxWidth: 300 }} type="challenge">{currentChallenge.challenge.title}</ThemedText>
                <Pressable style={globalStyles.buttonAction} onPress={() => setOpenModal(true)}>
                  <ThemedText>{t("home.challengeCard.markAsDoneButton")}</ThemedText>
                </Pressable>
              </>
            ) : (
              <>
                <ThemedText type="challenge">{!isDisabled ? t("home.challengeCard.noActiveChallenge") : t("home.challengeCard.dailyQuota")}</ThemedText>      
                { unavailableChallenges && <ThemedText>{t("home.challengeCard.noChallengesAvailable")}</ThemedText> }     
                <Link href="/home/accept-challenge" push asChild>
                  {isDisabled ? (
                    <Pressable style={globalStyles.buttonDisabled}
                                aria-label="Get a new challenge button">
                      <ThemedText type="buttonText" style={{color: "#000000"}}>{t("home.challengeCard.getChallengeButton")}</ThemedText>                     
                    </Pressable>
                  ) : (
                    <Pressable style={{
                      ...globalStyles.buttonAction,
                      ...(isDisabled || unavailableChallenges ? globalStyles.buttonDisabled : {}),
                    }}
                    aria-label="Get a new challenge button">
                      <ThemedText type="buttonText">
                        {(user.assignmentsToday ?? 1) >= 1 
                        ? t("home.challengeCard.getAnotherChallengeButton") 
                        : t("home.challengeCard.getChallengeButton")}
                      </ThemedText>
                  </Pressable>
                  )}
                </Link>
              </>
            )}
          </View>
        </Container>
      </View>
      <Container>
        <ThemedText type="subtitle">{t("home.subtitles.stats")}</ThemedText>
          <View style={styles.statsContainer}>
            <View style={{flexDirection: "row", justifyContent: "space-between", gap: 12}}>
              <StatsCard>
                <ThemedText type="statTitle">{t("home.stats.completedChallenges")}</ThemedText>
                <ThemedText type="statValue">{ completedChallenges }</ThemedText>
              </StatsCard>
              <StatsCard>
                <ThemedText type="statTitle">{t("home.stats.createdChallenges")}</ThemedText>
                <ThemedText type="statValue">{ createdChallenges }</ThemedText>
              </StatsCard>
            </View>
          </View>
      </Container>
      <Container>
        <ThemedText type="subtitle">{t("home.subtitles.previousChallenges")}</ThemedText>
        <View style={[globalStyles.card, { minHeight: 128, paddingVertical: 0 }]}>
          {completedChallenges > 0 ? (
            <FlatList
              data={recentChallenges}
              maxToRenderPerBatch={5}
              ItemSeparatorComponent={HorizontalRule}
              scrollEnabled={false}
              renderItem={({ item }) => {
                  return <View style={styles.previousChallenge}>
                              <View style={styles.previousChallengeTitle}>
                                <ThemedText type="date" style={{ fontSize: 14 }}>{formatDate(item?.completedAt ?? "")}</ThemedText>
                              </View>
                              <ThemedText>{item?.challenge.title}</ThemedText>
                          </View>
              }}
              keyExtractor={item => item?.id ?? ""}
            />
            ) : (
              <ThemedText style={{paddingVertical: 8}}>{t("home.previousChallenges.noChallenges")}</ThemedText>
            )}
        </View>
      </Container>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  cardTitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardContentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
   ChallengeList: {
    backgroundColor: "#dbdbdbff",
    paddingHorizontal: 8,
    flexDirection: "column",
    borderRadius: 8,
  },
  stepContainer: {
    gap: 6,
  },
  previousChallenge: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    paddingVertical: 8,
  },
  previousChallengeTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsContainer: {
    flexDirection: "column",
    gap: 8,
  },
});