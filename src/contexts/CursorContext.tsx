// src/contexts/CursorContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type CursorType = "DEFAULT" | "GO" | "BACK" | string;

interface CursorContextType {
cursorType: CursorType;
setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
const [cursorType, setCursorType] = useState<CursorType>("DEFAULT");

return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
    {children}
    </CursorContext.Provider>
);
};

export const useCursor = () => {
const context = useContext(CursorContext);
if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
}
return context;
};