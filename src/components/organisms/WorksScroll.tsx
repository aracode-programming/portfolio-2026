// src/components/organisms/WorksScroll.tsx
import { 
Box, Heading, VStack, Image, HStack, Button, 
useDisclosure, IconButton, Text, Dialog, SimpleGrid
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, memo, FC } from "react";
import { FaArrowRight, FaPlus, FaXmark } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";

import { useCursor } from "../../contexts/CursorContext";
import { SectionWrapper } from "../molecules/SectionWrapper";
import { PORTFOLIO_DATA } from "../../data/portfolioData"; // データをインポート

const MotionBox = motion.create(Box);

// --- サブコンポーネント: グリッドアイテム ---
const WorksGridItem: FC<{ 
    project: typeof PORTFOLIO_DATA[0]; 
    onOpen: (p: typeof PORTFOLIO_DATA[0]) => void; 
}> = memo(({ project, onOpen }) => {
    const { setCursorType } = useCursor();
    const [isHovered, setIsHovered] = useState(false);

    // サムネイルとして1枚目のPC画像を使用
    const thumbnail = project.images[0]?.pc || "https://placehold.co/800x500?text=No+Image";

    return (
    <Box
        w="100%"
        aspectRatio={16 / 10}
        position="relative"
        cursor="pointer"
        overflow="hidden"
        shadow="sm"
        onClick={() => onOpen(project)}
        onMouseEnter={() => {
            setCursorType("VIEW");
            setIsHovered(true);
        }}
        onMouseLeave={() => {
            setCursorType("DEFAULT");
            setIsHovered(false);
        }}
    >
        <MotionBox
            w="100%"
            h="100%"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <Image
                src={thumbnail}
                alt={project.title}
                w="100%"
                h="100%"
                objectFit="cover"
            />
        </MotionBox>

        <Box
            position="absolute"
            top={0} left={0} w="100%" h="100%"
            bg="blackAlpha.500"
            opacity={isHovered ? 1 : 0}
            transition="all 0.4s ease"
            pointerEvents="none"
        />

        <Box
            position="absolute"
            top={6} right={6}
            opacity={isHovered ? 1 : 0}
            transform={isHovered ? "translateY(0)" : "translateY(10px)"}
            transition="all 0.4s ease"
            zIndex={2}
        >
            <IconButton
                aria-label="View Details"
                rounded="none"
                size="md"
                bg="white"
                color="black"
                fontSize="lg"
                _hover={{ bg: "brand.primary", color: "white" }}
            >
                <FaPlus />
            </IconButton>
        </Box>
        
        {/* ホバー時にタイトルを表示するなどの演出を追加しても良いですが、
            今回はシンプルさを維持するためにアイコンのみとしています */}
    </Box>
    );
});

// --- サブコンポーネント: 詳細モーダル ---
const WorksDetailDialog: FC<{
    isOpen: boolean;
    onClose: () => void;
    project: typeof PORTFOLIO_DATA[0] | null;
}> = memo(({ isOpen, onClose, project }) => {
    const { setCursorType } = useCursor();

    if (!project) return null;

    // サムネイルとして1枚目のPC画像を使用
    const thumbnail = project.images[0]?.pc || "https://placehold.co/800x500?text=No+Image";

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="xl" placement="center" motionPreset="slide-in-bottom">
        <Dialog.Backdrop backdropFilter="blur(5px)" bg="blackAlpha.600" />
        <Dialog.Positioner>
            <Dialog.Content borderRadius="none" overflow="scroll" bg="white" w={{base: "90%", md: "100%"}} maxH="90vh">
                <Box h="auto" w="100%" position="relative">
                    <Image src={thumbnail} w="100%" aspectRatio={16/10} maxH="300px" objectFit="cover" />
                    <Dialog.CloseTrigger asChild>
                        <IconButton 
                            aria-label="Close" 
                            position="absolute" 
                            top={4} right={4} size="sm" 
                            rounded="none"
                            bg="whiteAlpha.900" color="black"
                            onClick={onClose}
                            _hover={{ bg: "black", color: "white" }}
                            onMouseEnter={() => setCursorType("CLOSE")}
                            onMouseLeave={() => setCursorType("DEFAULT")}
                        >
                            <FaXmark />
                        </IconButton>
                    </Dialog.CloseTrigger>
                </Box>

                <Dialog.Body p={{base: 4, md: 8}}>
                    <VStack align="start" gap={1} mb={6}>
                        <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="brand.primary" textTransform="uppercase">
                            {project.specs.type} {/* categoryの代わりにspecs.typeを使用 */}
                        </Text>
                        <Heading size={{ base: "lg" ,md: "2xl"}} fontWeight="bold" letterSpacing="tight">
                            {project.title}
                        </Heading>
                    </VStack>
                    
                    <VStack align="start" gap={6}>
                        <Text color="gray.600" lineHeight="1.8" fontSize={{base: "sm",md: "md"}}>
                            {project.description}
                        </Text>
                        <Box w="100%" h="1px" bg="gray.100" />
                        <HStack wrap="wrap" gap={3}>
                            {/* techの代わりにspecs.scopeを使用 */}
                            {project.specs.scope.map((t) => (
                                <Text key={t} fontSize="xs" fontWeight="bold" color="gray.500" border="1px solid" borderColor="gray.200" px={3} py={1}>
                                    {t}
                                </Text>
                            ))}
                        </HStack>
                    </VStack>
                </Dialog.Body>

                <Dialog.Footer p={8} pt={0}>
                    <RouterLink to={`/portfolio/${project.id}`} style={{ width: "100%" }}>
                        <Button 
                            w="100%" 
                            variant="outline"
                            borderColor="black"
                            color="black"
                            size="lg"
                            borderRadius="none"
                            _hover={{ bg: "black", color: "white" }}
                            h="56px"
                            onMouseEnter={() => setCursorType("GO")}
                            onMouseLeave={() => setCursorType("DEFAULT")}
                        >
                            View Project Detail <Box as="span" ml={2}><FaArrowRight /></Box>
                        </Button>
                    </RouterLink>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Positioner>
    </Dialog.Root>
    );
});

// --- メインコンポーネント ---
const WorksScroll = memo(() => {
    const { open, onOpen, onClose } = useDisclosure();
    const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_DATA[0] | null>(null);

    const handleOpen = (project: typeof PORTFOLIO_DATA[0]) => {
        setSelectedProject(project);
        onOpen();
    };

    return (
        <SectionWrapper id="works" baseMy="36" mdMy="52">
            <VStack align="flex-start" gap={2} mb={{base: 8, md: 12}}>
                <Box as="span" color="brand.primary" fontWeight="bold" letterSpacing="widest">
                    WORKS
                </Box>
                <Heading color="brand.text" size="2xl">
                    実績紹介
                </Heading>
            </VStack>

            <Box position="relative" w="100%">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 8 }}>
                    {PORTFOLIO_DATA.map((project) => (
                        <WorksGridItem 
                            key={project.id} 
                            project={project} 
                            onOpen={handleOpen} 
                        />
                    ))}
                </SimpleGrid>
            </Box>

            <WorksDetailDialog 
                isOpen={open} 
                onClose={onClose} 
                project={selectedProject} 
            />
        </SectionWrapper>
    );
});

export default WorksScroll;