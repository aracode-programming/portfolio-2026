// src/components/atoms/LoadingSpinner.tsx
import { Box, Spinner, Text, HStack, chakra } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// 1. motion.div を chakra でラップして、ChakraのPropsもFramerのPropsも受け取れるコンポーネントを作る
const MotionBox = chakra(motion.div);

interface LoadingSpinnerProps {
isLoading: boolean;
}

export const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => {
    return (
        <AnimatePresence>
        {isLoading && (
            <MotionBox
            // 2. 作成した MotionBox を使うことで、initialなどが型エラーにならず使用可能になります
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            // ChakraのスタイルPropsもそのまま使えます
            position="fixed"
            bottom="24px"
            left="24px"
            zIndex="docked"
            >
            <HStack gap="3">
                <Spinner
                size="sm"
                color="#8A8F98"
                borderWidth="2px"
                animationDuration="0.8s"
                />
                <Text color="#8A8F98" fontSize="xs" letterSpacing="widest">
                LOADING...
                </Text>
            </HStack>
            </MotionBox>
        )}
        </AnimatePresence>
    );
};