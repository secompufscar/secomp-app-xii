import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Por enquanto estou pegando as datas da semana atual, porém podemos trocar pelos dias da semana do evento
const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const weekDates = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(currentDate);
        date.setDate(startOfWeek + index);
        return date;
    });
    return weekDates;
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

type WeekCalendarProps = {
    selectedDate: string;
    onDateSelect: (date: string) => void;
}

export default function WeekCalendar({ selectedDate, onDateSelect }: WeekCalendarProps) {
    const [weekDates, setWeekDates] = useState(getCurrentWeekDates());

    return (
        <View className='flex-row justify-center'>
            {weekDates.map((date, index) => {
                const dateString = formatDate(date);
                const isSelected = dateString === selectedDate;
                return (
                    <TouchableOpacity
                        key={index}
                        className={`flex justify-center items-center w-12 h-12 ${isSelected ? 'bg-[#51B68D] rounded-full' : ''}`}
                        onPress={() => onDateSelect(dateString)}
                    >
                        <Text className={`${isSelected ? "text-white" : 'text-black'}`}>
                            {date.getDate()}
                        </Text>
                        <Text className={`${isSelected ? "text-white" : 'text-black'}`}>
                            {date.toLocaleString('default', { weekday: 'short' })}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};