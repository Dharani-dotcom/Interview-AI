import React from 'react';

const CODE_FIELD_KEYS = new Set([
  'boardCode',
  'improvedCode',
  'codeSnippet',
  'code',
  'starterCode',
  'diagramAscii',
]);

/**
 * Strips raw Markdown syntax (**bold**, __bold__, ### headings, `inline`, * bullets)
 * and formats text into neat, formal Times New Roman plain text.
 */
export function cleanNeatRomanText(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') return '';

  return input
    // Remove fenced markdown wrappers if wrapping plain text
    .replace(/^```(?:markdown|text|plain)?\s*\n?/i, '')
    .replace(/\n?```\s*$/i, '')
    // Strip markdown headings (e.g. ### SUMMARY -> SUMMARY)
    .replace(/^[ \t]*#{1,6}[ \t]+(.+)$/gm, (_, heading: string) => heading.replace(/\*\*/g, '').trim().toUpperCase())
    // Strip **bold** and __bold__ markers completely
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // Strip leftover paired or stray double asterisks
    .replace(/\*\*/g, '')
    // Convert markdown unordered list bullets (* item or - item) to neat • bullet
    .replace(/^[ \t]*[*-][ \t]+/gm, '• ')
    // Strip single italic asterisks around words (*word* -> word) without breaking multiplication
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s.,;:!?)]|$)/g, '$1$2')
    // Strip inline backticks (`term` -> term)
    .replace(/`([^`\n]+)`/g, '$1')
    // Normalize horizontal rules (--- or ***)
    .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, '')
    // Normalize excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Recursively sanitizes all string fields in an AI-generated JSON payload
 * while preserving explicit source code fields.
 */
export function deepCleanNeatObject<T>(value: T, parentKey = ''): T {
  if (value === null || value === undefined) return value;

  if (typeof value === 'string') {
    if (CODE_FIELD_KEYS.has(parentKey)) {
      return value;
    }
    return cleanNeatRomanText(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepCleanNeatObject(item, parentKey)) as unknown as T;
  }

  if (typeof value === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(value as Record<string, any>)) {
      cleaned[k] = deepCleanNeatObject(v, k);
    }
    return cleaned as T;
  }

  return value;
}

interface NeatRomanTextProps {
  text: string | null | undefined;
  className?: string;
  asSpan?: boolean;
}

/**
 * Renders any AI-generated text in neat Times New Roman typography,
 * automatically stripping raw **markdown** syntax and formatting headings & bullet points.
 */
export const NeatRomanText: React.FC<NeatRomanTextProps> = ({
  text,
  className = '',
  asSpan = false,
}) => {
  const cleaned = cleanNeatRomanText(text);
  if (!cleaned) return null;

  if (asSpan || !cleaned.includes('\n')) {
    return (
      <span className={`font-roman ${className}`}>
        {cleaned}
      </span>
    );
  }

  const lines = cleaned.split('\n');

  return (
    <div className={`font-roman space-y-1.5 leading-relaxed ${className}`}>
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) {
          return <div key={idx} className="h-1.5" />;
        }

        // Check if line is an ALL-CAPS section heading (e.g., SUMMARY, PROFESSIONAL EXPERIENCE)
        const isSectionHeading =
          line.length >= 3 &&
          line.length <= 65 &&
          line === line.toUpperCase() &&
          /[A-Z]/.test(line) &&
          !line.startsWith('•');

        if (isSectionHeading) {
          return (
            <div
              key={idx}
              className="font-bold tracking-wide uppercase pt-2 pb-0.5 border-b border-current/15 text-[0.95em]"
            >
              {line}
            </div>
          );
        }

        // Check if line is a bullet point
        if (line.startsWith('• ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="font-bold select-none">•</span>
              <span className="flex-1">{line.slice(2).trim()}</span>
            </div>
          );
        }

        // Check if line is a numbered item (e.g., "1. First point")
        const numMatch = line.match(/^(\d+\.)\s+(.+)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="font-bold shrink-0">{numMatch[1]}</span>
              <span className="flex-1">{numMatch[2]}</span>
            </div>
          );
        }

        // Check if line has a "Label: Value" pattern (e.g. "Languages: TypeScript, Python")
        const colonMatch = line.match(/^([A-Z][A-Za-z0-9 &/()-]{1,32}:)\s+(.+)$/);
        if (colonMatch) {
          return (
            <p key={idx}>
              <strong className="font-bold">{colonMatch[1]}</strong> {colonMatch[2]}
            </p>
          );
        }

        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
};
