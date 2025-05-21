import { colors } from "../../styles/colors";
import { ReactNode } from "react"
import { TextInput, View, TextInputProps } from "react-native";
import { Platform } from "react-native";

function Input({ children }: { children: ReactNode }) {
    return (
        <View className={`w-full p-4 flex-row items-center justify-center gap-3 border border-border bg-background rounded-lg ${Platform.OS === 'web' ? 'mb-2' : 'm-2'} outline-none`}>
            {children}
        </View>
    )
}

function Field({ ...rest }: TextInputProps) {
    return (
        <TextInput className="flex-1 text-white text-sm font-inter align-middle items-center outline-none"
            placeholderTextColor={colors.border}
            {...rest}
        />
    )
}

Input.Field = Field

export { Input }