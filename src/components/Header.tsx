import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {Image, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import { useActiveChannel } from "../core/channel";
import { storage, type UserFlyout as UserFlyoutType } from "../core/storage";
import UserFlyout from "./UserFlyout";
    
type Props = {  
  title?: string;
  showBack?: boolean;
};

export default function Header({ title, showBack }: Props) {
  const nav = useNavigation<any>();
  const { channelId } = useActiveChannel(); 
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [user, setUser] = useState<UserFlyoutType | null>(null);

  useEffect(() => {
    (async () => {
      const u = await storage.getUserFlyout();
      setUser(u);
    })();
  }, []);

  const openMenu = () => nav.navigate("SideMenu");
  const onBell = () => nav.navigate("NotFound", { q: "notifications" });

  const initial = useMemo(() => {
    const name = user?.profile_name?.trim();
    if (name && name.length > 0) return name[0]!.toUpperCase();
    const email = user?.email?.trim();
    if (email && email.length > 0) return email[0]!.toUpperCase();
    return "U";
  }, [user]);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.wrapper}>
        <View style={s.left}>
          {showBack ? (
            <Pressable onPress={() => nav.goBack()} hitSlop={12} style={s.iconBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </Pressable>
          ) : (
            <View style={s.logoRow}>
              <Image
                source={require("../../assets/images/thematic_mark.png")}
                style={s.logo}
                resizeMode="contain"
              />
              <Text style={s.brand}>THEMATIC</Text>
            </View>
          )}

          <Pressable onPress={openMenu} hitSlop={12} style={[s.iconBtn, { marginLeft: spacing.lg }]}>
            <Ionicons name="menu" size={24} color="#fff" />
          </Pressable>
        </View>

        {title ? <Text style={s.title}>{title}</Text> : <View style={{ flex: 1 }} />}

        <View style={s.right}>

          <Pressable onPress={onBell} hitSlop={12} style={[s.iconBtn, { marginLeft: spacing.lg }]}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </Pressable>

          <Pressable onPress={() => setFlyoutOpen(true)} hitSlop={12} style={s.avatarWrap}>
            <View style={s.avatarBorder}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{initial}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <UserFlyout
        open={flyoutOpen}
        onClose={() => setFlyoutOpen(false)}
        user={{ name: user?.profile_name, email: user?.email }}
      />
    </SafeAreaView>
  );
}

const BAR_H = 60;

const spacing = {
  sm: 8,
  lg: 16,
};

const radius = {
  sm: 8,
  pill: 9999,
};

const s = StyleSheet.create({
  safe: {
    backgroundColor: "#0e0f16",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
  },
  wrapper: {
    height: BAR_H,
    backgroundColor: "#0e0f16",
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  left: { flexDirection: "row", alignItems: "center" },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logo: { width: 26, height: 26, marginRight: spacing.sm },
  brand: { color: "#fff", letterSpacing: 2, fontWeight: "700" },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  right: { marginLeft: "auto", flexDirection: "row", alignItems: "center" },
  iconBtn: { padding: 6, borderRadius: radius.sm },

  channelPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#111a22",
    borderWidth: 1,
    borderColor: "#284b63",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  channelText: { color: "#9fd3ff", fontSize: 12, fontWeight: "700" },

  avatarWrap: { marginLeft: spacing.lg },
  avatarBorder: {
    padding: 2,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: "#c6ff4a",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: "#5a4238",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "700" },
});