# 🧭 Detroit's Open Commons

> A public digital infrastructure for Detroit's creative and civic communities — combining decentralized identity, open data, and collaborative storytelling tools to empower local creators, organizations, and technologists to build and share together.

[![Version](https://img.shields.io/badge/version-0.1-blue.svg)](https://github.com/buidl-renaissance/commons.builddetroit.xyz)
[![Status](https://img.shields.io/badge/status-MVP%20Development-yellow.svg)](https://github.com/buidl-renaissance/commons.builddetroit.xyz)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Maintainer:** John Gulbronson — Detroit Commons / Barefoot Devs

---

## 🎯 Mission

To build Detroit's digital public commons — a shared infrastructure that enables communities, creators, and civic partners to coordinate transparently, share resources, and document their collective impact.

---

## ✨ What We're Building

### Current Features
- 🏛️ **Treasury Management** - Track community funds and USDC payouts via Base network
- 💰 **Expense Tracking** - AI-powered receipt analysis with OpenAI Vision
- 📊 **Project Management** - Coordinate community initiatives and team members
- 🔐 **Authentication** - User management via Supabase
- 📱 **Responsive Design** - Mobile-first UI

### Coming Soon
- 🆔 **Decentralized Identity (DID)** - Wallet or email-based identity system
- 📍 **Event Check-in** - QR/NFC-based attendance tracking
- 📰 **Community Feed** - Verified posts, projects, and events
- ⭐ **Credit System** - Earn badges for community engagement
- 🗺️ **Commons Explorer** - Map and timeline visualization
- 🤖 **AI Summaries** - Auto-generated community recaps

📖 **[Read the full Product Requirements Document (PRD) →](docs/PRD.md)**

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.x
yarn >= 1.22.x
```

### Installation

```bash
# Clone the repository
git clone https://github.com/buidl-renaissance/commons.builddetroit.xyz.git
cd commons.builddetroit.xyz

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
yarn db:push

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following:

```bash
# Database (Turso)
DATABASE_URL=your_turso_url
DATABASE_AUTH_TOKEN=your_turso_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Storage (Digital Ocean Spaces)
DO_SPACES_ACCESS_KEY_ID=your_access_key
DO_SPACES_SECRET_ACCESS_KEY=your_secret_key
DO_SPACES_ENDPOINT=your_endpoint
DO_SPACES_BUCKET_NAME=your_bucket
DO_SPACES_REGION=your_region

# AI (OpenAI)
OPENAI_API_KEY=your_openai_key
```

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14, React, TypeScript, Styled Components  
**Backend:** Turso (libSQL), Drizzle ORM, Supabase Auth  
**Storage:** Digital Ocean Spaces (S3-compatible)  
**AI:** OpenAI GPT-4 Vision  
**Blockchain:** Base (Ethereum L2), USDC payments via MetaMask  
**Deployment:** Vercel

---

## 📁 Project Structure

```
commons.builddetroit.xyz/
├── db/                      # Database schema and migrations
├── src/
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and helpers
│   ├── pages/               # Next.js pages and API routes
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API endpoints
│   │   └── ...             # Public pages
│   └── styles/             # Global styles and theme
├── migrations/             # Drizzle migrations
├── docs/                   # Documentation
└── public/                 # Static assets
```

---

## 🗺️ Roadmap

### Phase 1: MVP (Target: Feb 2026)
- [x] Treasury management
- [x] Expense tracking with AI
- [x] Project management
- [ ] DID system
- [ ] Event check-in
- [ ] Community feed

### Phase 2: Beta (Target: Mar 2026)
- [ ] Partner onboarding
- [ ] Mobile app
- [ ] Credit system
- [ ] Analytics

### Phase 3: Public Launch (Target: May 2026)
- [ ] Open community onboarding
- [ ] Commons explorer
- [ ] Governance tools

### Phase 4: Open API (Target: Jul 2026)
- [ ] External data access
- [ ] Civic dashboards
- [ ] Developer SDK

📅 **[View detailed milestones in PRD →](docs/PRD.md#11-milestones--timeline)**

---

## 🤝 Contributing

We welcome contributions from the Detroit tech community and beyond!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Update documentation as needed
- Test your changes before submitting

---

## 📚 Documentation

- **[Product Requirements (PRD)](docs/PRD.md)** - Detailed feature specifications and vision
- **[Architecture Document (PAD)](docs/architecture.md)** _(Coming Soon)_ - Technical architecture
- **[Community Charter](docs/charter.md)** _(Coming Soon)_ - Detroit Commons Constitution
- **[API Documentation](docs/api.md)** _(Coming Soon)_ - API endpoints and usage

---

## 🔒 Security & Privacy

- **Data Ownership:** Users own their identity and data
- **Encryption:** All data encrypted at rest
- **Privacy-First:** Opt-in sharing and transparent policies
- **DID Authentication:** User-controlled decentralized identity

---

## 👥 Community

### Who We Serve
- **Creators & Artists** - Share and monetize work transparently
- **Nonprofits & Orgs** - Coordinate projects and track impact
- **Developers** - Build civic APIs and tools
- **Community Members** - Participate and earn credits
- **City Partners** - Access transparent civic data

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Community members | 1,000+ |
| Partner organizations | 100+ |
| Recorded interactions | 10,000+ |
| System uptime | 99.9% |

---

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌆 About

Detroit Commons is building digital public infrastructure for Detroit's creative and civic communities. We believe in transparent coordination, collective ownership, and empowering local creators through open technology.

### Contact
- **Website:** [commons.builddetroit.xyz](https://commons.builddetroit.xyz)
- **GitHub:** [@buidl-renaissance](https://github.com/buidl-renaissance)
- **Maintainer:** John Gulbronson ([@johngulbronson](https://github.com/johngulbronson))

---

## 🙏 Acknowledgments

Built with support from Detroit's creative and civic communities, Barefoot Devs, and open source contributors. Special thanks to all the artists, organizers, and builders making Detroit's transformation possible.

---

**"From the people, for the people, by the people."** 🏭✨
