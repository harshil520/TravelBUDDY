import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function Transportation({ transports, mode }) {

  return (
    <View>
      <Text className="font-[outfit-bold] text-xl">Transportation options</Text>
      <Text className="font-[outfit-medium] text-base">{mode?.mode}<Text className="font-[outfit-bold] text-base"> (Recommended)</Text></Text>
      <Text className="font-[outfit] text-sm">{mode?.details}</Text>
      <Text className="font-[outfit-medium] text-lg mt-3">Book tickets NOW</Text>
      <View>
        {
          transports.map((item, index) => {
            return (
              <View key={index}>
                <View className="flex flex-row items-center border m-2 rounded-xl" >
                  <View className="flex justify-center items-center w-[30%] p-1">
                    <Image className="h-16 w-16" source={{ uri: item?.icon }} />
                    <Text className="font-[outfit-medium] text-lg">{item?.name}</Text>
                  </View>
                  <View className="flex p-2 flex-row flex-wrap w-[70%]">
                    {
                      item.provider.map((provider, index) => {
                        return (
                          <TouchableOpacity key={index} className="mx-2 my-1" onPress={() => Linking.openURL(provider?.link)}>
                            <Text className="font-[outfit] text-blue-600 underline">{provider?.name}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}