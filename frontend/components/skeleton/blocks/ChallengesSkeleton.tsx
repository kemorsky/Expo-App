// components/skeleton/UserProfileSkeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonText } from "./SkeletonText";
import { SkeletonCircle } from "./SkeletonCircle";

export const ChallengeSkeleton = () => {
  return (
    <View style={styles.sectionList}>
      <View>
        <SkeletonText width="50%" height={20} />
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
      </View>
      <View>
        <SkeletonText width="50%" height={20} />
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
        <View style={styles.challenge}>
            <View style={styles.challengeItem}>
                <SkeletonCircle size={24} />
                <SkeletonText width="90%" height={20} />
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  challengeList: {
    backgroundColor: "#dbdbdbff",
    paddingHorizontal: 8,
    flexDirection: "column",
    borderRadius: 8,
  },
  challenge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  challengeItem: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionList: {
    backgroundColor: "#dbdbdbff",
    paddingHorizontal: 8,
    flexDirection: "column",
    borderRadius: 8,
    paddingVertical: 8,
    gap: 20
  }
});
