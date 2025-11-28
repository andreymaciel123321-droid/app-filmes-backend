import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Linking } from "react-native";
import axios from "axios";
import API from "../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Erro", "Token inválido. Faça login novamente.");
        navigation.replace("Login");
        return;
      }

      // Requisição ao backend que cria a preferência de pagamento
      const response = await axios.post(`${API}/payment/create`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { init_point } = response.data;

      if (!init_point) {
        Alert.alert("Erro", "Erro ao gerar link de pagamento.");
        return;
      }

      // Abre o navegador ou app Mercado Pago
      await Linking.openURL(init_point);

      Alert.alert(
        "Pagamento Iniciado",
        "Após pagar, clique em VERIFICAR PREMIUM para atualizar o status."
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível iniciar o pagamento.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPremium = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.user.isPremium) {
        Alert.alert("Sucesso!", "Assinatura verificada. Premium ativado!");
        navigation.goBack();
      } else {
        Alert.alert("Ainda não confirmado", "O pagamento ainda não foi processado.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível verificar.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assinatura Premium</Text>

      <Text style={styles.desc}>
        O Premium desbloqueia TODOS os filmes e séries, player avançado e muito mais.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pagar R$ 19,99</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verifyButton} onPress={verifyPremium}>
        <Text style={styles.verifyText}>Verificar Premium</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  desc: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
  },
  verifyText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
    
