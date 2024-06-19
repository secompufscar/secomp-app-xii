import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { colors } from "../styles/colors"

const { width } = Dimensions.get('window');

const MultiCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      image: 'https://source.unsplash.com/random',
      title: 'SERASA',
    },
    {
      image: 'https://source.unsplash.com/random',
      title: 'MAGALU',
    },
    {
      image: 'https://source.unsplash.com/random',
      title: 'ROCKETSEAT',
    },
    {
      image: 'https://source.unsplash.com/random',
      title: 'ARQUIVEI',
    },
    {
      image: 'https://source.unsplash.com/random',
      title: 'IFOOD',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  if (currentIndex > cards.length - 3) {
    setCurrentIndex(0);
  }

  return (
    <View className='mt-8 items-center'>
      
      <View className='relative w-11/12'>

        <View className='flex-row'>
          {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
            <View style={styles.card} key={index}>
              <Image style={styles.cardImage} source={{ uri: card.image }} />
              <Text className='font-bold justify-center text-center'>{card.title}</Text>
            </View>
          ))}
        </View>

        <View className="flex flex-row justify-between absolute w-full top-1/2 -mt-4">
          <TouchableOpacity className='items-center'onPress={handlePrev}>
            <AntDesign name="leftcircle" size={25} color={colors.green[700]}  />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
           <AntDesign name="rightcircle" size={25} color={colors.green[700]} />
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: width / 3.5,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },

});

export default MultiCardCarousel;
