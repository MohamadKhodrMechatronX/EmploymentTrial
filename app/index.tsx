import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";

import AppNavigator from "../src/navigation/AppNavigator";
import { storage } from "../src/core/storage";
import { setTokenAndBootstrap } from "../src/core/bootstrap";

const AUTH_TOKEN = "c95e90bcda5c440f2c364fe7f3370a43";

export default function App() {
  const [ready, setReady] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const flyout = await storage.getUserFlyout();
        if (!flyout) {
          await setTokenAndBootstrap(AUTH_TOKEN);
        }
      } catch (err: any) {
        console.error("Bootstrap failed:", err);
        setErrMsg(
          err?.response?.status === 401
            ? "Unauthorized (401): token invalid or not sent."
            : "Bootstrap failed. Check network or API."
        );
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (errMsg) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Text style={{ textAlign: "center" }}>{errMsg}</Text>
        <Text style={{ marginTop: 8, opacity: 0.7 }}>
          Tip: open Metro logs and confirm the interceptor printed a non-empty {`auth_token`} value.
        </Text>
      </View>
    );
  }

  return <AppNavigator />;
}