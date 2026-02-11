// src/components/organisms/HeaderSection.tsx
import { Box, Heading, VStack, chakra } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { RevealText } from "../molecules/RevealText"; // 以前作成したコンポーネントを使用
import { useAnimationState } from "../../contexts/AnimationStateContext";

export const HeaderSection = () => {
    // Contextからアニメーション完了状態を取得
    const { isHeroTypingDone } = useAnimationState();

    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            left={0}
            p={{ base: 6, md: 10 }}
            zIndex="sticky"
            w="auto"
            pointerEvents={isHeroTypingDone ? "auto" : "none"} // 表示されるまでクリック不可
        >
            {/* 条件付きレンダリング:
            isHeroTypingDone が true になった瞬間にコンポーネントがマウントされ、
            RevealTextの initial="hidden" -> animate="visible" が走り出します。
            */}
            {isHeroTypingDone && (
                <VStack align="flex-start" gap={1}>
                    {/* 1. ロゴ */}
                    <RouterLink to="/">
                        <Heading as="div" fontWeight="bold" letterSpacing="tight" color="brand.primary" cursor="pointer">
                            <RevealText delay={0} fontSize={{base: "lg", md: "2xl"}} fontWeight="bold" letterSpacing="tight">
                                aracode
                            </RevealText>
                        </Heading>
                    </RouterLink>

                    {/* 2. サブタイトル */}
                    <Box mt={2}>
                        <RevealText delay={0.4} color="brand.subText" fontSize="xs" fontWeight="medium" letterSpacing="wide">
                            Web engineers and
                        </RevealText>
                        <RevealText delay={0.6} color="brand.subText" fontSize="xs" fontWeight="medium" letterSpacing="wide">
                            UI/UX designers
                        </RevealText>
                    </Box>
                </VStack>
            )}
        </Box>
    );
};