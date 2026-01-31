import { UserChallenge } from "@/__generated__/graphql";
import { BottomSheetController } from "@/components/shared/BottomSheet";
import { createContext } from "react";

export type BottomSheetState = {
  challenge: UserChallenge | null;
};

export const BottomSheetContext = createContext({ // determines the content of the bottom sheet
    state: { challenge: null } as BottomSheetState, // stores data in state that can be updated (previous version was a static, frozen version of data)
    setState: (_: BottomSheetState) => {},
    controller: null as BottomSheetController | null,
});