import { StatusBar } from 'expo-status-bar';
// 1. Añadimos 'Linking' aquí abajo
import { StyleSheet, Text, View, Image, Pressable, Linking } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#ffffffb0', fontSize: 24, fontWeight: 'bold' }}>Porfolio</Text>
      
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
        style={{ width: 100, height: 100, marginTop: 20 }}
      />

      <Pressable
        onPress={() => {
          // Corregido: 'https' con una sola 'h'
          Linking.openURL('https://github.com/Kokeeu');
        }}      
      >
        <Text style={styles.buttonText}>GitHub</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          Linking.openURL('https://www.linkedin.com/in/anderson-solano-chavarria-75a5763b8');
        }}
      >
        <Text style={styles.buttonText}>LinkedIn</Text>
      </Pressable>

      <StatusBar style="light" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000e7',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  // Un tip: es mejor mover los estilos repetidos aquí abajo
  buttonText: {
    color: '#ffffffb0', 
    fontSize: 18, 
    marginTop: 20,
    textDecorationLine: 'underline' // Para que parezca un link real
  }
});
