import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScheduleItemProps } from "../entities/schedule-item";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {Platform, StyleSheet} from "react-native";

const isIos: Boolean = Platform.OS === 'ios'

type RegistrationDetailsProps = {
    item: Activity
    registered: boolean
}

export default function RegistrationDetails() {
    const navigation = useNavigation();
    const route = useRoute()

    const { item, registered } = route.params as RegistrationDetailsProps

    return (
        <View className='bg-white flex-1'>
            <View className={`flex-row justify-start items-center pt-12 px-4 gap-4`}>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#51B68D" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-green-700'>Eventos inscritos</Text>
                <TouchableOpacity className='pl-10' disabled={true}>
                    <AntDesign name="search1" size={24} color="#51B68D"/>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-around mx-12 pt-6">
                <TouchableOpacity disabled={true}>
                    <Text className={`text-xl font-bold text-green-700 ${(!registered) && "underline"}`}>Inscreva-se</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={true}>
                    <Text className={`text-xl font-bold text-green-700 ${(registered) && "underline"}`}>Inscritos</Text>
                </TouchableOpacity>
            </View>

            <View className="p-8 mt-16 mb-16">
                <View className='flex flex-col justify-start p-2 bg-[#FFFFFF] rounded-2xl' style={(isIos) ? [styles.shadowProp] : [styles.elevation]}>
                    <View className="p-4">
                        <View className='pb-2'>
                            <Text className='text-xl font-bold'>{item.nome}</Text>
                        </View>
                        <View className=''>
                            <View className='flex-row items-center pb-1'>
                                <AntDesign name="calendar" size={24} color="#51B68D" />
                                <Text className='pl-2'>{item.data.substring(0, 10)}</Text>
                            </View>
                            <View className='flex-row items-center pb-1'>
                                <AntDesign name="enviromento" size={24} color="#51B68D" />
                                <Text className='pl-2'>{item.vagas}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="pt-16"></View>
                </View>
            </View>

            <View style={(isIos) ? [styles.shadowProp] : [styles.elevation]}>
                { registered ? (
                <TouchableOpacity className="bg-green-700 py-2 rounded-2xl mx-8">
                    <Text className="text-white text-center font-bold text-xl">Desinscrever</Text>
                </TouchableOpacity>
                ) : (
                <TouchableOpacity className="bg-green-700 py-2 rounded-2xl mx-8" >
                    <Text className="text-white text-center font-bold text-xl">Inscreva-se</Text>
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 5,
        shadowColor: '#171717',
    },
})