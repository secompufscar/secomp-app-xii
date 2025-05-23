// components/AppLayout.tsx
import { ScrollView, View } from "react-native";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

// Wrapper do ScrollView para as páginas
export default function AppLayout({ children }: AppLayoutProps) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full pb-12"
      >
        <View className="w-full px-6 max-w-[1000px] mx-auto">
          {children}
        </View>
      </ScrollView>
    );
}
