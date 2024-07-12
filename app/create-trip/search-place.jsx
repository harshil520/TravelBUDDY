import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';

export default function SearchPlace() {

  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  return (
    <SafeAreaView className="p-4 h-screen">
      <View className="py-3">
        <Text className="font-[outfit-medium] text-lg">From</Text>
        <TextInput onChangeText={(val) => setFrom(val)} placeholder='Enter source location' className="p-2 mt-2 rounded-lg border" />
      </View>
      <View className="py-3">
        <Text className="font-[outfit-medium] text-lg">To</Text>
        <TextInput onChangeText={(val) => setTo(val)} placeholder='Enter destination location' className="p-2 mt-2 rounded-lg border" />
      </View>
      <TouchableOpacity onPress={() => {
        if (!from || !to) {
          ToastAndroid.show("Please enter required fields.", ToastAndroid.BOTTOM);
          return;
        }
        
        setTripData({
          locationInfo: {
            to: to,
            from: from,
            coordinates: "details?.geometry.location",
            photoRef: "details?.photos[0]?.photo_reference",
            url: "details?.url"
          }
        });

        router.push("/create-trip/select-traveler");
      }} className="rounded-xl flex justify-center items-center border h-11 bg-black absolute bottom-0 w-full self-center">
        <Text className="text-white">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}