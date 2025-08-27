import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "../components/Header";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import SideMenuScreen from "../screens/SideMenuScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

export type RootStackParamList = {
  Playlists: undefined;
  Song: { id?: string } | undefined;
  ChatPopup: undefined;
  SideMenu: undefined;
  NotFound: { q?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Playlists"
      screenOptions={{
        header: ({ navigation, route, options, back }) => (
          <Header/>
        ),
      }}
    >
      <Stack.Screen name="SideMenu" component={SideMenuScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Playlists" component={PlaylistsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}