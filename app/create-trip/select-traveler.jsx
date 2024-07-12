import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { selectTravelerList } from '../../constants/TravelerOption'
import TravelerOptionCard from '../../components/Mytrips/TravelerOptionCard'
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router'

export default function SelectTraveler() {
    const [selectedTraveler, setSelectedTraveler] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        setTripData({
            ...tripData,
            traveler: selectedTraveler
        })
    }, [selectedTraveler]);


    return (
        <SafeAreaView className="p-3 h-screen">
            <Text className="font-[outfit-bold] text-3xl my-3">Who's Travelling?</Text>
            <Text className="font-[outfit] text-xl mb-2">Choose your Traveler</Text>
            <FlatList
                data={selectTravelerList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => setSelectedTraveler(item)}>
                            <TravelerOptionCard data={item} selectedTraveler={selectedTraveler} />
                        </TouchableOpacity>
                    )
                }}
            />
            <TouchableOpacity onPress={() => {
                if (!selectedTraveler) {
                    ToastAndroid.show("Please select traveler.", ToastAndroid.BOTTOM);
                    return;
                }
                router.push("/create-trip/select-dates");
            }} className="rounded-xl flex justify-center absolute bottom-0 items-center bg-black h-11 w-full self-center">
                <Text className="text-white text-lg font-[outfit]">Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}