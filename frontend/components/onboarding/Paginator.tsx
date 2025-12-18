import { View, useWindowDimensions } from "react-native";
import { type PaginationProps } from "@/utils/pagination";
import PaginatorDot from "./PaginatorDot";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import { useGlobalStyles } from "@/styles/globalStyles";

export default function Paginator({ data, scrollX, scrollToNext, scrollToPrevious }: PaginationProps) {
    const { width } = useWindowDimensions();
    const globalStyles = useGlobalStyles();

    return (
        <View style={globalStyles.paginator}>
            <PreviousButton scrollToPrevious={scrollToPrevious} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 }}>
                {data.map((_, index) => {
                    return (
                        <PaginatorDot
                            key={index}
                            index={index}
                            width={width}
                            scrollX={scrollX}
                        />
                    );
                })}
            </View>
            <NextButton scrollToNext={scrollToNext} />
        </View>
    )
};