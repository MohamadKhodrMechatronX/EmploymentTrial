import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("Songs");
  const [menuVisible, setMenuVisible] = useState(false);
  const nav = useNavigation<any>();

  const options = ["All", "Songs", "Photos", "Videos", "SFX"];

  const submit = () => {
    nav.navigate("NotFound", { q, scope });
    setMenuVisible(false);
  };

  return (
    <View style={s.wrapper}>

      <TextInput
        placeholder="Search..."
        placeholderTextColor={colors.muted}
        value={q}
        onChangeText={setQ}
        style={s.input}
      />
      <View style={s.left}>
        <Pressable
          onPress={() => setMenuVisible((v) => !v)}
          style={s.scopeBtn}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Scope: ${scope}`}
        >
          <Text style={s.scopeText}>{scope} ▾</Text>
        </Pressable>

        {menuVisible && (
          <View style={s.menu} pointerEvents="box-none">
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => {
                  setScope(opt);
                  setMenuVisible(false);
                }}
                hitSlop={6}
                accessibilityRole="button"
                style={({ pressed, hovered }) => [
                  s.menuItem,
                  (pressed || hovered) && { backgroundColor: colors.primary },
                ]}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      s.menuItemText,
                      (pressed) && { color: colors.white },
                    ]}
                  >
                    {opt}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <Pressable onPress={submit} style={s.btn}>
        <Ionicons name="search" size={18} color={colors.white} />
      </Pressable>
    </View>
  );
}

const colors = {
  muted: "#9aa0a6",
  white: "#ffffff",
  text: "#000000",
  surface: "#ffffffff",
  primary: "#6cff8eff",
};

const spacing = {
  sm: 8,
  md: 12,
  lg: 16,
};

const radius = {
  sm: 8,
  lg: 12,
  pill: 9999,
};

const s = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "visible",
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    position: "relative",
  },
  left: {
    position: "relative",
    marginRight: 8,
  },
  scopeBtn: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  scopeText: {
    color: colors.muted,
    fontWeight: "600",
  },
  menu: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
    marginTop: 6,
    zIndex: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    minWidth: 120,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  menuItemText: {
    color: colors.text,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderTopRightRadius: radius.lg,     
    borderBottomRightRadius: radius.lg,  
  },
});



