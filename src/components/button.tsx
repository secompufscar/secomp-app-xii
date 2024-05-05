import {Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from "react-native";

type Props = TouchableOpacityProps &{
    title: string
    isLoading?:boolean
}


export function Button ({title, isLoading = false, ...rest}: Props){
    return(
        <TouchableOpacity 
            disabled={isLoading}
            activeOpacity={0.7}
            {...rest}
        >

            {isLoading?(<ActivityIndicator/>):(
            <Text> 
                {title}
            </Text>)
            }
        </TouchableOpacity>
    )
}