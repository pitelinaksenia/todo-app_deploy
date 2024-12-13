import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from '../components/TodoList';

const HomeScreen = () => {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);

    //загрузка данных из AsyncStorage при запуске
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const savedTodos = await AsyncStorage.getItem('todos');
                if (savedTodos) setTodos(JSON.parse(savedTodos));
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };
        loadTodos();
    }, []);

    //сохранение данных в AsyncStorage при изменении, каждый раз когда изменяетcя todos
    useEffect(() => {
        const saveTodos = async () => {
            try {
                await AsyncStorage.setItem('todos', JSON.stringify(todos));
            } catch (error) {
                console.error('Ошибка сохранения данных:', error);
            }
        };
        saveTodos();
    }, [todos]);

    const addOrEditTodo = () => {  //добавление и редактирование задач
        if (!text.trim()) return;  //если нет текста, то выходим

        if (editId) {
            setTodos(todos.map(todo => (todo.id === editId ? { ...todo, text } : todo))); //редактирование
            setEditId(null); 
        } else {
            setTodos([...todos, { id: Date.now(), text, completed: false }]);  //добавление
        }

        setText('');
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id, currentText) => {  //устанавливает задачу в режим редактирования
        setEditId(id);
        setText(currentText);
    };

    const toggleCompleteTodo = (id) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={editId ? 'Редактировать задачу' : 'Введите задачу'}
                value={text}
                onChangeText={setText}
            />
            <Button title={editId ? 'Сохранить' : 'Добавить'} onPress={addOrEditTodo} />
            <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} onToggleComplete={toggleCompleteTodo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default HomeScreen;


