import { useCallback, useEffect, useState } from 'react';
import DisappearAnimation from './DisappearAnimation';

const HEIGHT_BREAKPOINT = 500;

type Props = {
    children: React.ReactNode;
};

export default function HideOnSmallHeight({ children }: Props) {
    const [show, setShow] = useState(true);

    const handleResize = useCallback(() => {
        console.table({
            innerHeight: window.innerHeight,
            HEIGHT_BREAKPOINT,
        });

        if (window.innerHeight < HEIGHT_BREAKPOINT) {
            console.log('hide');
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
