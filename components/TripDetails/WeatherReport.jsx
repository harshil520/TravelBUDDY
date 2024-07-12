import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'

export default function WeatherReport({ dates }) {
    return (
        <View>
            <Text className="font-[outfit-bold] text-xl">Let's check weather condition for your journey</Text>
            <View className="flex flex-row">
                <FlatList
                    data={dates}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} className="flex p-3 m-1 rounded-2xl bg-sky-600 justify-center items-center">
                                <Text className="font-[outfit-medium] text-white">{item?.date}</Text>
                                <Image className="w-24 h-24" source={{ uri: item.icon }} />
                                <Text className="font-[outfit-bold] text-white">{item?.temperature}</Text>
                                <Text className="font-[outfit-bold] text-white">{item?.description}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}