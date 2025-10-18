import { create } from 'zustand';

const useInstitutionsStore = create((set) => ({
    //variables
  selectedInstitutionTitle: null,
  selectedInstitutionId: null,

    //functions
  setSelectedInstitutionTitle: (title) => set({ selectedInstitutionTitle: title }),
  setSelectedInstitutionId: (id) => set({ selectedInstitutionId: id }),
}));

export default useInstitutionsStore;