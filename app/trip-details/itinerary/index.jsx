import { View, Text, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

export default function Itinarary() {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  const temp = useLocalSearchParams();
  useEffect(() => {
    setLoading(true);
    setItinerary(JSON.parse(temp?.data));
    setLoading(false);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        {
          loading ?
            <View className="h-screen flex justify-center items-center">
              <ActivityIndicator color={"black"} size={30} />
            </View> :
            <>
              <FlatList
                data={itinerary}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View key={index}>
                      <View className="m-2 my-2 p-2 bg-amber-200">
                        <View className="flex flex-row justify-between items-center">
                          <Text className="font-[outfit-bold] text-xl">{item?.day}</Text>
                          <Text className="font-[outfit-medium] text-base">{item?.time}</Text>
                        </View>
                        <View className="border-t"></View>
                        <View className="">
                          <Text className="font-[outfit-bold] text-xl py-1">{item?.place}</Text>
                          <Text className="font-[outfit] text-base">{item?.details}</Text>
                        </View>
                        <View className="border-t mb-2 mt-1"></View>
                        <Text className="font-[outfit-medium] text-center text-lg">Best time for {item?.place}</Text>
                        <Text className="font-[outfit] text-center text-base">{item?.bestTime}</Text>
                        <Text className="font-[outfit-medium] bg-gray-300 rounded-lg p-1 mt-2">💡 Tip : <Text>{item?.notes}</Text></Text>
                      </View>
                      <Image className="h-6 w-6 self-center" source={{ uri: "https://cdn-icons-png.flaticon.com/128/10412/10412452.png" }} />
                    </View>
                  )
                }}
              />
              <View className="flex justify-center items-center self-center p-3">
                <Image className="h-36 w-36" source={{ uri: "https://cdn-icons-png.flaticon.com/256/10041/10041056.png" }} />
                <Text className="font-[gaaMaamil] text-3xl py-3">Have a great Trip ♥️</Text>
              </View></>
        }
      </SafeAreaView>
    </ScrollView>
  )
}