import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import interfaceReducer from '../features/interfaceSlice'
import userReducer from '../features/userSlice'
import applicationReducer from '../features/applicationSlice'

export const store = configureStore({
  reducer: {
    interface: interfaceReducer,
    user: userReducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
