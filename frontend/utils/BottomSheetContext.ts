import { UserChallenge } from "@/__generated__/graphql";
import { BottomSheetController } from "@/components/shared/BottomSheet";
import { createContext } from "react";

export type BottomSheetMode = "viewChallenge" | "createChallenge" | null;

export type BottomSheetState = {
  mode: BottomSheetMode;
  challenge: UserChallenge | null;
};

export const BottomSheetContext = createContext({ // determines the content of the bottom sheet
    state: { mode: null, challenge: null } as BottomSheetState, // stores data in state that can be updated (previous version was a static, frozen version of data)
    setState: (_: BottomSheetState) => {},
    controller: null as BottomSheetController | null,
});