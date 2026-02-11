import { FaCode, FaPaintBrush, FaSearch } from 'react-icons/fa';

export const profileInfo = {
name: "Arata",
role: "Front-end Developer / UI Designer",
bio: "文系大学で心理学を専攻後、大学2年でプログラミングの世界へ。人の心を動かす「心理学」と、それを形にする「技術」を掛け合わせ、成果に直結するWeb制作を提供します。",

// 3つの強み（Bento Grid用）
skills: [
    {
    id: 1,
    title: "Engineering",
    icon: FaCode,
    description: "React, TypeScript, Chakra UIを用いたモダンで堅牢な実装。パフォーマンスと保守性を両立します。",
    },
    {
    id: 2,
    title: "UI Design",
    icon: FaPaintBrush,
    description: "心理学に基づいた「使いたくなる」デザイン設計。ユーザーの感情に寄り添うUIを構築します。",
    },
    {
    id: 3,
    title: "Analysis",
    icon: FaSearch,
    description: "徹底したリサーチとベンチマーク分析。根拠のある設計でビジネスの成果を最大化します。",
    },
],

// 略歴
history: [
    { year: "202x", event: "大学入学 心理学専攻" },
    { year: "202x", event: "プログラミング学習開始" },
    { year: "2026", event: "個人事業主として開業" },
    { year: "2026", event: "R2K株式会社様 HP制作" },
]
};