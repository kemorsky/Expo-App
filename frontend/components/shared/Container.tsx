import { useGlobalStyles } from "@/styles/globalStyles";
import { View, ViewProps } from "react-native"

type ContainerProps = ViewProps & {
    children: React.ReactNode
}

export const Container = ({ children, style }: ContainerProps) => {
    const globalStyles = useGlobalStyles();
    
    return (
        <View style={[globalStyles.container, style]}>
            {children}
        </View>
    )
}