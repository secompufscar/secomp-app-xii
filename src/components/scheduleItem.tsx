import React from 'react';
import {View, Text, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { ScheduleItemProps } from '../entities/schedule-item';

type ScheduleItemComponentProps = {
    scheduleItem: ScheduleItemProps;
    onClick: () => void;
}

// Componente de ítens do cronogramam, pode ser mudado depois para aceitar mais informações
export default function ScheduleItemComponent({scheduleItem, onClick}: ScheduleItemComponentProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View className='flex flex-row justify-start min-w-full items-center p-4 rounded-md bg-green-700'>
                <View className='pl-8 pr-4'>
                    <Text className='text-white'>{scheduleItem.hour}</Text>
                </View>
                <View className='pl-4 pr-8 max-w-[80%]'>
                    <Text className='text-white'>{scheduleItem.title}</Text>
                    <Text className='text-white'>{scheduleItem.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
