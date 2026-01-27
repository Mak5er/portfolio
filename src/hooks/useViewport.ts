import { useEffect, useState } from 'react';

type ViewportSize = {
  width: number;
  height: number;
};

const getViewportSize = (): ViewportSize => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
};

export const useViewport = () => {
  const [size, setSize] = useState<ViewportSize>(() => getViewportSize());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize(getViewportSize());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = size.width > 0 && size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const isDesktop = size.width >= 1024;

  return {
    ...size,
    isMobile,
    isTablet,
    isDesktop,
  };
};
