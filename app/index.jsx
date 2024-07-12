import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useFonts } from 'expo-font';
import { Redirect, useRouter } from "expo-router";
import { auth } from "../config/firebaseConfig"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';


export default function Welcome() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const router = useRouter();

  const [isLoaded] = useFonts({
    'outfit': require("./../assets/fonts/Outfit-Regular.ttf"),
    'outfit-bold': require("./../assets/fonts/Outfit-Bold.ttf"),
    'outfit-medium': require("./../assets/fonts/Outfit-Medium.ttf"),
    'gaaMaamil': require("./../assets/fonts/GaMaamli-Regular.ttf")
  });

  if (loading) {
    return (
      <View className="flex justify-center items-center h-screen">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <>
      {
        user && isLoaded ? <Redirect href={"/mytrip"} /> :
          (
            isLoaded &&
            <View className="flex justify-center items-center h-screen">
              <Image source={require("./../assets/images/travelbuddy-logo/png/logo-no-background.png")} className="self-center h-10 w-[90%] mb-10" />
              <Text className="font-[outfit-bold] text-xl text-center">AI to plan your trip within a minute</Text>
              <Text className="font-[outfit] p-3 text-base text-center text-gray-700">Discover your next advanture effortlessly. Personalized itineraries of your fingertips. Travel smarter with AI driven insights.</Text>
              <TouchableOpacity onPress={() => router.push("auth/sign-in")} className="w-[95%] absolute bottom-0 flex justify-center items-center bg-black h-12 rounded-3xl">
                <Text className="text-white font-[outfit]">Get Started</Text>
              </TouchableOpacity>
            </View>
          )
      }

    </>
  );
}
