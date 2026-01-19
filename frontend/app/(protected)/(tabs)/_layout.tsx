import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeConfig } from '@/hooks/useThemeConfig';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { theme } = useThemeConfig();
  const { t } = useTranslation();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.notification,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {
              height: 60,
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 8,
              paddingRight: 8
            },
          }),
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: t('tabs.tabHome'),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color}/>,
          }}
        />
        <Tabs.Screen
          name="challenges"
          options={{
            title: t('tabs.tabChallenges'),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t('tabs.tabSettings'),
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
          }}
        />
      </Tabs>
  );
}