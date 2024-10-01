import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, ActivityIndicator, Image, View, StyleSheet } from 'react-native';
import { getLatestGames } from './metacritic'; // Asegúrate de la ruta correcta

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const latestGames = await getLatestGames();
        setGames(latestGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Latest Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.releaseDate}>{item.releaseDate}</Text>
            <Text style={styles.score}>Score: {item.score}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    marginVertical: 10,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff9800',
  },
});

export default App;
