import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToDo } from "../type";
import { RootState } from "./store";

const STORAGE_KEY = 'todos';

const loadTodos = (): ToDo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

const saveTodos = (todos: ToDo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

export const toDoSlice = createSlice({
  name: 'toDo',
  initialState: {value: loadTodos() },
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: ToDo = {
        id: Math.random(),
        text: action.payload,
        completed: false,
      }
      const newList = [...state.value, newTask]
      state.value = newList;
      saveTodos(newList);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const newList = state.value.filter(task => task.id !== action.payload);
      state.value = newList;
      saveTodos(newList);
    },
    deleteCompleted: state => {
      const newList = state.value.filter(task => task.completed !== true);
      state.value = newList;
      saveTodos(newList);
    },
    toggleTaskStatus: (state, action: PayloadAction<number> ) => {
      const newList = state.value.map(task => task.id === action.payload ? { ...task, completed: !task.completed} : task)
      state.value = newList;
      saveTodos(newList);
    }
  }
})

export const { addTask, deleteTask, deleteCompleted, toggleTaskStatus } = toDoSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.value

export default toDoSlice.reducer;
