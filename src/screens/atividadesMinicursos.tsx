import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';


export default function Minicursos() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <View>
            <Text>Teste</Text>
        </View>
    );
}