import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function PlayerScreen({ route }) {
  const { link } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: link }} />
    </View>
  );
}
