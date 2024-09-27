import React, { useEffect, useRef, useState } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Importe as imagens locais
const image1 = require('../../assets/empresas/rocketseat.png');
const image2 = require('../../assets/empresas/tempest.png');
const image3 = require('../../assets/empresas/visagio.png');
const image4 = require('../../assets/empresas/tractian.png');
const image5 = require('../../assets/empresas/magalu.png');

const images = [
  { id: '1', uri: image1 },
  { id: '2', uri: image2 },
  { id: '3', uri: image3 },
  { id: '4', uri: image4 },
  { id: '5', uri: image5 },
];

const ImageCarousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % images.length;

        flatListRef.current.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });

        setCurrentIndex(nextIndex);
      }
    }, 3000); // Scroll every 3 seconds

    intervalRef.current = interval;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    
    // Só atualiza o índice se ele realmente mudou, para evitar inconsistências
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.uri} style={styles.image} resizeMode="contain" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={images.length}  // Garante que todas as imagens sejam renderizadas inicialmente
        getItemLayout={(data, index) => (
          { length: width, offset: width * index, index }
        )}  // Força o layout de cada item no FlatList
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentIndex === index ? 'black' : 'gray' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',  // Faz com que a imagem ocupe 100% da largura do container
    height: 200,    // Define a altura como 200px
    maxWidth: width,  // Garante que a imagem não ultrapasse a largura da tela
    maxHeight: 200,   // Garante que a imagem tenha no máximo 200px de altura
    resizeMode: 'contain',  // Redimensiona a imagem para caber no container sem cortar
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default ImageCarousel;
