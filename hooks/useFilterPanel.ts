import {useCallback, useState} from 'react';

export function useFilterPanel() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() =>
            setIsOpen(prev => !prev),
        []);

    return {isOpen, toggle};
}