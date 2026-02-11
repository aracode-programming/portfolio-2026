// src/components/atoms/TypewriterText.tsx
import { Text, Box, TextProps } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps extends TextProps {
sequence: string[];
onComplete?: () => void;
baseSpeed?: number;
startDelay?: number;
hideCursorOnComplete?: boolean;
}

export const TypewriterText = ({ 
sequence, 
onComplete, 
baseSpeed = 50, 
startDelay = 0,
hideCursorOnComplete = false,
...props 
}: TypewriterTextProps) => {
const [displayedText, setDisplayedText] = useState("");
const [isCursorVisible, setIsCursorVisible] = useState(true);
const [isCompleted, setIsCompleted] = useState(false);

const indexRef = useRef(0);
const timeoutRef = useRef<number | null>(null);

// 【重要修正】onComplete関数をRefに保持し、useEffectの依存配列に含めないようにする
// これにより、親が再レンダリングされてもタイピング処理がリセットされません
const onCompleteRef = useRef(onComplete);
useEffect(() => {
    onCompleteRef.current = onComplete;
}, [onComplete]);

// カーソルの点滅管理
useEffect(() => {
    if (isCompleted && hideCursorOnComplete) {
        setIsCursorVisible(false);
        return;
    }

    const cursorInterval = setInterval(() => {
    setIsCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
}, [isCompleted, hideCursorOnComplete]);

// タイピングロジック
useEffect(() => {
    const startTimeout = setTimeout(() => {
    const type = () => {
        const currentIndex = indexRef.current;

        // 全文字打ち終わった場合
        if (currentIndex >= sequence.length) {
        setIsCompleted(true);
        // Ref経由で実行することで、再レンダリングの影響を受けない
        if (onCompleteRef.current) onCompleteRef.current();
        return;
        }

        setDisplayedText(sequence[currentIndex]);
        indexRef.current++;

        let delay = baseSpeed + (Math.random() * 60 - 30);
        const currentStr = sequence[currentIndex];
        const nextStr = sequence[currentIndex + 1] || "";

        if (nextStr.length < currentStr.length) delay += 150; 
        if (currentStr.endsWith("、") || currentStr.endsWith("。")) delay += 300;
        if (currentStr.slice(-1) !== nextStr.slice(-1)) delay += 20; 

        timeoutRef.current = setTimeout(type, Math.max(10, delay)) as unknown as number;
    };

    type();
    }, startDelay);

    return () => {
    clearTimeout(startTimeout);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // 【重要】onCompleteを依存配列から削除しました
}, [sequence, baseSpeed, startDelay]);

return (
    <Text as="span" {...props}>
    {displayedText}
    {/* 完了してカーソルを隠す設定なら非表示 */}
    {!(isCompleted && hideCursorOnComplete) && (
        <Box 
        as="span" 
        display="inline-block" 
        w="2px" 
        h="1em" 
        bg="brand.primary" 
        ml="2px"
        opacity={isCursorVisible ? 1 : 0}
        verticalAlign="middle"
        />
    )}
    </Text>
);
};