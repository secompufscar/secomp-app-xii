import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomBackButton = () => {
    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
            <Image
            source={require('../../assets/arrow-left-line.png')}
            style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
    },
    image: {
        width: 24,
        height: 24,
    },
});


export default CustomBackButton;