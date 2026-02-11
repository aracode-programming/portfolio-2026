// src/components/molecules/RevealText.tsx
import { Box, chakra } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const MotionBox = chakra(motion.div);
const MotionSpan = chakra(motion.span);

interface RevealTextProps {
children: string; // 単純化のため文字列のみ受け取る
delay?: number;
duration?: number;
stagger?: number; // 文字ごとの遅延
color?: string;
fontSize?: any;
fontWeight?: any;
letterSpacing?: any;
className?: string; // スタイル拡張用
}

// コンテナの動き
const containerVariants: Variants = {
hidden: { opacity: 0 },
visible: (i = 0) => ({
    opacity: 1,
    transition: {
    staggerChildren: 0.03, // 文字ごとの出現間隔
    delayChildren: i * 0.1, // 全体の開始遅延
    },
}),
};

// 各文字の動き（下から上へ）
const childVariants: Variants = {
hidden: {
    y: "110%", // 枠の外（下）
    opacity: 0,
    rotateX: 90, // 少し回転を加えると立体的になります（お好みで削除可）
},
visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
    type: "spring",
    damping: 20,
    stiffness: 100,
    duration: 0.8, // 文字出現のアニメーション時間
    },
},
};

export const RevealText = ({
children,
delay = 0,
color,
fontSize,
fontWeight,
letterSpacing,
}: RevealTextProps) => {
// 文字列を1文字ずつ分割
const letters = Array.from(children);

return (
    <MotionBox
    display="flex"
    overflow="hidden" // 【重要】枠外を隠す
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    custom={delay} // delayをvariantsに渡す
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    letterSpacing={letterSpacing}
    lineHeight="1.2" // 行送りを調整して見切れを防ぐ
    >
    {letters.map((letter, index) => (
        <MotionSpan key={index} variants={childVariants} display="inline-block">
        {letter === " " ? "\u00A0" : letter}
        </MotionSpan>
    ))}
    </MotionBox>
);
};