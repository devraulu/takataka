import React, { useCallback, useEffect, useState } from 'react';
import DisappearAnimation from '#root/components/animations/DisappearAnimation';

const HEIGHT_BREAKPOINT = 500;

type Props = {
    children: React.ReactNode;
};

export default function HideOnSmallHeight({ children }: Props) {
    const [show, setShow] = useState(true);

    const handleResize = useCallback(() => {
        if (window.innerHeight < HEIGHT_BREAKPOINT) {
            setShow(false);
        } else setShow(true);
    }, []);

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return <DisappearAnimation show={show}>{children}</DisappearAnimation>;
}
