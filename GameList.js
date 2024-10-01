import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getLatestGames, getGameDetails } from './api'; // Asegúrate de que la ruta sea correcta

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const latestGames = await getLatestGames();
        setGames(latestGames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = async (slug) => {
    try {
      const gameDetails = await getGameDetails(slug);
      console.log(gameDetails); // Aquí puedes manejar los detalles del juego como desees
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.slug}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleGameClick(item.slug)}>
          <View style={{ padding: 20 }}>
            <Text>{item.title}</Text>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>Puntuación: {item.score}</Text>
            <Text>Fecha de lanzamiento: {item.releaseDate}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default GameList;
