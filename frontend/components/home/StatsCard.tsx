import { View } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";

type StatsCardProps = {
    children: React.ReactNode;
};

export const StatsCard = ({ children }: StatsCardProps) => {
    const globalStyles = useGlobalStyles();

    return (
        <View style={globalStyles.statsCard}>
            {children}
        </View>
    )
};