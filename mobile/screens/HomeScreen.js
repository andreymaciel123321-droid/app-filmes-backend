import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";

export default function HomeScreen() {
  // Filmes de exemplo temporários
  const trendingData = [
    {
      id: 1,
      title: "Filme 1",
      poster: "https://i.imgur.com/1NqdYzP.jpeg",
      description: "Descrição do filme 1",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Filme 2",
      poster: "https://i.imgur.com/4AiXzf8.jpeg",
      description: "Descrição do filme 2",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  const actionData = [
    {
      id: 3,
      title: "Ação 1",
      poster: "https://i.imgur.com/1NqdYzP.jpeg",
      description: "Ação 1 desc",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      title: "Ação 2",
      poster: "https://i.imgur.com/4AiXzf8.jpeg",
      description: "Ação 2 desc",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Banner item={trendingData[0]} />

      {/* Linhas de filmes */}
      <MovieRow title="Populares" data={trendingData} />
      <MovieRow title="Ação" data={actionData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
      
