// src/navigation/AppNavigator.tsx
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import React from "react";

import Header from "../components/Header";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import SideMenuScreen from "../screens/sideMenuScreen";

export type RootStackParamList = {
  Playlists: undefined;
  Song: { id?: string };
  ChatPopup: undefined;
  SideMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Playlists"
      screenOptions={{
        header: (props: NativeStackHeaderProps) => {
          const title = props.options.title ?? props.route.name;
          return <Header/>;
        },
      }}
    >
      <Stack.Screen
        name="Playlists"
        component={PlaylistsScreen}
      />
      <Stack.Screen
        name="SideMenu"
        component={SideMenuScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}