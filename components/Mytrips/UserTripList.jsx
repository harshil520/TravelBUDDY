import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function UserTripList({ userTrips }) {
  const lastTrip = userTrips[userTrips.length - 1]?.tripData;
  const router = useRouter();
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="p-3">
      <View className="bg-teal-300 p-2 rounded-xl">
        <View className="p-2 flex flex-row justify-between">
          <View className="flex items-start justify-start w-[60%]">
            <Text className="font-[outfit-bold] text-2xl">{lastTrip?.to}</Text>
            <Text className="font-[outfit]">{lastTrip?.startDate}</Text>
          </View>
          <View className="flex items-end justify-tart w-[40%]">
            <Text className="font-[outfit-medium] mt-2 text-sm">{userTrips[userTrips.length - 1]?.tripPlan?.travelPlan?.duration}</Text>
            <Text className="font-[outfit-medium]">{lastTrip?.traveler}</Text>
          </View>
        </View>

        <FlatList
          horizontal
          data={userTrips[userTrips.length - 1]?.tripPlan?.travelPlan?.weather}
          renderItem={({ item, index }) => {
            return (
              <View key={index}>
                <Image className="h-10 w-10" source={{ uri: item.icon }} />
              </View>
            )
          }}
        />
        <Text className="p-1">{userTrips[userTrips.length - 1]?.tripPlan?.travelPlan?.transport?.mode}<Text className="font-[outfit-bold]"> (Recommended)</Text></Text>
        <TouchableOpacity onPress={() => router.push({
          pathname: '/trip-details', params: {
            trip: JSON.stringify(userTrips[userTrips.length - 1])
          }
        })} className="rounded-xl flex justify-center items-center bg-black h-11">
          <Text className="text-white font-[outfit-medium]">View your Trip plan</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="font-[outfit-bold] text-xl">Previous Trips</Text>
        <View>
          {
            userTrips.map((trip, index) => {
              return (
                <UserTripCard trip={trip} key={index} />
              )
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}