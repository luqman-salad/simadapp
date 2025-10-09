// stores/loadingStore.js
import { create } from 'zustand';

const useLoadingStore = create((set, get) => ({
  // Track loading states for all components
  componentLoadingStates: {},
  
  // Set loading state for a specific component
  setComponentLoading: (componentKey, isLoading) => {
    set((state) => {
      const newLoadingStates = {
        ...state.componentLoadingStates,
        [componentKey]: isLoading
      };
      
      // Check if ANY component is still loading
      const isAppLoading = Object.values(newLoadingStates).some(
        loading => loading === true
      );
      
      return {
        componentLoadingStates: newLoadingStates,
        isAppLoading
      };
    });
  },
  
  // Clear all loading states (useful for refresh)
  clearAllLoadingStates: () => {
    set({ componentLoadingStates: {}, isAppLoading: false });
  },
  
  // Get loading state for a specific component
  getComponentLoading: (componentKey) => {
    return get().componentLoadingStates[componentKey] || false;
  },
  
  isAppLoading: false
}));

export default useLoadingStore;