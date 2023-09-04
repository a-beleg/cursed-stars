import {useState, useRef, useCallback, useEffect, ChangeEvent} from 'react';

const useInput = (handleMint: () => void, isConnected: boolean) => {
    const [inputValue, setInputValue] = useState('0');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const nativeEvent = event.nativeEvent as InputEvent;
        const data = nativeEvent.data || '0';
        const isBackspace = nativeEvent.inputType === 'deleteContentBackward';

        if (isBackspace) {
            const truncatedValue = inputValue.slice(0, -1);
            setInputValue(truncatedValue || '0');
        } else {
            const value = parseInt(inputValue) === 0 ? parseInt(inputValue + data) : parseInt(inputValue + data);
            const clampedValue = Math.min(Math.max(value, 0), 25000);
            setInputValue(isNaN(clampedValue) ? '0' : String(clampedValue));
        }
    }, [inputValue]);



    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (focused) {
            let newValue = inputValue || '0';
            switch (event.key) {
                case 'Enter':
                    handleMint();
                    setFocused(true);
                    inputRef.current?.focus();
                    break;
                case 'Escape':
                    inputRef.current?.blur();
                    setFocused(false);
                    break;
                case 'ArrowUp':
                case 'ArrowRight':
                    event.preventDefault();
                    newValue = String(Math.min(parseInt(newValue) + 1, 25000));
                    break;
                case 'ArrowDown':
                case 'ArrowLeft':
                    event.preventDefault();
                    newValue = String(Math.max(parseInt(newValue) - 1, 0));
                    break;
                case '0':
                    inputValue === '0' && event.preventDefault();
                    break;
                default:
                    return;
            }
            setInputValue(newValue);
        } else if (event.key === 'Enter') {
            handleMint();
            setFocused(true);
        }
    }, [focused, handleMint, inputValue]);

    useEffect(() => {
        if (isConnected) {
            setFocused(true);
            inputRef.current?.focus();
        } else {
            setFocused(false);
            inputRef.current?.blur();
        }
    }, [isConnected]);

    useEffect(() => {

        const handleFocus = () => setFocused(true);
        const handleBlur = () => setFocused(false);

        const currentInputRef = inputRef.current;

        currentInputRef?.addEventListener('focus', handleFocus);
        currentInputRef?.addEventListener('blur', handleBlur);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            currentInputRef?.removeEventListener('focus', handleFocus);
            currentInputRef?.removeEventListener('blur', handleBlur);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return {
        inputValue,
        setFocused,
        inputRef,
        handleInputChange
    };
};

export default useInput;