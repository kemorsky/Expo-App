import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    background: Colors.dark.wrapperBackground,
    text: Colors.dark.text,
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.wrapperBackground,
    text: Colors.light.text,
  },
};

export function useThemeConfig() {
  const colorScheme = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}