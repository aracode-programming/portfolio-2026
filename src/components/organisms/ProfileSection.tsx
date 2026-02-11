// src/components/organisms/ProfileSection.tsx
import { 
Box, Heading, Text, VStack, HStack, Flex, Badge, 
SimpleGrid, Accordion, Image, Button
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { memo, FC, useState } from "react"; // useStateを追加
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import { SectionWrapper } from "../molecules/SectionWrapper";
import { useCursor } from "../../contexts/CursorContext"; // カーソルContextを追加

const MotionPath = motion.create("path");
const MotionCircle = motion.create("circle");
const MotionRect = motion.create("rect");
const MotionG = motion.create("g");
const MotionText = motion.create("text");

// --- 1. サブコンポーネント: 動くアイコン ---
const AnimatedIcon: FC<{ type: string }> = memo(({ type }) => {
    const isCode = type === "ENGINEERING";
    const isBrain = type === "PSYCHOLOGY";
    const isDesign = type === "DESIGN";

return (
    <Box w="80px" h="80px" color="brand.primary" mb={4}>
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isCode && (
            <>
                {/* 左のブラケット (拡張性: 外側に広がる) */}
                <MotionPath
                d="M42 25 L32 25 L32 75 L42 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ x: [0, -10, 0] }} // 左へ広がって戻る
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 右のブラケット (拡張性: 外側に広がる) */}
                <MotionPath
                d="M58 25 L68 25 L68 75 L58 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ x: [0, 10, 0] }} // 右へ広がって戻る
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 高速データストリーム (パフォーマンス: 高速移動) */}
                <clipPath id="stream-clip">
                    <rect x="32" y="25" width="36" height="50" />
                </clipPath>

                <g clipPath="url(#stream-clip)">
                    {/* ストリームライン1 (上) */}
                    <MotionRect
                        x="20" y="38" width="20" height="2" fill="currentColor" rx="1" stroke="none"
                        animate={{ x: [20, 80], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    {/* ストリームライン2 (中 - 一番速い) */}
                    <MotionRect
                        x="10" y="50" width="30" height="2" fill="currentColor" rx="1" stroke="none"
                        animate={{ x: [10, 90], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
                    />
                    {/* ストリームライン3 (下) */}
                    <MotionRect
                        x="15" y="62" width="15" height="2" fill="currentColor" rx="1" stroke="none"
                        animate={{ x: [15, 85], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear", delay: 0.3 }}
                    />
                </g>

                {/* 中央のコア (安定性) */}
                <MotionCircle 
                    cx="50" cy="50" r="2" fill="currentColor" stroke="none"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </>
            )}
        {isBrain && (
        <>
            <path d="M50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 Z" strokeOpacity="0.2" />
            <MotionCircle cx="35" cy="40" r="4" fill="currentColor" stroke="none" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <MotionCircle cx="65" cy="40" r="4" fill="currentColor" stroke="none" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
            <MotionPath d="M35 40 Q 50 20 65 40" strokeDasharray="4 4" animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            <MotionPath d="M50 50 L 50 70" strokeOpacity="0.5" />
        </>
        )}
        {isDesign && (
        <>
            <MotionPath d="M50 10 L50 90" strokeOpacity="0.2" strokeDasharray="4 2" />
            <MotionPath d="M10 50 L90 50" strokeOpacity="0.2" strokeDasharray="4 2" />
            <MotionCircle 
            cx="50" cy="50" r="28" strokeWidth="1.5"
            initial={{ scale: 0.9 }} animate={{ scale: [0.9, 1, 0.9], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <MotionRect 
            x="34" y="34" width="32" height="32" rx="2" strokeWidth="1.5" fill="transparent"
            initial={{ rotate: 0 }} animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <MotionPath d="M20 20 L25 20 M20 20 L20 25" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <MotionPath d="M80 80 L75 80 M80 80 L80 75" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
        </>
        )}
    </svg>
    </Box>
);
});

// --- 2. データ定義 ---
const SKILLS = [
{
    id: "01",
    category: "ENGINEERING",
    title: "パフォーマンスと拡張性",
    shortDesc: "0.1秒の体感速度にこだわる、堅牢な実装力。",
    longDesc: "ユーザーに見られる前に、まずはGoogleに評価されるでしょう。Google評価95点以上を標準ラインとしたパフォーマンスで、SEOを重視した「速さ」という価値をお約束します。さらに将来を見据えた拡張性の高いコード設計で、ビジネスの成長に柔軟に対応します。",
    tags: ["React", "TypeScript", "Next.js", "Chakra UI", "Framer Motion"]
},
{
    id: "02",
    category: "PSYCHOLOGY",
    title: "UI設計とちょっとした寄り道",
    shortDesc: "情報伝達の効率化にとどまらないUI設計。",
    longDesc: "見ている人には伝えたい情報をそのまま届けたい。余計なものをいれないUIデザインは人々の負担を減らし、快適にWebサイトを楽しめるでしょう。しかし、余計なものは微量であれば人の心を豊かにするかもしれません。ちょっとした寄り道を私は大事にします。",
    tags: ["Cognitive Psychology", "UX Research", "Heuristic Evaluation", "Data Analysis"]
},
{
    id: "03",
    category: "DESIGN",
    title: "洗練されたミニマルの追求",
    shortDesc: "「配置」や「余白」だけじゃない、洗練されたビジュアル表現。",
    longDesc: "情報は「足す」ことよりも「引く」ことが重要でしょう。それはビジュアルに限った話ではなく、文字や画像はその多くを削ぎ落とすことで、より強く人の心に刺さります。何を伝えたいのかを明確にし、究極のミニマルデザインを追求します。",
    tags: ["Figma", "UI Design", "Prototyping", "Design System", "Adobe CC"]
}
];

// --- 3. サブコンポーネント: 自己紹介 ---
const SelfIntroSection = memo(() => (
    <Box mt={32} borderTop="1px solid" borderColor="gray.200" pt={20}>
        <Heading size="md" mb={8} fontFamily="monospace" color="gray.400">03. WHO I AM</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
            <Box>
                <Box mb={6} w={{ base: "140px", md: "160px" }} aspectRatio={1/1} overflow="hidden" borderRadius="md" boxShadow="md">
                    <Image src="/images/profile/profileImage.webp" alt="プロフィール画像" w="100%" h="100%" objectFit="cover" />
                </Box>
                <VStack align="flex-start" gap={4}>
                    <Heading size="xl" lineHeight="1.2">
                        Arata Iba<br/>
                    </Heading>
                    <Text fontSize="xs" fontWeight="normal" color="brand.subText">Webエンジニア / UI/UXデザイナー</Text>
                    <a 
                        href="https://coconala.com/services/4005291" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", display: "inline-block" }}
                    >
                        <Button
                            as="div"
                            size="sm"
                            variant="outline"
                            borderColor="brand.primary"
                            color="brand.primary"
                            _hover={{ bg: "brand.primary", color: "white", cursor: "pointer" }}
                            cursor="pointer"
                            px={6}
                        >
                            <Box as="span" mr={2} display="flex" alignItems="center"><FaExternalLinkAlt /></Box>
                            ココナラで依頼・相談する
                        </Button>
                    </a>
                </VStack>
            </Box>
            <VStack align="start" gap={6} color="gray.600" lineHeight="1.8" maxW={{base: "300px", md: "auto"}}>
                <Text fontSize={{base: "sm", md: "md"}}>
                    2001年生まれ。大学では心理学を専攻しておりました。
                    人の認知、行動に興味があり、その視点が現在のUI/UXデザインの根幹を支えております。
                </Text>
                <Text fontSize={{base: "sm", md: "md"}}>
                    大学2年の頃に、プログラミングに出会い、コーディングに夢中になる日々を過ごしており、気づけば、Webエンジニアとしてのキャリアを歩み始めていました。
                    論理的思考力と、人の心を動かす感性の両軸を併せ持つエンジニアとして、価値あるWeb体験を提供してまいります。
                </Text>
            </VStack>
        </SimpleGrid>
    </Box>
));

// --- メインコンポーネント ---
const ProfileSection = memo(() => {
const { setCursorType } = useCursor();
// アコーディオンの状態管理を追加
const [openItems, setOpenItems] = useState<string[]>([]);

return (
    <SectionWrapper id="profile">
        <VStack align="flex-start" gap={2} mb={16}>
            <Box as="span" color="brand.primary" fontWeight="bold" letterSpacing="widest">
            PROFILE & SKILLS
            </Box>
            <Heading color="brand.text" size="2xl" lineHeight="1.2">
                私について
            </Heading>
            <Text fontSize={{base: "xs", md: "sm"}} maxW="600px" color="gray.600" mt={4} lineHeight="1.8">
            「心理学」というバックグラウンドを武器に、ユーザーの無意識に働きかけるUI/UXを設計します。
            ロジック（技術）とエモーション（心理）の交差点で、信頼されるWeb体験を構築します。
            </Text>
        </VStack>

        {/* valueとonValueChangeで制御 */}
        <Accordion.Root 
            collapsible 
            value={openItems} 
            onValueChange={(e) => setOpenItems(e.value)}
        >
            {SKILLS.map((skill) => {
                // 現在開いているか判定
                const isOpen = openItems.includes(skill.id);
                return (
                    <Accordion.Item key={skill.id} value={skill.id} borderBottomWidth="1px" borderColor="gray.200">
                        <Accordion.ItemTrigger 
                            py={8} px={4} cursor="pointer" 
                            transition="all 0.2s ease-out"
                            _hover={{ bg: "brand.accent" }}
                            style={{ width: "100%", textAlign: "left" }}
                            // 【修正】カーソル制御
                            onMouseEnter={() => setCursorType(isOpen ? "CLOSE" : "OPEN")}
                            onMouseLeave={() => setCursorType("DEFAULT")}
                            _focusVisible={{outline: "none"}}
                        >
                            <Flex align="center" justify="space-between" w="100%" gap={4} wrap="wrap">
                                <HStack align="baseline" minW={{ base: "100%", md: "200px" }}>
                                    <Text fontSize="2xl" fontWeight="bold" color="gray.300" fontFamily="monospace">{skill.id}</Text>
                                    <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500">/ {skill.category}</Text>
                                </HStack>
                                <Box flex={1}>
                                    <Heading size={{base: "md", md: "lg"}} fontWeight="bold" letterSpacing="tight" mb={1}>{skill.title}</Heading>
                                    <Text fontSize="sm" color="gray.500" display={{ base: "none", md: "block" }}>{skill.shortDesc}</Text>
                                </Box>
                                <Accordion.ItemIndicator>
                                    <Box bg="gray.100" p={3} borderRadius="full" color="gray.400" transition="all 0.2s" _open={{ bg: "brand.primary", color: "white", transform: "rotate(180deg)" }}>
                                        <FaChevronDown />
                                    </Box>
                                </Accordion.ItemIndicator>
                            </Flex>
                        </Accordion.ItemTrigger>

                        <Accordion.ItemContent>
                            <Box py={10} pr={4} pl={{ base: 0, md: "200px" }}>
                                <Flex direction={{ base: "column", md: "row" }} gap={8} align="flex-start">
                                    <Box flexShrink={0} pt={2}><AnimatedIcon type={skill.category} /></Box>
                                    <Box>
                                        <Text color="gray.600" lineHeight="1.8" mb={6} fontSize={{base: "sm", md: "md"}}>{skill.longDesc}</Text>
                                        <HStack wrap="wrap" gap={2}>
                                            {skill.tags.map(tag => (
                                                <Badge key={tag} px={3} py={1} bg="transparent" border="1px solid" borderColor="brand.primary" color="brand.primary" fontSize="xs" textTransform="none">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </HStack>
                                    </Box>
                                </Flex>
                            </Box>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                );
            })}
        </Accordion.Root>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={16} mt={32}>
            <Box>
                <Heading size="md" mb={4} fontFamily="monospace" color="gray.400">01. PHILOSOPHY</Heading>
                <Heading size="lg" mb={4}>制作ポリシー</Heading>
                <Text color="gray.600" lineHeight="1.8">
                    制作の過程では<Box as="span" bg="brand.accent" px={2} py={1} borderRadius="sm">ユーザー体験</Box>と<Box as="span" bg="brand.accent" px={2} py={1} borderRadius="sm">顧客の課題解決</Box>を最重要視します。
                    美しいデザインや最新技術の導入は手段であり目的ではありません。
                </Text>
            </Box>
            <Box>
                <Heading size="md" mb={4} fontFamily="monospace" color="gray.400">02. VALUE</Heading>
                <Heading size="lg" mb={4}>価値の提供</Heading>
                <Text color="gray.600" lineHeight="1.8">
                    SEO対策、アクセシビリティ対応、そして高速なページロード速度。これらを高いレベルで実装することが基本的な価値提供だと考えています。
                </Text>
            </Box>
        </SimpleGrid>
        <SelfIntroSection />
    </SectionWrapper>
);
});

export default ProfileSection;