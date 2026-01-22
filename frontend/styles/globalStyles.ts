import { StyleSheet } from "react-native";
import { useThemeConfig } from "@/hooks/useThemeConfig";

export const useGlobalStyles = () => {
    const { theme } = useThemeConfig();
    return StyleSheet.create({
        // global
        wrapper: {
            width: "100%",
            backgroundColor: theme.colors.background,
            flex: 1,
            minHeight: 752,
            paddingBottom: 80,
        },
        card: {
            backgroundColor: theme.colors.card,
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: 8,
            borderRadius: 8
        },
        headerImage: {
            color: "#fafafa",
            bottom: -70,
            left: -25,
            position: "absolute"
        },
        container: {
            padding: 12,
            width: "100%",
            flexDirection: "column",
            gap: 12,
        },
        titleContainer: {
            flexDirection: "row",
            gap: 8
        },
        input: {
            backgroundColor: "#fff",
            height: 54,
            width: "100%",
            borderWidth: 1,
            borderRadius: 4,
            padding: 12,
            fontSize: 16,
            fontFamily: "PoppinsRegular"
        },
        showPasswordIcon: {
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            width: 40,
            top: "40%", 
            right: 12
        },
        horizontalRule: {
            borderBottomWidth: 1,
            borderColor: theme.colors.border
        },
        buttonAction: {
            height: 40,
            justifyContent: "center",
            alignSelf: "flex-end",
            padding: 8,
            borderRadius: 8,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: theme.colors.primary,
            pointerEvents: "auto"
        },

        // onboarding

        onboardingPage: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        onboardingWrapper: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 24
        },

        // paginator
        
        paginator: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            paddingHorizontal: 12
        },
        dot: {
            height: 20,
            width: 20,
            borderRadius: 999,
            backgroundColor: "rgb(91, 148, 255)"
        },
        cycleThroughButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 8,
            borderRadius: 8,
        },
        skipButton: {
            width: 150, 
            alignItems: "center", 
            alignSelf: "center",  
            padding: 12, 
            marginTop: 24,
            borderRadius: 8
        },

        // statsCard

        statsCard: {
            backgroundColor: theme.colors.card,
            width: 170, 
            height: 80, 
            padding: 8, 
            justifyContent: "space-between",
            borderRadius: 8, 
        },

        // home

        welcomeCard: {
            flexDirection: "column", 
            gap: 28, 
            backgroundColor: theme.colors.card, 
            borderBottomRightRadius: 16, 
            borderBottomLeftRadius: 16, 
            borderBottomWidth: 1, 
            borderBottomColor: theme.colors.border,
        },
        buttonDisabled: {
            height: 40,
            justifyContent: "center",
            alignSelf: "flex-end",
            padding: 8,
            borderRadius: 4,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "rgb(148, 148, 148)",
            pointerEvents: "none"
        },

        // accept-challenge

        notTodayButton: {
            height: 40,
            width: 120,
            justifyContent: "center",
            alignSelf: "flex-end",
            alignItems: "center",
            padding: 8,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#375375",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        acceptButton: {
            height: 40,
            width: 120,
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            alignSelf: "flex-end",
            alignItems: "center",
            padding: 8,
            borderRadius: 4,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },

        // mark challenge as done modal

        modalContainer: {
            position: "absolute",
            top: 120,
            height: "100%",
            width: "100%",
            backgroundColor: theme.colors.card,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 30,
            borderRadius: 8,
            padding: 12,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalHeader: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        modalTitle: {
            gap: 6
        },


        // challenges

        createChallengeButton: {
            backgroundColor: theme.colors.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: 8,
            borderRadius: 8
        },
        challengesContainer: {
            width: "100%",
            flexDirection: "column",
            gap: 8
        },
        challengeList: {
            backgroundColor: theme.colors.card,
            paddingHorizontal: 8,
            flexDirection: "column",
            borderRadius: 8,
        },
        challenge: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
        },
        challengeItem: {
            flexDirection: "row",
            gap: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        challengesSectionList: {
            backgroundColor: theme.colors.card,
            paddingHorizontal: 8,
            flexDirection: "column",
            borderRadius: 8,
        },

        // settings

        settingsList: {
            backgroundColor: theme.colors.card,
            flexDirection: "column",
            borderRadius: 8,
            overflow: "hidden"
        },
        setting: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 8,
        },
        userRundown: {
            backgroundColor: theme.colors.card,
            padding: 8,
            flexDirection: "column",
            gap: 12,
            borderRadius: 8,
        },
        buttonSignOut: {
            width: 120, 
            alignItems: "center", 
            backgroundColor: theme.colors.primary,
            justifyContent: "center", 
            alignSelf: "center", 
            padding: 8, 
            borderRadius: 8,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },

        buttonSignIn: {
            width: 240,
            height: 54,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 6,
            paddingVertical: 4,
            backgroundColor: "#529c34ff",
            borderWidth: 1,
            borderColor: "#000000ff",
            borderRadius: 8,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
        },
        buttonSignUp: {
            width: 240,
            height: 54,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 6,
            paddingVertical: 4,
            backgroundColor: "#134200ff",
            borderWidth: 1,
            borderColor: "#000000ff",
            borderRadius: 8,
        },
        buttonText: {
            fontSize: 18,
            color: "#ffffffff",
        }
    })
}