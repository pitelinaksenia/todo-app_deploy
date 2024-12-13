import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TodoItem = ({ item, onDelete, onEdit, onToggleComplete }) => (
    <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
        <View style={styles.todoItem}>
            <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.text}
            </Text>
            <View style={styles.buttons}>
                <Button title="Редакт." onPress={() => onEdit(item.id, item.text)} />
                <Button title="Удалить" onPress={() => onDelete(item.id)} />
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    todoItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    todoText: { fontSize: 16 },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    buttons: {
        flexDirection: 'row',
        gap: 5,
    },
});

export default TodoItem;


