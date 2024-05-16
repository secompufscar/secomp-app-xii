import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

import { useNavigation } from "@react-navigation/native"
import { StackTypes } from '../routes/stack.routes';


export default function Navigator() {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View className='flex justify-center items-center pt-20'>
                <Text>Navigator Screen</Text>
                <View className='pt-4'>
                    <Button title="Go to HOME" onPress={() => {navigation.navigate("Home")}} />
                </View>
                <View className='pt-4'>
                    <Button title="Go to LOGIN" onPress={() => {navigation.navigate("Login")}} />
                </View>
                <View className='pt-4'>
                    <Button title="Go to SIGNUP" onPress={() => {navigation.navigate("Signup")}} />
                </View>
            </View>
        </ScrollView>
    );
};