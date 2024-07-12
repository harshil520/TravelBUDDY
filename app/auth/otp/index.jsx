import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import { auth } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Otp() {
    const { email, password } = useLocalSearchParams();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const getOtp = useLocalSearchParams();

    const verifyOtp = () => {

        if (!otp) {
            ToastAndroid.show("Please enter otp.", ToastAndroid.BOTTOM);
            return;
        }
        setLoading(true);

        if (getOtp.otp == otp) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    AsyncStorage.setItem("uuid", user.uid);
                    setLoading(false);
                    router.replace("/mytrip");
                })
                .catch((error) => {
                    setLoading(false);
                    const errorCode = error.code;
                    ToastAndroid.show(errorCode, ToastAndroid.BOTTOM);
                    router.replace("/auth/sign-up");
                    return;
                });
        } else {
            setLoading(false);
            ToastAndroid.show("Wrong Otp.", ToastAndroid.BOTTOM);
        }

    }

    return (
        <SafeAreaView>
            {
                loading ? (
                    <View className="flex justify-center items-center h-screen">
                        <ActivityIndicator size={50} color={"black"} />
                    </View>
                )
                    : <View className="flex h-screen p-3">
                        <TextInput placeholder='XXXX' maxLength={4} inputMode='numeric' className="text-center border-b-2 mt-10" onChangeText={(val) => setOtp(val)} />
                        <TouchableOpacity onPress={verifyOtp} className="flex justify-center items-center p-3 absolute bottom-0 w-full  self-center mb-10 rounded-lg bg-black">
                            <Text className="font-[outfit-medium] text-white">Verify Otp</Text>
                        </TouchableOpacity>
                    </View>
            }
        </SafeAreaView>
    )
}