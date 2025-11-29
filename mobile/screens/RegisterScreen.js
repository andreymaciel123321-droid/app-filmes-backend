const handleRegister = async () => {
  try {
    await api.post('/auth/register', {
      name,
      email,
      password,
    });

    alert('Conta criada com sucesso!');
    navigation.navigate('Login');
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert('Erro ao criar conta. Tente outro email.');
  }
};
