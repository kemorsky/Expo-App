import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemeConfig } from "@/hooks/useThemeConfig";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'challenge' | 'date' | 'default' | 'title' | 'subtitle' | 'option' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { theme } = useThemeConfig();
  const color = useThemeColor({ light: theme.colors.text, dark: theme.colors.text }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'challenge' ? styles.challenge : undefined,
        type === 'date' ? styles.date : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'option' ? styles.option : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  challenge: {
    fontSize: 22,
    fontFamily: 'PoppinsBold'
  },
  date: {
    color: '#808080',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold'
  },
  default: {
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'MontserratBold'
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold'
  },
  option: {
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
    color: '#0a7ea4',
  },
  link: {
    lineHeight: 30,
    fontSize: 18,
    color: '#0a7ea4',
  },
});
