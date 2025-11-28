import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Banner({ item }) {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: item.poster }}
      style={styles.banner}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Details", { movie: item })}
        >
          <Text style={styles.buttonText}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 400,
    justifyContent: "flex-end",
  },
  overlay: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#E50914",
    padding: 10,
    borderRadius: 6,
    width: 130,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
        
