/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#212222";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    card: "#CCD5AE",
    tabTint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    wrapperBackground: "#E9EDC9", // #EEE5BF
    buttonBackground: "#2c1a1a",
    border: "#aaad8c"
  },
  dark: {
    text: "rgba(255, 255, 255, 0.9)",
    background: "#212c31ff",
    card: "#212934",
    tabTint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    wrapperBackground: "#151F2B",
    buttonBackground: "#9088ffff",
    border: "#293c53"
  },
};
