import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function StartNewTripCard() {
    const router = useRouter();
    return (
        <View className="flex justify-center items-center p-2 mt-5">
            <Ionicons name='location-sharp' size={40} color={"blue"} />
            <Text className="font-[outfit-bold] text-2xl mt-5">No Trip planned yet</Text>
            <Text className="font-[outfit] text-center text-base">Looks like it's time to plan a new travel experience! Get started below</Text>
            <TouchableOpacity onPress={()=>router.push("create-trip/search-place")} className="flex justify-center items-center bg-black w-auto p-4 mt-6 px-8 rounded-2xl">
                <Text className="text-white">Start a new Trip</Text>
            </TouchableOpacity>
        </View>
    )
}