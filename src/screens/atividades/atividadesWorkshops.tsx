import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function Workshops() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <SafeAreaView className='bg-white flex-1'>

            {/* //ADICIONAR UMA SETA PARA VOLTAR PRA PÁGINA ANTERIOR */}

            <View className='flex-row justify-start items-center pt-16 pb-2 px-6 gap-4'>
                <Text className='text-3xl font-bold text-blue'>Workshops</Text>
            </View>

        </SafeAreaView>

    );
}