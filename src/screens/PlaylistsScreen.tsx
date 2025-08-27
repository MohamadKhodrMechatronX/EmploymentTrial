import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {ActivityIndicator, FlatList, ImageBackground, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getProjects } from "../core/projectsApi";

type ApiProjectsResponse = {
  items: {
    id: number | string;
    name: string;
    project_songs_count?: number;
    art_file_url?: string | null;
    thumbnail_art_file_url?: string | null;
    user?: { profile_name?: string | null };
  }[];
  total?: number;
};

type Playlist = {
  id: string;
  title: string;
  cover?: string | null;
  count: number;
  author?: string;
};

function mapResponseToPlaylists(res: ApiProjectsResponse): { items: Playlist[]; total: number } {
  const list = Array.isArray(res?.items) ? res.items : [];
  const items: Playlist[] = list.map((p) => ({
    id: String(p.id),
    title: p.name ?? "Untitled",
    cover: p.thumbnail_art_file_url || p.art_file_url || null,
    count: p.project_songs_count ?? 0,
    author: p.user?.profile_name ?? "Thematic",
  }));
  return { items, total: Number(res?.total ?? items.length) };
}

function PlaylistCard({ item, onPress }: { item: Playlist; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {item.cover ? (
        <ImageBackground source={{ uri: item.cover }} style={styles.cardBg} imageStyle={styles.cardImg}>
          <View style={styles.badgesRow}><View style={styles.badge}><Text style={styles.badgeTxt}>{item.count} songs</Text></View></View>
          <View style={styles.cardFooter}>
            <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
            {!!item.author && <Text numberOfLines={1} style={styles.author}>by {item.author}</Text>}
          </View>
        </ImageBackground>
      ) : (
        <>
          <View style={[styles.cardBg, { alignItems: "center", justifyContent: "center" }]}>
            <Text numberOfLines={2} style={styles.fallbackTitle}>{item.title}</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
            {!!item.author && <Text numberOfLines={1} style={styles.author}>by {item.author}</Text>}
          </View>
        </>
      )}
    </Pressable>
  );
}

export default function PlaylistsScreen() {
  const nav = useNavigation<any>();
  const [items, setItems] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const LIMIT = 20;
  const offsetRef = useRef(0);
  const canLoadMore = useMemo(() => items.length < total, [items.length, total]);

  const loadPage = useCallback(async (reset = false) => {
    try {
      setError(null);
      if (reset) offsetRef.current = 0;
      const res = await getProjects({ limit: LIMIT, offset: offsetRef.current });
      const { items: mapped, total: t } = mapResponseToPlaylists(res);
      setTotal(t);
      setItems(prev => (reset ? mapped : [...prev, ...mapped]));
      offsetRef.current += mapped.length;
    } catch (e: any) {
      setError(e?.message ?? "Failed to load playlists");
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadPage(true);
      setLoading(false);
    })();
  }, [loadPage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPage(true);
    setRefreshing(false);
  }, [loadPage]);

  const onEndReached = useCallback(async () => {
    if (!loading && !refreshing && canLoadMore) await loadPage(false);
  }, [canLoadMore, loadPage, loading, refreshing]);

  if (loading && !refreshing) {
    return <SafeAreaView style={styles.center}><ActivityIndicator /></SafeAreaView>;
  }
  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={() => loadPage(true)}>
          <Text style={styles.retryTxt}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listPad}
        renderItem={({ item }) => (
          <PlaylistCard item={item} onPress={() => nav.navigate("PlaylistDetails", { id: item.id })} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReached}
        ListFooterComponent={canLoadMore ? <View style={{ padding: 16 }}><ActivityIndicator /></View> : null}
      />
    </SafeAreaView>
  );
}

const GAP = 12;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0b0b0b" },
  listPad: { padding: GAP },
  row: { gap: GAP, paddingBottom: GAP },
  card: { flex: 1, aspectRatio: 1, borderRadius: 16, overflow: "hidden", backgroundColor: "#1a1a1a" },
  cardBg: { flex: 1, justifyContent: "space-between" },
  cardImg: { resizeMode: "cover" },
  badgesRow: { flexDirection: "row", gap: 6, padding: 10 },
  badge: { backgroundColor: "rgba(0,0,0,0.55)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  badgeTxt: { color: "#fff", fontSize: 11 },
  cardFooter: { padding: 12, backgroundColor: "rgba(0,0,0,0.45)" },
  title: { color: "#fff", fontWeight: "600", fontSize: 15 },
  author: { color: "#d0d0d0", fontSize: 12, marginTop: 2 },
  retryBtn: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#ffffff22", borderRadius: 10 },
  retryTxt: { color: "#fff" },
  fallbackTitle: { color: "#fff", fontWeight: "700", fontSize: 16, textAlign: "center", paddingHorizontal: 8 },
});