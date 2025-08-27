import React, { useState } from "react";
import { Modal, Pressable, View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useActiveChannel, setActiveChannelId } from "../core/channel";
import { Ionicons, Feather } from "@expo/vector-icons";

const CHANNELS = [
    { id: "global", name: "Global" },
    { id: "music", name: "Music" },
];

type Props = {
    open: boolean;
    onClose: () => void;
    user?: { name?: string; email?: string };
};

export default function UserFlyout({ open, onClose, user }: Props) {
    const nav = useNavigation<any>();
    const [showSwitch, setShowSwitch] = useState(false);

    const { channelId } = useActiveChannel();

    const go = (q: string) => {
        onClose();
        nav.navigate("NotFound", { q });
    };

    return (
        <Modal transparent animationType="fade" visible={open} onRequestClose={onClose}>
            <Pressable style={S.backdrop} onPress={onClose} />

            <View style={S.card}>
                <Text style={S.email}>{user?.email ?? "user@example.com"}</Text>

                <View style={S.headerRow}>
                    <View style={S.avatar}>
                        <Text style={S.avatarTxt}>{(user?.name ?? "User").charAt(0).toUpperCase()}</Text>
                    </View>
                    <Pressable onPress={() => go("profile")} style={S.viewProfile}>
                        <Text style={S.viewProfileTxt}>View Profile</Text>
                        <Feather name="external-link" size={14} color="#ddd" style={{ marginLeft: 4 }} />
                    </Pressable>
                </View>

                <View style={S.activeRow}>
                    <Text style={S.activeLabel}>Active:</Text>
                    <Text style={S.activeValue}>{channelId || "…"}</Text>
                    <Pressable onPress={() => setShowSwitch(true)} style={S.changeBtn}>
                        <Text style={S.changeTxt}>Change</Text>
                    </Pressable>
                </View>

                <View style={S.hr} />

                <View style={{ marginTop: 6 }}>
                    <MenuItem
                        icon={<Text style={{ fontSize: 18 }}>✅</Text>}
                        label="Licenses & Downloads"
                        onPress={() => go("licenses")}
                    />
                    <MenuItem
                        icon={<Ionicons name="bookmark" size={18} color="#fff" />}
                        label="My Playlists"
                        onPress={() => go("playlists")}
                    />
                    <MenuItem
                        icon={<Text style={{ fontSize: 18 }}>🔥</Text>}
                        label="Trackfluencer"
                        onPress={() => go("trackfluencer")}
                    />
                    <MenuItem
                        icon={<Ionicons name="trophy-outline" size={18} color="#fff" />}
                        label="Points"
                        onPress={() => go("points")}
                    />
                    <MenuItem
                        icon={<Feather name="settings" size={18} color="#fff" />}
                        label="Settings"
                        onPress={() => go("settings")}
                    />
                    <MenuItem
                        icon={<Feather name="log-out" size={18} color="#ff5b5b" />}
                        label="Logout"
                        onPress={() => go("logout")}
                        destructive
                    />
                </View>
            </View>

            <Modal transparent animationType="slide" visible={showSwitch} onRequestClose={() => setShowSwitch(false)}>
                <Pressable style={S.backdrop} onPress={() => setShowSwitch(false)} />
                <View style={S.sheet}>
                    <Text style={S.sheetTitle}>Switch Channel</Text>
                    <FlatList
                        data={CHANNELS}
                        keyExtractor={(c) => c.id}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[S.row, item.id === channelId && S.rowActive]}
                                onPress={() => {
                                    setActiveChannelId(item.id);
                                    setShowSwitch(false);
                                    requestAnimationFrame(onClose);
                                }}
                            >
                                <Text style={S.rowText}>
                                    {item.name}
                                </Text>
                            </Pressable>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    />
                </View>
            </Modal>
        </Modal>
    );
}

function MenuItem({
    icon,
    label,
    onPress,
    destructive,
}: {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    destructive?: boolean;
}) {
    return (
        <Pressable style={S.item} onPress={onPress}>
            <View style={S.itemIcon}>{icon}</View>
            <Text style={[S.itemText, destructive && { color: "#ff5b5b" }]}>{label}</Text>
        </Pressable>
    );
}

const S = StyleSheet.create({
    backdrop: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" },

    card: {
        position: "absolute",
        right: 12,
        top: 72,
        width: 300,
        backgroundColor: "#101010",
        borderRadius: 18,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },

    email: { color: "#cfcfcf", fontSize: 12, alignSelf: "flex-end", marginBottom: 8 },

    headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    avatar: {
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: "#5f7aa0",
        alignItems: "center", justifyContent: "center",
    },
    avatarTxt: { color: "#fff", fontWeight: "700", fontSize: 22 },

    viewProfile: { marginLeft: 10, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8 },
    viewProfileTxt: { color: "#ddd", fontSize: 12, fontWeight: "600" },

    addBtn: {
        marginTop: 10,
        alignSelf: "flex-start",
        borderWidth: 1, borderColor: "#bbb",
        paddingVertical: 8, paddingHorizontal: 14,
        borderRadius: 10,
        flexDirection: "row", alignItems: "center",
    },
    addBtnTxt: { color: "#fff", fontWeight: "700" },

    activeRow: { marginTop: 10, flexDirection: "row", alignItems: "center" },
    activeLabel: { color: "#a9a9a9", fontSize: 12 },
    activeValue: { color: "#fff", fontSize: 12, marginLeft: 6, fontWeight: "600" },
    changeBtn: { marginLeft: 8, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, backgroundColor: "#1b1b1b" },
    changeTxt: { color: "#9fd3ff", fontSize: 12, fontWeight: "600" },

    hr: { height: StyleSheet.hairlineWidth, backgroundColor: "#2a2a2a", marginVertical: 12 },

    item: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
    itemIcon: { width: 28, alignItems: "center", marginRight: 8 },
    itemText: { color: "#f1f1f1", fontSize: 15, fontWeight: "600" },

    sheet: {
        position: "absolute", left: 0, right: 0, bottom: 0,
        backgroundColor: "#101010",
        padding: 16,
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        maxHeight: "60%",
    },
    sheetTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 10 },
    row: { padding: 12, backgroundColor: "#171717", borderRadius: 12 },
    rowActive: { backgroundColor: "#222", borderWidth: 1, borderColor: "#3a3a3a" },
    rowText: { color: "#fff" },
});