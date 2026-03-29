"use client";

export function ResumePrintButton() {
  return (
    <button type="button" className="button button-secondary" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
