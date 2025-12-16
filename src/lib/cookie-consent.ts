export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const COOKIE_NAME = 'iptv_cookie_consent';
const COOKIE_EXPIRY_DAYS = 365;

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  
  const consent = localStorage.getItem(COOKIE_NAME);
  if (!consent) return null;
  
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(COOKIE_NAME, JSON.stringify(consent));
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  document.cookie = `${COOKIE_NAME}=set; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  
  applyConsent(consent);
}

export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(COOKIE_NAME);
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function applyConsent(consent: CookieConsent): void {
  if (!consent.analytics) {
    clearAnalyticsCookies();
  }
  
  if (!consent.marketing) {
    clearMarketingCookies();
  }
}

function clearAnalyticsCookies(): void {
  const analyticsCookies = ['_ga', '_gid', '_gat', '_ga_'];
  
  analyticsCookies.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
  });
  
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }
}

function clearMarketingCookies(): void {
  const marketingCookies = ['_fbp', '_fbc', 'fr'];
  
  marketingCookies.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
  });
  
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }
}

export function hasConsent(): boolean {
  return getCookieConsent() !== null;
}
