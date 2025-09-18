import { createContext, useContext, useState } from 'react';

const BottomSheetContext = createContext(undefined);

export function BottomSheetProvider({ children }) {
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [content, setContent] = useState(null); // store dynamic content

    // Open sheet with optional content
    const openSheet = (data = null) => {
        setContent(data);
        setIsSheetVisible(true);
    };

    const closeSheet = () => {
        setIsSheetVisible(false);
        setContent(null); // clear content when closing
    };

    return (
        <BottomSheetContext.Provider value={{ isSheetVisible, openSheet, closeSheet, content }}>
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
