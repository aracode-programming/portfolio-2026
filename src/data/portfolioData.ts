// src/data/portfolioData.ts

export interface PortfolioItem {
    id: string;
    title: string;
    subtitle: string;
    period: string;
    description: string;
    websiteUrl: string;
    // 【変更】PC用とSP用の画像をペアで持つ
    images: {
        pc: string;
        sp: string;
    }[];
    videoUrl?: string;
    comment: string;
    specs: {
        type: string;
        pageCount: string;
        pageList: string[];
        scope: string[];
    };
}

// ダミー画像生成用ヘルパー
const getPlacehold = (w: number, h: number, text: string) => 
    `https://placehold.co/${w}x${h}/2D3748/FFFFFF?text=${text}`;

export const PORTFOLIO_DATA: PortfolioItem[] = [
    {
        id: "1",
        title: "R2K株式会社｜コーポレートサイト",
        subtitle: "奈良県で活動されている建築＆美装の会社のコーポレートサイトを制作いたしました。",
        period: "2025.12.31 - 2026.1.20 (3週間)",
        description: "「環境・もの・人の笑顔のために」の理念を軸にデザインを構成いたしました。建築・美装におけるプロフェッショナルを一貫したトーン＆マナーで表現しています。",
        websiteUrl: "https://r2k.work/",
        images: [
            {
                pc: "/images/works/work1/pc/image1.webp",
                sp: "/images/works/work1/sp/image1.webp",
            },
            {
                pc: "/images/works/work1/pc/image2.webp",
                sp: "/images/works/work1/sp/image2.webp",
            },
            {
                pc: "/images/works/work1/pc/image3.webp",
                sp: "/images/works/work1/sp/image3.webp",
            },
            {
                pc: "/images/works/work1/pc/image4.webp",
                sp: "/images/works/work1/sp/image4.webp",
            },
            {
                pc: "/images/works/work1/pc/image5.webp",
                sp: "/images/works/work1/sp/image5.webp",
            },
            {
                pc: "/images/works/work1/pc/image6.webp",
                sp: "/images/works/work1/sp/image6.webp",
            },
            {
                pc: "/images/works/work1/pc/image7.webp",
                sp: "/images/works/work1/sp/image7.webp",
            },
            {
                pc: "/images/works/work1/pc/image8.webp",
                sp: "/images/works/work1/sp/image8.webp",
            },
            {
                pc: "/images/works/work1/pc/image9.webp",
                sp: "/images/works/work1/sp/image9.webp",
            },
            {
                pc: "/images/works/work1/pc/image10.webp",
                sp: "/images/works/work1/sp/image10.webp",
            },
        ],
        videoUrl: "", 
        comment: "R2K株式会社様のサイト制作では、理念を視覚化すべく「対話」と「翻訳」の二つの挑戦に向き合いました。まずは将来の乖離を防ぐため、徹底したヒアリングで抽象的な想いを極限まで共有。次に、その熱量を建築と美装の誠実さが伝わるデザインへと昇華させました。幾度もの協議と試行錯誤を重ね、深い信頼関係の中で磨き上げた一画面一画面が、建物と人の未来を繋ぐ確かな架け橋となることを確信しています。",
        specs: {
            type: "コーポレートサイト",
            pageCount: "13ページ",
            pageList: ["トップページ", "各種サービスページ", "会社概要", "施工事例", "施工事例詳細", "お問い合わせ", "プライバシーポリシー", "利用規約", "サイトマップ", "404ページ"],
            scope: ["UI/UXデザイン", "React/TypeScriptコーディング", "レスポンシブ対応", "SEO対応", "お問い合わせ機能"]
        }
    },
];