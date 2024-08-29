import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';

const RegistroPresencaScreen = () => {
  const [presencaRegistrada, setPresencaRegistrada] = useState(false);

  const registrarPresenca = () => {
    // Lógica para registrar presença
    setPresencaRegistrada(true);
    Alert.alert('Presença registrada com sucesso!');
  };

  return (
    <View>
      <Text>{presencaRegistrada ? 'Presença Registrada' : 'Registrar Presença'}</Text>
      <Button title="Registrar Presença" onPress={registrarPresenca} />
    </View>
  );
};

export default RegistroPresencaScreen;
