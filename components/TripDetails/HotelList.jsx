import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function HotelList({ hotelData }) {
    return (
        <View>
            <Text className="font-[outfit-bold] text-xl mt-5">Hotel Recommendation</Text>
            <FlatList
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={hotelData}
                renderItem={({ item, index }) => (
                    <View key={index} className="my-2 p-3 rounded-xl bg-gray-200">
                        <Text className="font-[outfit-bold] text-lg">{item?.name}</Text>
                        <Text className="font-[outfit-medium] my-2 text-gray-700 text-sm">📍 {item?.address}</Text>
                        <View className="bg-stone-700 p-2">
                            <Text className="font-[outfit-medium] text-white text-lg">Details</Text>
                            <Text className="font-[outfit-medium] text-gray-300 text-sm">{item?.description}</Text>
                            <View className="flex flex-row justify-between items-center">

                                <View className="mt-2 w-[70%]">
                                    <Text className="font-[outfit-bold] text-white text-base">{item?.price}</Text>
                                    <Text className="font-[outfit-bold] text-white">⭐ {item?.rating}</Text>
                                </View>

                                <TouchableOpacity onPress={() => Linking.openURL(item?.googleSearchUrl)} className="flex w-[30%] justify-center mt-2 items-center rounded-lg bg-sky-300 p-2">
                                    <Text className="font-[outfit-medium]"><Image className="h-4 w-4" source={{ uri: "https://cdn-icons-png.flaticon.com/128/1006/1006771.png" }} />  Website</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between items-center">
                            <TouchableOpacity onPress={() => Linking.openURL(item?.imagesUrl + "&tbm=isch")} className="flex justify-center w-full mt-2 items-center border rounded-lg bg-stone-400 p-2">
                                <Text className="font-[outfit-medium] text-white">View Images {">>"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}