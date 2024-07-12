import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function SignUp() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const createAccount = async () => {

        if (!email || !password) {
            ToastAndroid.show("Please enter all details.", ToastAndroid.BOTTOM);
            return;
        }

        try {
            setLoading(true);
            const otp = Math.floor(1000 + Math.random() * 9000).toString();

            const res = await axios.post(process.env.EXPO_PUBLIC_MAILER_ROUTE, {
                email: process.env.EXPO_PUBLIC_MAILER_EMAIL,
                passKey: process.env.EXPO_PUBLIC_MAILER_PASSKEY,
                to: email,
                subject: "Otp verification",
                htmlBody: `<h4>this is your otp ${otp} for account verification.</h4>`
            });

            if (res.status == "200") {
                ToastAndroid.show("Otp sent to mail.", ToastAndroid.BOTTOM);
                setLoading(false);
                router.push({
                    pathname: "/auth/otp",
                    params: {
                        otp: otp,
                        email: email,
                        password: password
                    }
                });
            }
        } catch (error) {
            setLoading(false);
            ToastAndroid.show("Something went wrong. please try again.", ToastAndroid.BOTTOM);
        }

    }

    return (
        <SafeAreaView>
            {
                loading ? (
                    <View className="flex justify-center items-center h-screen">
                        <ActivityIndicator size={50} color={"black"} />
                    </View>
                ) : <View className="h-screen mt-10">
                    <Text className="font-[outfit-bold] text-center text-2xl">Sign Up</Text>
                    <View className="px-3">
                        <Text className="font-[outfit-medium] text-lg">Email</Text>
                        <TextInput onChangeText={(val) => setEmail(val)} placeholder='Enter Email' className="p-2 mt-2 rounded-lg border" />
                    </View>
                    <View className="p-3">
                        <Text className="font-[outfit-medium] text-lg">Password</Text>
                        <TextInput onChangeText={(val) => setPassword(val)} secureTextEntry placeholder='Enter Password' className="p-2 mt-2 rounded-lg border" />
                    </View>
                    <View className="mt-[10%]">
                        <TouchableOpacity onPress={createAccount} className="m-2 rounded-xl flex justify-center items-center border h-11 bg-black">
                            <Text className="text-white">Create Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.replace("auth/sign-in")} className="m-2 rounded-xl flex justify-center items-center border h-11">
                            <Text>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}