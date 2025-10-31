import { StyleSheet } from 'react-native';
import { theme } from './themes';

export const globalStyles = StyleSheet.create({
    headerImage: {
        color: '#fafafa',
        bottom: -70,
        left: -25,
        position: 'absolute'
    },
    container: {
        minHeight: "100%",
        flexDirection: "column",
        backgroundColor: '#c5c5c5',
        gap: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8
    },
    title: {
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: 32
    },
    subtitle: {
        color: theme.colors.text,
        fontWeight: '700',
        fontSize: 14
    },
    date: {
        color: '#808080',
        fontWeight: 'normal',
        fontSize: 14
    },
    input: {
        backgroundColor: theme.colors.background,
        height: 54,
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        fontSize: 16
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
