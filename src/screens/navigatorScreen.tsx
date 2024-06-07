import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from '../routes/stack.routes';


export default function Navigator() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
                    <Button title="Go to SIGNUP" onPress={() => {navigation.navigate("SignUp")}} />
                </View>
                <View className='pt-4'>
                    <Button title="Go to SCHEDULE" onPress={() => {navigation.navigate("Schedule")}} />
                </View>
                <View className='pt-4'>
                    <Button title="Go to MY EVENTS" onPress={() => {navigation.navigate("MyEvents")}} />
                </View>
            </View>
        </ScrollView>
    );
};