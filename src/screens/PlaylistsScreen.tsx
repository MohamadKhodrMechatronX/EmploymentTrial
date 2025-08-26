import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function PlaylistsScreen() {
  return (
    <SafeAreaView style={s.container}>
      <View style={s.center}>
        <Text style={s.text}>Playlist screen</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: "#fff", fontSize: 18, fontWeight: "600" },
});