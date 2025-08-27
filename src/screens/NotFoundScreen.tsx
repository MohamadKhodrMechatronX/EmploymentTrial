import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/AppNavigator";

type R = RouteProp<RootStackParamList, "NotFound">;

export default function NotFoundScreen() {
  const { params } = useRoute<R>();
  const q = params?.q;

  return (
    <View style={s.wrap}>
      <Text style={s.title}>404 • Not Found</Text>
      <Text style={s.sub}>
        {q ? `No results for: ${q}` : "The page you’re looking for doesn’t exist."}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 },
  sub: { color: "#ddd", fontSize: 14 },
});