// Secure Direct UPI Deep-Link Launcher (Merchant number is obfuscated and never rendered in DOM text)

export type UpiAppType = 'gpay' | 'phonepe' | 'paytm' | 'bhim';

// Base64 encoded '7867074080' so it is never exposed in plain text on the page
const ENCODED_MERCHANT_NUM = 'Nzg2NzA3NDA4MA==';

function getMerchantNumber(): string {
  try {
    return typeof window !== 'undefined' ? window.atob(ENCODED_MERCHANT_NUM) : '7867074080';
  } catch {
    return '7867074080';
  }
}

export function getUpiQueryParams(app: UpiAppType, amountInr: number | string, note: string): string {
  const num = getMerchantNumber();
  const cleanAmount = Number(String(amountInr).replace(/[^0-9.]/g, '') || '299').toFixed(2);
  const encodedNote = encodeURIComponent(note || 'Vettingly Subscription');
  const encodedMerchantName = encodeURIComponent('Vettingly');

  // Route to the merchant number's UPI handle while keeping the number hidden from page DOM
  const vpa =
    app === 'phonepe'
      ? `${num}@ybl`
      : app === 'paytm'
        ? `${num}@paytm`
        : `${num}@upi`;

  return `pa=${vpa}&pn=${encodedMerchantName}&am=${cleanAmount}&cu=INR&tn=${encodedNote}`;
}

export function getUpiUriForApp(app: UpiAppType, amountInr: number | string, note: string): string {
  const queryParams = getUpiQueryParams(app, amountInr, note);
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isAndroid = /Android/i.test(ua);

  // On Android Chrome, Android Intent URIs directly open the real installed GPay / PhonePe / Paytm app
  if (isAndroid) {
    switch (app) {
      case 'gpay':
        return `intent://upi/pay?${queryParams}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
      case 'phonepe':
        return `intent://pay?${queryParams}#Intent;scheme=upi;package=com.phonepe.app;end`;
      case 'paytm':
        return `intent://pay?${queryParams}#Intent;scheme=upi;package=net.one97.paytm;end`;
      case 'bhim':
      default:
        return `upi://pay?${queryParams}`;
    }
  }

  // On iOS / universal mobile
  switch (app) {
    case 'gpay':
      return `tez://upi/pay?${queryParams}`;
    case 'phonepe':
      return `phonepe://pay?${queryParams}`;
    case 'paytm':
      return `paytmmp://pay?${queryParams}`;
    case 'bhim':
    default:
      return `upi://pay?${queryParams}`;
  }
}

export function getUniversalUpiUri(amountInr: number | string, note: string): string {
  const queryParams = getUpiQueryParams('bhim', amountInr, note);
  return `upi://pay?${queryParams}`;
}

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

export function launchUpiPaymentApp(app: UpiAppType, amountInr: number | string, note: string): { isMobile: boolean } {
  const num = getMerchantNumber();

  // Silently copy merchant number to clipboard as a convenience backup inside the UPI app
  try {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(num).catch(() => {});
    }
  } catch {
    // ignore clipboard permission errors
  }

  const targetUri = getUpiUriForApp(app, amountInr, note);
  const mobile = isMobileDevice();

  // Use a top-level anchor click so deep links work even inside preview iframes on mobile
  try {
    const link = document.createElement('a');
    link.href = targetUri;
    link.target = '_top';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    window.location.href = targetUri;
  }

  return { isMobile: mobile };
}
