import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MovieRow({ title, data }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.rowTitle}>{title}</Text>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Details", { movie: item })}
          >
            <Image source={{ uri: item.poster }} style={styles.poster} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  rowTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 8,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
          
