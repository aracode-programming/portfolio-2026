import { 
Box, 
Flex, 
Image, 
IconButton, 
HStack, 
useBreakpointValue,
VStack
} from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageType = {
pc: string;
sp: string;
};

type Props = {
images: ImageType[];
};

export const PortfolioDetailCarousel = ({ images }: Props) => {
const scrollContainerRef = useRef<HTMLDivElement>(null);
const [currentIndex, setCurrentIndex] = useState(0);

// JSでの判定（ナビゲーション表示用）
const isPC = useBreakpointValue({ base: false, md: true });

const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    if (width === 0) return;
    const index = Math.round(scrollLeft / width);
    if (index !== currentIndex && index >= 0 && index < images.length) {
    setCurrentIndex(index);
    }
};

const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    if (index < 0 || index >= images.length) return;
    const container = scrollContainerRef.current;
    const width = container.offsetWidth;
    container.scrollTo({ left: width * index, behavior: 'smooth' });
    setCurrentIndex(index);
};

// リサイズ時などの位置調整
useEffect(() => {
    if (scrollContainerRef.current) {
    const width = scrollContainerRef.current.offsetWidth;
    scrollContainerRef.current.scrollTo({ left: width * currentIndex });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isPC]);

return (
    <VStack gap={6} w="100%">
    <Box
        position="relative"
        w={{ base: "100vw", md: "100%" }}
        ml={{ base: "calc(50% - 50vw)", md: 0 }}
        mr={{ base: "calc(50% - 50vw)", md: 0 }}
        maxW={{ md: "1000px" }}
        // ▼▼▼ 修正: 高さ指定で表示エリアを確保（アスペクト比依存をやめる） ▼▼▼
        h={{ base: "60vh", md: "auto" }} // スマホでは画面高さの60%、PCは自動
        aspectRatio={{ md: 16 / 10 }} // PCのみ比率指定
        overflow="hidden"
        borderRadius={{ base: 0, md: "xl" }}
        boxShadow={{ base: "none", md: "2xl" }}
        bg="white" // ★修正: 背景を白にして余白を同化させる
        borderBottom={{ base: "1px solid", md: "none" }} // スマホの境界線
        borderColor="gray.100"
    >
        <Flex
        ref={scrollContainerRef}
        onScroll={handleScroll}
        w="100%"
        h="100%"
        overflowX="auto"
        overflowY="hidden"
        css={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
        }}
        >
        {images.map((img, idx) => (
            <Box
            key={idx}
            // ▼▼▼ 修正: 幅をガチガチに固定して「横スクロール」を防止 ▼▼▼
            flex="0 0 100%" 
            w="100%"
            h="100%"
            position="relative"
            css={{ 
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always' // 1枚ずつ止まるように強制
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            {/* スマホ用画像 */}
            <Image
                src={img.sp}
                display={{ base: "block", md: "none" }}
                // ▼▼▼ 修正: 最大幅・最大高さを制限し、絶対にはみ出させない ▼▼▼
                w="auto"
                h="100%"
                maxW="100%"
                maxH="100%"
                objectFit="contain" // 全体を表示
                draggable={false}
                alt={`Slide SP ${idx + 1}`}
            />

            {/* PC用画像 */}
            <Image
                src={img.pc}
                display={{ base: "none", md: "block" }}
                w="100%"
                h="100%"
                objectFit="cover" // PCは埋め尽くす
                draggable={false}
                alt={`Slide PC ${idx + 1}`}
            />
            </Box>
        ))}
        </Flex>

        {/* --- ナビゲーション類（インジケータ） --- */}
        <Box
        position="absolute"
        top={4}
        right={4}
        bg="rgba(0, 0, 0, 0.4)"
        backdropFilter="blur(8px)"
        color="white"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="widest"
        zIndex={2}
        pointerEvents="none"
        >
        {currentIndex + 1} <Box as="span" opacity={0.6} mx={1}>/</Box> {images.length}
        </Box>

        {/* PC用 矢印ボタン */}
        <Box display={{ base: "none", md: "block" }}>
        <IconButton
            aria-label="Previous Slide"
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={3}
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            rounded="full"
            bg="whiteAlpha.900"
            color="teal.500"
            shadow="lg"
            _hover={{ bg: "white", transform: "translateY(-50%) scale(1.1)" }}
        >
            <FaChevronLeft />
        </IconButton>

        <IconButton
            aria-label="Next Slide"
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={3}
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === images.length - 1}
            rounded="full"
            bg="whiteAlpha.900"
            color="teal.500"
            shadow="lg"
            _hover={{ bg: "white", transform: "translateY(-50%) scale(1.1)" }}
        >
            <FaChevronRight />
        </IconButton>
        </Box>

        {/* スマホ用 ドットインジケータ */}
        <Box display={{ base: "block", md: "none" }}>
        <HStack
            position="absolute"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            gap={2}
            zIndex={2}
            pointerEvents="none"
        >
            {images.map((_, idx) => (
            <Box
                key={idx}
                w={idx === currentIndex ? "24px" : "6px"}
                h="6px"
                borderRadius="full"
                // 背景が白になったので、ドットの色も見えやすいように調整
                bg={idx === currentIndex ? "teal.500" : "gray.300"}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                boxShadow="0 1px 2px rgba(0,0,0,0.1)"
            />
            ))}
        </HStack>
        </Box>
    </Box>

    {/* PC用サムネイル */}
    <Box display={{ base: "none", md: "block" }} w="100%">
        <HStack gap={3} overflowX="auto" py={2} w="100%" justify="center">
        {images.map((img, idx) => (
            <Box
            key={idx}
            w="80px"
            h="50px"
            flexShrink={0}
            borderRadius="md"
            overflow="hidden"
            cursor="pointer"
            opacity={idx === currentIndex ? 1 : 0.4}
            border="2px solid"
            borderColor={idx === currentIndex ? "teal.500" : "transparent"}
            transition="all 0.3s"
            onClick={() => scrollToIndex(idx)}
            _hover={{ opacity: 1 }}
            >
            <Image src={img.pc} w="100%" h="100%" objectFit="cover" />
            </Box>
        ))}
        </HStack>
    </Box>
    </VStack>
);
};