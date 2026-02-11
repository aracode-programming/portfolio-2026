import { Box } from "@chakra-ui/react";
import { FC, memo, type ReactNode } from "react";

type Props = {
    children: ReactNode;
    id?: string;
    baseMy?: string;
    mdMy?: string;
}

export const SectionWrapper: FC<Props> = memo((props) => {
    const { children, id, baseMy="20", mdMy="32" } = props;
    return (
        <Box
            as="section"
            id={id}
            position="relative"
            width="100%"
            px={{ base: 8, md: 36 }}
            mx="auto"
            my={{ base: baseMy, md: mdMy }}
            maxW="1400px"
        >
            { children }
        </Box>
    );
});