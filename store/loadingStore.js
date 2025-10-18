// store/loadingStore.js
import { create } from 'zustand';

const useLoadingStore = create((set, get) => ({
    componentLoading: {},
    globalError: null,
    retryCallback: null,
    
    setComponentLoading: (componentKey, isLoading) => 
        set((state) => {
            const newComponentLoading = {
                ...state.componentLoading,
                [componentKey]: isLoading
            };
            
            // Calculate isAppLoading based on any component loading
            const isAppLoading = Object.values(newComponentLoading).some(loading => loading);
            
            return {
                componentLoading: newComponentLoading,
                isAppLoading
            };
        }),
    
    setAppLoading: (isLoading) => 
        set({ isAppLoading: isLoading }),
    
    setGlobalError: (error, retryCallback = null) =>
        set({ 
            globalError: error,
            retryCallback,
            // Don't set isAppLoading to false here - let individual components control it
        }),
    
    clearGlobalError: () =>
        set({ 
            globalError: null,
            retryCallback: null 
        }),
    
    clearAllLoadingStates: () => 
        set({ 
            componentLoading: {}, 
            isAppLoading: false,
            globalError: null,
            retryCallback: null
        }),
    
    getAnyComponentLoading: (state) => 
        Object.values(state.componentLoading).some(loading => loading),
}));

export default useLoadingStore;