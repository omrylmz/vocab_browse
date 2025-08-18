import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BrowseScreen from '~/screens/BrowseScreen';
import LearningListScreen from '~/screens/LearningListScreen';
import LearnedListScreen from '~/screens/LearnedListScreen';
import WordDetailScreen from '~/screens/WordDetailScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '~/theme';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNav() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
                tabBarActiveTintColor: theme.colors.text,
                tabBarInactiveTintColor: theme.colors.dim,
            }}
        >
            <Tabs.Screen
                name="BrowseTab"
                component={BrowseScreen}
                options={{
                    title: 'Browse',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="menu-book" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="LearningTab"
                component={LearningListScreen}
                options={{
                    title: 'Learning',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="bookmark-added" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="LearnedTab"
                component={LearnedListScreen}
                options={{
                    title: 'Learned',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="check-circle" color={color} size={size} />,
                }}
            />
        </Tabs.Navigator>
    );
}

export default function RootNavigator() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.card },
                    headerTintColor: theme.colors.text,
                    contentStyle: { backgroundColor: theme.colors.bg },
                    animation: Platform.select({ ios: 'slide_from_right', default: 'default' }),
                }}
            >
                <Stack.Screen name="Root" component={TabsNav} options={{ headerShown: false }} />
                <Stack.Screen name="WordDetail" component={WordDetailScreen} options={{ title: 'Word' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
