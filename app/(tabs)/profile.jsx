import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../../config/firebaseConfig'
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function Profile() {
    const user = auth.currentUser.email;
    const logOut = () => {
        signOut(auth).then(() => {
            router.replace("/auth/sign-in");
        });
    }
    return (
        <SafeAreaView>
            <View className="bg-gray-200 m-3 rounded-xl mt-6">
                <Text className="font-[outfit-medium] text-center mt-6 mb-3">{user}</Text>
                <TouchableOpacity onPress={logOut} className="flex justify-center items-center p-3">
                    <Text className="font-[outfit-medium] text-blue-500">Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}