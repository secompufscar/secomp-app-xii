import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";

type Props = TouchableOpacityProps & {
    title: string
    isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
    return (
        <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            className="w-full h-14 bg-white items-center justify-center rounded-lg outline-none"
            {...rest}
        >

            {isLoading ? (<ActivityIndicator className="text-blue-old" />) : (
                <Text className="text-blue-old text-base font-bold uppercase">
                    {title}
                </Text>)
            }
        </TouchableOpacity>
    )
}