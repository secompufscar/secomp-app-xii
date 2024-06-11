import React from 'react';
import {View, Text, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { ScheduleItemProps } from '../entities/schedule-item';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

type ScheduleItemComponentProps = {
    scheduleItem: ScheduleItemProps;
    onClick: () => void;
}

// Componente de ítens do cronogramam, pode ser mudado depois para aceitar mais informações
export default function MyEvent({scheduleItem, onClick}: ScheduleItemComponentProps) {
    return (
        <View>
            <View className='flex flex-col justify-start w-[156] rounded-md border border-green-700'>
                <View className="p-4">
                    <View className='pb-2'>
                        <Text className='text-green-700 text-xl font-bold'>{scheduleItem.hour}</Text>
                    </View>
                    <View className=''>
                        <View className='flex-row items-center pb-1'>
                            <Ionicons name="calendar-clear-outline" size={24} color="#51B68D" />
                            <Text className='pl-2'>{scheduleItem.title}</Text>
                        </View>
                        <View className='flex-row items-center pb-1'>
                            <Ionicons name="location-outline" size={24} color="#51B68D" />
                            <Text className='pl-2'>{scheduleItem.location}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}