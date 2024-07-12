import { View, Text } from 'react-native'
import React from 'react'

export default function TravelerOptionCard({ data, selectedTraveler }) {
    return (
        <View style={selectedTraveler?.id == data?.id && { borderWidth: 2, borderColor: "black" }} className="p-4 flex rounded-2xl justify-between items-center flex-row bg-gray-200 m-2">
            <View>
                <Text className="font-[outfit-bold] text-2xl">{data?.title}</Text>
                <Text className="text-gray-500 text-base font-[outfit-medium]">{data?.desc}</Text>
            </View>
            <Text className="text-2xl">{data?.icon}</Text>
        </View>
    )
}