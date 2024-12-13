import React from 'react';
import { FlatList } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => (
    <FlatList
        data={todos} 
        renderItem={({ item }) => (
            <TodoItem
                item={item}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleComplete={onToggleComplete}
            />
        )}
        keyExtractor={(item) => item.id.toString()}
    />
);

export default TodoList;

