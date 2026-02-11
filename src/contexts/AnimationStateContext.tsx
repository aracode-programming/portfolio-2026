// src/contexts/AnimationStateContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AnimationStateContextType {
isHeroTypingDone: boolean;
setIsHeroTypingDone: (done: boolean) => void;
}

const AnimationStateContext = createContext<AnimationStateContextType | undefined>(undefined);

export const AnimationStateProvider = ({ children }: { children: ReactNode }) => {
const [isHeroTypingDone, setIsHeroTypingDone] = useState(false);

return (
    <AnimationStateContext.Provider value={{ isHeroTypingDone, setIsHeroTypingDone }}>
    {children}
    </AnimationStateContext.Provider>
);
};

export const useAnimationState = () => {
const context = useContext(AnimationStateContext);
if (!context) {
    throw new Error("useAnimationState must be used within a AnimationStateProvider");
}
return context;
};