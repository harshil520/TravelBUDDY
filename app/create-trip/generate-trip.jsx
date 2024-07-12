import { Text, Image, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import { chatSession } from '../../config/AiModel';
import { useRouter } from 'expo-router';
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebaseConfig";

export default function GenerateTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        generateAITrip();
    }, []);


    const generateAITrip = async () => {
        try {
            const AI = process.env.EXPO_PUBLIC_AI;
            const final_prompt = AI.replace('{from}', tripData?.locationInfo?.from).
                replace('{to}', tripData?.locationInfo?.to).
                replace('{totalDays}', tripData?.totalDays).
                replace('{totalNight}', tripData?.totalDays - 1).
                replace('{traveler}', tripData?.traveler?.title).
                replace('{budget}', tripData?.budget).
                replace('{totalDays}', tripData?.totalDays).
                replace('{totalNight}', tripData?.totalDays - 1).
                replace('{destination}', tripData?.locationInfo?.to).
                replace('{startDay}', moment(tripData?.startDate).format("DD/MM/YYYY")).
                replace('{endDay}', moment(tripData?.endDate - 1).format('DD/MM/YYYY'));

            const result = await chatSession.sendMessage(final_prompt);
            const res = JSON.parse(result.response.text());

            const docID = (Date.now()).toString();
            const result_ = await setDoc(doc(db, "UserTrips", docID), {
                userEmail: user.email,
                tripData: {
                    to: tripData?.locationInfo?.to,
                    from: tripData?.locationInfo?.from,
                    traveler: tripData?.traveler.title,
                    startDate: JSON.stringify(moment(tripData?.startDate).format("DD MMM YYYY")),
                    endDate: JSON.stringify(moment(tripData?.endDate).format("DD MMM YYYY")),
                    totalDays: tripData?.totalDays,
                    budget: tripData?.budget
                },
                tripPlan: res,
                docID: docID
            });

            // router.dismissAll();
            router.replace("(tabs)/mytrip");

        } catch (error) {
            ToastAndroid.show("Error, please try again.", ToastAndroid.BOTTOM);
            router.replace("(tabs)/mytrip");
        }
    }

    return (
        <SafeAreaView className="flex justify-center items-center h-screen">
            <Text className="font-[outfit-bold] text-4xl text-center animate-pulse">Please wait...</Text>
            <Text className="font-[outfit-medium] text-lg text-center">We are working on to generating your desired trip.</Text>
            <Image className="self-center" source={require("../../assets/images/loading-animation.gif")} />
            <Text className="font-[outfit-bold] text-gray-400 text-lg text-center">Do not go back</Text>
        </SafeAreaView>
    )
}