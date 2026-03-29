"use client";

import { useActionState, useEffect, useRef } from "react";

import { contactConfig } from "@/lib/site-data";

const initialState = {
  status: "idle",
  message: ""
};

async function submitContactRequest(previousState, formData) {
  const honeypot = formData.get("_honey");

  if (typeof honeypot === "string" && honeypot.trim()) {
    return {
      status: "success",
      message: "Request sent."
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email || !message) {
    return {
      status: "error",
      message: "Add your email and a short note so I can respond properly."
    };
  }

  try {
    const response = await fetch(contactConfig.endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        status: "error",
        message:
          payload?.message ||
          "The form could not be submitted right now. Email or LinkedIn still work as fallback."
      };
    }

    return {
      status: "success",
      message: "Request sent. I will review it and follow up directly if there is a fit."
    };
  } catch {
    return {
      status: "error",
      message:
        "The secure form is temporarily unavailable. Email or LinkedIn are still available while I fix it."
    };
  }
}

export function ContactInterestForm() {
  const formRef = useRef(null);
  const [state, formAction, pending] = useActionState(submitContactRequest, initialState);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="surface contact-form-shell">
      <div className="contact-form-head">
        <p className="eyebrow">Private Contact</p>
        <h2>Request a conversation.</h2>
        <p className="muted">
          Share the role, team, or collaboration context. I review requests directly and keep phone
          details private until the conversation makes sense.
        </p>
      </div>

      <form ref={formRef} action={formAction} className="contact-form">
        <input type="hidden" name="_subject" value="New portfolio contact request" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="source" value="Atharva portfolio site" />

        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="company-website">Company website</label>
          <input id="company-website" type="text" name="_honey" tabIndex="-1" autoComplete="off" />
        </div>

        <div className="form-grid">
          <label className="form-field">
            <span>Name</span>
            <input type="text" name="name" className="input-control" placeholder="Your name" required />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              className="input-control"
              placeholder="name@company.com"
              required
            />
          </label>

          <label className="form-field">
            <span>Company</span>
            <input type="text" name="company" className="input-control" placeholder="Company or organization" />
          </label>

          <label className="form-field">
            <span>Interest</span>
            <select name="interest" className="input-control" defaultValue="Software engineering role" required>
              <option>Software engineering role</option>
              <option>Platform or backend role</option>
              <option>Security engineering role</option>
              <option>Project collaboration</option>
              <option>Research or publication discussion</option>
            </select>
          </label>

          <label className="form-field">
            <span>Timeline</span>
            <input type="text" name="timeline" className="input-control" placeholder="Immediate, this quarter, or exploratory" />
          </label>

          <label className="form-field">
            <span>Role or team</span>
            <input type="text" name="role" className="input-control" placeholder="Title, team, or project scope" />
          </label>

          <label className="form-field form-field-full">
            <span>Why this conversation?</span>
            <textarea
              name="message"
              className="input-control textarea-control"
              rows="6"
              placeholder="Share the problem space, team scope, and why you think there is a fit."
              required
            />
          </label>
        </div>

        <label className="consent-row">
          <input type="checkbox" name="consent" value="agreed" required />
          <span>I understand this request is reviewed personally and direct phone details are shared selectively.</span>
        </label>

        <div className="contact-form-footer">
          <div className="form-note">
            <strong>{contactConfig.replyWindow}</strong>
            <span>{contactConfig.phonePolicy}</span>
          </div>

          <button type="submit" className="button button-primary" disabled={pending}>
            {pending ? "Sending..." : "Send request"}
          </button>
        </div>

        {state.message ? (
          <p className={`form-status form-status-${state.status}`} role="status">
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
