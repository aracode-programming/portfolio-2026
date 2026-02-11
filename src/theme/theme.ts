// src/theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          bg: { value: "#FFFFFF" }, // 完全な白（清潔感）
          text: { value: "#2D3748" }, // 真っ黒ではないダークグレー（目に優しい）
          subText: { value: "#718096" }, // 補足テキスト
          primary: { value: "#319795" }, // Chakraのteal.500（信頼・知性）
          primaryDark: { value: "#285E61" }, // ホバーや強調用（アクセシビリティ確保）
          accent: { value: "#E6FFFA" }, // 薄いティール（背景装飾など）
          border: { value: "#E2E8F0" }, // 薄いグレーの境界線
          gradation: {value: "linear-gradient(270deg,rgba(44, 149, 165, 1) 0%, rgba(49, 151, 149, 1) 100%)"}
        },
      },
      fonts: {
        body: { value: "'Inter', 'Zen Kaku Gothic New', sans-serif" },
        heading: { value: "'Inter', 'Zen Kaku Gothic New', sans-serif" },
      },
    },
  },
  globalCss: {
    "html": {
      scrollBehavior: "smooth", // ページ内リンクのスムーズスクロール
    },
    "html, body": {
      bg: "brand.bg",
      color: "brand.text",
      margin: 0,
      padding: 0,
      fontFamily: "body",
      lineHeight: "1.8", // ゆったりとした読みやすさ
      letterSpacing: "0.05em", // 少し広めで洗練された印象
    },
    "::selection": {
      bg: "brand.accent",
      color: "brand.primaryDark",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);