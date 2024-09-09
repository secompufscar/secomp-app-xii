
import React from 'react';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView, Text, Image, TouchableOpacity, View, ImageBackground, Modal, TouchableWithoutFeedback } from 'react-native';
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from "../hooks/AuthContext";

export default function Credential() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user: { user } }: any = useAuth()
    
    return (
        <SafeAreaView className='items-center bg-white flex-1'>
            <View className='w-96 max-w-[90%] h-screen flex-col items-center '>
                <View className='w-full h-[20%] items-center relative'>
                    <View className='w-24 h-[130%] absolute -bottom-10 bg-black' />
                </View>

                <View className='w-full h-[68%] items-center flex-col rounded-3xl relative overflow-hidden'>
                    <View className='w-full h-[58%]'>
                        <ImageBackground source={require("../../assets/credential.png")} resizeMode='cover' className='w-full h-full object-center max-w-full max-h-full'>
                            <View className='w-full h-20 px-10 py-7 flex-row'>
                                <View className='w-1/2 h-full items-start'>
                                    <Text className='text-xs text-white'> SECOMP XII</Text>
                                </View>

                                <View className='w-1/2 h-full items-end'>
                                    <Text className='text-xs text-white'> 2024</Text>
                                </View>
                            </View>

                            <View className='w-40 h-40 mx-10 mt-1 self-end'>
                                
                                <Image 
                                    source={{ uri: user.qrCode }} 
                                    resizeMode="cover"
                                    className='w-full h-full max-w-full max-h-full object-cover' />
                            </View>
                        </ImageBackground>
                    </View>

                    <View className='w-full h-[42%] px-8 bg-blue border-x border-b border-neutral-500 rounded-b-3xl '>
                        <View className='w-full h-[53%] flex-col py-9 space-y-1'>
                            <Text className='text-5xl font-bold text-white' allowFontScaling={false}> {user.nome} </Text>
                        </View>

                        <View className='w-[50%] h-[20%] items-center px-1 self-center'>
                            <Image source={require("../../assets/logo.png")} resizeMode="cover" className='w-24 h-full max-w-full max-h-full object-cover' />
                        </View>
                    </View>

                    <View className='w-24 h-10 absolute top-0 bg-black' />
                    <View className='w-28 h-3 rounded-full absolute top-[5%] bg-black' />
                </View>

                <View className='w-full h-[15%] items-center pt-8'>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                        <View className='w-44 h-12 items-center justify-center border border-neutral-300 rounded-xl bg-neutral-200/30'>
                            <Text className='text-base font-medium text-black' allowFontScaling={false}>Ampliar QRCode</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent onRequestClose={() => { setModalVisible(!modalVisible) }}>
                    <TouchableOpacity className='w-full h-full' activeOpacity={1} onPress={() => { setModalVisible(false) }}>
                        <View className='w-full h-full flex items-center bg-neutral-900/70'>
                            <TouchableWithoutFeedback>
                                <View className='w-80 h-80 absolute top-52 items-center p-6 rounded-xl bg-white'>
                                    <Image source={{ uri: user.qrCode }} resizeMode="cover" className='w-[96%] h-[96%] mt-1 max-w-full max-h-full object-cover' />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>

            <View className='w-screen h-28 px-5 pt-8 items-center flex-row bg-neutral-800/70 absolute top-0 border-b border-neutral-600'>
                <View className='w-[15%] h-full items-center justify-center'>
                    <TouchableOpacity>
                        <AntDesign name="arrowleft" size={24} color="#FFFFFF" onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                </View>

                <View className='w-[70%] h-full items-center justify-center'>
                    <Text className='text-xl font-medium text-white'>Minha Credencial</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}