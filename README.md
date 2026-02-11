# aracode Portfolio

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> **Design for Trust. Build for Speed.**

Webエンジニア兼UI/UXデザイナー「aracode」のポートフォリオサイトです。
心理学のバックグラウンドを活かし、「ユーザーの認知負荷を最小化する」というテーマで設計・開発を行いました。

## 🚀 Live Demo

[https://aracode-portfolio.pages.dev](https://aracode-portfolio.pages.dev)
_(Cloudflare Pagesにてホスティング)_

## 🛠 Tech Stack

パフォーマンスと開発体験（DX）、そして表現力のバランスを考慮して選定しています。

| Category       | Technology       | Reason                                                 |
| -------------- | ---------------- | ------------------------------------------------------ |
| **Core**       | React 18         | コンポーネント指向による再利用性と宣言的UIの構築       |
| **Language**   | TypeScript       | 静的型付けによる堅牢性と保守性の向上                   |
| **Build Tool** | Vite             | 高速なHMRとビルド環境によるDXの最適化                  |
| **UI Library** | Chakra UI        | アクセシビリティへの配慮と迅速なスタイリング           |
| **Animation**  | Framer Motion    | 宣言的なアニメーション定義と複雑なオーケストレーション |
| **Routing**    | React Router v6  | SPAルーティング                                        |
| **Hosting**    | Cloudflare Pages | グローバルCDNによる高速配信とGit連携の容易さ           |

## 💡 Key Features & Implementation Details

### 1. 没入感のあるマイクロインタラクション

「静寂と信頼」を表現するため、Framer Motionを駆使して細部の挙動を作り込みました。

- **Hero Section**: `staggerChildren` を使用し、霧の中から文字が浮かび上がるような時間差フェードインを実装。
- **Custom SVG Animation**: Lottieを使わず、SVGパスを直接Reactで操作することで軽量かつ柔軟なアニメーション（炎のゆらぎ、拡張するブラケット等）を実現。
- **Aurora Background**: CSSグラデーションとモーションを組み合わせ、パフォーマンス
