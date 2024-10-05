import React from 'react';
import {View, Text, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { ScheduleItemProps } from '../entities/schedule-item';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {Platform, StyleSheet} from "react-native";

const isIos: Boolean = Platform.OS === 'ios'

type ScheduleItemComponentProps = {
    scheduleItem: Activity;
    onClick?: () => void;
}

// Componente de ítens do cronogramam, pode ser mudado depois para aceitar mais informações
export default function MyEvent({scheduleItem, onClick}: ScheduleItemComponentProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View className='flex flex-col justify-start bg-white rounded-2xl' style={(isIos) ? [styles.shadowProp] : [styles.elevation]}>
                <View className="p-4">
                    <View className='pb-2'>
                        {/* <Text className='text-blue text-xl font-bold'>{scheduleItem.data.substring(0, 10)}</Text> */}
                    </View>
                    <View className=''>
                        <View className='flex-row items-center pb-1'>
                            <Ionicons name="calendar-clear-outline" size={24} color="#445BE6" />
                            <Text className='pl-2'>{scheduleItem.nome}</Text>
                        </View>
                        <View className='flex-row items-center pb-1'>
                            <Ionicons name="time-outline" size={24} color="#445BE6" />
                            <Text className='pl-2'>{scheduleItem.data.substring(11, 16)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})
