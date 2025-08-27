import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, Linking } from "react-native";
import SearchBar from "../components/SearchBar";

export default function SideMenuScreen() {
    const nav = useNavigation<any>();
    const onSubmit = (key: string) => nav.navigate("NotFound", { q: key });

    const LINKS = [
        { key: "home", label: "Home", icon: <Ionicons name="grid" size={18} color="#fff" /> },
        { key: "discover", label: "Discover", icon: <Ionicons name="search" size={18} color="#fff" /> },
        { key: "songs", label: "Songs", icon: <Ionicons name="musical-notes" size={18} color="#fff" /> },
        { key: "playlists", label: "Playlists", icon: <Entypo name="controller-play" size={18} color="#fff" />, route: "Playlists" },
        { key: "licenses", label: "✅ Licenses" },
        { key: "trackfluencer", label: "🔥 Trackfluencer" },
        { key: "points", label: "Points" },
        { key: "help", label: "Help Center" },
        { key: "how", label: "How it Works" },
        { key: "contact", label: "Contact Us" },
        { key: "login", label: "Login" },
        { key: "logout", label: "Logout" },
    ];

    const SOCIALS = [
        { key: "youtube", url: "https://www.youtube.com/hellothematic", icon: <Ionicons name="logo-youtube" size={22} color="#fff" /> },
        { key: "facebook", url: "https://www.facebook.com/hellothematic", icon: <Ionicons name="logo-facebook" size={22} color="#fff" /> },
        { key: "twitter", url: "https://x.com/hellothematic", icon: <Ionicons name="logo-twitter" size={22} color="#fff" /> },
        { key: "instagram", url: "https://www.instagram.com/hellothematic/", icon: <Ionicons name="logo-instagram" size={22} color="#fff" /> },
        { key: "tiktok", url: "https://www.tiktok.com/@hellothematic", icon: <Ionicons name="logo-tiktok" size={22} color="#fff" /> },
    ];


    const close = () => nav.goBack();
    const onLinkPress = (item: (typeof LINKS)[0]) => {
        if (item.route) {
            nav.navigate(item.route as any);
        } else {
            nav.navigate("NotFound", { q: item.key });
        }
    };
    const onSocialPress = (url: string) => Linking.openURL(url);

    return (
        <SafeAreaView style={s.safe}>
            <View style={s.headerRow}>
                <Pressable
                    style={s.logoRow}
                    onPress={() => Linking.openURL("https://hellothematic.com")}
                    hitSlop={8}
                >
                    <Image
                        source={require("../../assets/images/thematic_mark.png")}
                        style={s.logo}
                        resizeMode="contain"
                    />
                    <Text style={s.brand}>THEMATIC</Text>
                </Pressable>

                <Pressable onPress={close} hitSlop={12} style={s.closeBtn}>
                    <Ionicons name="close" size={26} color="#fff" />
                </Pressable>
            </View>

            <View style={s.socials}>
                {SOCIALS.map((scl) => (
                    <Pressable
                        key={scl.key}
                        onPress={() => onSocialPress(scl.url)}
                        style={s.socialBtn}
                        hitSlop={8}
                    >
                        {scl.icon}
                    </Pressable>
                ))}
            </View>

            <SearchBar />

            <FlatList
                data={LINKS}
                keyExtractor={(i) => i.key}
                ItemSeparatorComponent={() => <View style={s.sep} />}
                renderItem={({ item }) => (
                    <Pressable style={s.linkRow} onPress={() => onLinkPress(item)}>
                        <View style={s.iconBox}>{item.icon}</View>
                        <Text style={s.linkText}>{item.label}</Text>
                    </Pressable>
                )}
                contentContainerStyle={s.listContentCentered}
            />
        </SafeAreaView>
    );
}
const spacing = {
    small: 8,
    mid: 12,
    large: 16,
};

const radius = {
    small: 8,
    large: 28,
};

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#000" },
    socials: {
        paddingHorizontal: spacing.large,
        paddingBottom: spacing.large,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    socialBtn: { padding: 6, borderRadius: 8 },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.large,
        paddingTop: spacing.mid,
        paddingBottom: spacing.large,
    },
    brandRow: { flexDirection: "row", alignItems: "center" },
    brand: { color: "#fff", fontWeight: "700", letterSpacing: 2 },
    closeBtn: { marginLeft: "auto", padding: 6, borderRadius: radius.small },
    sep: { height: 1, backgroundColor: "#1a1a1a", marginLeft: spacing.large },
    logoRow: { flexDirection: "row", alignItems: "center" },
    logo: { width: 26, height: 26, marginRight: spacing.large },
    listContentCentered: {
        paddingBottom: 32,
        flexGrow: 1,
        justifyContent: "center",
    },

    linkRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
    },

    iconBox: {
        marginRight: 8,
        alignItems: "center",
    },

    linkText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});



