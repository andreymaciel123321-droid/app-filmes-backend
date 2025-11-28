import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API from '../services/API';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega dados do usuário logado
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Erro", "Nenhum token encontrado. Faça login novamente.");
        navigation.replace("Login");
        return;
      }

      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.user);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar seu perfil.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace("Login");
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Erro ao carregar perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Meu Perfil</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Assinatura:</Text>
      <Text style={styles.value}>
        {user.isPremium ? "ATIVA ✔" : "INATIVA ✖"}
      </Text>

      {!user.isPremium && (
        <TouchableOpacity style={styles.button} onPress={() => {
          Alert.alert("Pagamento", "Redirecionando para o pagamento...");
          navigation.navigate("Payment");
        }}>
          <Text style={styles.buttonText}>Ativar Premium</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  loading: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: "center"
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 15,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0f0",
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#900",
    padding: 15,
    marginTop: 40,
    borderRadius: 10,
  },
  logoutText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
  
