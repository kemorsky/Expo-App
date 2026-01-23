import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useThemeConfig } from "@/hooks/useThemeConfig";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "label" | "challenge" | "date" | "default" | "title" | "subtitle" | "challengeTitle" |
         "option" | "optionValue" | "statTitle" | "statValue" | "link" | "error" | "signInPageTexts" | "buttonText";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { theme } = useThemeConfig();
  const color = useThemeColor({ light: theme.colors.text, dark: theme.colors.text }, "text");

  return (
    <Text
      style={[
        { color },
        type === "label" ? styles.label : undefined,
        type === "challenge" ? styles.challenge : undefined,
        type === "date" ? styles.date : undefined,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "challengeTitle" ? styles.challengeTitle : undefined,
        type === "option" ? styles.option : undefined,
        type === "optionValue" ? styles.option : undefined,
        type === "statTitle" ? styles.statTitle : undefined,
        type === "statValue" ? styles.statValue : undefined,
        type === "link" ? styles.link : undefined,
        type === "error" ? styles.error : undefined,
        type === "signInPageTexts" ? styles.signInPageTexts : undefined,
        type === "buttonText" ? styles.buttonText : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: "PoppinsMedium"
  },
  challenge: {
    fontSize: 18,
    fontFamily: "PoppinsBold"
  },
  date: {
    color: "#808080",
    fontSize: 16,
    fontFamily: "PoppinsSemiBold"
  },
  default: {
    fontSize: 14,
    fontFamily: "PoppinsRegular"
  },
  title: {
    fontSize: 28,
    fontFamily: "MontserratBold"
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold"
  },
  challengeTitle: {
    maxWidth: 275,
    fontSize: 16,
    fontFamily: "PoppinsMedium"
  },
  option: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold"
  },
  optionValue: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold"
  },
  statTitle: {
    fontSize: 12,
    fontFamily: "PoppinsMedium"
  },
  statValue: {
    fontSize: 26,
    fontFamily: "PoppinsSemiBold"
  },
  link: {
    lineHeight: 30,
    fontSize: 18,
    color: "#0a7ea4",
  },
  error: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#f82a2a"
  },
  signInPageTexts: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#9372d1"
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#ffffff"
  }
});
