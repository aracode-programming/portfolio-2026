// src/components/atoms/CustomCursor.tsx
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom"; // 【追加】ルート検知用
import { useCursor } from "../../contexts/CursorContext";

export const CustomCursor = memo(() => {
// setCursorType を取得
const { cursorType, setCursorType } = useCursor();
const cursorX = useMotionValue(-100);
const cursorY = useMotionValue(-100);
const [isVisible, setIsVisible] = useState(false);

// 【追加】現在のパス（URL）を取得
const location = useLocation();

// モバイルかどうかの判定 (モバイルなら true)
const isMobile = useBreakpointValue({ base: true, md: false });

const springConfig = { damping: 25, stiffness: 100 };
const cursorXSpring = useSpring(cursorX, springConfig);
const cursorYSpring = useSpring(cursorY, springConfig);

// 【追加】ページ遷移（location.pathnameの変化）を検知してカーソルをリセット
useEffect(() => {
    setCursorType("DEFAULT");
}, [location.pathname, setCursorType]);

useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
}, [cursorX, cursorY, isVisible, isMobile]);

if (isMobile || !isVisible) return null;

const isDefault = cursorType === "DEFAULT";
const size = isDefault ? 32 : 80;

return (
    <motion.div
    style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        x: cursorXSpring,
        y: cursorYSpring,
        // @ts-ignore
        translateX: "-50%",
        translateY: "-50%",
    }}
    animate={{
        width: size,
        height: size,
        backgroundColor: isDefault ? "transparent" : "#319795",
        border: isDefault ? "1px solid #319795" : "none",
        opacity: 1,
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        {isDefault ? (
            <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="4px"
            h="4px"
            bg="brand.primary"
            borderRadius="full"
            />
        ) : (
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="widest">
                    {cursorType}
                </Text>
            </Box>
        )}
    </motion.div>
);
});