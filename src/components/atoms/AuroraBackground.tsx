// src/components/atoms/AuroraBackground.tsx
import { Box } from "@chakra-ui/react";
import { motion, Easing } from "framer-motion";

const MotionBox = motion.create(Box);

export const AuroraBackground = () => {
// アニメーション設定
const blobAnimate = {
    x: [0, 100, -100, 0],
    y: [0, -50, 50, 0],
    scale: [1, 1.3, 0.8, 1],
    rotate: [0, 45, -45, 0],
};

const getTransition = (delay: number, duration: number) => ({
    duration: duration,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as Easing,
    delay: delay,
});

return (
    <Box
    position="absolute"
    top={0}
    left={0}
    w="100%"
    h="100%"
    overflow="hidden"
    // 【修正】 -1 だと bodyの背景色に隠れることがあるため 0 に変更
    zIndex={0} 
    // 【修正】 テーマ依存を避けるため一旦 white (必要に応じて brand.bg に戻してください)
    bg="white" 
    >
    {/* 1. ノイズテクスチャ */}
    <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.4}
        zIndex={1}
        pointerEvents="none"
        style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
    />

    {/* 2. 光のオーロラ (Blur Blobs) */}
    <Box position="relative" w="100%" h="100%" filter="blur(80px)">
        {/* Tealの光 (メイン) */}
        <MotionBox
        animate={blobAnimate}
        transition={getTransition(0, 15)}
        position="absolute"
        top="-10%"
        left="10%"
        w="60vw"
        h="60vw"
        bg="brand.primary"
        // 【修正】視認性を上げるため 0.3 -> 0.4 にアップ
        opacity={0.4} 
        borderRadius="full"
        />

        {/* Blueの光 (深み) */}
        <MotionBox
        animate={blobAnimate}
        transition={getTransition(2, 20)}
        position="absolute"
        top="30%"
        right="-10%"
        w="50vw"
        h="50vw"
        bg="blue.300"
        // 【修正】視認性を上げるため 0.25 -> 0.35 にアップ
        opacity={0.35} 
        borderRadius="full"
        />

        {/* Gray/Whiteの光 (抜け感) */}
        <MotionBox
        animate={blobAnimate}
        transition={getTransition(5, 18)}
        position="absolute"
        bottom="-20%"
        left="20%"
        w="70vw"
        h="70vw"
        bg="gray.100"
        // 【修正】少し濃くして存在感を出す
        opacity={0.8} 
        borderRadius="full"
        />
    </Box>
    </Box>
);
};