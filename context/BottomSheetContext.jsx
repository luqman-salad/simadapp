// context/BottomSheetContext.js
import { createContext, useContext, useState } from 'react';

const BottomSheetContext = createContext(undefined);

export function BottomSheetProvider({ children }) {
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [content, setContent] = useState(null);
    const [sheetType, setSheetType] = useState(null); // <-- new

    const openSheet = (type, data = null) => {
        setSheetType(type); // e.g. "programs" or "partner"
        setContent(data);
        setIsSheetVisible(true);
    };

    const closeSheet = () => {
        setIsSheetVisible(false);
        setContent(null);
        setSheetType(null);
    };

    return (
        <BottomSheetContext.Provider
            value={{ isSheetVisible, openSheet, closeSheet, content, sheetType }}
        >
            {children}
        </BottomSheetContext.Provider>
    );
}

export const useBottomSheet = () => {
    const context = useContext(BottomSheetContext);
    if (context === undefined) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};
