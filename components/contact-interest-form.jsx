"use client";

import { useRef, useState } from "react";

import { contactConfig, siteConfig } from "@/lib/site-data";

function buildMailtoHref(fields) {
  const subject = `${fields.interest} inquiry${fields.company ? ` from ${fields.company}` : ""}`;
  const lines = [
    "Hello Atharva,",
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Company: ${fields.company}` : null,
    fields.role ? `Role or team: ${fields.role}` : null,
    `Interest: ${fields.interest}`,
    fields.timeline ? `Timeline: ${fields.timeline}` : null,
    "",
    "Why this conversation:",
    fields.message,
    "",
    "Sent from your portfolio contact form."
  ].filter(Boolean);

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

export function ContactInterestForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("_honey") ?? "").trim();

    if (honeypot) {
      return;
    }

    const fields = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      interest: String(formData.get("interest") ?? "").trim(),
      timeline: String(formData.get("timeline") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    setStatus("success");
    setStatusMessage(`Your email app should open a draft addressed to ${siteConfig.email}.`);

    window.location.href = buildMailtoHref(fields);
    formRef.current?.reset();
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
          <span>I understand this request opens a direct email draft and phone details are shared selectively.</span>
        </label>

        <div className="contact-form-footer">
          <div className="form-note">
            <strong>{contactConfig.deliveryNote}</strong>
            <span>{contactConfig.phonePolicy}</span>
          </div>

          <button type="submit" className="button button-primary">
            Open email draft
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
