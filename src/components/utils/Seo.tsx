import { Helmet } from 'react-helmet-async';

type SeoProps = {
title?: string;
description?: string;
path?: string;
ogImage?: string;
};

export const Seo = ({ 
title, 
description, 
path, 
ogImage 
}: SeoProps) => {
// 基本設定
const siteName = "aracode | Webエンジニア × UI/UXデザイナー";
const defaultDescription = "Webエンジニア & UI/UXデザイナー「aracode」のポートフォリオサイト";
const baseUrl = "https://aracode.net";

// ▼修正: publicフォルダはURLに含めず、ドメイン直下を指定します
const defaultImage = `${baseUrl}/ogp.png`;

// 現在のページ情報
const pageTitle = title ? `${title} | aracode` : siteName;
const pageDescription = description || defaultDescription;
const pageUrl = path ? `${baseUrl}${path}` : baseUrl;
const pageImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`) : defaultImage;

// 構造化データ (WebSite / ProfessionalService)
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "aracode",
    "image": defaultImage,
    "url": baseUrl,
    "description": defaultDescription,
    "priceRange": "¥¥",
    "address": {
    "@type": "PostalAddress",
    "addressCountry": "JP"
    },
    "sameAs": [
    "https://www.instagram.com/aracode.programming",
    "https://coconala.com/services/4005291"
    ]
};

return (
    <Helmet>
    {/* 基本タグ */}
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <link rel="canonical" href={pageUrl} />

    {/* OGP (Facebook, Slack, Discordなど) */}
    <meta property="og:site_name" content={siteName} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:type" content={path ? "article" : "website"} />
    <meta property="og:image" content={pageImage} />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content={pageImage} />

    {/* 構造化データ (JSON-LD) */}
    <script type="application/ld+json">
        {JSON.stringify(structuredData)}
    </script>
    </Helmet>
);
};