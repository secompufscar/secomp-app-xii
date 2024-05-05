import {ReactNode} from "react"
import {TextInput, View, TextInputProps, StyleSheet} from "react-native";

function Input({children}:{children: ReactNode}){
    return( 
        <View className="w-30 h-14 flex-row items-center
        gap-3 p-3 border border-green-400 rounded-lg">  
         {children}
        </View>
    )
}   

function Field({...rest}: TextInputProps){
    return ( 
        <TextInput
        {...rest}
        />
    )
    }

Input.Field = Field

export {Input}
