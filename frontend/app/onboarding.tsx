import { useSaveOnboarding } from '@/lib/api/user/userMutations';
import { useState, useRef } from "react";
import { View, FlatList, ViewToken, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "@/utils/slides";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import OnboardingPage from "@/components/onboarding/OnboardingPage";
import Paginator from "@/components/onboarding/Paginator";
import { router } from "expo-router";
import { useGlobalStyles } from "@/styles/globalStyles";
import { ThemedText } from "@/components/ThemedText";

type Slides = {
    id: string;
    title: string;
    description: string;
    image: any;
}

export default function Onboarding() {
    const { saveOnboarding } = useSaveOnboarding();
    const globalStyles = useGlobalStyles();
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const scrollX = useSharedValue(0);
    const slideRef = useRef<FlatList<Slides>>(null)

    const handleOnboarding = async (onboarded: boolean) => {
        try {
            await saveOnboarding(onboarded)
            router.replace("/home");
        } catch (error) {
            throw new Error (`Error saving onboarding status: ${error}`)
        }
    };

    const itemChanges = useRef(
        ({ viewableItems }: {viewableItems: ViewToken[]}) => {
            if (viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index ?? 0)
            }
        }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const scrollToNext = () => {
        if (currentIndex < slides.length - 1) {
            slideRef.current?.scrollToIndex({ index: currentIndex + 1})
        } else {
            handleOnboarding(true);
        }
    }

    const scrollToPrevious = () => {
        if (currentIndex > 0) {
            slideRef.current?.scrollToIndex({ index: currentIndex - 1})
        }
    }

    const skipOnboarding = () => {
        handleOnboarding(true);
    };

    return (
        <SafeAreaView style={globalStyles.onboardingPage}>
            <View style={{ flex: 1, paddingVertical: 12 }}>
                <Animated.FlatList 
                        style={{ height: 600, flexGrow: 0, flexShrink: 0 }}
                        contentContainerStyle={{alignItems: "center" }}
                        data={slides}
                        renderItem={({ item }) => { return <OnboardingPage item={ item }/> }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={Platform.OS === "web" ? undefined : scrollHandler}
                        pagingEnabled
                        onViewableItemsChanged={itemChanges}
                        scrollEventThrottle={32}
                        ref={slideRef}
                        viewabilityConfig={viewConfig}
                        keyExtractor={item => item.id} />
                <Paginator data={slides} scrollX={scrollX} scrollToNext={scrollToNext} scrollToPrevious={scrollToPrevious} />
                <Pressable style={globalStyles.skipButton} onPress={skipOnboarding}>
                    <ThemedText type="subtitle">Skip</ThemedText>
                </Pressable>
            </View>
        </SafeAreaView>
    )
};