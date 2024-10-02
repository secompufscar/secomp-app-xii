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
    }, 2000); // Scroll every 3 seconds

    intervalRef.current = interval;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    
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
        initialNumToRender={images.length}  
        getItemLayout={(data, index) => (
          { length: width, offset: width * index, index }
        )} 
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
    marginTop: 10,
  },
  
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',  
    height: 200,   
    maxWidth: width, 
    maxHeight: 200,   
    resizeMode: 'contain',  
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
