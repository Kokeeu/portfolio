import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Pressable, 
  Linking, 
  FlatList, 
  Animated as AnimatedNative, 
  useWindowDimensions, 
} from 'react-native';
import AnimatedReanimated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  FadeInDown,
  FadeIn
} from 'react-native-reanimated';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

const GITHUB_USUARIO = 'Kokeeu';
const COLOR_MORADO = '#a855f7'; 

const EstrellaAnimada = ({ windowWidth, windowHeight }) => {
  const xValue = useSharedValue(Math.random() * windowWidth);
  const yValue = useSharedValue(Math.random() * windowHeight);
  const velocidad = Math.random() * 0.5 + 0.1;

  useEffect(() => {
    const destinoX = windowWidth + 20;
    xValue.value = withRepeat(
      withTiming(destinoX, {
        duration: (windowWidth / velocidad) * 50,
        easing: Easing.linear,
      }),
      -1,
      false,
      () => {
        xValue.value = -10;
        yValue.value = Math.random() * windowHeight;
      }
    );
  }, [windowWidth, windowHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xValue.value }, { translateY: yValue.value }],
    opacity: Math.random() * 0.5 + 0.3,
  }));

  const tamaño = Math.random() * 2 + 1;

  return (
    <AnimatedReanimated.View 
      style={[estilos.puntoEstelar, animatedStyle, { width: tamaño, height: tamaño }]} 
    />
  );
};

const FondoEspacialAnimado = () => {
  const { width, height } = useWindowDimensions();
  const estrellas = useRef([...Array(50)].map((_, i) => i)).current;

  return (
    <View style={StyleSheet.absoluteFill}>
      {estrellas.map((id) => (
        <EstrellaAnimada key={id} windowWidth={width} windowHeight={height} />
      ))}
    </View>
  );
};

const BotonAnimado = ({ children, onPress, style }) => {
  const escala = useRef(new AnimatedNative.Value(1)).current;
  const presionarIn = () => AnimatedNative.spring(escala, { toValue: 0.95, useNativeDriver: true }).start();
  const presionarOut = () => AnimatedNative.spring(escala, { toValue: 1, useNativeDriver: true, friction: 3, tension: 40 }).start();

  return (
    <Pressable onPressIn={presionarIn} onPressOut={presionarOut} onPress={onPress}>
      <AnimatedNative.View style={[style, { transform: [{ scale: escala }] }]}>
        {children}
      </AnimatedNative.View>
    </Pressable>
  );
};

export default function App() {
  const [repositorios, setRepositorios] = useState([]);
  const opacidadPulso = useRef(new AnimatedNative.Value(0.4)).current;

  useEffect(() => {
    obtenerRepositorios();
    AnimatedNative.loop(
      AnimatedNative.sequence([
        AnimatedNative.timing(opacidadPulso, { toValue: 1, duration: 1800, useNativeDriver: true }),
        AnimatedNative.timing(opacidadPulso, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
      ])
    ).start();


    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#020205';
    }
  }, []);

  const obtenerRepositorios = async () => {
    try {
      const respuesta = await fetch(`https://api.github.com/users/${GITHUB_USUARIO}/repos?sort=updated&per_page=6`);
      const datos = await respuesta.json();
      if (Array.isArray(datos)) setRepositorios(datos.filter(repo => !repo.fork));
    } catch (error) { console.error(error); }
  };

  const renderizarCabecera = () => (
    <View style={estilos.cabeceraContenedor}>
      <View style={estilos.resplandorMorado} />
      
      <AnimatedReanimated.View entering={FadeIn.duration(1000)}>
        <View style={estilos.bordeFoto}>
          <Image
            source={{ uri: `https://github.com/${GITHUB_USUARIO}.png` }}
            style={estilos.fotoPerfil}
          />
        </View>
      </AnimatedReanimated.View>

      <Text style={estilos.tituloNombre}>Anderson Solano Chavarria</Text>
      
      <View style={estilos.contenedorEstado}>
        <AnimatedNative.View style={[estilos.puntoEstado, { opacity: opacidadPulso }]} />
        <Text style={estilos.textoEstado}>junior desarrollador aprendiendo</Text>
      </View>

      <View style={estilos.filaSocial}>
        <BotonAnimado style={estilos.botonSocial} onPress={() => Linking.openURL(`https://github.com/${GITHUB_USUARIO}`)}>
          <FontAwesome5 name="github" size={18} color={COLOR_MORADO} />
        </BotonAnimado>
        <BotonAnimado style={estilos.botonSocial} onPress={() => Linking.openURL('https://www.linkedin.com/in/anderson-solano-chavarria-75a5763b8')}>
          <FontAwesome5 name="linkedin" size={18} color={COLOR_MORADO} />
        </BotonAnimado>
        <BotonAnimado style={estilos.botonSocial} onPress={() => Linking.openURL('mailto:andersonsolanochavarria@gmail.com')}>
          <FontAwesome5 name="envelope" size={18} color={COLOR_MORADO} />
        </BotonAnimado>
      </View>

      <View style={estilos.tarjetaGlass}>
        <Text style={estilos.textoBio}>
          Desarrollador Web. Transformando ideas con Html, Css, React y mucho JavaScript.
        </Text>
      </View>

      <View style={estilos.contenedorHabilidades}>
        <Text style={estilos.tituloHabilidades}>Habilidades</Text>
        <View style={estilos.filaUnificada}>
          {['React Native', 'JavaScript', 'Python', 'Git', 'Bootstrap', 'HTML5', 'CSS3'].map((tech) => (
            <View key={tech} style={estilos.badgeTec}>
              <Text style={estilos.textoBadge}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={estilos.contenedorTituloSeccion}>
        <MaterialCommunityIcons name="star-four-points" size={16} color={COLOR_MORADO} />
        <Text style={estilos.tituloSeccionProyectos}>Proyectos</Text>
      </View>
    </View>
  );

  return (
    <View style={estilos.cuerpo}>
      <FondoEspacialAnimado />
      <FlatList
        data={repositorios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <AnimatedReanimated.View entering={FadeInDown.delay(index * 120).springify()}>
            <BotonAnimado style={estilos.tarjetaProyecto} onPress={() => Linking.openURL(item.html_url)}>
              <Text style={estilos.tituloTarjeta}>{item.name.replace(/-/g, ' ')}</Text>
              <Text style={estilos.descripcionTarjeta} numberOfLines={2}>
                {item.description || 'Proyectos a los que no supe que poner de descripcion.'}
              </Text>
              <View style={estilos.filaInfo}>
                <View style={estilos.pillLenguaje}>
                  <Text style={estilos.textoLenguaje}>{item.language || 'Código'}</Text>
                </View>
                <MaterialCommunityIcons name="rocket-launch" size={16} color={COLOR_MORADO} />
              </View>
            </BotonAnimado>
          </AnimatedReanimated.View>
        )}
        ListHeaderComponent={renderizarCabecera}

        contentContainerStyle={[estilos.contenedorLista, { flexGrow: 1 }]}
      />
      <StatusBar style="light" />
    </View>
  );
}

const estilos = StyleSheet.create({
  cuerpo: { 
    flex: 1, 
    backgroundColor: '#020205' 
  },
  contenedorLista: { 
    paddingBottom: 80 
  },
  puntoEstelar: { position: 'absolute', backgroundColor: '#fff', borderRadius: 5 },
  resplandorMorado: { position: 'absolute', top: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: COLOR_MORADO, opacity: 0.1 },
  cabeceraContenedor: { paddingTop: 60, paddingBottom: 20, alignItems: 'center' },
  bordeFoto: { padding: 3, borderRadius: 35, backgroundColor: '#ffffff08', borderWidth: 1, borderColor: COLOR_MORADO + '20' },
  fotoPerfil: { width: 90, height: 90, borderRadius: 32 },
  tituloNombre: { color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 15, letterSpacing: 1 },
  contenedorEstado: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: COLOR_MORADO + '10', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: COLOR_MORADO + '20' },
  puntoEstado: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLOR_MORADO, marginRight: 8 },
  textoEstado: { color: COLOR_MORADO, fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  filaSocial: { flexDirection: 'row', gap: 15, marginTop: 25 },
  botonSocial: { width: 45, height: 45, backgroundColor: '#0a0a14', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR_MORADO + '15' },
  tarjetaGlass: { width: '85%', marginTop: 30, padding: 20, backgroundColor: '#ffffff05', borderRadius: 24, borderWidth: 1, borderColor: '#ffffff10' },
  textoBio: { color: '#ffffffa0', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  contenedorHabilidades: { width: '90%', marginTop: 25 },
  tituloHabilidades: { color: '#ffffff40', fontSize: 10, fontWeight: '700', marginBottom: 12, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 },
  filaUnificada: { flexDirection: 'row', justifyContent: 'center', gap: 8, flexWrap: 'wrap' },
  badgeTec: { backgroundColor: '#0a0a14', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: COLOR_MORADO + '25' },
  textoBadge: { color: '#ffffffb0', fontSize: 11, fontWeight: '700' },
  contenedorTituloSeccion: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: '8%', marginTop: 45, gap: 8 },
  tituloSeccionProyectos: { color: '#fff', fontSize: 20, fontWeight: '900' },
  tarjetaProyecto: { backgroundColor: '#08080f', padding: 22, borderRadius: 28, width: '90%', alignSelf: 'center', marginTop: 16, borderWidth: 1, borderColor: COLOR_MORADO + '10' },
  tituloTarjeta: { color: '#fff', fontSize: 16, fontWeight: '800' },
  descripcionTarjeta: { color: '#ffffff60', fontSize: 13, marginTop: 8, lineHeight: 18 },
  filaInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  pillLenguaje: { backgroundColor: COLOR_MORADO + '15', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  textoLenguaje: { color: COLOR_MORADO, fontSize: 10, fontWeight: '800' }
});