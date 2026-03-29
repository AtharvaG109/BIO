"use client";

import { useRef, useState } from "react";

import { contactConfig, siteConfig } from "@/lib/site-data";

export function ContactInterestForm() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("_honey") ?? "").trim();

    if (honeypot) {
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    formData.append("_subject", "New portfolio contact request");
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("source", "Atharva Gham portfolio");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || payload?.success === false) {
        throw new Error(payload?.message || "Submission failed");
      }

      setStatus("success");
      setStatusMessage("Request sent successfully. I will review it and follow up directly.");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setStatusMessage(
        "The form could not be delivered right now. This usually means the form service still needs activation for the inbox."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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

      <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="timeline"
              className="input-control"
              placeholder="Immediate, this quarter, or exploratory"
            />
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
          <span>I understand this request is sent privately for review and phone details are shared selectively.</span>
        </label>

        <div className="contact-form-footer">
          <div className="form-note">
            <strong>{contactConfig.deliveryNote}</strong>
            <span>{contactConfig.phonePolicy}</span>
          </div>

          <button type="submit" className="button button-primary" disabled={isSubmitting}>
            {isSubmitting ? "Sending request..." : "Send request"}
          </button>
        </div>

        {statusMessage ? (
          <p className={`form-status form-status-${status === "success" ? "success" : "error"}`} role="status">
            {statusMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
