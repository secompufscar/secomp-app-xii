import { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackTypes } from '../routes/stack.routes';

import { useAuth } from "../hooks/AuthContext";
import { FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function UserHome() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { signOut, user: { user } }: any = useAuth()

    // const [activities, setActivities] = useState<Activity[]>([]);

    // useEffect(() => {
    //     const getActivitiesData = async () => {
    //         const data = await getActivities();
    //         setActivities(data);
    //     };

    //     getActivitiesData();
    //   }, []);

    // Mensagem baseada no horário do dia
    const getCurrentTime = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
            return { greeting: 'Bom dia 🌅', color: '#ffc573' }; // Cor laranja para manhã
        } else if (hours >= 12 && hours < 18) {
            return { greeting: 'Boa tarde 🌞', color: '#f0a148' }; // Cor dourada para tarde
        } else {
            return { greeting: 'Boa noite 🌛', color: '#6663bf' }; // Cor azul para noite
        }
    };

    const { greeting, color } = getCurrentTime();

    return (

        <SafeAreaView className='bg-white flex-1'>
            <ScrollView className='flex-1 px-8'>

                <View className='flex-col items-start mt-10 pb-2'>
                    <Text style={{ fontFamily: 'Inter_500Medium', color: color }} className='text-lg text-neutral-300'>{greeting}</Text>
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-2xl mt-0.5'>{user.nome}</Text>

                </View>

                <View className='mb-8 py-1 flex-row items-center justify-start border-b border-neutral-200' />

                <View className='flex-col justify-start space-y-4 mb-10'>
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-md text-neutral-700'>Menu Principal</Text>

                    <TouchableOpacity onPress={() => { navigation.navigate('Categorias') }}>
                        <View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20'>
                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <FontAwesome6 name="id-badge" size={24} color="#445BE6" />
                            </View>

                            <View className='grow'>
                                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-lg text-neutral-700'>Leitura de Presença</Text>
                            </View>

                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={signOut}>
                        <View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20'>
                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <MaterialIcons name="logout" size={24} color="#445BE6" />
                            </View>

                            <View className='grow'>
                                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-lg text-neutral-700'>Sair</Text>
                            </View>

                            <View className='w-14 h-full ml-2 items-center justify-center'>
                                <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>


                <View className='mb-10 flex justify-center'>
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-md text-neutral-700 mb-4'>Redes Sociais</Text>

                    <View className="flex-row justify-between items-center space-x-3">
                        <TouchableOpacity className='h-20 grow' onPress={() => Linking.openURL('https://www.instagram.com/secompufscar/')}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30 flex items-center justify-center">
                                <FontAwesome6 name="instagram" size={42} color="#E1306C" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='h-20 grow' onPress={() => Linking.openURL('https://www.linkedin.com/company/secomp-ufscar/posts')}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30 flex items-center justify-center">
                                <FontAwesome6 name="linkedin" size={42} color="#0077B5" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='h-20 grow' onPress={() => Linking.openURL('https://www.facebook.com/secompufscar')}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30  flex items-center justify-center">
                                <FontAwesome6 name="square-facebook" size={42} color="#1877F2" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='h-20 grow' onPress={() => Linking.openURL('https://www.secompufscar.com.br/')}>
                            <View className="h-full w-full rounded-lg bg-neutral-200/30 flex items-center justify-center">
                                <MaterialCommunityIcons name="web" size={42} color="#333333" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mb-10 flex justify-center'>
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-md text-neutral-700 mb-4'>Patrocinadores</Text>

                    <View className='flex-col justify-center items-center space-y-3'>
                        <View className='h-32 w-full flex-row space-x-3 xl:h-48'>
                            <TouchableOpacity className='h-full w-[60%]' onPress={() => Linking.openURL('https://tractian.com/sobre')}>
                                <View className='h-full grow rounded-lg bg-neutral-200/50'>
                                    <Image
                                        source={require('../../assets/empresas/tractian.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className='h-full grow' onPress={() => Linking.openURL('https://www.tempest.com.br/sobre-nos/')}>
                                <View className='h-full grow rounded-lg bg-neutral-200'>
                                    <Image
                                        source={require('../../assets/empresas/tempest.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className='h-32 w-full flex-row space-x-3 xl:h-48'>
                            <TouchableOpacity className='h-full w-[40%]' onPress={() => Linking.openURL('https://visagio.com/quem-somos/')}>
                                <View className='h-full grow rounded-lg bg-neutral-200 p-1'>
                                    <Image
                                        source={require('../../assets/empresas/visagio.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className='h-full grow' onPress={() => Linking.openURL('https://app.rocketseat.com.br/')}>
                                <View className='h-full grow rounded-lg bg-neutral-200/50'>
                                    <Image
                                        source={require('../../assets/empresas/rocketseat.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className='h-32 w-full flex-row space-x-3 xl:h-48'>
                            <TouchableOpacity className='h-full grow' onPress={() => Linking.openURL('https://magalu.cloud/sobre-nos/')}>
                                <View className='h-full grow rounded-lg bg-neutral-200/30 p-8'>
                                    <Image
                                        source={require('../../assets/empresas/magalu.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}
