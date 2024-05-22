import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import ScheduleItemComponent from '../components/scheduleItem';
import { useNavigation } from "@react-navigation/native";
import { ScheduleItemProps } from '../entities/schedule-item';
import { AntDesign } from '@expo/vector-icons';
import WeekCalendar from '../components/calendar';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function Schedule() {
    const navigation = useNavigation();
    const currentDateString = formatDate(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDateString);
    const [items, setItems] = useState<ScheduleItemProps[]>([]);

    // useEffect para carregar os itens do cronograma todas as vezes que o atributo selectedDate mudar
    useEffect(() => {
        const fetchItems = async () => {
            // Substituir com chamada de API assim que o backend estiver pronto
            // const fetchedItems = await api.get(`/schedule/${selectedDate}`);
            const fetchedItems = [{
                title: "Teste",
                hour: "10:00",
                description: "Teste description",
                speaker: "João Teste",
                date: selectedDate,
                location: "Auditório DC"
            },{
                title: "Teste2",
                hour: "10:00",
                description: "Teste description",
                speaker: "João Teste",
                date: selectedDate,
                location: "Auditório DC"
            }]
            setItems(fetchedItems);
        };

        fetchItems();
    }, [selectedDate]);

    const handlePress = (item: ScheduleItemProps) => {
        // Por alguma razão, o typescript marca a passagem de parametros como erro, mesmo funcionando perfeitamente.
        // @ts-ignore
        navigation.navigate('ScheduleDetails', { item });
    };

    return (
        <SafeAreaView>
            <View>
                <View className='flex-row justify-start items-center pt-12 pb-10 px-4 gap-4'>
                    <TouchableOpacity>
                        <AntDesign name="arrowleft" size={24} color="#51B68D" onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text className='text-3xl font-bold text-green-700'>Cronograma</Text>
                </View>
                <View className='px-6'>  
                    <WeekCalendar
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                    />
                </View>
                <View className='flex justify-center items-center pt-10 px-6'>
                    <ScrollView>
                        {items.map((item, index) => (
                            <View className='pb-4' key={index}>
                                <ScheduleItemComponent
                                    scheduleItem={item}
                                    onClick={() => handlePress(item)}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
                {/* 
                //DEBUG selectedDate
                <View>
                    <Text className='text-center'>
                        {selectedDate}
                    </Text>
                </View> */}
            </View>
        </SafeAreaView>
    );
}
