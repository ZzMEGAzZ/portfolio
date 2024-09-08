'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import { createWrapper } from 'next-redux-wrapper';

//  how to use //
/// 1. if use persist
/// 1.1. add your persisted reducers to persistedConfig at whitelist
/// 1.2. add your persisted reducers to persistedReducers
/// 2. if use non-persist
/// 2.1. add your non-persisted reducers to nonPersistedReducers

// Module
import alertDialogReducer from './modules/non-persist/alert-dialog/alertDialogSlice';

const persistentConfig = {
    key: 'portfolio',
    storage,
    whitelist: [
        // Add your persisted reducers here using their slice name Ex. 'alertDialog'
    ],
};

// Non-persisted reducers
const nonPersistedReducers = {
    // Add non-persisted reducers here
    alertDialog: alertDialogReducer,
};

// Persisted reducers
const persistedReducers = {
    // Add your persisted reducers here
};

// Root reducer combining both persisted and non-persisted reducers
const rootReducer = combineReducers({
    ...nonPersistedReducers,
    ...persistedReducers,
});

const makeConfiguredStore = (reducer: any) =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    ignoredActionPaths: ['meta.arg', 'payload.timestamp','payload.err'],
                    ignoredPaths: ['items.dates'],
                },
            }),
        devTools: process.env.NODE_ENV !== 'production',
    });

const makeStore = () => {
    if (typeof window === 'undefined') {
        // Server-side
        return makeConfiguredStore(rootReducer);
    } else {
        // Client-side
        const persistedReducer = persistReducer(persistentConfig, rootReducer);
        const store = makeConfiguredStore(persistedReducer);
        // Add persistor to store
        (store as any).__persistor = persistStore(store);
        return store;
    }
};

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// Create and export wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
// Create persistor
export const persistor = persistStore(makeStore());

export const store = makeStore();
