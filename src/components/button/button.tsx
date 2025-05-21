import { PressableProps } from "@react-native-material/core";
import { Text, Pressable } from "react-native";

type Props = PressableProps & {
    title: string
}

export default function Button({ title, ...rest }: Props) {
    return (
        <Pressable
            className="w-full p-4 bg-blue-500 items-center justify-center rounded-lg outline-none"
            {...rest}
        >
            <Text className="text-white text-sm font-inter font-semibold">
                {title}
            </Text>
            
        </Pressable>
    )
}