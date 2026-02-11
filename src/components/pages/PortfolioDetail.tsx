import { 
    Box, Heading, Text, VStack, HStack, Image, Button, 
    SimpleGrid, Flex, IconButton, useBreakpointValue 
} from "@chakra-ui/react"; // AspectRatio は使わなくなったので削除してもOK
import { useParams, Link as RouterLink } from "react-router-dom";
import { FaExternalLinkAlt, FaArrowLeft, FaPaperPlane, FaChevronDown } from "react-icons/fa";
// framer-motion の AnimatePresence, PanInfo など、カルーセルでのみ使っていたものは削除OK
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SectionWrapper } from "../molecules/SectionWrapper";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { useCursor } from "../../contexts/CursorContext";
import { PortfolioDetailCarousel } from "../organisms/PortfolioDetailCarousel";
import { Seo } from '../utils/Seo';


// --- コンポーネント: 戻るボタン ---
const BackButton = () => {
    const { setCursorType } = useCursor();
    return (
        <Box 
            position="fixed" 
            top={{ base: 4, md: 10 }} 
            left={{ base: 4, md: 10 }} 
            zIndex="sticky"
        >
            <RouterLink to="/">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    color="gray.500"
                    _hover={{ color: "brand.primary", bg: "whiteAlpha.800" }}
                    onMouseEnter={() => setCursorType("BACK")}
                    onMouseLeave={() => setCursorType("DEFAULT")}
                    bg="whiteAlpha.600"
                    backdropFilter="blur(4px)"
                    boxShadow="sm"
                >
                    <Box as="span" mr={2} display="flex" alignItems="center"><FaArrowLeft /></Box>
                    トップに戻る
                </Button>
            </RouterLink>
        </Box>
    );
};

// --- コンポーネント: 制作者コメント (チャット風) ---
const ChatComment = ({ comment }: { comment: string }) => {
    return (
        <Flex w="100%" align="flex-start" gap={6}>
            <Box 
                w="60px" h="60px" 
                borderRadius="full" 
                overflow="hidden" 
                flexShrink={0} 
                boxShadow="lg"
                border="2px solid white"
            >
                <Image src="/images/profile/profileImage.webp" w="100%" h="100%" objectFit="cover" />
            </Box>
            
            <Box 
                bg="brand.gradation" 
                color="white" 
                p={6} 
                borderRadius="2xl" 
                fontSize="md"
                lineHeight="1.8"
                boxShadow="lg"
                maxW="600px"
                position="relative"
                _before={{
                    content: '""',
                    position: "absolute",
                    left: "-10px",
                    top: "20px",
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderRight: "10px solid #319795",
                }}
            >
                <Text>{comment}</Text>
            </Box>
        </Flex>
    );
};

// --- サブコンポーネント: スムーズなアコーディオンアイテム ---
const SmoothAccordionItem = ({ label, value }: { label: string, value: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box borderBottom="1px solid" borderColor="gray.100">
            <Flex 
                as="button" 
                w="100%" 
                py={4} 
                align="center" 
                justify="space-between" 
                onClick={() => setIsOpen(!isOpen)}
                _hover={{ bg: "gray.50" }}
                textAlign="left"
                _focusVisible={{outline: "none"}}
            >
                <Text fontSize="md" fontWeight="bold" letterSpacing="widest" color="gray.500">
                    {label}
                </Text>
                <Box 
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"} 
                    transition="transform 0.3s ease"
                    color="gray.400"
                    fontSize="sm"
                >
                    <FaChevronDown />
                </Box>
            </Flex>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <Box pb={4}>
                            <Box p={4} bg="brand.accent" borderRadius="sm">
                                <Text fontSize="sm" color="gray.700" fontWeight="medium" lineHeight="1.6">
                                    {value}
                                </Text>
                            </Box>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

// --- コンポーネント: スペックリスト ---
const SpecsList = ({ specs }: { specs: any }) => {
    const specData = [
        { label: "プロジェクトタイプ", value: specs.type },
        { label: "制作ページ数", value: specs.pageCount },
        { label: "制作ページ一覧", value: specs.pageList.join(" / ") },
        { label: "技術スタック", value: specs.scope.join(" / ") },
    ];

    return (
        <Box borderTop="1px solid" borderColor="gray.200">
            {/* PC: リスト表示 */}
            <Box display={{ base: "none", md: "block" }}>
                {specData.map((item) => (
                    <Flex key={item.label} py={6} borderBottom="1px solid" borderColor="gray.200" align="baseline">
                        <Text w="200px" fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.400">
                            {item.label}
                        </Text>
                        <Text flex={1} fontSize="md" color="gray.700" fontWeight="medium">
                            {item.value}
                        </Text>
                    </Flex>
                ))}
            </Box>

            {/* Mobile: スムーズなアコーディオン (Framer Motion) */}
            <Box display={{ base: "block", md: "none" }}>
                {specData.map((item) => (
                    <SmoothAccordionItem key={item.label} label={item.label} value={item.value} />
                ))}
            </Box>
        </Box>
    );
};

// --- コンポーネント: フッター誘導エリア ---
const FooterCta = () => {
    return (
        <Box mt={20} py={20} bg="gray.50" borderRadius="xl" textAlign="center" px={6}>
            <VStack gap={8}>
                <Box>
                    <Heading size="lg" mb={4} color="brand.text">
                        お仕事のご依頼
                    </Heading>
                    <Text color="gray.600">
                        制作のご依頼、ご相談はお気軽にお問い合わせください。<br />
                        ココナラ経由でのご依頼も承っております。
                    </Text>
                </Box>

                <Flex gap={4} direction={{ base: "column", sm: "row" }} w="100%" justify="center">
                    {/* お問い合わせ */}
                    <a
                        href="https://www.instagram.com/aracode.programming?igsh=MWM4dTF2azN4czZkbg%3D%3D&utm_source=qr"
                        target="_blank"
                    >
                        <Button
                            size="lg"
                            colorScheme="teal"
                            bg="brand.primary"
                            color="white"
                            _hover={{ bg: "teal.600" }}
                            px={8}
                            w="100%"
                        >
                            <Box as="span" mr={2} display="flex" alignItems="center"><FaPaperPlane /></Box>
                            インスタグラムでDM
                        </Button>
                    </a>

                    {/* ココナラ */}
                    <a 
                        href="https://coconala.com/services/4005291" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            colorScheme="teal"
                            borderColor="brand.primary"
                            color="brand.primary"
                            _hover={{ bg: "brand.primary", color: "white" }}
                            px={8}
                            w="100%"
                        >
                            <Box as="span" mr={2} display="flex" alignItems="center"><FaExternalLinkAlt /></Box>
                            ココナラサービス
                        </Button>
                    </a>
                </Flex>
            </VStack>
        </Box>
    );
};

// --- メイン: 実績詳細ページ ---
const PortfolioDetail = () => {
    const { id } = useParams();
    const { setCursorType } = useCursor();

    const project = PORTFOLIO_DATA.find((item) => item.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <Flex h="100vh" justify="center" align="center" direction="column" gap={4}>
                <Heading>Project Not Found</Heading>
                <RouterLink to="/"><Button>Topへ戻る</Button></RouterLink>
            </Flex>
        );
    }

    return (
        <Box w="100%" bg="white" minH="100vh" pb={40}>
            <Seo 
                title={project.title}
                description={`${project.title}の制作実績詳細。${project.description.slice(0, 80)}...`}
                path={`/portfolio/${project.id}`}
                ogImage={project.images[0]?.pc} // 最初の画像をSNSシェア画像にする
            />
            <BackButton />
            <SectionWrapper>
                <VStack align="stretch" gap={{ base: 16, md: 24 }}>
                    
                    {/* 1. Header Area */}
                    <Box pt={{ base: 12, md: 0 }} maxW="1000px">
                        <Text 
                            fontSize="xs" fontWeight="bold" letterSpacing="widest" 
                            color="brand.primary" mb={4}
                            display="flex" alignItems="center" gap={2}
                        >
                            <Box w="20px" h="1px" bg="brand.primary" />
                            PROJECT DETAIL
                        </Text>
                        
                        <Heading 
                            as="h1" 
                            size={{ base: "2xl", md: "3xl" }} 
                            lineHeight="1.1" 
                            mb={4}
                            letterSpacing="tight"
                        >
                            {project.title}<br />
                            <Box as="span" fontSize="0.5em" color="gray.500" fontWeight="normal">
                                {project.subtitle}
                            </Box>
                        </Heading>

                        <Text fontSize="md" color="gray.500" fontFamily="monospace">
                            制作期間: {project.period}
                        </Text>
                    </Box>

                    {/* 2. Carousel */}
                    <PortfolioDetailCarousel images={project.images} />

                    {/* 3. Link & Description */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
                        <Box>
                            <Heading size="md" mb={6}>概観</Heading>
                            <Text lineHeight="1.8" color="gray.600" mb={8}>
                                {project.description}
                            </Text>
                            
                            <a 
                                href={project.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block', width: '100%' }}
                            >
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    color="brand.primary" 
                                    borderColor="brand.primary"
                                    h="60px"
                                    w={{ base: "100%", md: "auto" }}
                                    px={10}
                                    _hover={{ bg: "brand.primary", color: "white" }}
                                    onMouseEnter={() => setCursorType("GO")}
                                    onMouseLeave={() => setCursorType("DEFAULT")}
                                >
                                    <Box as="span" mr={2} display="flex" alignItems="center"><FaExternalLinkAlt /></Box>
                                    実際にWebサイトを見る
                                </Button>
                            </a>
                        </Box>
                    </SimpleGrid>

                    {/* 4. PV Video */}
                    {/* <Box w="100%">
                        <Heading size="md" mb={6}>Motion & Interaction</Heading>
                        <AspectRatio ratio={16 / 9} w="100%" bg="gray.100" borderRadius="lg" overflow="hidden">
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" color="gray.400">
                                <Text fontWeight="bold">PV VIDEO</Text>
                                <Text fontSize="sm">Animation Preview</Text>
                            </Box>
                        </AspectRatio>
                    </Box> */}

                    {/* 5. Developer's Comment */}
                    <Box>
                        <Heading size="md" mb={8}>プロジェクトを制作で感じたこと</Heading>
                        <ChatComment comment={project.comment} />
                    </Box>

                    {/* 6. Specs List */}
                    <Box>
                        <Heading size="md" mb={4} display={{ base: "block", md: "none" }}>プロジェクト詳細</Heading>
                        <SpecsList specs={project.specs} />
                    </Box>

                    {/* 7. Footer CTA */}
                    <FooterCta />

                </VStack>
            </SectionWrapper>
        </Box>
    );
};

export default PortfolioDetail;