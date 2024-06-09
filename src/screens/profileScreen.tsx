import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

// Página para usuário
export default function UserProfile() {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<SafeAreaView>
			<View className='flex-row justify-start items-center pt-16 pb-2 px-6 gap-4'>
				<Text className='text-3xl font-bold text-green-700'>Perfil</Text>
			</View>

			<View className='h-44 mx-6 mb-2 py-6 flex-row items-center justify-start space-x-4 border-b-2 border-neutral-200'>
				<View className='w-32 h-full rounded-full'>
					<Image source={require("../../assets/default-user.png")} className='w-full h-32 max-w-full max-h-full object-cover object-center rounded-full' />
				</View>

				<View className='grow flex-col justify-start'>
					<Text className='text-xl font-semibold text-green-700 pb-0.5'>Usuário</Text>
					<Text className='text-sm text-neutral-500'>youremail@gmail.com</Text>
				</View>

				<View className='w-[14%] h-[36%] flex-row justify-center p-1'>
					<TouchableOpacity onPress={() => { navigation.navigate('') }}>
						<FontAwesome6 name="edit" size={16} color="#6e6d6d" />
					</TouchableOpacity>
				</View>
			</View>

			<View className='h-full m-6 flex-col justify-start space-y-4'>
				<TouchableOpacity onPress={() => { navigation.navigate('Credential') }}>
					<View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/30'>
						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="id-badge" size={24} color="#51B68D" />
						</View>

						<View className='grow'>
							<Text className='text-xl font-semibold text-neutral-700'>Credencial</Text>
						</View>

						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { navigation.navigate('MyEvents') }}>
					<View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/30'>
						<View className='w-14 h-full ml-2 items-center justify-center'>
							<MaterialIcons name="event" size={24} color="#51B68D" />
						</View>

						<View className='grow'>
							<Text className='text-xl font-semibold text-neutral-700'>Eventos Inscritos</Text>
						</View>

						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { navigation.navigate('') }}>
					<View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/30'>
						<View className='w-14 h-full ml-2 items-center justify-center'>
							<MaterialIcons name="logout" size={24} color="#51B68D" />
						</View>

						<View className='grow'>
							<Text className='text-xl font-semibold text-neutral-700'>Log out</Text>
						</View>

						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
						</View>
					</View>
				</TouchableOpacity>
			</View>

			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

// Página para equipe
export function AdminProfile() {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	return (
		<SafeAreaView>
			<View className='flex-row justify-start items-center pt-16 pb-2 px-6 gap-4'>
				<Text className='text-3xl font-bold text-green-700'>Perfil</Text>
			</View>

			<View className='h-44 mx-6 mb-2 py-6 flex-row items-center justify-start space-x-4 border-b-2 border-neutral-200'>
				<View className='w-32 h-full rounded-full'>
					<Image source={require("../../assets/default-user.png")} className='w-full h-32 max-w-full max-h-full object-cover object-center rounded-full' />
				</View>

				<View className='grow flex-col justify-start'>
					<Text className='text-xl font-semibold text-green-700 pb-0.5'>Membro da Equipe</Text>
					<Text className='text-sm text-neutral-500'>youremail@gmail.com</Text>
				</View>

				<View className='w-[14%] h-[36%] flex-row justify-center p-1'>
					<TouchableOpacity onPress={() => { navigation.navigate('') }}>
						<FontAwesome6 name="edit" size={16} color="#6e6d6d" />
					</TouchableOpacity>
				</View>
			</View>

			<View className='h-full m-6 flex-col justify-start space-y-4'>
				<TouchableOpacity onPress={() => { navigation.navigate('') }}>
					<View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/30'>
						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="id-badge" size={24} color="#51B68D" />
						</View>

						<View className='grow'>
							<Text className='text-xl font-semibold text-neutral-700'>Credenciamento</Text>
						</View>

						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { navigation.navigate('') }}>
					<View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/30'>
						<View className='w-14 h-full ml-2 items-center justify-center'>
							<MaterialIcons name="qr-code" size={24} color="#51B68D" />
						</View>

						<View className='grow'>
							<Text className='text-xl font-semibold text-neutral-700'>Leitura de Presença</Text>
						</View>

						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { navigation.navigate('') }}>
					<View className='grow h-16 flex-row items-center space-x-1 rounded-lg bg-neutral-200/30'>
						<View className='w-14 h-full ml-2 items-center justify-center'>
							<MaterialIcons name="logout" size={24} color="#51B68D" />
						</View>

						<View className='grow'>
							<Text className='text-xl font-semibold text-neutral-700'>Log out</Text>
						</View>

						<View className='w-14 h-full ml-2 items-center justify-center'>
							<FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
						</View>
					</View>
				</TouchableOpacity>
			</View>

			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
