// src/components/pages/Top.tsx
import { Box, VStack, Heading, Flex } from "@chakra-ui/react";
import { useState, memo, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import WorksScroll from "../organisms/WorksScroll";
import ProfileSection from "../organisms/ProfileSection";
import { TypewriterText } from "../atoms/TypewriterText";
import { useAnimationState } from "../../contexts/AnimationStateContext";
import { AuroraBackground } from "../atoms/AuroraBackground";

// モーションコンポーネントの作成
const MotionHeading = motion.create(Heading);
const MotionFlex = motion.create(Flex);

// --- アニメーション設定 ---

// 1. メインタイトルコンテナ（子要素の出現タイミング管理）
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.4, // 1行目と2行目の出現間隔
        }
    }
};

// 2. テキスト行単体（霧の中から浮かび上がる表現）
const textLineVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40, 
        filter: "blur(10px)",
        scale: 0.95
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        scale: 1,
        transition: { 
            duration: 1.0, 
            ease: [0.16, 1, 0.3, 1] // 高級感のあるイージング
        } 
    }
};

// タイプライター用配列（文字が増えていくアニメーション用）
const SEQ_TITLE = [
    "W", "WE", "WEB", "WEB ", "WEB E", "WEB EN", "WEB ENG", "WEB ENGI", "WEB ENGIN", "WEB ENGINE", "WEB ENGINEER", 
    "WEB ENGINEER ", "WEB ENGINEER &", "WEB ENGINEER & ", "WEB ENGINEER & U", "WEB ENGINEER & UI", 
    "WEB ENGINEER & UI/", "WEB ENGINEER & UI/U", "WEB ENGINEER & UI/UX", "WEB ENGINEER & UI/UX ", 
    "WEB ENGINEER & UI/UX D", "WEB ENGINEER & UI/UX DE", "WEB ENGINEER & UI/UX DES", "WEB ENGINEER & UI/UX DESI", 
    "WEB ENGINEER & UI/UX DESIG", "WEB ENGINEER & UI/UX DESIGN", "WEB ENGINEER & UI/UX DESIGNE", "WEB ENGINEER & UI/UX DESIGNER"
];

const HeroSection = memo(() => {
    const { setIsHeroTypingDone } = useAnimationState();
    const [isTypingDone, setIsTypingDone] = useState(false);

    // タイプライター完了時の処理
    const handleTypingComplete = () => {
        setIsTypingDone(true);
        // 少し遅れて全体完了ステートを更新（他セクションとの連携用）
        setTimeout(() => { setIsHeroTypingDone(true); }, 1000);
    };

    return (
        <Box 
            h="100vh" 
            id="hero" 
            position="relative" 
            overflow="hidden" 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
        >
            <AuroraBackground />
            
            <VStack gap={8} maxW="1200px" w="100%" px={6} zIndex={1}>
                
                {/* 1. 肩書き (Typewriter) - お気に入りの演出 */}
                <Box h="24px" display="flex" alignItems="center">
                    <TypewriterText 
                        sequence={SEQ_TITLE} 
                        color="brand.primary" 
                        fontWeight="bold" 
                        letterSpacing="0.2em" 
                        fontSize={{ base: "xs", md: "sm" }}
                        baseSpeed={25} 
                        startDelay={500} 
                        onComplete={handleTypingComplete} 
                        hideCursorOnComplete={true}
                    />
                </Box>

                {/* 2. メインタイトルエリア */}
                <Box w="100%" minH={{ base: "140px", md: "280px" }}>
                    {isTypingDone && (
                        <MotionFlex
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            direction="column"
                            w="fit-content"
                            mx="auto"
                            gap={{ base: 2, md: 4 }}
                        >
                            {/* 1行目: Design for Trust. (PCでは左寄り) */}
                            <Box 
                                alignSelf={{ base: "center", md: "flex-start" }} 
                                pr={{ base: 4, md: 10, lg: 20 }} // 左にスペースを空けて配置
                            >
                                <MotionHeading
                                    variants={textLineVariants}
                                    as="h1"
                                    fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                                    fontWeight="bold"
                                    lineHeight="1.1"
                                    letterSpacing="-0.02em"
                                    color="brand.text"
                                    textAlign={{ base: "center", md: "left" }}
                                >
                                    Design for <Box as="span" color="brand.primary">Trust.</Box>
                                </MotionHeading>
                            </Box>

                            {/* 2行目: Build for Speed. (PCでは右寄り) */}
                            <Box 
                                alignSelf={{ base: "center", md: "flex-end" }} 
                                pl={{ base: 4, md: 10, lg: 20 }}
                            >
                                <MotionHeading
                                    variants={textLineVariants}
                                    as="h2"
                                    fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                                    fontWeight="bold"
                                    lineHeight="1.1"
                                    letterSpacing="-0.02em"
                                    color="brand.text"
                                    textAlign={{ base: "center", md: "right" }}
                                >
                                    Build for <Box as="span" color="brand.primary">Speed.</Box>
                                </MotionHeading>
                            </Box>
                        </MotionFlex>
                    )}
                </Box>
            </VStack>
        </Box>
    );
});

const Top = memo(() => {
    return (
        <Box>
            <HeroSection />
            <WorksScroll />
            <ProfileSection />
        </Box>
    );
});

export default Top;