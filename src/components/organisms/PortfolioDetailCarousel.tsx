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

// PC/SP判定
const isPC = useBreakpointValue({ base: false, md: true });
const currentImageSrc = (img: ImageType) => (isPC ? img.pc : img.sp);
const aspectRatio = isPC ? 16 / 10 : 9 / 16;

// スクロール位置から現在のインデックスを判定
const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    
    // 0除算防止
    if (width === 0) return;

    // 現在のページインデックスを計算
    const index = Math.round(scrollLeft / width);
    
    // インデックスが変わった時だけState更新（再レンダリング抑制）
    if (index !== currentIndex && index >= 0 && index < images.length) {
    setCurrentIndex(index);
    }
};

// 指定インデックスへスクロール
const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    if (index < 0 || index >= images.length) return;
    
    const container = scrollContainerRef.current;
    const width = container.offsetWidth;
    
    container.scrollTo({
    left: width * index,
    behavior: 'smooth'
    });
    // クリック時は即座にStateも更新して反応を良くする
    setCurrentIndex(index);
};

// 画面リサイズ時やPC/SP切り替え時に位置ズレを補正
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
        aspectRatio={aspectRatio}
        overflow="hidden"
        borderRadius={{ base: 0, md: "xl" }}
        boxShadow={{ base: "none", md: "2xl" }}
        bg="gray.100"
        border="solid 1px"
        borderColor="gray.200"
    >
        {/* ▼▼▼ スクロールエリア ▼▼▼ */}
        <Flex
        ref={scrollContainerRef}
        onScroll={handleScroll}
        w="100%"
        h="100%"
        overflowX="auto" // 横スクロール有効
        overflowY="hidden"
        css={{
            scrollSnapType: 'x mandatory', // スナップを強制
            WebkitOverflowScrolling: 'touch', // iOSでの慣性スクロール有効化
            '&::-webkit-scrollbar': { display: 'none' }, // スクロールバー隠し
            scrollbarWidth: 'none',
        }}
        >
        {images.map((img, idx) => (
            <Box
            key={idx}
            minW="100%"     // 横幅100%
            flexShrink={0}  // ★重要: これがないと画像が縮んでスワイプできなくなります
            h="100%"
            position="relative"
            css={{ scrollSnapAlign: 'center' }} // 中央に吸着
            >
            <Image
                src={currentImageSrc(img)}
                w="100%"
                h="100%"
                objectFit="cover"
                draggable={false} // 画像自体のドラッグを防止してスワイプを阻害させない
                alt={`Slide ${idx + 1}`}
            />
            </Box>
        ))}
        </Flex>

        {/* 右上の枚数表示 */}
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

        {/* PC用矢印ナビゲーション */}
        {isPC && (
        <>
            <IconButton
            aria-label="Previous Slide"
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={3}
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0} // isDisabled -> disabled に修正
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
            disabled={currentIndex === images.length - 1} // isDisabled -> disabled に修正
            rounded="full"
            bg="whiteAlpha.900"
            color="teal.500"
            shadow="lg"
            _hover={{ bg: "white", transform: "translateY(-50%) scale(1.1)" }}
            >
            <FaChevronRight />
            </IconButton>
        </>
        )}

        {/* モバイル用 ドットナビゲーション */}
        {!isPC && (
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
        )}
    </Box>

    {/* PC用サムネイルナビゲーション */}
    {isPC && (
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
    )}
    </VStack>
);
};