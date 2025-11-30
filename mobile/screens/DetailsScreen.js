import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.cover }} style={styles.cover} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.sinopse}>{movie.sinopse}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Player", { link: movie.video })}
      >
        <Text style={styles.buttonText}>Assistir agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 10 },
  cover: { width: "100%", height: 300, borderRadius: 10 },
  title: { color: "#fff", fontSize: 24, marginVertical: 10 },
  sinopse: { color: "#ccc", fontSize: 16 },
  button: {
    backgroundColor: "#e50914",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 18 }
});
    
