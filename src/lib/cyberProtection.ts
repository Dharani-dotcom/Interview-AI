// ============================================================================
// CLIENT-SIDE CYBER PROTECTION SHIELD (Zero-Trust Browser Hardening)
// ============================================================================

let initialized = false;

export function initClientCyberProtection() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  // 1. Self-XSS & Social Engineering Console Guard
  try {
    console.log(
      '%c🛡️ CYBER PROTECTION ACTIVE — STOP!',
      'color: #10b981; font-size: 22px; font-weight: 900; background: #022c22; padding: 8px 14px; border-radius: 8px; border: 2px solid #10b981;'
    );
    console.log(
      '%cThis browser feature is intended for developers. Do NOT paste any unknown code or tokens here — doing so could allow attackers to hijack your session (Self-XSS). Protected by CyberShield WAF v2.4 & Zero-Trust Cloud ABAC.',
      'color: #e2e8f0; font-size: 13px; font-weight: 600;'
    );
  } catch {
    // Ignore console styling issues
  }

  // 2. Prevent malicious javascript: or data: drag-and-drop injection into the window
  window.addEventListener('dragover', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest('input[type="file"], [data-allow-drop="true"]')) {
      e.preventDefault();
    }
  });

  window.addEventListener('drop', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest('input[type="file"], [data-allow-drop="true"]')) {
      e.preventDefault();
    }
  });

  // 3. Global Paste Sanitizer for text inputs (blocks pasted <script> or javascript: URIs)
  window.addEventListener(
    'paste',
    (e: ClipboardEvent) => {
      const pastedText = e.clipboardData?.getData('text/plain') || '';
      if (/<script\b/i.test(pastedText) || /javascript:\s*[a-z0-9_]+/i.test(pastedText)) {
        const activeEl = document.activeElement as HTMLInputElement | HTMLTextAreaElement | null;
        // Allow code editors to paste code, but block in regular form inputs
        if (activeEl && activeEl.tagName === 'INPUT') {
          e.preventDefault();
          const cleaned = pastedText
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '');
          const start = activeEl.selectionStart || 0;
          const end = activeEl.selectionEnd || 0;
          const val = activeEl.value || '';
          activeEl.value = val.slice(0, start) + cleaned + val.slice(end);
          activeEl.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    },
    true
  );
}
