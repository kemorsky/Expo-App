import { View } from "react-native"
import { useGlobalStyles } from "@/styles/globalStyles"

export const HorizontalRule = () => {
    const globalStyles = useGlobalStyles();
    return (
        <View style={globalStyles.horizontalRule} />
    )
};