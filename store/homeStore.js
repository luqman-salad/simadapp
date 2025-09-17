import { create } from 'zustand';

const useHomeStore = create((set) => ({
    //variables
    selectedHomeItem: null,

    //functions
    setselectedHomeItem: (item) => set({ selectedHomeItem: item }),
}));

export default useHomeStore;
