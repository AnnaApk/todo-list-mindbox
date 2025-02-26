import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './toDoSlice'

export const store = configureStore({ 
  reducer: {
    tasks: ToDoReducer,
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]