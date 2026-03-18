import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Pressable, 
  Linking, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';

const GITHUB_USERNAME = 'Kokeeu';

export default function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setRepos(data.filter(repo => !repo.fork));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const renderHeader = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://github.com/Kokeeu.png' }}
        style={styles.profileImg}
      />
      <Text style={styles.webTitle}>Anderson Solano Chavarria</Text>
      <Text style={styles.webSubtitle}>Desarrollador Web & Mobile</Text>
      
      <View style={styles.socialRow}>
        <Pressable onPress={() => Linking.openURL(`https://github.com/${GITHUB_USERNAME}`)}>
          <Text style={styles.socialText}>GitHub</Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/anderson-solano-chavarria-75a5763b8')}>
          <Text style={styles.socialText}>LinkedIn</Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('mailto:andersonsolanochavarria@gmail.com')}>
          <Text style={styles.socialText}>Correo</Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.instagram.com/k0keeu?igsh=aTVvcDBpZ2tjYzNr')}>
          <Text style={styles.socialText}>Instagram</Text>
        </Pressable>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          Soy un desarrollador web.
          Con habilidades en JavaScript, React Native, HTML5, CSS3, Bootstrap, Git y Python.
          Trato de ser constante en mi aprendizaje y siempre busco nuevos desafíos para crecer profesionalmente.
        </Text>
      </View>

      <View style={styles.skillsWrapper}>
        <Text style={styles.skillTitle}>Stack Tecnológico</Text>
        <View style={styles.skillsGrid}>
          {['JavaScript', 'React Native', 'HTML5', 'CSS3', 'Bootstrap', 'Git', 'Python'].map((skill) => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillBadgeText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitleWeb}>Proyectos hechos por mi</Text>
    </View>
  );

  return (
    <View style={styles.body}>
      <FlatList
        data={repos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.projectCardWeb} onPress={() => Linking.openURL(item.html_url)}>
            <Text style={styles.cardTitle}>{item.name.replace(/-/g, ' ')}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.description || 'Cosas que hice durante mi aprendizaje.'}
            </Text>
            <Text style={styles.cardTech}>{item.language || 'Code'}</Text>
          </Pressable>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => (
          loading ? <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} /> : null
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: '#0a0a0a' },
  container: { paddingBottom: 50 },
  heroSection: {
    backgroundColor: '#161616',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderColor: '#ffffff10',
  },
  profileImg: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  webTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  webSubtitle: { color: '#ffffffa0', fontSize: 14, marginTop: 5 },
  socialRow: { flexDirection: 'row', gap: 20, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center' },
  socialText: { color: '#007bff', fontWeight: '600', textDecorationLine: 'underline' },
  bioContainer: {
    width: '85%', marginTop: 25, backgroundColor: '#ffffff05',
    padding: 15, borderRadius: 12, borderLeftWidth: 3, borderLeftColor: '#007bff',
  },
  bioText: { color: '#ffffffd0', fontSize: 14, lineHeight: 20 },
  skillsWrapper: { width: '90%', marginTop: 25, paddingHorizontal: 10 },
  skillTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { 
    backgroundColor: '#1f1f1f', paddingHorizontal: 10, paddingVertical: 5, 
    borderRadius: 15, borderWidth: 1, borderColor: '#ffffff15' 
  },
  skillBadgeText: { color: '#007bff', fontSize: 12, fontWeight: '600' },
  sectionTitleWeb: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 30, alignSelf: 'flex-start', marginLeft: '5%' },
  projectCardWeb: {
    backgroundColor: '#1f1f1f', padding: 20, borderRadius: 12, width: '90%',
    alignSelf: 'center', marginTop: 15, borderWidth: 1, borderColor: '#ffffff10'
  },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardDesc: { color: '#ffffffa0', fontSize: 13, marginTop: 5 },
  cardTech: { color: '#007bff', fontSize: 11, fontWeight: 'bold', marginTop: 10, textTransform: 'uppercase' }
});