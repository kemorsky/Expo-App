import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

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
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

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
    fontFamily: 'RobotoBold'
  },
  date: {
    color: '#808080',
    fontSize: 18,
    fontFamily: 'RobotoSemiBold'
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
    fontFamily: 'RobotoSemiBold'
  },
  option: {
    fontSize: 16,
    fontFamily: 'RobotoSemiBold',
    color: '#0a7ea4',
  },
  link: {
    lineHeight: 30,
    fontSize: 18,
    color: '#0a7ea4',
  },
});
