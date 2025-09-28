import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@shared/components/Button';
import styles from './ToDo.module.css';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    selected: boolean;
}

const API_URL = 'http://localhost:3001/todos';

const ToDo: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setTodos(res.data))
            .catch(err => console.error(err));
    }, []);

    const addTodo = () => {
        if (!newTodo.trim()) return;
        const todo: Omit<Todo, 'id'> = { text: newTodo, completed: false, selected: false };
        axios.post(API_URL, todo)
            .then(res => setTodos([...todos, res.data]))
            .catch(err => console.error(err));
        setNewTodo('');
    };

    const deleteTodo = (id: number) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(err => console.error(err));
    };

    const deleteSelected = () => {
        const selectedIds = todos.filter(t => t.selected).map(t => t.id);
        Promise.all(selectedIds.map(id => axios.delete(`${API_URL}/${id}`)))
            .then(() => setTodos(todos.filter(t => !t.selected)))
            .catch(err => console.error(err));
    };

    const toggleSelect = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, selected: !todo.selected } : todo
        ));
    };

    // открыть модалку
    const startEditing = (todo: Todo) => {
        setEditingTodo(todo);
        setEditingText(todo.text);
    };

    // сохранить через axios
    const saveEditing = () => {
        if (!editingTodo) return;
        axios.put(`${API_URL}/${editingTodo.id}`, { text: editingText })
            .then(res => {
                setTodos(todos.map(todo => todo.id === editingTodo.id ? res.data : todo));
                setEditingTodo(null);
                setEditingText('');
            })
            .catch(err => console.error(err));
    };

    const cancelEditing = () => {
        setEditingTodo(null);
        setEditingText('');
    };

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Todo List</h1>
            <div className={styles.input_wrapper}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Add Todo"
                    className={styles.input}
                />
                <Button text="ADD" onClick={addTodo} />
                <Button text="Delete Selected" onClick={deleteSelected} />
            </div>

            <ul className={styles.todo_list}>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={`${styles.todo_item} ${todo.selected ? styles.selected : ''}`}
                        onClick={() => toggleSelect(todo.id)}
                    >
                        <div className={styles.wrapper_item}>
                            <span className={styles.todo_item_text}>{todo.text}</span>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startEditing(todo);
                                }}
                                text="Edit"
                            />
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTodo(todo.id);
                                }}
                                text="Delete"
                            />
                        </div>
                    </li>
                ))}
            </ul>
            {editingTodo && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal}>
                        <h2>Edit Todo</h2>
                        <input
                            type="text"
                            value={editingText}
                            onChange={e => setEditingText(e.target.value)}
                            className={styles.modal_input}
                        />
                        <div className={styles.modal_buttons}>
                            <Button text="Save" onClick={saveEditing} />
                            <Button text="Cancel" onClick={cancelEditing} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ToDo;
