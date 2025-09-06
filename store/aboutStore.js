import { create } from 'zustand';

const useAboutStore = create((set) => ({
    //variables
  selectedAboutItem: null,

    //functions
  setSelectedAboutItem: (item) => set({ selectedAboutItem : item }),
}));

export default useAboutStore;
