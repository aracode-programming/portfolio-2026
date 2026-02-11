// src/components/templates/MainLayout.tsx
import { Box } from "@chakra-ui/react";
import { Outlet, useNavigation } from "react-router-dom";
import { HeaderSection } from "../organisms/HeaderSection";
import { SocialLinks } from "../organisms/SocialLinks";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { CustomCursor } from "../atoms/CustomCursor";

const MainLayout = () => {
const navigation = useNavigation();
// ページ遷移中（読み込み中）かどうか
const isPageLoading = navigation.state === "loading";

return (
    <Box minH="100vh" position="relative" bg="brand.bg" overflowX="hidden">
    {/* 1. カスタムカーソル (PCのみ) */}
    <CustomCursor />

    {/* 2. ヘッダー (固定) */}
    <HeaderSection />

    {/* 3. コンテンツエリア */}
    <Box as="main" width="100%">
        <Outlet />
    </Box>

    {/* 4. SNSリンク (右下固定) */}
    <SocialLinks />

    {/* 5. ローディングスピナー (ページ遷移時のみ表示) */}
    <LoadingSpinner isLoading={isPageLoading} />
    </Box>
);
};

export default MainLayout;