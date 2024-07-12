import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {

    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const signIn = () => {

        if (!email || !password) {
            ToastAndroid.show("Please enter all details.", ToastAndroid.BOTTOM);
            return;
        }
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoading(false);
                router.replace("/mytrip");
                AsyncStorage.setItem("uuid", user.uid);
            })
            .catch((error) => {
                setLoading(false);
                const errorCode = error.code;
                ToastAndroid.show(errorCode, ToastAndroid.BOTTOM);
                return;
            });
    }

    return (
        <SafeAreaView>
            {
                loading ? (
                    <View className="flex justify-center items-center h-screen">
                        <ActivityIndicator size={50} color={"black"} />
                    </View>
                ) : <View className="h-screen mt-10">
                    <Text className="font-[outfit-bold] text-center text-2xl">Sign In</Text>
                    <View className="p-3">
                        <Text className="font-[outfit-medium] text-lg">Email</Text>
                        <TextInput onChangeText={(val) => setEmail(val)} placeholder='Enter Email' className="p-2 mt-2 rounded-lg border" />
                    </View>
                    <View className="px-3">
                        <Text className="font-[outfit-medium] text-lg">Password</Text>
                        <TextInput onChangeText={(val) => setPassword(val)} secureTextEntry placeholder='Enter Password' className="p-2 mt-2 rounded-lg border" />
                    </View>
                    <View className="mt-[10%]">
                        <TouchableOpacity onPress={signIn} className="m-2 rounded-xl flex justify-center items-center border h-11 bg-black">
                            <Text className="text-white">Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace("auth/sign-up")} className="m-2 rounded-xl flex justify-center items-center border h-11">
                            <Text>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}