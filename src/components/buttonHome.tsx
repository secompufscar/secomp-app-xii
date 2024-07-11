import {Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from "react-native";

type Props = TouchableOpacityProps &{
    title: string
    isLoading?:boolean
}


export function ButtonHome ({title, isLoading = false, ...rest}: Props){
    return(
        <TouchableOpacity 
            disabled={isLoading}
            activeOpacity={0.7}
            className="w-5/6 h-14 bg-blue items-center justify-center rounded-lg"
            {...rest}
        >

            {isLoading?(<ActivityIndicator className= "text-green-800"/>):(
            <Text className="text-white text-base font-bold uppercase"> 
                {title}
            </Text>)
            }


            
        </TouchableOpacity>
    )
}