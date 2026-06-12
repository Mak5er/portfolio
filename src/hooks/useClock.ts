import { useEffect, useState } from 'react';

export function useClock(locale = 'en-GB', tz?: string) {
  const [time, setTime] = useState(() => formatNow(locale, tz));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatNow(locale, tz));
    }, 1000);
    return () => window.clearInterval(id);
  }, [locale, tz]);

  return time;
}

function formatNow(locale: string, tz?: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(new Date());
}
