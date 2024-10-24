import { colors } from "../styles/colors";
import { ReactNode } from "react"
import { TextInput, View, TextInputProps } from "react-native";
import { Platform } from "react-native";

function Input({ children }: { children: ReactNode }) {
    return (
        <View className={`w-full h-14 flex-row items-center gap-2 p-3 border border-white rounded-lg ${Platform.OS === 'web' ? 'mb-2' : 'm-2'} outline-none`}>
            {children}
        </View>
    )
}

function Field({ ...rest }: TextInputProps) {
    return (
        <TextInput className="flex-1 text-white text-base font-regular align-middle items-center outline-none"
            placeholderTextColor={colors.white}
            {...rest}
        />
    )
}

Input.Field = Field

export { Input }