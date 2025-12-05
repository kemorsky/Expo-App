import { useGlobalStyles } from "@/styles/globalStyles";
import { View } from "react-native"

type ContainerProps = {
    children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
    const globalStyles = useGlobalStyles();
    
    return (
        <View style={globalStyles.container}>
            {children}
        </View>
    )
}