import { useState, useCallback } from 'react';

export const useCounter = (initialValue: number) => {
    const [count, setValue] = useState(initialValue);
    const setCount = useCallback((x: number) => setValue(x), []);
    return { count, setCount };
}