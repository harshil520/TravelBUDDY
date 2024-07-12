import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function Places({ placeData }) {
    return (
        <View>
            <Text className="font-[outfit-bold] text-xl">Place Recommendation</Text>
            <View className="">
                <FlatList
                    scrollEnabled={false}
                    data={placeData}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index}>
                                <View className="rounded-xl bg-orange-200 p-3 my-2 w-full flex-grow">
                                    <View className="flex flex-row justify-between items-start">
                                        <Text className="font-[outfit-bold] text-xl w-[65%]">{item.placeName}</Text>
                                        <TouchableOpacity className="flex justify-center items-center mt-1 w-[35%]" onPress={() => Linking.openURL(item?.placeImageUrl + "&tbm=isch")}>
                                            <Text className="font-[outfit-medium] text-blue-700">View Images {">>"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="font-[outfit-medium] text-base">{item.placeDetails}</Text>
                                    <View className="mt-2">
                                        <View className="flex flex-row justify-between items-start">
                                            <View className="w-[50%] h-28 p-2 border rounded-l-xl">
                                                <Text className="text-center font-[outfit-bold] text-lg">Ticket</Text>
                                                <Text className="font-[outfit-medium] text-center text-sm">{item.ticketPrice}</Text>
                                            </View>
                                            <View className="w-[50%] h-28 p-2 bg-black rounded-r-xl">
                                                <Text className="text-center font-[outfit-bold] text-lg text-white">Time</Text>
                                                <Text className="font-[outfit-medium] text-center text-sm text-white">{item.travelTime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View >
    )
}