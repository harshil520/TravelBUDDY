import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen options={{
        tabBarLabel: "My Trip",
        tabBarIcon: ({ color, size }) => <Ionicons name='location-sharp' size={size} color={color} />
      }} name='mytrip' />
      <Tabs.Screen options={{
        tabBarLabel: "Profle",
        tabBarIcon: ({ color, size }) => <Ionicons name='people-circle' size={size} color={color} />
      }} name='profile' />
    </Tabs>
  )
}