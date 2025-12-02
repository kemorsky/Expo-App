import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { SkeletonText } from "../blocks/SkeletonText";
import { View, StyleSheet, Pressable } from 'react-native';
import { HorizontalRule } from '@/components/HorizontalRule';

export default function SettingsPageSkeleton() {

  return (
    <Wrapper>
      <Container>
          <View style={styles.userRundown}>
            <SkeletonText width="45%" height={24} />
            <SkeletonText width="65%" height={24} />
            <SkeletonText width="65%" height={24} />
          </View>
      </Container>
      <Container>
          <SkeletonText width="35%" height={24} />
          <View style={styles.settingsList}>
              <Pressable style={styles.setting}>
                  <SkeletonText width="65%" height={25} />
              </Pressable>
              <HorizontalRule />
              <Pressable style={styles.setting}>
                  <SkeletonText width="65%" height={25} />
              </Pressable>
              <HorizontalRule />
              <Pressable style={styles.setting}>
                  <SkeletonText width="65%" height={25} />
              </Pressable>
          </View>
      </Container>
      <Container>
          <SkeletonText width="35%" height={24} />
          <View style={styles.settingsList}>
              <Pressable style={styles.setting}>
                  <SkeletonText width="65%" height={25} />
              </Pressable>              
              <HorizontalRule />           
              <Pressable style={styles.setting}>
                  <SkeletonText width="65%" height={25} />
              </Pressable>          
              <HorizontalRule />      
              <Pressable style={styles.setting}>
                  <SkeletonText width="65%" height={25} />
              </Pressable>
          </View>
      </Container>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  settingsList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  userRundown: {
    backgroundColor: '#dbdbdbff',
    padding: 8,
    flexDirection: 'column',
    gap: 8,
    borderRadius: 8,
  }
});
