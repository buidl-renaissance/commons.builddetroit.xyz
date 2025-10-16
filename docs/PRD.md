# 🧭 Product Requirements Document (PRD)

**Project:** Detroit's Open Commons  
**Version:** 0.1  
**Date:** October 2025  
**Owner/Maintainer:** John Gulbronson — Detroit Commons / Barefoot Devs

---

## 1. Project Overview

### Project Name
Detroit's Open Commons

### Summary
A public digital infrastructure for Detroit's creative and civic communities — combining decentralized identity, open data, and collaborative storytelling tools to empower local creators, organizations, and technologists to build and share together.

### Owner / Maintainer
John Gulbronson — Detroit Commons / Barefoot Devs

### Related Documents
- **README:** [Detroit Commons Monorepo](../README.md)
- **PAD:** Detroit's Open Commons Architecture (Coming Soon)
- **Community Charter:** Detroit Commons Constitution v1.0 (Coming Soon)

### Repository / Workspace
[github.com/buidl-renaissance/commons.builddetroit.xyz](https://github.com/buidl-renaissance/commons.builddetroit.xyz)

### Current Version
0.1 – Scoping & MVP Development

---

## 2. Vision & Goals

### Mission Statement
To build Detroit's digital public commons — a shared infrastructure that enables communities, creators, and civic partners to coordinate transparently, share resources, and document their collective impact.

### Primary Goals

**Goal 1:** Empower local creators and organizations with digital tools for coordination, identity, and storytelling.

**Goal 2:** Create an interoperable data layer for Detroit's civic, cultural, and economic ecosystem.

**Goal 3:** Enable trust and transparency through open protocols and verifiable participation records.

### Success Criteria / KPIs

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Verified community members | 1,000+ | DID registrations via onboarding flow |
| Connected organizations | 100+ | Verified org accounts / partnerships |
| Public interactions recorded | 10,000+ | Event check-ins, uploads, credits |
| System uptime | 99.9% | API monitoring logs |

---

## 3. Problem Statement

### The Problem
Detroit's community data — from art events to local development projects — exists in disconnected silos. Creators, nonprofits, and civic organizations lack unified tools to coordinate, publish, and track their shared contributions.

### Why it Matters
A transparent, interoperable digital commons strengthens civic trust, enables local collaboration, and unlocks new pathways for equitable funding and collective ownership.

### Who it Affects

- **Local artists and creators** seeking visibility and financial sustainability
- **Nonprofits, city programs, and businesses** collaborating on shared goals
- **Citizens and participants** eager to engage with Detroit's transformation

### Current Limitations

- Fragmented systems (Eventbrite, Instagram, spreadsheets, etc.)
- No interoperable identity or record of participation
- Lack of automated tools for transparency and measurement

---

## 4. Target Users & Personas

### Primary Users

- Detroit-based creators, builders, and organizers
- Nonprofits and cultural organizations
- Developers contributing to open civic infrastructure

### Secondary Users

- City government partners (DLBA, Make It Home, NEZ, etc.)
- Collectors, patrons, and community investors
- Technologists and researchers exploring civic Web3

### User Personas

| Name | Role | Goals | Pain Points | Motivations |
|------|------|-------|-------------|-------------|
| **Andrea** | Artist | Share and monetize her art transparently | Fragmented tools, poor documentation | Wanting autonomy and visibility |
| **Marcus** | Nonprofit Director | Coordinate projects and volunteers | Manual reporting, low engagement | Strengthen trust and attract funding |
| **Xander** | Developer | Build civic APIs and automations | Siloed data, lack of standards | Contribute open tools to the city |

---

## 5. Use Cases

| Use Case | Actor | Description | Outcome |
|----------|-------|-------------|---------|
| Artist registers DID | Artist | Verifies identity and links profile to portfolio | On-chain identity established |
| Nonprofit publishes event | Org | Posts verified community event | Event added to commons feed |
| Resident checks into event | Citizen | Scans QR code to record attendance | Proof of participation logged |
| Artist uploads artwork | Creator | Uploads artwork and metadata | Artifact minted and stored |
| City org queries data | Partner | Pulls verified metrics for reports | Transparent civic analytics |

---

## 6. Feature Requirements

| Feature | Description | Priority | Dependencies |
|---------|-------------|----------|--------------|
| **Decentralized Identity (DID) System** | Wallet- or email-based DID onboarding | 🔥 High | LUKSO / Ceramic / Supabase |
| **Event Check-in System** | QR/NFC-based attendance tracking | 🔥 High | Mobile camera API, Supabase |
| **Community Feed** | Aggregated stream of verified posts, projects, and events | 🔥 High | Media Manager, Turso DB |
| **Credit & Reputation System** | Earn credits and badges for engagement | ⚡ Medium | Event + User system |
| **Commons Explorer** | Map and timeline visualization of local projects | ⚡ Medium | Mapbox, Vercel Edge |
| **AI Summarization Agent** | Auto-generate community recaps from event data | 💡 Low | OpenAI / n8n integration |

---

## 7. User Flow / Journey Map

### Primary Path
Landing → Onboarding (DID creation) → Dashboard → Join/Host Event → Upload → Share → Earn Credits

### Key Screens

1. Welcome / Vision Page
2. DID Onboarding Flow
3. Dashboard / Commons Feed
4. Event Creation + Check-in
5. Artifact Upload
6. Credits / Badges / Profile

### System Actions

- Auto-generate DID upon onboarding
- Sync event participation to profile
- Summarize participation logs via AI

---

## 8. Functional Requirements

### Inputs
- Name, email/wallet, location
- Media uploads (artwork, event images)
- QR scans, NFC taps

### Outputs
- DID creation confirmation
- Verified participation record
- NFT/POAP mint or badge reward

### Business Logic
- Only verified DIDs can create events
- Credits earned scale with participation frequency
- AI agents generate summaries from verified logs

### Validation
- Form fields required for submission
- One DID per unique wallet or email

---

## 9. Non-Functional Requirements

| Category | Description |
|----------|-------------|
| **Performance** | Load core dashboard in < 3s on 4G |
| **Security** | Encrypted Supabase storage + DID auth |
| **Scalability** | Modular API design (10k+ concurrent users) |
| **Accessibility** | WCAG 2.1 Level AA |
| **Localization** | English / Spanish |
| **Data Ownership** | Users own their identity and data exports |

---

## 10. Dependencies & Integrations

### External APIs
- **Supabase** - Auth, Storage
- **OpenAI** - Summaries, Recommendations
- **n8n** - Workflow automation
- **Mapbox** - Visualization

### Third-party Tools
- **Expo** - Mobile app
- **Vercel** - Hosting
- **Turso / libSQL** - Database

### Internal Systems
- Media Manager Module
- Commons Design System
- Detroit Commons DID Registry

---

## 11. Milestones & Timeline

| Milestone | Description | Target Date | Status |
|-----------|-------------|-------------|--------|
| **MVP Launch** | Identity + Event Check-in + Feed | Feb 1, 2026 | 🟡 In Progress |
| **Beta Access** | Partner organizations onboarded | Mar 15, 2026 | ⏳ Planned |
| **Public Launch** | Open onboarding + dashboard | May 1, 2026 | 🔜 Planned |
| **Open API** | External data access + civic dashboards | Jul 1, 2026 | 🔜 Planned |

---

## 12. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Dependency delay (APIs) | Medium | High | Build mocks + decouple layers |
| Low adoption | High | Medium | Partner with ArtNight, Barefoot Devs |
| Governance challenges | Medium | High | Publish transparent community charter |
| Privacy concerns | Medium | Medium | Data ownership + opt-in sharing |

---

## 13. KPIs & Measurement

### User Growth
- DIDs created
- Onboarding conversion rate

### Engagement
- Events attended
- Uploads completed
- Credits earned

### Retention
- Monthly active users
- Return rate

### Civic Impact
- Verified collaborations
- Funds distributed

### Operational
- API uptime
- Latency
- Storage usage

---

## 14. Design & Branding

### Design System
- **Framework:** Shadcn/ui + Tailwind CSS (transitioning to Styled Components)
- **Figma:** Detroit Commons Design Kit v1.0

### Tone & Voice
Empowering, Transparent, Grounded in Detroit's culture of resilience and collaboration.

### Color Palette
Industrial blues, rusted bronze, and soft white — reflecting Detroit's industrial rebirth.

### UX Considerations
- Simple mobile onboarding
- Accessible forms and text contrast
- Consistent visual identity across ecosystem

---

## 15. AI Integration

### Use Cases
- Summarize event transcripts
- Auto-generate community reports
- Recommend collaborators or projects
- Verify contribution authenticity

### Models / Providers
- OpenAI GPT-4 Vision for receipt analysis
- OpenAI GPT-4 for content generation
- HuggingFace models for tagging & transcription

### Data Flow
User data → n8n automation → AI processing → summarized content saved to profile

### Ethical Considerations
- Explicit user consent for AI use
- Transparent labeling of AI-generated content
- Human-in-the-loop review for all public summaries

---

## 16. Appendix

### Glossary
- **DID** - Decentralized Identifier
- **POAP** - Proof of Attendance Protocol
- **DAO** - Decentralized Autonomous Organization
- **RWA** - Real World Assets
- **Commons Credit** - Platform currency for participation

### Integration with Architecture Document
This PRD defines **what** we are building — a transparent civic platform connecting Detroit's creative and civic ecosystems. The PAD (Project Architecture Document) will specify **how** we build it — defining technical architecture, data schemas, APIs, and development libraries for each module.

---

**Document Status:** Living Document  
**Last Updated:** October 2025  
**Next Review:** January 2026

