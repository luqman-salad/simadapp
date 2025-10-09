// hooks/useGlobalLoading.js
import { useEffect } from 'react';
import useLoadingStore from '../store/loadingStore';

export const useGlobalLoading = (componentKey, isLoading) => {
  const { setComponentLoading } = useLoadingStore();
  
  useEffect(() => {
    // Set the loading state for this component
    setComponentLoading(componentKey, isLoading);
    
    return () => {
      // Cleanup when component unmounts
      setComponentLoading(componentKey, false);
    };
  }, [isLoading, componentKey, setComponentLoading]);
};