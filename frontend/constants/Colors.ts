/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    card: '#CCD5AE',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    wrapperBackground: '#E9EDC9', // #EEE5BF
    buttonBackground: 'rgb(0, 0, 0)',
    border: '#687076'
  },
  dark: {
    text: 'rgba(255, 255, 255, 0.9)',
    background: '#212c31ff',
    card: '#212934',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    wrapperBackground: '#151F2B',
    buttonBackground: '#9088ffff',
    border: '#686868'
  },
};
