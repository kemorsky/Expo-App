import type { SharedValue } from "react-native-reanimated";

export type PaginationProps = {
    data: any[];
    scrollX: SharedValue<number>;
    scrollToNext: () => void;
    scrollToPrevious: () => void;
};

export type NextButtonProps = {
    scrollTo: () => void
}

export type OnboardingPageProps = {
    item: {
        id: string;
        image: any;
        title: string;
        description: string
    }
};

