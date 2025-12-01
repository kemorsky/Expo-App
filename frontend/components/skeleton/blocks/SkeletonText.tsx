import React from "react";
import { Skeleton } from "moti/skeleton";
import { DimensionValue, useColorScheme } from "react-native";

export type SkeletonTextProps = {
  width?: DimensionValue;
  height: number;
};

export const SkeletonText = ({ width = "100%", height }: SkeletonTextProps) => {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <Skeleton
      colorMode={colorMode}
      width={width}
      height={height}
    />
  );
};