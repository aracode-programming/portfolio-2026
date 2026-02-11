// src/components/pages/NotFound.tsx
import { Box, Heading, Text, Button, VStack, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { useCursor } from "../../contexts/CursorContext";

// 背景装飾用のモーションコンポーネント
const MotionBox = motion.create(Box);

// アニメーションアイコンコンポーネント（洗練されたティール色の光とコンパス）
const NotFoundIcon = () => {
const tealColor = "#319795"; // ブランドカラー(teal.500)

return (
    <Box w="120px" h="120px" position="relative" mb={6}>
    <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* 外側に広がる波紋アニメーション (1つ目) */}
        <motion.circle
        cx="50" cy="50" r="20"
        stroke={tealColor} strokeWidth="1.5" fill="none"
        animate={{ r: [20, 48], opacity: [0.8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        {/* 外側に広がる波紋アニメーション (2つ目 - 遅延させて連続性を出す) */}
        <motion.circle
        cx="50" cy="50" r="20"
        stroke={tealColor} strokeWidth="1.5" fill="none"
        animate={{ r: [20, 48], opacity: [0.8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
        />

        {/* 中心でゆっくり回転・明滅するコンパスの針のような要素 */}
        <motion.g
        transform="translate(50, 50)"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
        <motion.path
            d="M0 -18 L4 0 L0 4 L-4 0 Z" // シャープなひし形
            fill={tealColor}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* 中心の点 */}
        <circle cx="0" cy="0" r="2.5" fill={tealColor} />
        </motion.g>
    </svg>
    </Box>
);
};

const NotFound = () => {
const { setCursorType } = useCursor();

return (
    <Flex
    h="100vh"
    w="100%"
    align="center"
    justify="center"
    bg="white"
    position="relative"
    overflow="hidden"
    >
    <VStack gap={8} px={4} textAlign="center" zIndex={1} maxW="600px">
        {/* アニメーションアイコン */}
        <NotFoundIcon />

        {/* メッセージ */}
        <VStack gap={3}>
        <Heading as="h1" size="2xl" color="brand.text" letterSpacing="tight" fontWeight="bold">
            404 Not Found
        </Heading>
        <Text color="gray.600" fontSize="lg" lineHeight="1.8">
            お探しのページは見つかりませんでした。<br />
            URLが間違っているか、ページが移動または削除された可能性があります。
        </Text>
        </VStack>

        <RouterLink to="/">
            <Button
                size="lg"
                bg="brand.primary"
                color="white"
                _hover={{ bg: "teal.600", transform: "translateY(-2px)", boxShadow: "lg" }}
                onMouseEnter={() => setCursorType("GO")}
                onMouseLeave={() => setCursorType("DEFAULT")}
                transition="all 0.3s"
                boxShadow="md"
                px={8}
                h="56px"
            >
                <Box as="span" mr={2} display="flex" alignItems="center">
                    <FaHome />
                </Box>
                トップページへ戻る
            </Button>
        </RouterLink>
    </VStack>

    <MotionBox
        position="absolute"
        top="10%" left="50%"
        transform="translateX(-50%)"
        w="800px" h="800px"
        bg="brand.primary"
        opacity="0.03"
        borderRadius="full"
        filter="blur(100px)"
        zIndex={0}
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    </Flex>
);
};

export default NotFound;