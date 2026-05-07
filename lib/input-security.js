function encodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function normalizeUserInput(value, maxLength = 2000) {
  return encodeHtmlEntities(
    String(value ?? "")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .replace(/\s+/g, " ")
      .slice(0, maxLength)
      .trim()
  );
}

export function hasUnsafeUserInput(_value) {
  return false;
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
    ? encodeHtmlEntities(
        String(value ?? "")
          .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
          .slice(0, maxLength)
          .trim()
      )
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
  return {
    ok: true,
    value: encodeHtmlEntities(value),
    message: ""
  };
}
