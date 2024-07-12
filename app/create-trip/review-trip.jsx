import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import { useRouter } from 'expo-router';

export default function ReviewTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    return (
        <SafeAreaView className="p-3 h-screen">
            <Text className="font-[outfit-bold] text-3xl my-4">Review your Trip</Text>
            <Text className="font-[outfit-medium] text-base">Before generating your trip, please review your selection.</Text>
            <View className="flex items-center flex-row my-1">
                <Text className="text-3xl">📍</Text>
                <View className="p-3">
                    <Text className="font-[outfit] text-gray-600">Location</Text>
                    <Text className="font-[outfit-bold] text-lg">{tripData?.locationInfo?.from} to {tripData?.locationInfo?.to}</Text>
                </View>
            </View>

            <View className="flex items-center flex-row my-1">
                <Text className="text-3xl">🗓️</Text>
                <View className="p-3">
                    <Text className="font-[outfit] text-gray-600">Travel Date</Text>
                    <Text className="font-[outfit-bold] text-lg">{moment(tripData?.startDate).format('DD MMM YYYY') + " To " + moment(tripData?.endDate).format('DD MMM YYYY')}</Text>
                    <Text className="font-[outfit-bold] text-lg">({tripData?.totalDays} days trip)</Text>
                </View>
            </View>

            <View className="flex items-center flex-row my-1">
                <Text className="text-3xl">🚌</Text>
                <View className="p-3">
                    <Text className="font-[outfit] text-gray-600">Who's Travelling</Text>
                    <Text className="font-[outfit-bold] text-lg">{tripData?.traveler?.title}</Text>
                </View>
            </View>

            <View className="flex items-center flex-row my-1">
                <Text className="text-3xl">💰</Text>
                <View className="p-3">
                    <Text className="font-[outfit] text-gray-600">Budget</Text>
                    <Text className="font-[outfit-bold] text-lg">{tripData?.budget}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => router.push("/create-trip/generate-trip")} className="rounded-xl flex justify-center absolute bottom-0 items-center bg-black h-11 w-full self-center">
                <Text className="text-white text-lg font-[outfit]">Build My trip</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}