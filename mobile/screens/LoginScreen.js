const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const token = response.data.token;

    // Salva o token para acessar as rotas protegidas
    await AsyncStorage.setItem('token', token);

    alert('Login realizado com sucesso!');

    navigation.navigate('Home'); 
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert('Erro ao fazer login. Confira o email e senha.');
  }
};
