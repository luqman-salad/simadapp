import { create } from 'zustand';

const useInstitutionsStore = create((set) => ({
    //variables
  selectedInstitutionTitle: null,

    //functions
  setSelectedInstitutionTitle: (item) => set({ selectedInstitutionTitle : item }),
}));

export default useInstitutionsStore;
