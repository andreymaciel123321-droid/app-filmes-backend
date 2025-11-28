import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API from "../services/API";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return navigation.replace("Login");

      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.user);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar os dados.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingArea}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Assinatura:</Text>
      <Text style={styles.value}>
        {user.isPremium ? "Premium Ativo" : "Gratuito"}
      </Text>

      {!user.isPremium && (
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.payButtonText}>Assinar Premium</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    color: "#aaa",
    fontSize: 18,
    marginTop: 10,
  },
  value: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: "#00ff5f",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  payButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
            
