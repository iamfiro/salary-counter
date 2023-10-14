import { useCallback, useRef, useState } from "react";

function useTimer(initialValue: number, ms: number) {
    const [count, setCount] = useState(initialValue);
    const [isPause, setIsPause] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount((c) => c + 1);
        }, ms);
    }, []);

    const pause = useCallback(() => {
        setIsPause(true);
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
    }, [isPause])

    const stop = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    const reset = useCallback(() => {
        setCount(0);
        stop();
    }, []);

    return { count, start, stop, pause, reset }
}

export default useTimer;