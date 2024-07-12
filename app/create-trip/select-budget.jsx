import { Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { selectBudgetOption } from '../../constants/BudgetOption'
import TravelerOptionCard from "../../components/Mytrips/TravelerOptionCard"
import { useRouter } from 'expo-router'
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectBudget() {
    const [selectedBudget, setSelectedBudget] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    const clickContinue = () => {
        if (!selectedBudget) {
            ToastAndroid.show("Please select your budget.", ToastAndroid.BOTTOM);
            return;
        }

        router.push("/create-trip/review-trip");
    }

    useEffect(() => {
        selectedBudget && setTripData({
            ...tripData,
            budget: selectedBudget?.title
        })
    }, [selectedBudget]);

    return (
        <SafeAreaView className="p-3 h-screen">
            <Text className="font-[outfit-bold] text-3xl mt-2">Budget</Text>
            <Text className="font-[outfit-medium] text-lg mb-5">Choose spending habits for your trip.</Text>
            <FlatList
                data={selectBudgetOption}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => setSelectedBudget(item)}>
                            <TravelerOptionCard data={item} selectedTraveler={selectedBudget} />
                        </TouchableOpacity>
                    )
                }}
            />

            <TouchableOpacity onPress={() => clickContinue()} className="rounded-xl flex justify-center absolute bottom-0 items-center bg-black h-11 w-full self-center">
                <Text className="text-white text-lg font-[outfit]">Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}