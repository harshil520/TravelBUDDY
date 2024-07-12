import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

export default function UserTripCard({ trip }) {

    return (
        <View className="flex flex-row p-2 my-2 bg-neutral-200 border-l-4 border-l-orange-600 justify-between items-end">
            <View className="w-[62%]">
                <Text className="font-[outfit-bold] text-xl">{trip?.tripData?.to}</Text>
                <Text className="font-[outfit] text-sm">{trip?.tripData?.startDate}</Text>
                <Text className="font-[outfit] text-sm">{trip?.tripData?.traveler}</Text>
            </View>
            <View className="w-[38%]">
                <Text className="font-[outfit-medium] text-sm text-gray-800 mb-2">{trip?.tripPlan?.travelPlan?.duration}</Text>
                <TouchableOpacity onPress={() => router.push({
                    pathname: '/trip-details', params: {
                        trip: JSON.stringify(trip)
                    }
                })} className="rounded-lg flex justify-center items-center bg-black p-2 px-4">
                    <Text className="text-white font-[outfit-medium]">View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}