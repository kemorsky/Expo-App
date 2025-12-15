import { StyleSheet } from 'react-native';
import { useThemeConfig } from '@/hooks/useThemeConfig';

export const useGlobalStyles = () => {
    const { theme } = useThemeConfig();
    return StyleSheet.create({
        // global
        wrapper: {
            width: '100%',
            backgroundColor: theme.colors.background,
            flex: 1,
            minHeight: 752,
            paddingBottom: 80,
        },
        card: {
            backgroundColor: theme.colors.card,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 8,
            borderRadius: 8
        },
        headerImage: {
            color: '#fafafa',
            bottom: -70,
            left: -25,
            position: 'absolute'
        },
        container: {
            padding: 12,
            width: '100%',
            flexDirection: 'column',
            gap: 12,
        },
        titleContainer: {
            flexDirection: 'row',
            gap: 8
        },
        input: {
            backgroundColor: '#fff',
            height: 54,
            width: "100%",
            borderWidth: 1,
            borderRadius: 4,
            padding: 16,
            fontSize: 16
        },

        // home

        buttonMarkAsDone: {
            height: 40,
            justifyContent: 'center',
            alignSelf: 'flex-end',
            padding: 8,
            borderWidth: 1,
            borderColor: '#000000ff',
            borderRadius: 4,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            backgroundColor: theme.colors.primary,
        },

        // mark challenge as done modal

        modalContainer: {
            position: 'absolute',
            top: 120,
            height: '100%',
            width: '100%',
            backgroundColor: theme.colors.card,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 30,
            borderRadius: 8,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalHeader: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        modalTitle: {
            gap: 6
        },


        // challenges

        createChallengeButton: {
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: 8,
            borderRadius: 8
        },
        challengesContainer: {
            width: '100%',
            flexDirection: 'column',
            gap: 8
        },
        challengeList: {
            backgroundColor: theme.colors.card,
            paddingHorizontal: 8,
            flexDirection: 'column',
            borderRadius: 8,
        },
        challenge: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8,
        },
        challengeItem: {
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center'
        },
        challengesSectionList: {
            backgroundColor: theme.colors.card,
            paddingHorizontal: 8,
            flexDirection: 'column',
            borderRadius: 8,
        },

        // settings

        settingsList: {
            backgroundColor: theme.colors.card,
            paddingHorizontal: 8,
            flexDirection: 'column',
            borderRadius: 8,
        },
        setting: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
        },
        userRundown: {
            backgroundColor: theme.colors.card,
            padding: 8,
            flexDirection: 'column',
            gap: 8,
            borderRadius: 8,
        },

        buttonLogin: {
            width: 180,
            height: 54,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 6,
            paddingVertical: 4,
            backgroundColor: "#529c34ff",
            borderWidth: 1,
            borderColor: "#000000ff",
            borderRadius: 8,
        },
        buttonSignUp: {
            width: 180,
            height: 54,
            alignItems: 'center',
            justifyContent: 'center',
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