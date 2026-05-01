"use client";

import { useEffect, useRef, useState } from "react";

import { validateUserInput } from "@/lib/input-security";
import { contactConfig, siteConfig } from "@/lib/site-data";

export function ContactInterestForm() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [mountedAt, setMountedAt] = useState(0);
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0);

  useEffect(() => {
    setMountedAt(Date.now());
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("_honey") ?? "").trim();
    const now = Date.now();

    if (honeypot) {
      return;
    }

    if (mountedAt && now - mountedAt < 4000) {
      setStatus("error");
      setStatusMessage("Please take a moment to complete the form before submitting.");
      return;
    }

    if (lastSubmittedAt && now - lastSubmittedAt < 15000) {
      setStatus("error");
      setStatusMessage("Please wait a few seconds before sending another request.");
      return;
    }

    const fields = {
      name: validateUserInput(formData.get("name"), { label: "Name", minLength: 2, maxLength: 80 }),
      email: validateUserInput(formData.get("email"), {
        label: "Email",
        minLength: 5,
        maxLength: 120,
        allowPattern: /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/
      }),
      company: validateUserInput(formData.get("company"), { label: "Company", maxLength: 120 }),
      interest: validateUserInput(formData.get("interest"), { label: "Interest", maxLength: 80 }),
      timeline: validateUserInput(formData.get("timeline"), { label: "Timeline", maxLength: 80 }),
      role: validateUserInput(formData.get("role"), { label: "Role or team", maxLength: 120 }),
      message: validateUserInput(formData.get("message"), {
        label: "Message",
        minLength: 20,
        maxLength: 2000,
        allowMultiline: true
      })
    };
    const invalidField = Object.values(fields).find((field) => !field.ok);

    if (invalidField) {
      setStatus("error");
      setStatusMessage(invalidField.message);
      return;
    }

    const name = fields.name.value;
    const email = fields.email.value;
    const company = fields.company.value;
    const interest = fields.interest.value;
    const timeline = fields.timeline.value;
    const role = fields.role.value;
    const message = fields.message.value;

    if (name.length < 2 || message.length < 20) {
      setStatus("error");
      setStatusMessage("Please provide a real name and a bit more context before submitting.");
      return;
    }

    if (name.length > 80 || company.length > 120 || timeline.length > 80 || role.length > 120 || message.length > 2000) {
      setStatus("error");
      setStatusMessage("One or more fields are too long. Please shorten the request and try again.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    formData.set("name", name);
    formData.set("email", email);
    formData.set("company", company);
    formData.set("interest", interest);
    formData.set("timeline", timeline);
    formData.set("role", role);
    formData.set("message", message);
    formData.append("_subject", "New portfolio contact request");
    formData.append("_template", "table");
    formData.append("_replyto", email);
    formData.append("_blacklist", "viagra,casino,crypto,backlinks,seo service");
    formData.append("source", "Atharva Gham portfolio");

    try {
      const response = await fetch(siteConfig.contactFormEndpoint, {
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
      setLastSubmittedAt(now);
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setStatusMessage(
        "The form could not be delivered right now. Please try again shortly."
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
          Share the role, team, or collaboration context. I review requests myself and keep direct
          phone details private until there is enough context for a useful conversation.
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
            <input
              type="text"
              name="name"
              className="input-control"
              placeholder="Your name"
              autoComplete="name"
              maxLength="80"
              required
            />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              className="input-control"
              placeholder="name@company.com"
              autoComplete="email"
              inputMode="email"
              maxLength="120"
              required
            />
          </label>

          <label className="form-field">
            <span>Company</span>
            <input
              type="text"
              name="company"
              className="input-control"
              placeholder="Company or organization"
              autoComplete="organization"
              maxLength="120"
            />
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
              maxLength="80"
            />
          </label>

          <label className="form-field">
            <span>Role or team</span>
            <input
              type="text"
              name="role"
              className="input-control"
              placeholder="Title, team, or project scope"
              maxLength="120"
            />
          </label>

          <label className="form-field form-field-full">
            <span>Why this conversation?</span>
            <textarea
              name="message"
              className="input-control textarea-control"
              rows="6"
              placeholder="Share the problem space, team scope, and why you think there is a fit."
              minLength="20"
              maxLength="2000"
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
