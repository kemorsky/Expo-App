import React from "react";
import { Skeleton } from "moti/skeleton";
import { useColorScheme } from "react-native";

type SkeletonCircleProps = {
  size?: number;
};

export const SkeletonCircle = ({ size = 50 }: SkeletonCircleProps) => {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <Skeleton colorMode={colorMode} width={size} height={size} radius="round" />
  );
};