import { Box } from "@chakra-ui/react";
import { Outlet, useNavigation } from "react-router-dom";
import { SocialLinks } from "../organisms/SocialLinks";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { CustomCursor } from "../atoms/CustomCursor";

const NonHeaderLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === "loading";

    return (
        <Box minH="100vh" position="relative" bg="brand.bg" overflowX="hidden">
            <CustomCursor />
            <Box as="main" width="100%">
                <Outlet />
            </Box>
            <SocialLinks />
            <LoadingSpinner isLoading={isPageLoading} />
        </Box>
    );
};

export default NonHeaderLayout;