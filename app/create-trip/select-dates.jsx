import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CalendarPicker from "react-native-calendar-picker";
import { useRouter } from 'expo-router';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
    const router = useRouter();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    const onDateSelectionContinue = () => {
        if (!startDate || !endDate) {
            ToastAndroid.show("Please select start and end date.", ToastAndroid.BOTTOM);
            return;
        }
        const totalDays = endDate.diff(startDate, 'days') + 1;
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalDays: totalDays
        });

        router.push("/create-trip/select-budget");
    }
    const onDateChange = (date, type) => {
        if (type == "START_DATE") {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    }
    return (
        <SafeAreaView className="p-3 h-screen">
            <Text className="font-[outfit-bold] text-3xl my-5">Travel Dates</Text>
            <CalendarPicker selectedRangeStyle={{ backgroundColor: "skyblue" }} maxRangeDuration={6} minDate={new Date()} allowRangeSelection onDateChange={onDateChange} />
            <TouchableOpacity onPress={onDateSelectionContinue} className="rounded-xl flex justify-center items-center border h-11 bg-black absolute bottom-0 w-full self-center">
                <Text className="text-white">Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}