function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function normalizeSiteUrl(value) {
  if (!value) {
    return "http://localhost:3000";
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function getDefaultSiteUrl() {
  const [owner = "", repo = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");

  if (owner && repo) {
    if (repo === `${owner}.github.io`) {
      return `https://${owner}.github.io`;
    }

    return `https://${owner}.github.io/${repo}`;
  }

  return "http://localhost:3000";
}

const contactEmail = "atharvam10@icloud.com";

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(path) {
  if (
    !path ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  if (!path.startsWith("/")) {
    return path;
  }

  if (!basePath) {
    return path;
  }

  if (path === "/") {
    return `${basePath}/`;
  }

  return `${basePath}${path}`;
}

export function formatPublishedDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export const siteConfig = {
  name: "Atharva Vijayanand Gham",
  shortName: "Atharva Gham",
  initials: "AG",
  title: "Backend · Platform · Security",
  location: "Davis, California",
  email: contactEmail,
  linkedin: "https://www.linkedin.com/in/avg1048",
  description:
    "Portfolio of Atharva Vijayanand Gham, a software engineer focused on backend systems, platform reliability, observability, and security automation.",
  availability:
    "Open to software, backend, platform, and security engineering roles where technical ownership and operational discipline matter.",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || getDefaultSiteUrl())
};

export const hero = {
  eyebrow: "Systems · Security · Observability",
  headline:
    "Backend systems and security engineering built for real operational pressure.",
  summary:
    "I build production-grade services, platform workflows, and security controls with clear ownership, measurable behavior, and defensible engineering decisions.",
  mission:
    "Reliable systems. Clear ownership. Secure delivery.",
  focus: [
    "Go and Python backend services with distributed data paths",
    "OpenTelemetry, debugging, and production root-cause analysis",
    "Security automation, AppSec guardrails, and AI-agent safety review",
    "Platform-minded delivery with observability, rollout safety, and documentation"
  ],
  actions: [
    { label: "Explore projects", href: "/projects/", variant: "primary" },
    { label: "Request intro", href: "/contact/", variant: "secondary" }
  ],
  utilityLinks: [
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "LinkedIn", value: "Open professional profile", href: siteConfig.linkedin },
    { label: "Request intro", value: "Structured email directly to my inbox", href: "/contact/" }
  ]
};

export const contactConfig = {
  intro:
    "I do not publish a direct phone number on the open web. If there is a strong fit, I follow up directly after reviewing your note.",
  deliveryNote: "The form opens a direct email draft addressed to atharvam10@icloud.com.",
  replyWindow: "Usually replies within 24 to 48 hours.",
  phonePolicy: "Direct phone details are shared after an initial fit check.",
  privacyNote:
    "Use the form to share role context, team scope, and why the conversation makes sense. That keeps outreach focused and keeps direct contact details private."
};

export const pathwayCards = [
  {
    title: "About",
    href: "/about/",
    eyebrow: "Profile",
    body: "Background, operating principles, and the technical areas I keep investing in.",
    signal: "Profile, values, and focus areas"
  },
  {
    title: "Experience",
    href: "/experience/",
    eyebrow: "Career",
    body: "Roles, measurable outcomes, and the supporting credentials behind the engineering work.",
    signal: "Work history and credentials"
  },
  {
    title: "Projects",
    href: "/projects/",
    eyebrow: "Case studies",
    body: "Interactive case studies across distributed systems, AI security, binary analysis, application security, and detection.",
    signal: "Project gallery and deep dives"
  },
  {
    title: "Labs",
    href: "/labs/",
    eyebrow: "Applied learning",
    body: "Hands-on offensive, systems, cloud, and defensive workflows framed as work I have actually exercised.",
    signal: "Labs, workflows, and tool use"
  },
  {
    title: "Writing",
    href: "/blog/",
    eyebrow: "Field notes",
    body: "Technical notes on observability, AI security, low-level debugging, and engineering judgment.",
    signal: "Systems and security writing"
  },
  {
    title: "Resume",
    href: "/resume/",
    eyebrow: "Snapshot",
    body: "A concise, recruiter-friendly summary for quick technical review.",
    signal: "Downloadable summary"
  },
  {
    title: "Contact",
    href: "/contact/",
    eyebrow: "Reach out",
    body: "Secure contact request flow for serious role discussions, collaborations, and technical conversations.",
    signal: "Private outreach and next steps"
  }
];

export const stats = [
  {
    value: "50GB/day",
    label: "Raw telemetry processed in a distributed data integration pipeline"
  },
  {
    value: "1,000+",
    label: "Daily alerts triaged through AI-driven security automation"
  },
  {
    value: "13+",
    label: "Distributed systems monitored through a centralized ELK platform"
  },
  {
    value: "20%",
    label: "Operational toil removed with automated self-healing workflows"
  }
];

export const engineeringSignals = [
  {
    title: "Production-grade backend ownership",
    body:
      "I stay with services past implementation: rollout safety, observability coverage, failure analysis, and the cleanup work that makes systems dependable."
  },
  {
    title: "Security that ships with the product",
    body:
      "I turn security into running engineering controls like CI checks, policy gates, detection logic, IAM automation, and safer AI-tool boundaries."
  },
  {
    title: "Debugging depth under pressure",
    body:
      "When behavior gets strange, I work from traces, packets, binaries, and runtime evidence instead of guessing from the surface symptom."
  }
];

export const contactProcess = [
  {
    title: "Share the context",
    body:
      "Tell me about the role, team, project, or collaboration so I can respond with the right level of detail."
  },
  {
    title: "I review fit directly",
    body:
      "I use the request form to filter for serious conversations and keep direct contact details off the public site."
  },
  {
    title: "Phone is shared selectively",
    body:
      "If the conversation makes sense, I follow up directly with the best next step, including phone details when useful."
  }
];

export const capabilityCards = [
  {
    title: "Systems Engineering",
    body:
      "I design concurrent services and data paths with explicit attention to latency, backpressure, rollout safety, and failure recovery."
  },
  {
    title: "Security Engineering",
    body:
      "I translate security risk into maintainable controls: policy gates, CI checks, telemetry, detection content, and remediation workflows teams can keep running."
  },
  {
    title: "Low-Level Debugging",
    body:
      "I trace crashes and unsafe states through binaries, memory layouts, allocators, syscalls, and operating-system behavior when the bug sits below the application layer."
  },
  {
    title: "Operational Rigor",
    body:
      "I use OpenTelemetry, metrics, logs, and automation to reduce mean time to explanation, not just mean time to notice."
  }
];

export const experience = [
  {
    role: "Software Engineer (Security & Systems)",
    company: "DMV Music Alliance",
    period: "January 2025 - Present",
    location: "Washington, DC",
    summary:
      "Architect and maintain distributed backend services in Go and Python, focusing on operational resilience, latency reduction, and observability.",
    highlights: [
      "Engineered high-throughput event ingestion pipelines handling 50GB+ of daily telemetry across distributed nodes without queue saturation.",
      "Instrumented end-to-end OpenTelemetry tracing across microservices, reducing mean time to identify (MTTI) production bottlenecks by 40%.",
      "Automated infrastructure provisioning and security baseline enforcement using Terraform, integrating policy-as-code into CI/CD workflows."
    ],
    tags: ["Go", "Python", "OpenTelemetry", "Distributed Systems", "Terraform"]
  },
  {
    role: "Security Operations Engineering Intern",
    company: "RapidResponse Ops",
    period: "June 2023 - December 2024",
    location: "Remote",
    summary:
      "Developed security automations and hardened deployment pipelines for cloud-native infrastructure, drastically reducing manual triage effort.",
    highlights: [
      "Built Python-based automation scripts that triaged and enriched over 1,000 security alerts per week, eliminating repetitive toil.",
      "Implemented Semgrep and CodeQL scanning in GitHub Actions, blocking OWASP Top 10 vulnerabilities before merging to the main branch.",
      "Configured robust SIEM dashboards and alerts in ELK, mapping anomalous logs to the MITRE ATT&CK framework for faster incident response."
    ],
    tags: ["Python", "SIEM (ELK)", "CI/CD Security", "Semgrep", "Automation"]
  },
  {
    role: "Backend Testing & Reliability Intern",
    company: "Code Gurukul",
    period: "June 2021 - December 2022",
    location: "Pune, India",
    summary:
      "Profiled Linux-based backend services, improved API latency, and supported release automation across staging setups.",
    highlights: [
      "Optimized Linux backend services and improved API responsiveness for 4,300+ active users by removing redundant database queries.",
      "Automated server configuration and deployment validation routines with Bash-based tooling, accelerating server rollouts by 30%.",
      "Identified and patched memory constraint issues in C++ worker processes via comprehensive crash dump analysis."
    ],
    tags: ["Linux", "Bash", "Backend APIs", "Performance", "C++"]
  }
];

export const projects = [
  {
    slug: "massively-distributed-data-integration-pipeline",
    title: "Massively Distributed Data Integration Pipeline",
    featured: true,
    category: "Systems",
    year: "2025",
    summary:
      "Designed and implemented a concurrent telemetry pipeline to process 50GB of raw data daily across distributed cloud environments.",
    impact:
      "Owned the project from architecture through production rollout, tuning compute and transport behavior for fault-tolerant, low-latency streaming.",
    challenge:
      "The problem was to ingest and process high-volume telemetry across distributed environments without letting coordination overhead, transport cost, or failure recovery dominate throughput.",
    approach: [
      "Designed the ingestion path around concurrent workers, resilient queueing, and low-friction transformation stages.",
      "Tuned compute allocation, transport behavior, and security layers such as TLS and IPsec to preserve throughput without losing reliability.",
      "Handled design, production rollout, and operational hardening end to end rather than handing off the difficult parts after implementation."
    ],
    result:
      "The system reached production as a resilient, high-availability pipeline capable of sustaining 50GB of raw telemetry per day while remaining observable and fault tolerant.",
    outcomes: [
      "Processed high-volume telemetry workloads across distributed cloud infrastructure.",
      "Applied low-level tuning around TLS, IPsec, and ingestion logic to keep the pipeline resilient under load."
    ],
    stack: ["Go", "Python", "Telemetry Pipelines", "TLS", "IPsec", "Cloud Architecture"],
    media: {
      src: "/media/distributed-pipeline.svg",
      alt: "Technical diagram of a distributed telemetry pipeline with edge collectors, queueing, concurrent workers, storage, and observability notes."
    }
  },
  {
    slug: "neonatal-screening-application-publication",
    title: "Neonatal Screening Application (Published Research Paper)",
    category: "Publication",
    year: "2023",
    summary:
      "Published a research paper on a neonatal screening application focused on practical detection workflows and early-response usability.",
    impact:
      "Converted coursework and implementation findings into a publishable technical paper with an explicit emphasis on healthcare-impactful software design.",
    challenge:
      "The core challenge was balancing technical implementation detail with a clinically relevant workflow so the system remained both defensible and practical.",
    approach: [
      "Designed the application flow around screening-path clarity, risk signaling, and implementation decisions that can be explained to non-specialist stakeholders.",
      "Documented architecture, process decisions, and validation logic to ensure the research output was reproducible and reviewable.",
      "Translated implementation lessons into publication-grade narrative and structured findings."
    ],
    result:
      "The work was published and now serves as a concrete example of end-to-end delivery: from problem framing and implementation to written technical communication.",
    outcomes: [
      "Published at IJRASET as a formal research paper.",
      "Demonstrated product-minded security and systems thinking in a healthcare-oriented domain."
    ],
    stack: ["Research Writing", "Application Design", "Healthcare Workflow", "Analysis"],
    media: {
      src: "/media/neonatal-publication.svg",
      alt: "Illustration of a neonatal screening workflow publication with analysis notes, architecture summary, and outcomes."
    },
    links: [
      {
        label: "Read published paper",
        href: "https://www.ijraset.com/research-paper/neonatal-screening-application"
      }
    ]
  },
  {
    slug: "ai-security-and-agentic-workflow-automation",
    title: "AI Security and Agentic Workflow Automation",
    category: "AI Security",
    year: "2024",
    summary:
      "Performed adversarial review of LLM-enabled automation agents and built Python-based multi-agent security workflows for alert triage.",
    impact:
      "Surfaced prompt-injection and unsafe tool-use paths while improving throughput across a 1,000-plus-alert-per-day triage workload.",
    challenge:
      "The hard part was not just making automation work. It was making agentic workflows useful without leaving prompt, tool-use, and permission boundaries dangerously loose.",
    approach: [
      "Reviewed LLM-enabled agents as systems, not just models, with attention to prompt injection, unsafe retrieval, and untrusted tool invocation.",
      "Designed Python-based multi-agent workflows to automate repetitive triage and enrichment tasks in a way that reduced manual fatigue.",
      "Mapped failure paths early so the workflow could stay observable and easier to constrain."
    ],
    result:
      "The result was a security automation flow that improved triage throughput while making agent permissions, tool-use boundaries, and auditability easier to reason about.",
    outcomes: [
      "Modeled failure paths for agentic systems that interact with tools and external context.",
      "Reduced human triage load by automating repetitive detection and enrichment steps."
    ],
    stack: ["Python", "LLM Security", "Automation", "Detection Engineering"],
    media: {
      src: "/media/agentic-security.svg",
      alt: "Technical threat-model diagram for an agentic security workflow showing untrusted input, policy gateway, agent runtime, tool mediation, and audit outcomes."
    }
  },
  {
    slug: "advanced-binary-research-and-exploit-development",
    title: "Advanced Binary Research and Exploit Development",
    category: "Research",
    year: "2024",
    summary:
      "Reverse engineered 32-bit and 64-bit binaries to understand memory operations, CPU behavior, and kernel interactions in vulnerable code paths.",
    impact:
      "Used GDB and dynamic analysis to trace corruption faults to root cause and authored optimized C/C++ remediations for crash conditions.",
    challenge:
      "This work centered on understanding how unsafe memory behavior actually unfolds inside binaries and how to move from a crash symptom to a defensible root cause.",
    approach: [
      "Reverse engineered binaries across 32-bit and 64-bit environments to reason about process state, allocators, and vulnerable execution paths.",
      "Used GDB and dynamic analysis to isolate corruption sources instead of stopping at surface-level exploit symptoms.",
      "Translated debugging findings into concrete C/C++ fixes that addressed the underlying crash condition."
    ],
    result:
      "The main outcome was deeper low-level fluency: exploit intuition, stronger debugging discipline, and remediation work grounded in the real behavior of binaries and operating systems.",
    outcomes: [
      "Worked directly with allocator behavior, process memory state, and OS-level primitives.",
      "Demonstrated deep debugging fluency across binaries, kernels, and crash remediation work."
    ],
    stack: ["C/C++", "GDB", "Reverse Engineering", "Memory Analysis", "Linux"],
    media: {
      src: "/media/binary-analysis.svg",
      alt: "Binary-analysis workbench illustration showing GDB output, memory-corruption notes, and remediation flow."
    }
  },
  {
    slug: "web-vulnerability-research-and-remediation-tooling",
    title: "Web Vulnerability Research and Remediation Tooling",
    category: "Application Security",
    year: "2023",
    summary:
      "Built Python tooling to replicate and fingerprint SQL injection and XSS patterns across production-like environments.",
    impact:
      "Translated vulnerability research into secure coding guidance and CI/CD rules that eliminated injection vectors earlier in delivery.",
    challenge:
      "The goal was to move beyond one-off findings and turn web vulnerability research into repeatable checks and fixes developers could use before release.",
    approach: [
      "Built Python tooling to reproduce and fingerprint common exploit paths such as SQL injection and XSS in production-like environments.",
      "Converted research findings into Semgrep and CodeQL rules that could run continuously in delivery pipelines.",
      "Paired the automation with remediation guidance focused on what engineers actually needed to change in code."
    ],
    result:
      "That work shifted application security earlier in delivery by making insecure patterns easier to catch, explain, and remove before release.",
    outcomes: [
      "Implemented Semgrep and CodeQL policies to catch risky patterns before release.",
      "Created remediation guidance developers could actually apply during normal delivery work."
    ],
    stack: ["Python", "Semgrep", "CodeQL", "CI/CD", "Web Security"],
    media: {
      src: "/media/appsec-tooling.svg",
      alt: "Application-security workflow diagram showing exploit reproduction, static analysis rules, CI gates, and remediation feedback."
    }
  },
  {
    slug: "security-monitoring-and-iam-compliance-automation",
    title: "Security Monitoring and IAM Compliance Automation",
    category: "Detection",
    year: "2023",
    summary:
      "Engineered a centralized ELK platform that ingested logs from more than 13 distributed systems and automated detection and response triggers.",
    impact:
      "Improved visibility into indicators of compromise while automating cryptographic key and certificate lifecycle management with zero downtime.",
    challenge:
      "The challenge was to increase visibility and response quality across distributed systems while keeping compliance-sensitive controls reliable and low-friction.",
    approach: [
      "Centralized logs from 13-plus systems into a shared ELK platform to make suspicious behavior easier to correlate and investigate.",
      "Built behavior-based detections and response triggers so alerts reflected suspicious activity instead of isolated signatures alone.",
      "Automated certificate and key lifecycle management to reduce downtime risk and support PCI DSS and NIST expectations."
    ],
    result:
      "The outcome was stronger operational visibility, cleaner response automation, and more dependable handling of compliance-driven identity and certificate workflows.",
    outcomes: [
      "Developed behavior-based detections and automated response logic for higher-confidence alerts.",
      "Aligned key rotation and certificate management with PCI DSS and NIST expectations."
    ],
    stack: ["ELK", "IAM", "SSL/TLS", "PCI DSS", "NIST", "Automation"],
    media: {
      src: "/media/detection-automation.svg",
      alt: "Detection-engineering diagram showing centralized ELK ingestion, behavioral rules, automated response triggers, and certificate automation."
    }
  }
];

export const securityPillars = [
  "AI agent security",
  "Application security",
  "Exploit development",
  "Reverse engineering",
  "Detection engineering",
  "Identity and access management",
  "Cloud security",
  "Secure CI/CD",
  "Security automation"
];

export const toolGroups = [
  {
    title: "Engineering and Infrastructure",
    items: [
      "Go",
      "Python",
      "Java",
      "Bash",
      "SQL",
      "Kubernetes",
      "Docker",
      "AWS",
      "Azure",
      "Microservices"
    ]
  },
  {
    title: "Debugging and Operations",
    items: [
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Wireshark",
      "GDB",
      "Git",
      "CI/CD",
      "Linux Internals"
    ]
  },
  {
    title: "Security Tooling",
    items: [
      "Semgrep",
      "CodeQL",
      "ELK",
      "TCP/IP Packet Inspection",
      "Socket Programming",
      "Latency Reduction",
      "Root Cause Analysis"
    ]
  }
];

export const education = [
  {
    degree: "Master of Engineering in Cybersecurity",
    school: "University of Maryland, College Park",
    period: "August 2023 - May 2025",
    details:
      "Graduate study centered on cybersecurity engineering, secure systems, and applied defensive practice."
  },
  {
    degree: "Bachelor of Technology in Computer Engineering",
    school: "Vishwakarma University, Pune",
    period: "August 2018 - July 2022",
    details:
      "Completed the IBM Cybersecurity and Forensics graduate program track alongside core computer engineering coursework."
  }
];

export const certifications = [
  {
    name: "Offensive Security Certified Professional (OSCP)",
    issuer: "Offensive Security",
    details:
      "Hands-on certification focused on exploitation, privilege escalation, and adversarial problem solving."
  },
  {
    name: "IBM Cyber Security and Forensics Graduate",
    issuer: "IBM",
    details:
      "Program work focused on applied cybersecurity and forensics fundamentals."
  }
];

export const aboutDepthCards = [
  {
    title: "System Ownership",
    body:
      "I stay involved from architecture to production reliability, including observability, rollout safety, and post-release hardening.",
    signal:
      "This keeps delivery grounded in operational behavior, not just feature completeness."
  },
  {
    title: "Security-First Execution",
    body:
      "I treat secure defaults, policy guardrails, and attack-surface reduction as part of engineering quality rather than optional add-ons.",
    signal:
      "That approach reduces rework and shortens time from vulnerability discovery to remediation."
  },
  {
    title: "Communication Under Pressure",
    body:
      "I write incident notes, project summaries, and technical handoff material that helps teams move quickly with shared context.",
    signal:
      "Strong communication turns debugging depth into team-level velocity."
  }
];

export const deliveryPatterns = [
  {
    title: "Architecture to Operations",
    body:
      "I scope work with an explicit path to deployment, telemetry, and fallback behavior before implementation starts."
  },
  {
    title: "Measure Before Opinion",
    body:
      "I prioritize instrumentation and direct evidence to isolate performance or security bottlenecks before proposing fixes."
  },
  {
    title: "Close the Loop",
    body:
      "After shipping, I focus on runbooks, automation, and prevention patterns so the same class of failure is less likely to return."
  }
];

export const practiceTracks = [
  {
    title: "Offensive Workflow in Labs and Challenge Environments",
    category: "Applied Offense",
    summary:
      "Hands-on offensive practice built around enumeration discipline, exploit-path development, privilege escalation, and reporting quality.",
    usedIn: [
      "PEN-200 / PWK applied modules and challenge labs",
      "ENPM634 penetration testing labs and VM-based exercises",
      "Reconnaissance and exploitation practice across Linux and Windows targets"
    ],
    actions: [
      "Enumerated hosts and services with targeted scanning and OSINT-style workflows",
      "Worked through web, client-side, and perimeter attack paths",
      "Practiced privilege escalation, lateral movement, and communicating findings in report form"
    ],
    tools: ["Kali Linux", "Nmap", "Metasploit", "Python", "Reporting"]
  },
  {
    title: "Linux Systems, Administration, and Hardening",
    category: "Operations",
    summary:
      "Operational Linux experience covering host setup, shell-based administration, service troubleshooting, and hardening.",
    usedIn: [
      "ENPM818P Linux administration labs",
      "Virtual machine setup and management for security coursework",
      "Shell-based workflows used throughout systems and security exercises"
    ],
    actions: [
      "Worked through file systems, boot behavior, process management, and command-line administration",
      "Used shell scripting and CLI tooling to automate repetitive tasks",
      "Applied secure administration habits while configuring and troubleshooting Linux environments"
    ],
    tools: ["Linux", "Bash", "VMware", "System Services", "CLI Tooling"]
  },
  {
    title: "Cloud Security and IAM in Practice",
    category: "Cloud",
    summary:
      "Applied cloud security work across IAM, workload configuration, incident-response scenarios, and platform-specific failure modes.",
    usedIn: [
      "ENPM665 cloud security coursework",
      "Hands-on exercises across AWS, Azure, and GCP free-tier environments",
      "Identity, data protection, incident response, and cloud forensics scenarios"
    ],
    actions: [
      "Worked through secure workload migration and cloud-specific threat considerations",
      "Applied IAM and data protection concepts to cloud-native contexts",
      "Studied incident response and forensics patterns specific to IaaS, PaaS, and SaaS"
    ],
    tools: ["AWS", "Azure", "GCP", "IAM", "Cloud Forensics"]
  },
  {
    title: "Exploit Development and Vulnerability Analysis",
    category: "Binary Security",
    summary:
      "Binary exploitation work focused on memory-corruption mechanics, mitigation behavior, and debug-driven reasoning about vulnerable code paths.",
    usedIn: [
      "Stack overflow walkthroughs and exploit exercises",
      "Detailed study of format strings, ASLR behavior, integer flaws, and NULL-related exploitation",
      "Binary-debugging oriented labs and research"
    ],
    actions: [
      "Practiced stack-based exploitation workflow from crash to offset control and payload shaping",
      "Studied how ASLR changes exploit assumptions and how attackers adapt",
      "Built intuition for memory disclosure, arbitrary writes, integer security, and exploit reliability"
    ],
    tools: ["GDB", "Python", "Immunity Debugger Concepts", "ASLR Analysis", "Format Strings"]
  },
  {
    title: "Detection, Automation, and Security Communication",
    category: "Defense",
    summary:
      "Defensive practice around packet analysis, rule development, automation, and reporting that engineers can act on.",
    usedIn: [
      "Snort rule-writing references and packet-analysis exercises",
      "Python-based scripting and security automation work",
      "Pen-test reporting and technical writing practice"
    ],
    actions: [
      "Worked with detection logic that targets vulnerability behavior instead of one-off exploit signatures",
      "Used Python as a practical tool for automation and repeatable analysis",
      "Practiced writing findings so they are useful to engineers and decision-makers, not just technically correct"
    ],
    tools: ["Snort", "Python", "Packet Analysis", "Technical Writing", "Reporting"]
  }
];

export const studyThemes = [
  {
    title: "Program Representation and Reverse Engineering",
    summary:
      "I worked through how C code becomes assembly, object code, and executables, then used disassembly to reason about real program behavior instead of treating binaries like black boxes.",
    points: [
      "Used disassembly workflows such as objdump to connect source-level intent to generated IA-32 instructions.",
      "Built fluency around stack frames, calling conventions, return paths, linking, and how compiler output shapes runtime behavior.",
      "Used that grounding to make later exploit analysis and debugging work much more concrete."
    ]
  },
  {
    title: "Memory Corruption, Shellcode, and Exploit Construction",
    summary:
      "The low-level material went beyond labels and covered the mechanics of stack layout, payload shaping, NOP sled strategy, return-address control, and shellcode placement.",
    points: [
      "Worked through buffer-overflow flow from crash state to offset control and redirection to useful execution targets such as jmp-ESP style pivots.",
      "Studied shellcode construction strategy, return-address setup, and how exploit reliability changes once stack layout details matter.",
      "Used these exercises to sharpen how I reason about unsafe memory behavior and defensive coding boundaries."
    ]
  },
  {
    title: "Format Strings and Runtime Hooking",
    summary:
      "I studied exploit paths that rely on disclosure and dynamic runtime manipulation rather than only classic buffer overwrites.",
    points: [
      "Worked through format-string behavior for stack disclosure, process instability, and attacker-controlled use of printf-family functions.",
      "Studied LD_PRELOAD-based wrapper techniques to observe arguments, modify behavior, and understand runtime control-flow interception.",
      "That combination improved my intuition for both offensive technique and practical detection or mitigation strategy."
    ]
  },
  {
    title: "Secure Communications and Trust Boundaries",
    summary:
      "The networking and crypto material reinforced how secure channels are actually constructed and where trust can fail across real systems.",
    points: [
      "Reviewed SSL/TLS, VPN, and Secure Shell as concrete communication patterns rather than abstract security buzzwords.",
      "Connected encryption, channel protection, and authentication decisions back to real operational tradeoffs.",
      "Used that perspective in later work involving certificates, transport hardening, and secure service-to-service communication."
    ]
  },
  {
    title: "Operating System and Kernel Security",
    summary:
      "The systems material covered memory management, processes and threads, kernel security, secure hardware, and OS trust boundaries as the layer that ultimately decides what higher-level software can safely do.",
    points: [
      "Built stronger mental models for allocator behavior, process isolation, concurrency, and how OS architecture shapes attack surface.",
      "Studied Linux security controls such as LSM and SELinux, along with the broader role of the kernel as a system-wide trust anchor.",
      "That work improved both low-level debugging depth and the quality of my defensive system design decisions."
    ]
  }
];

export const practiceFoundations = [
  "Built from graduate-level study across secure systems, cloud security, communications, operating-system behavior, and offensive technique.",
  "Strengthened through PEN-200 / PWK hands-on modules, applied exercises, challenge labs, and report-writing practice.",
  "Extended with repeated work on disassembly, shellcode, format strings, LD_PRELOAD-style hooking, memory management, and kernel trust boundaries."
];

export const principles = [
  {
    title: "Integrity",
    body:
      "I report risk, uncertainty, and tradeoffs directly. If the evidence is thin or the system is unsafe, I say so.",
    signal:
      "That matters in debugging, incident response, and security review, where false confidence is expensive."
  },
  {
    title: "Loyalty",
    body:
      "I stay with the hard parts of the work: incidents, cleanup, remediation, and operational follow-through after the visible milestone.",
    signal:
      "In practice, loyalty looks like reliability under pressure and consistency with the team."
  },
  {
    title: "Disciplined Work Ethic",
    body:
      "I am comfortable with repetitive, detail-heavy work when it improves the system: instrumentation, hardening, regression analysis, and documentation.",
    signal:
      "The result is usually better reliability, clearer handoffs, and fewer repeated failures."
  }
];

export const interests = [
  {
    title: "Low-Level Systems",
    body:
      "Operating system behavior, binary internals, allocators, and debugging beneath higher-level abstractions."
  },
  {
    title: "Security Research",
    body:
      "Exploit techniques, real incident writeups, and defensive patterns that hold up outside lab conditions."
  },
  {
    title: "AI and Agentic Systems",
    body:
      "How autonomous workflows fail, how they can be abused, and how to build safer tool-use patterns around them."
  },
  {
    title: "Distributed Architecture",
    body:
      "Systems that remain observable, resilient, and performant as scale, concurrency, and failure modes increase."
  }
];

export const blogPosts = [
  {
    slug: "observability-as-a-root-cause-discipline",
    title: "Observability as a Root-Cause Discipline",
    category: "Systems",
    publishedAt: "2026-03-01",
    readTime: "5 min read",
    excerpt:
      "Tracing is not just dashboards. It is the shortest path from symptom to mechanism when latency or correctness starts drifting in distributed systems.",
    intro:
      "The value of observability is not the graph. It is the speed at which a team can move from a vague production symptom to a defensible explanation of what actually changed.",
    sections: [
      {
        heading: "Instrument the path, not just the service",
        paragraphs: [
          "In a microservices system, isolated service-level metrics create partial stories. The useful signal comes from following a request across boundaries and understanding where time, retries, fan-out, or queueing behavior start to distort the path.",
          "That is why I treat tracing as an engineering design tool, not just an operational dashboard."
        ]
      },
      {
        heading: "Use telemetry to narrow blame quickly",
        paragraphs: [
          "When a system starts deviating, the first requirement is reducing the search space. Good instrumentation should let you isolate whether the issue sits in code, coordination, infrastructure, or network behavior before the incident turns into guesswork."
        ],
        bullets: [
          "Trace propagation across service boundaries",
          "Latency heat spots across queueing or dependent calls",
          "Correlation between deploys, traffic shape, and error behavior"
        ]
      },
      {
        heading: "Operational follow-through matters",
        paragraphs: [
          "Observability only earns its keep when it changes the remediation loop. The strongest outcome is not a dashboard. It is a fix, a better default, or an automated response that prevents the same class of failure from recurring."
        ]
      }
    ]
  },
  {
    slug: "threat-modeling-agentic-workflows",
    title: "Threat Modeling Agentic Workflows",
    category: "AI Security",
    publishedAt: "2026-02-14",
    readTime: "6 min read",
    excerpt:
      "Agentic systems fail differently from traditional software. The security problem is often not the model alone but the way tools, prompts, memory, and permissions combine.",
    intro:
      "As soon as an LLM can call tools, process untrusted inputs, and mutate state, the security surface changes. Treating these systems like plain chat interfaces is a mistake.",
    sections: [
      {
        heading: "The interesting bugs are compositional",
        paragraphs: [
          "Prompt injection matters, but it is only part of the picture. In practice, risk emerges when model behavior, tool-use permissions, memory persistence, and weak validation line up in the wrong order.",
          "That makes threat modeling for agentic workflows closer to systems design than prompt hygiene alone."
        ]
      },
      {
        heading: "Constrain every boundary",
        paragraphs: [
          "Useful agentic systems still need tight boundaries. Tools should be scoped, outputs validated, permissions minimized, and actions auditable."
        ],
        bullets: [
          "Separate retrieval context from executable instructions",
          "Add allowlists around tools and parameter shapes",
          "Log decision paths before actions are taken"
        ]
      },
      {
        heading: "Security wins when workflows stay observable",
        paragraphs: [
          "If a team cannot reconstruct why an agent acted, then response and remediation will always lag behind failure. Auditability is part of the product, not an afterthought."
        ]
      }
    ]
  },
  {
    slug: "why-low-level-debugging-still-matters",
    title: "Why Low-Level Debugging Still Matters",
    category: "Research",
    publishedAt: "2026-01-20",
    readTime: "4 min read",
    excerpt:
      "Cloud-native systems still fail at the seams where abstractions leak. Low-level debugging remains a practical engineering advantage, not just a specialist hobby.",
    intro:
      "A lot of modern engineering work sits behind powerful abstractions, but failures do not respect those layers. Memory state, scheduler behavior, kernel interactions, and binary semantics still decide what the system does under stress.",
    sections: [
      {
        heading: "The stack eventually bottoms out",
        paragraphs: [
          "Even when working primarily in cloud infrastructure or high-level services, there are moments when the fastest route to truth is understanding what the process, binary, or operating system is actually doing."
        ]
      },
      {
        heading: "Reverse engineering sharpens defensive intuition",
        paragraphs: [
          "Analyzing memory corruption, allocator behavior, and exploit paths teaches the kinds of assumptions that break under pressure. That feeds directly back into more defensive software design."
        ]
      },
      {
        heading: "Debugging depth changes engineering judgment",
        paragraphs: [
          "Low-level fluency improves how you reason about performance, unsafe boundaries, failure modes, and remediation tradeoffs even when the immediate problem is not exploitation."
        ]
      }
    ]
  },
  {
    slug: "zero-trust-beyond-the-buzzword",
    title: "Zero Trust: Implementation Beyond the Buzzword",
    category: "Architecture",
    publishedAt: "2025-11-05",
    readTime: "7 min read",
    excerpt:
      "Zero Trust architectures fail when they try to wrap legacy monoliths instead of reshaping identity verification at the micro-boundary.",
    intro:
      "We treat zero trust like a vendor solution, but the reality is it is an operational standard. You don't buy zero trust; you build systems that mutually authenticate and refuse requests without explicit identity assertions.",
    sections: [
      {
        heading: "Move the perimeter to the workload",
        paragraphs: [
          "The corporate VPN is an artifact of an architecture that assumed trust based on IP subnets. Real zero trust models demand that the identity of the user, the health of the device, and the authorization of the process itself are evaluated on every single request.",
          "When deploying microservices, implementing mutual TLS (mTLS) isn't optional; it's the foundation of secure service-to-service dialog."
        ]
      },
      {
        heading: "Fail closed securely",
        paragraphs: [
          "If a policy engine goes down, the default behavior should be a hard deny. Engineers hate this because it breaks uptime metrics, but failing open creates catastrophic lateral movement paths."
        ],
        bullets: [
          "Implement localized policy caching to survive intermittent control-plane failures",
          "Ensure fail-closed states throw highly visible alerts",
          "Treat identity revocation as immediately consistent, even globally"
        ]
      }
    ]
  }
];

export function getSortedBlogPosts(posts = blogPosts) {
  return [...posts].sort(
    (a, b) =>
      Date.parse(`${b.publishedAt}T00:00:00Z`) - Date.parse(`${a.publishedAt}T00:00:00Z`)
  );
}

export function getLatestPost() {
  return getSortedBlogPosts()[0] ?? null;
}

export function getFeaturedProject() {
  return projects.find((project) => project.featured) ?? projects[0] ?? null;
}

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
