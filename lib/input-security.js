const scriptLikePatterns = [
  /<\s*\/?\s*(script|iframe|object|embed|svg|math|link|meta|style|base|form|input|button|textarea|select|option)\b/i,
  /\bon[a-z]+\s*=/i,
  /\b(?:javascript|data|vbscript)\s*:/i,
  /(?:srcdoc|xlink:href)\s*=/i,
  /(?:eval|Function|setTimeout|setInterval)\s*\(/i,
  /&#x?[0-9a-f]+;?/i
];

export function normalizeUserInput(value, maxLength = 2000) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, maxLength)
    .trim();
}

export function hasUnsafeUserInput(value) {
  const input = String(value ?? "");

  return scriptLikePatterns.some((pattern) => pattern.test(input));
}

export function validateUserInput(value, options = {}) {
  const {
    label = "Input",
    maxLength = 2000,
    minLength = 0,
    allowPattern = null,
    allowMultiline = false
  } = options;
  const normalized = allowMultiline
    ? String(value ?? "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .slice(0, maxLength)
        .trim()
    : normalizeUserInput(value, maxLength);

  if (normalized.length < minLength) {
    return {
      ok: false,
      value: normalized,
      message: `${label} is too short.`
    };
  }

  if (String(value ?? "").length > maxLength) {
    return {
      ok: false,
      value: normalized,
      message: `${label} is too long.`
    };
  }

  if (hasUnsafeUserInput(normalized)) {
    return {
      ok: false,
      value: normalized,
      message: `${label} cannot include scripts, HTML tags, event handlers, or executable URLs.`
    };
  }

  if (allowPattern && normalized && !allowPattern.test(normalized)) {
    return {
      ok: false,
      value: normalized,
      message: `${label} contains unsupported characters.`
    };
  }

  return {
    ok: true,
    value: normalized,
    message: ""
  };
}

export function validateDecodedText(value, label = "Decoded content") {
  if (hasUnsafeUserInput(value)) {
    return {
      ok: false,
      message: `${label} contains script-like content and was blocked.`
    };
  }

  return {
    ok: true,
    message: ""
  };
}
