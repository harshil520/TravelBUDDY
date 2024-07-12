import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import StartNewTripCard from '../../components/Mytrips/StartNewTripCard';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import UserTripList from '../../components/Mytrips/UserTripList';
import { router } from 'expo-router';

export default function MyTrip() {
    const user = auth.currentUser;

    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        user && GetMyTrips();
    }, [user]);

    const GetMyTrips = async () => {
        try {
            setLoading(true);
            setUserTrips([]);
            const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc) => {
                setUserTrips(prev => [...prev, doc.data()]);
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex justify-between items-center flex-row p-3">
                    <Text className="font-[outfit-bold] text-3xl">My Trips</Text>
                    <TouchableOpacity onPress={() => router.push("/create-trip/search-place")}>
                        <Ionicons name='add-circle' color={"black"} size={50} />
                    </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator size={'large'} />}
                {!loading && (
                    userTrips?.length == 0 ?
                        <StartNewTripCard /> : <UserTripList userTrips={userTrips} />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}