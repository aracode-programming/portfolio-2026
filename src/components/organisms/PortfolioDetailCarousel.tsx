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

// ナビゲーション表示制御用
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
        aspectRatio={{base: "9/16", md: "16/10"}}
        overflow="hidden"
        borderRadius={{ base: 0, md: "xl" }}
        boxShadow={{ base: "none", md: "2xl" }}
        bg="black" // ★修正: 画像がフィットした際の余白を黒にする
        border="solid 1px"
        borderColor="gray.800"
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
            minW="100%"
            flexShrink={0}
            h="100%"
            position="relative"
            css={{ scrollSnapAlign: 'center' }}
            display="flex" // 画像を中央寄せにする
            alignItems="center"
            justifyContent="center"
            >
            {/* pictureタグで画像の出し分け */}
            <Box as="picture" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                {/* 768px以上ならPC画像 (ここはcoverでもOK) */}
                <source media="(min-width: 768px)" srcSet={img.pc} />
                
                {/* ★ここが修正の最重要ポイント
                objectFit="contain" にすることで、画像全体を表示させます。
                これにより「拡大」がなくなり、「見切れる」こともなくなります。
                */}
                <Image
                src={img.sp}
                w="100%"
                h="100%"
                objectFit="contain" 
                draggable={false}
                alt={`Slide ${idx + 1}`}
                />
            </Box>
            </Box>
        ))}
        </Flex>

        {/* --- ナビゲーション（変更なし） --- */}
        <Box
        position="absolute"
        top={4}
        right={4}
        bg="rgba(0, 0, 0, 0.6)"
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
                bg={idx === currentIndex ? "teal.500" : "rgba(255,255,255,0.6)"}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                boxShadow="0 2px 4px rgba(0,0,0,0.2)"
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