import React, { useState } from 'react';
import {View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExercises, setSelectedExercises] = useState<Array<{ name: string, sets: string, reps: string }>>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const exercises = [
        'Push-ups', 'Pull-ups', 'Squats', 'Deadlifts', 'Bench Press',
        'Shoulder Press', 'Lunges', 'Rows', 'Plank', 'Bicep Curls',
        'Tricep Extensions', 'Calf Raises', 'Leg Press', 'Lat Pulldowns',
        'Dips', 'Crunches', 'Russian Twists', 'Mountain Climbers'
    ];

    const deleteExercise = (index: number) => {
        const updatedExercises = selectedExercises.filter((_, i) => i !== index);
        setSelectedExercises(updatedExercises);
    };

    const filteredExercises = exercises.filter(exercise =>
        exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addExercise = (exercise: string) => {
        setSelectedExercises([...selectedExercises, {name: exercise, sets: '', reps: ''}]);
        setShowDropdown(false);
        setSearchQuery('');
    };

    const updateExercise = (index: number, field: 'sets' | 'reps', value: string) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index] = {...updatedExercises[index], [field]: value};
        setSelectedExercises(updatedExercises);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Log your workout</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search exercises..."
                    placeholderTextColor="#000"
                    value={searchQuery}
                    onFocus={() => setShowDropdown(true)}
                    onChangeText={setSearchQuery}
                />
                {showDropdown && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={filteredExercises}
                            keyExtractor={(item) => item}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => addExercise(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            <ScrollView style={styles.tableContainer}>
                <View style={[styles.tableRow, styles.headerRow]}>
                    <Text style={[styles.headerExercise, styles.headerText]}>Exercise</Text>
                    <Text style={[styles.headerText, styles.headerText]}>Sets</Text>
                    <Text style={[styles.headerText, styles.headerText]}>Reps</Text>
                </View>

                {selectedExercises.map((exercise, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sets"
                            value={exercise.sets}
                            onChangeText={(value) => updateExercise(index, 'sets', value)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Reps"
                            value={exercise.reps}
                            onChangeText={(value) => updateExercise(index, 'reps', value)}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteExercise(index)}
                        >
                            <Text style={styles.deleteButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    searchContainer: {
        zIndex: 1,
        marginBottom: 16,
        marginTop: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        maxHeight: 200,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tableContainer: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    exerciseName: {
        flex: 2,
        fontSize: 16,
        paddingHorizontal: 4,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginHorizontal: 4,
        height: 40,
    },
    headerRow: {
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        marginBottom: 8,
        paddingRight: 38,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
        flex: 1,
    },
    deleteButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ff4444',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerExercise: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 16,
        flex: 2,
        textAlign: 'left',
        paddingHorizontal: 4,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
});