import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Undergratuate from './Undergratuate';
import Postgratuate from './Postgratuate';
import SimadOlearn from './SimadOlearn';
import useTheme from '../hooks/usetheme';
import { getProgramsCategories } from '../apis/academicProgramsApi';
import { useGlobalLoading } from '../hooks/useGlobalLoading'; 

const Tab = createMaterialTopTabNavigator();

function MyTabs({ componentKey = "programs", refreshTrigger = 0 }) {
  
    const { colors } = useTheme();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Connect to global loading state
    useGlobalLoading(componentKey, loading);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getProgramsCategories();
            
            if (result?.success && result.data?.categories) {
                setCategories(result.data.categories);
            } else {
                throw new Error('Invalid data structure from API');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [refreshTrigger]); // Add refreshTrigger to dependencies

    // Function to get the appropriate component for each category
    const getCategoryComponent = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case 'undergraduate':
                return Undergratuate;
            case 'postgraduate':
                return Postgratuate;
            case 'olearn':
                return SimadOlearn;
            default:
                return Undergratuate; // fallback
        }
    };

    // Remove individual loading display - global overlay handles it
    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={[styles.errorText, { color: colors.error }]}>
                    Failed to load programs
                </Text>
                <Text style={[styles.errorDetail, { color: colors.text }]}>
                    {error}
                </Text>
            </View>
        );
    }

    if (categories.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={[styles.emptyText, { color: colors.text }]}>
                    No program categories available
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    swipeEnabled: false,
                    tabBarActiveTintColor: colors.text,
                    tabBarInactiveTintColor: colors.textMuted,
                    elevation: 0,
                    shadowOpacity: 0,
                    tabBarLabelStyle: { 
                        fontSize: 13,
                        fontWeight: 'bold'
                    },
                    tabBarIndicatorStyle: { 
                        backgroundColor: colors.primary
                    },
                    tabBarStyle: { 
                        backgroundColor: colors.bg,
                        elevation: 0,
                        shadowOffset: 0,
                        shadowOpacity: 0,
                    },
                }}
            >
                {categories.map((category) => (
                    <Tab.Screen 
                        key={category._id}
                        name={category.name}
                        component={getCategoryComponent(category.name)}
                        initialParams={{ categoryId: category._id }}
                    />
                ))}
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    errorDetail: {
        fontSize: 14,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default MyTabs;