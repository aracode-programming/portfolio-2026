// src/components/organisms/SocialLinks.tsx
import { Box, VStack, Link, useBreakpointValue } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaXTwitter, FaLink } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SOCIAL_LINKS = [
{ 
    name: "X", 
    icon: FaXTwitter, 
    url: "https://x.com/iba_arata?s=21&t=hYsaMsOO14N2mz099-f7ig" 
},
{ 
    name: "Instagram", 
    icon: FaInstagram, 
    url: "https://www.instagram.com/aracode.programming?igsh=MWM4dTF2azN4czZkbg%3D%3D&utm_source=qr" 
},
{ 
    name: "Github", 
    icon: FaGithub, 
    url: "https://github.com/aracode-programming?tab=overview&from=2026-02-01&to=2026-02-04" 
},
];

export const SocialLinks = () => {
const isMobile = useBreakpointValue({ base: true, md: false });
const [isOpen, setIsOpen] = useState(false);

// --- PC表示 ---
if (!isMobile) {
    return (
    <Box position="fixed" bottom="10" right="10" zIndex="docked">
        <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        >
        <VStack gap="4">
            {SOCIAL_LINKS.map((link) => (
            <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                color="brand.primary"
                transition="all 0.2s"
                _hover={{ color: "brand.secondary", transform: "scale(1.1)" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="20px"
            >
                <link.icon />
            </Link>
            ))}
        </VStack>
        </motion.div>
    </Box>
    );
}

// --- モバイル表示 ---
return (
    <Box
    position="fixed"
    bottom="6"
    right="6"
    zIndex="docked"
    >
    {/* 【追加】全体を motion.div でラップし、フェードイン＋スケールアニメーションを追加 
        レイアウト用のFlexスタイルもここに移動させます
    */}
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px" // Chakraのgap="3"相当
        }}
    >
        <AnimatePresence>
        {isOpen && (
            <VStack gap="3" mb="2">
            {SOCIAL_LINKS.map((link, index) => (
                <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{
                    delay: (SOCIAL_LINKS.length - 1 - index) * 0.05,
                    duration: 0.2,
                    ease: "easeOut"
                }}
                >
                <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="40px"
                    h="40px"
                    bg="brand.primary"
                    borderRadius="full"
                    boxShadow="lg"
                    _active={{ transform: "scale(0.95)" }}
                    fontSize="20px"
                    color="brand.bg"
                >
                    <link.icon />
                </Link>
                </motion.div>
            ))}
            </VStack>
        )}
        </AnimatePresence>

        {/* トリガーボタン */}
        <Box
        as="button"
        onClick={() => setIsOpen(!isOpen)}
        bg="brand.primary"
        color="brand.bg"
        borderRadius="full"
        w="40px"
        h="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
        transition="all 0.2s"
        _hover={{ opacity: 0.9 }}
        _active={{ transform: "scale(0.95)" }}
        cursor="pointer"
        fontSize="20px"
        >
        <Box 
            as="span"
            display="flex"
            transition="transform 0.2s ease-in-out"
            transform={isOpen ? "rotate(45deg)" : "rotate(0deg)"}
        >
            <FaLink />
        </Box>
        </Box>
    </motion.div>
    </Box>
);
};