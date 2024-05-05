import {View, Image, StatusBar, Alert} from "react-native"
import {useState} from "react"

import {useNavigation} from "@react-navigation/native"
import {StackTypes} from '../routes/stack.routes';

import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from '@expo/vector-icons';

import { Input } from "../components/input";
import { Button } from "../components/button";

export default function Login(){

    const navigation = useNavigation<StackTypes>();
    const [email, setEmail] = useState("") 
    const [senha, setSenha] = useState("")
    
    function handleLogin(){
      if (!email.trim() || !senha.trim())
        return Alert.alert("Login", "Preencha todos os campos")

      navigation.navigate("Home");
    }

    return (

        <View>

            <StatusBar barStyle="light-content"/>

            <View>
                <Input>
                    <Entypo name="email" 
                        size={20}
                    />
                    <Input.Field
                        placeholder="E-mail"
                        onChangeText={setEmail}
                    />
                    
                </Input>

                <Input>
                    <Entypo name="lock"
                        size={20}
                    />

                    <Input.Field
                        placeholder="Senha"
                        onChangeText={setSenha}
                    />
                    
                </Input>

                <Button title = "REALIZAR LOGIN" onPress={handleLogin}/>

                <Button
                    title='Ainda não possui cadastro?'
                    onPress={() => { navigation.navigate("SignUp"); }
                    }
                />

            </View>

        </View>

    )
}

