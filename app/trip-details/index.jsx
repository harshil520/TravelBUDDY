import { View, Text, Image, ScrollView, TouchableHighlight, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import HotelList from '../../components/TripDetails/HotelList';
import { mainTransportation } from '../../constants/TransportationData';
import Transportation from '../../components/TripDetails/Transportation';
import WeatherReport from '../../components/TripDetails/WeatherReport';
import Places from '../../components/TripDetails/Places';
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firebaseConfig';

export default function TripDetails() {
    const { trip } = useLocalSearchParams();
    const [tripData, setTripData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteTrip = async () => {
        try {
            await deleteDoc(doc(db, "UserTrips", tripData.docID));
            ToastAndroid.show("Trip deleted successfully.", ToastAndroid.BOTTOM);
            router.replace("/(tabs)/mytrip");
            setVisible(false);
        } catch (error) {
            ToastAndroid.show("Something went wrong. try again.", ToastAndroid.BOTTOM);
            setVisible(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        setTripData(JSON.parse(trip));
        console.log(JSON.parse(trip));
        setLoading(false);
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
                {
                    loading ?
                        <View className="h-screen flex justify-center items-center">
                            <ActivityIndicator color={"black"} size={40} />
                        </View> :
                        <View className="bg-white">
                            <Dialog.Container visible={visible}>
                                <Dialog.Title style={{ color: "black" }} >delete trip</Dialog.Title>
                                <Dialog.Description style={{ color: "black" }}>
                                    Do you want to delete this trip? You cannot undo this action.
                                </Dialog.Description>
                                <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
                                <Dialog.Button label="Delete" onPress={deleteTrip} />
                            </Dialog.Container>
                            <View className="p-3 bg-sky-100">
                                <View className="flex flex-row justify-between items-start">
                                    <View className="w-[90%]">
                                        <Text className="font-[outfit-bold] text-3xl">{tripData?.tripPlan?.travelPlan?.location}</Text>
                                        <Text className="font-[outfit-medium]">{tripData?.tripData?.startDate} - {tripData?.tripData?.endDate}</Text>
                                    </View>
                                    <View className="items-center w-[10%]">
                                        <TouchableOpacity onPress={() => setVisible(true)} >
                                            <Ionicons size={25} color={"red"} name='trash' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className="flext flex-row py-2">
                                    <Text className="font-[outfit-medium] bg-pink-200 px-2 rounded-2xl">{tripData?.tripData?.traveler}</Text>
                                    <Text className="font-[outfit-medium] ml-1 bg-green-200 px-2 rounded-2xl">{tripData?.tripData?.budget}</Text>
                                </View>
                            </View>
                            <View className="p-3">
                                <Transportation mode={tripData?.tripPlan?.travelPlan?.transport} transports={mainTransportation} />
                            </View>
                            <View className="bg-orange-300 p-3">
                                <WeatherReport dates={tripData?.tripPlan?.travelPlan?.weather} />
                            </View>
                            <View className="p-3">
                                <HotelList hotelData={tripData?.tripPlan?.travelPlan?.hotels} />
                            </View>
                            <View className="p-3">
                                <Places placeData={tripData?.tripPlan?.travelPlan?.nearbyPlaces} />
                            </View>

                            <View>
                                <Text className="text-center text-4xl mt-4">😫</Text>
                                <Text className="font-[outfit-bold] text-lg text-center">Confused? Where to start. Don't worray!</Text>
                                <Text className="font-[outfit-bold] text-base text-center">Here's the Daily plan for your trip check out.</Text>
                                <View className="p-4 flex flex-row justify-around items-end">
                                    <Image className="h-[150px] w-[50%] self-center" source={{ uri: "https://cdn-icons-png.flaticon.com/256/8841/8841274.png" }} />
                                    <TouchableHighlight onPress={() => router.push({
                                        pathname: "/trip-details/itinerary",
                                        params: { data: JSON.stringify(tripData?.tripPlan?.travelPlan?.itinerary) }
                                    })} className="flex justify-center items-center bg-sky-300 p-2 w-[40%] rounded-lg">
                                        <Text className="font-[outfit-medium] text-xl">Continue</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}