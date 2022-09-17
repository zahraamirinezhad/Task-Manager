import { createSlice, configureStore } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'task',
  initialState: { tasks: [], tasksNum: 0 },
  reducers: {
    addTask(state, action) {
      const newItem = action.payload
      const existingItem = state.tasks.find(
        (item) => item.title === newItem.title,
      )

      if (!existingItem) {
        state.tasksNum++
        state.tasks.push({
          id: newItem.id,
          title: newItem.title,
          date: newItem.date,
          details: newItem.details,
        })
      }
    },
    deleteTask(state, action) {
      const newItem = action.payload
      const existingItem = state.tasks.find(
        (item) => item.title === newItem.title,
      )

      if (existingItem) {
        state.tasksNum--
        state.tasks = state.tasks.filter((task) => task.title !== newItem.title)
      }
    },
    editTask(state, action) {
      const newItem = action.payload
      const existingItem = state.tasks.find(
        (item) => item.title === newItem.title,
      )

      if (existingItem) {
        state.tasks = state.tasks.filter((task) => task.title !== newItem.title)
        state.tasks.push(newItem)
      }
    },
  },
})

export const taskActions = taskSlice.actions

const store = configureStore({
  reducer: { task: taskSlice.reducer },
})

export default store
