import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function PatrocinioSobre() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.rectangle1}> 
      <Text style={styles.text}>Sobre nós</Text>
      </View>
      <View style={styles.rectangle2}>
      <Text style={styles.text}>Patrocinadores</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 13,
  },
  text: {
    color: '#51B68D',
    fontSize: 30,
    paddingLeft: 21,
    fontWeight: 'bold',
  },
  rectangle1: {
   //marginVertical: 200,
   height: 350,
  },
  rectangle2: {

  },
});
