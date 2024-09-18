import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { useAuth } from "../hooks/AuthContext";
import { getCategories } from "../services/categories";


export default function Categorias() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user: { user } }: any = useAuth();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getCategoriesData = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        getCategoriesData();
    }, []);

    // Função para obter o ícone com base no nome da categoria
    const getIconName = (categoryName: string): string => {
        switch (categoryName) {
            case 'Minicursos':
                return 'laptop-file';

            case 'Palestras':
                return 'chalkboard-user';

            case 'Competições':
                return 'trophy';

            case 'Workshops':
                return 'people-group';
            
            case 'Credenciamento':
                return 'id-badge';

            default:
                return 'list';  // Icone padrão
        }
    };

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity onPress={() => { navigation.navigate(`${item.nome}`) }}>
            <View className='grow h-20 flex-row items-center space-x-1 rounded-lg bg-neutral-200/20 my-2'>
                <View className='w-14 h-full ml-2 items-center justify-center'>
                    <FontAwesome6 name={getIconName(item.nome)} size={20} color="#445BE6" />
                </View>

                <View className='grow'>
                    <Text className='text-xl font-semibold text-neutral-700'>{item.nome}</Text>
                </View>

                <View className='w-14 h-full ml-2 items-center justify-center'>
                    <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className='bg-white flex-1'>

            <View className='flex-row justify-start items-center pt-12 pb-5 px-4 gap-4'>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#445BE6" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-blue'>Atividades</Text>
            </View>

            <FlatList
                className='px-2'
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
            />

        </SafeAreaView>
    );
}

