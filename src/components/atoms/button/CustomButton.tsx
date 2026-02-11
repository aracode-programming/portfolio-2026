// src/components/atoms/CustomButton.tsx
import { Button, ButtonProps } from "@chakra-ui/react";

export const CustomButton = ({ children, ...props }: ButtonProps) => {
return (
    <Button
        variant="ghost"
        bg="transparent"
        color="brand.primary"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="brand.border"
        borderRadius="full"
        px={8}
        transition="all 0.3s ease"
        _hover={{
            bg: "whiteAlpha.100",
            borderColor: "brand.primary",
            transform: "translateY(-1px)",
        }}
        {...props}
    >
        {children}
    </Button>
);
};