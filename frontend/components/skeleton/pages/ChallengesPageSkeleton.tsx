import { StyleSheet, View } from "react-native";
import { Wrapper } from "@/components/shared/Wrapper";
import { Container } from "@/components/shared/Container";
import { ChallengeSkeleton } from "@/components/skeleton/blocks/ChallengesSkeleton";
import { SkeletonText } from "../blocks/SkeletonText";

export default function ChallengesPageSkeleton() {

  return (
    <Wrapper>
      <Container>
        <View style={styles.challengesContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <SkeletonText width="65%" height={24} />
            <SkeletonText width="60%" height={24} />
          </View>
          <ChallengeSkeleton />
        </View>
      </Container>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  challengesContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 8
  }
});
