
import React from 'react';
import { useState } from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, View, ImageBackground, Modal, TouchableWithoutFeedback } from 'react-native';


export default function Credential() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView className='items-center bg-white flex-1'>

            <View className='w-96 max-w-[90%] h-screen flex-col items-center '>
                <View className='w-full h-[15%] items-center relative z-10'>
                    <View className='w-24 h-[130%] absolute -bottom-9 bg-black' />
                </View>

                <View className='w-full h-[68%] items-center flex-col rounded-3xl relative overflow-hidden'>
                    <View className='w-full h-[58%]'>
                        <ImageBackground source={require("../../assets/credential-bg3.png")} resizeMode='cover' className='w-full h-full object-center max-w-full max-h-full'>
                            <View className='w-full h-20 px-10 py-7 flex-row'>
                                <View className='w-1/2 h-full items-start'>
                                    <Text className='text-xs text-white'> SECOMP XII</Text>
                                </View>

                                <View className='w-1/2 h-full items-end'>
                                    <Text className='text-xs text-white'> 2024</Text>
                                </View>
                            </View>

                            <View className='w-32 h-32 mx-10 mt-1 self-end'>
                                <Image source={require("../../assets/qrcode.png")} resizeMode="cover" className='w-full h-full max-w-full max-h-full object-cover' />
                            </View>
                        </ImageBackground>
                    </View>

                    <View className='w-full h-[42%] px-8 bg-white'>
                        <View className='w-full h-[53%] flex-col py-9 space-y-1'>
                            <Text className='text-4xl font-bold text-neutral-800' allowFontScaling={false}> Nome </Text>
                            <Text className='text-4xl font-bold text-neutral-800' allowFontScaling={false}> Sobrenome </Text>
                        </View>

                        <View className='w-full h-10 px-2'>
                            <Text className='text-lg font-medium text-neutral-500' allowFontScaling={false}> Estudante </Text>
                        </View>

                        <View className='w-[50%] h-[20%] items-end px-1 self-end'>
                            <Image source={require("../../assets/black-logo.png")} resizeMode="cover" className='w-24 h-full max-w-full max-h-full object-cover' />
                        </View>
                    </View>

                    <View className='w-24 h-8 absolute top-0 bg-black' />
                    <View className='w-28 h-3 rounded-full absolute top-[5%] bg-black' />
                </View>

                <View className='w-full h-[15%] items-center pt-12'>
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
                                    <Image source={require("../../assets/qrcode-black.png")} resizeMode="cover" className='w-[96%] h-[96%] mt-1 max-w-full max-h-full object-cover' />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableOpacity>
                </Modal>

            </View>
        </SafeAreaView>
    );
}