import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button onClick={scrollToTop} style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                    border: 'none',
                    width: '50px',
                    height: '50px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    zIndex: '100',
                    fontWeight: 'bolder',
                    color: "brown"
                }} >

                    {/* <img src="/images/leg.png" alt="" style={{
                        position: 'fixed',
                        bottom: '50px',
                        right: '50px',
                        border: 'none',
                        width: '50px',
                        height: '50px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        zIndex: '100',
                        opacity: 0.4
                    }} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>

                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
