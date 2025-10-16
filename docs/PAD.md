# 🏗️ Project Architecture Document (PAD)

**Project:** Detroit's Open Commons  
**Version:** 0.1  
**Date:** October 2025  
**Maintainer:** John Gulbronson — Detroit Commons / Barefoot Devs

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Data Architecture](#4-data-architecture)
5. [API Design](#5-api-design)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [Storage Architecture](#7-storage-architecture)
8. [Blockchain Integration](#8-blockchain-integration)
9. [AI/ML Integration](#9-aiml-integration)
10. [Security Architecture](#10-security-architecture)
11. [Performance & Scalability](#11-performance--scalability)
12. [Development Workflow](#12-development-workflow)
13. [Deployment & Infrastructure](#13-deployment--infrastructure)
14. [Monitoring & Observability](#14-monitoring--observability)
15. [Future Architecture](#15-future-architecture)

---

## 1. Architecture Overview

### 1.1 System Philosophy

Detroit's Open Commons is built on a **modular, composable architecture** that enables:
- **Progressive decentralization** - Start centralized, migrate to decentralized
- **Data sovereignty** - Users own their data
- **Interoperability** - Standard protocols for integration
- **Transparency** - Open source and auditable

### 1.2 Architecture Patterns

- **Jamstack Architecture** - Pre-rendered pages with dynamic APIs
- **API-First Design** - Decoupled frontend and backend
- **Event-Driven** - Asynchronous processing where appropriate
- **Edge-First** - Leverage edge computing for performance
- **Progressive Enhancement** - Works without JavaScript

### 1.3 Design Principles

1. **Simplicity First** - Start simple, add complexity only when needed
2. **Developer Experience** - Easy to contribute and extend
3. **User Privacy** - Privacy by design, not by policy
4. **Open Standards** - Use existing standards where possible
5. **Graceful Degradation** - System remains functional if components fail

---

## 2. Technology Stack

### 2.1 Frontend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Next.js 14 | React framework with SSR/SSG |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Styled Components | CSS-in-JS with theming |
| **State Management** | React Hooks | Local state management |
| **Forms** | React Hook Form | Form validation and handling |
| **HTTP Client** | Fetch API | Native browser API |

### 2.2 Backend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Node.js 18+ | JavaScript runtime |
| **API Routes** | Next.js API Routes | Serverless API endpoints |
| **Database** | Turso (libSQL) | Distributed SQLite database |
| **ORM** | Drizzle ORM | Type-safe database queries |
| **Authentication** | Supabase Auth | User authentication |
| **Storage** | Digital Ocean Spaces | S3-compatible object storage |

### 2.3 Blockchain Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Network** | Base (Ethereum L2) | Low-fee blockchain network |
| **Payment Token** | USDC | Stablecoin for payments |
| **Wallet Integration** | MetaMask | Browser wallet connection |
| **Smart Contracts** | Solidity (Planned) | On-chain logic |

### 2.4 AI/ML Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **LLM Provider** | OpenAI | GPT-4 Vision for receipts |
| **Vision API** | OpenAI Vision | Image analysis |
| **Automation** | n8n (Planned) | Workflow automation |

### 2.5 Development Tools

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Version Control** | Git + GitHub | Source control |
| **Package Manager** | Yarn | Dependency management |
| **Linting** | ESLint | Code quality |
| **Formatting** | Prettier (Planned) | Code formatting |
| **Testing** | Jest (Planned) | Unit testing |

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │  Mobile App  │  │  Public API  │      │
│  │  (Next.js)   │  │   (Expo)     │  │   Clients    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Edge Layer (Vercel)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Static Pages │  │ API Routes   │  │  Middleware  │      │
│  │   (SSG/ISR)  │  │ (Serverless) │  │    (Edge)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Business   │  │     API      │  │     Auth     │      │
│  │    Logic     │  │   Services   │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Turso     │  │   Supabase   │  │  DO Spaces   │      │
│  │  (Database)  │  │    (Auth)    │  │  (Storage)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   OpenAI     │  │     Base     │  │     n8n      │      │
│  │   (AI/ML)    │  │ (Blockchain) │  │ (Automation) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Request Flow

#### Public Page Request
```
User Browser → Vercel CDN → Static HTML → Hydration → Interactive
```

#### API Request
```
Client → Vercel Edge → API Route → Business Logic → Database → Response
```

#### Authenticated Request
```
Client (+ JWT) → Middleware (Auth Check) → API Route → Protected Resource
```

#### File Upload
```
Client → API Route → Image Compression → DO Spaces → URL → Database
```

### 3.3 Component Diagram

```
┌─────────────────────────────────────────────────┐
│              Frontend Components                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Pages   │  │Components│  │   Lib    │      │
│  │          │  │          │  │          │      │
│  │ - Home   │  │ - Layout │  │ - Utils  │      │
│  │ - Admin  │  │ - Forms  │  │ - API    │      │
│  │ - Public │  │ - UI     │  │ - Hooks  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               Backend Services                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   API    │  │  Storage │  │   Auth   │      │
│  │  Routes  │  │  Service │  │ Service  │      │
│  │          │  │          │  │          │      │
│  │ - CRUD   │  │ - Upload │  │ - Login  │      │
│  │ - AI     │  │ - CDN    │  │ - JWT    │      │
│  │ - Crypto │  │ - Resize │  │ - OAuth  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

---

## 4. Data Architecture

### 4.1 Database Schema

#### Current Schema (Turso/libSQL)

**Users** (via Supabase)
```typescript
interface User {
  id: string;              // UUID from Supabase
  email: string;
  created_at: timestamp;
}
```

**Profiles**
```typescript
interface Profile {
  id: number;              // Primary key
  supabaseUserId: string;  // Foreign key to Supabase
  name: string;
  bio: text | null;
  location: string | null;
  profileImage: string | null;
  skills: text | null;     // JSON array
  website: string | null;
  github: string | null;
  twitter: string | null;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Projects**
```typescript
interface Project {
  id: number;
  title: string;
  description: text;
  category: string | null;
  status: string;          // 'active' | 'completed' | 'archived'
  imageUrl: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  tags: text | null;       // JSON array
  teamMembers: text | null; // JSON array of profile IDs
  createdBy: string;       // Supabase user ID
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Expenses**
```typescript
interface Expense {
  id: number;
  title: string;
  merchant: string | null;
  category: string | null;
  amountCents: number | null;
  currency: string;         // Default: 'USD'
  expenseDate: text | null;
  notes: text | null;
  receiptUrl: text | null;
  payoutStatus: text | null; // 'pending' | 'processing' | 'completed' | 'failed'
  payoutTxHash: text | null; // Blockchain transaction hash
  payoutDate: text | null;
  metadata: text | null;     // JSON metadata
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Expense Images**
```typescript
interface ExpenseImage {
  id: number;
  expenseId: number;        // Foreign key
  imageUrl: string;
  description: text | null;
  imageType: text;          // Default: 'proof'
  uploadedBy: text | null;
  createdAt: timestamp;
}
```

### 4.2 Planned Schema Extensions

**Decentralized Identities (DIDs)**
```typescript
interface DID {
  id: number;
  userId: string;           // Link to Supabase user
  didString: string;        // did:method:identifier
  publicKey: string;
  metadata: text;           // JSON
  verified: boolean;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Events**
```typescript
interface Event {
  id: number;
  title: string;
  description: text;
  eventType: string;        // 'workshop' | 'meetup' | 'hackathon'
  location: text | null;    // JSON: {type, coordinates, address}
  startTime: timestamp;
  endTime: timestamp;
  capacity: number | null;
  imageUrl: string | null;
  organizerId: number;      // Profile ID
  status: string;           // 'draft' | 'published' | 'cancelled'
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Check-ins**
```typescript
interface CheckIn {
  id: number;
  eventId: number;
  userId: string;
  didId: number | null;
  checkInTime: timestamp;
  checkInMethod: string;    // 'qr' | 'nfc' | 'manual'
  location: text | null;    // JSON: {lat, lng}
  metadata: text | null;
  createdAt: timestamp;
}
```

**Credits**
```typescript
interface Credit {
  id: number;
  userId: string;
  amount: number;
  reason: string;
  sourceType: string;       // 'event' | 'contribution' | 'referral'
  sourceId: number | null;
  metadata: text | null;
  createdAt: timestamp;
}
```

### 4.3 Data Flow Patterns

#### Write Pattern (Optimistic Updates)
```
Client → Optimistic UI Update → API Call → Database → Confirmation
                ↓                                         ↓
          Rollback on Error                    Broadcast to Others
```

#### Read Pattern (Cached)
```
Client → Check Cache → API Call → Database → Cache Update → Response
           ↓ Hit                                              
         Return                                           
```

---

## 5. API Design

### 5.1 API Structure

```
/api
├── /expenses
│   ├── GET     - List expenses
│   ├── POST    - Create expense (upload receipt)
│   └── /[id]
│       ├── GET    - Get single expense
│       ├── PUT    - Update expense
│       └── DELETE - Delete expense
├── /expense-images
│   ├── GET     - Get images for expense
│   ├── POST    - Upload proof image
│   ├── PUT     - Update image metadata
│   └── DELETE  - Delete image
├── /projects
│   ├── GET     - List projects
│   ├── POST    - Create project
│   └── /[id]
│       ├── GET    - Get single project
│       ├── PUT    - Update project
│       └── DELETE - Delete project
├── /profiles
│   ├── GET     - List profiles
│   ├── POST    - Create profile
│   └── /[id]
│       ├── GET    - Get single profile
│       ├── PUT    - Update profile
│       └── DELETE - Delete profile
├── /upload
│   └── POST    - Generic file upload
└── /auth
    ├── /login  - User login
    ├── /logout - User logout
    └── /me     - Get current user
```

### 5.2 API Response Format

#### Success Response
```typescript
{
  success: true,
  data: T,
  meta?: {
    page?: number,
    limit?: number,
    total?: number
  }
}
```

#### Error Response
```typescript
{
  success: false,
  error: string,
  code?: string,
  details?: object
}
```

### 5.3 API Authentication

**JWT Token Flow**
```
1. User logs in → Supabase Auth
2. Receive JWT token
3. Include token in requests: Authorization: Bearer <token>
4. Middleware validates token
5. Extract user info from token
6. Proceed with request
```

### 5.4 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/auth/*` | 5 requests | 15 minutes |
| `/api/upload` | 10 requests | 1 hour |
| `/api/expenses` (POST) | 20 requests | 1 hour |
| `/api/*` (Other) | 100 requests | 15 minutes |

---

## 6. Authentication & Authorization

### 6.1 Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Client  │────────▶│ Supabase │────────▶│   API    │
│          │◀────────│   Auth   │◀────────│  Route   │
└──────────┘         └──────────┘         └──────────┘
     │                     │                     │
     │ 1. Login           │                     │
     │─────────────────▶  │                     │
     │                     │                     │
     │ 2. JWT + Session    │                     │
     │◀─────────────────  │                     │
     │                     │                     │
     │ 3. API Request + JWT│                     │
     │─────────────────────────────────────────▶│
     │                     │                     │
     │                     │ 4. Verify JWT       │
     │                     │◀────────────────────│
     │                     │                     │
     │                     │ 5. User Info        │
     │                     │─────────────────────▶
     │                     │                     │
     │ 6. Response         │                     │
     │◀─────────────────────────────────────────│
```

### 6.2 Authorization Levels

| Role | Permissions |
|------|-------------|
| **Public** | View public pages, roadmap, projects |
| **Authenticated** | Create profile, join events, earn credits |
| **Admin** | Manage expenses, treasury, all CRUD operations |
| **Org Admin** | Manage organization data, member profiles |

### 6.3 Security Measures

- **Password Requirements**: Enforced by Supabase (min 6 chars)
- **Session Management**: JWT with 7-day expiry
- **CORS**: Configured for specific origins
- **CSRF Protection**: SameSite cookies
- **SQL Injection**: Protected by Drizzle ORM parameterized queries
- **XSS Protection**: React's built-in escaping + CSP headers

---

## 7. Storage Architecture

### 7.1 File Storage (Digital Ocean Spaces)

**Structure**
```
commons-bucket/
├── profiles/
│   └── {randomId}-{filename}
├── receipts/
│   └── {randomId}-{filename}
├── expense-proofs/
│   └── {randomId}-{filename}
└── projects/
    └── {randomId}-{filename}
```

**Upload Flow**
```
Client → Compress Image → API Route → S3 SDK → DO Spaces → URL
            (2MB)                                    ↓
                                              Save URL to DB
```

### 7.2 Image Compression

**Settings**
- Max dimensions: 1920x1920px (receipts/proofs), 800x800px (profiles)
- Quality: 80-85%
- Target size: < 2MB
- Format: Original (JPEG, PNG, WebP)

**Implementation**
```typescript
// Client-side compression before upload
const compressed = await compressImage(file, {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
  maxSizeMB: 2
});
```

### 7.3 CDN Strategy

- **DO Spaces CDN**: Built-in CDN for static assets
- **Vercel Edge**: Serves Next.js static pages
- **Cache Headers**: Set on images (1 year) and pages (1 hour)

---

## 8. Blockchain Integration

### 8.1 Current Implementation

**Network**: Base (Ethereum L2)
- Chain ID: 8453 (Mainnet)
- RPC: https://mainnet.base.org

**Smart Contracts**
- USDC Token: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

**Wallet Integration**
```typescript
// MetaMask connection
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// USDC transfer
const tx = await usdcContract.transfer(recipientAddress, amount);
await tx.wait();
```

### 8.2 Planned Architecture

**DID Registry Contract**
```solidity
contract DIDRegistry {
  mapping(address => string) public dids;
  mapping(string => address) public owners;
  
  function registerDID(string memory did) public;
  function updateDID(string memory newDid) public;
  function verifyDID(string memory did) public view returns (bool);
}
```

**Credits Token (ERC-20)**
```solidity
contract CommonsCredits is ERC20 {
  function mint(address to, uint256 amount) public onlyAdmin;
  function burn(uint256 amount) public;
  function transfer(address to, uint256 amount) public override;
}
```

**Event POAP (ERC-721)**
```solidity
contract EventPOAP is ERC721 {
  function mint(address to, uint256 eventId) public onlyOrganizer;
  function tokenURI(uint256 tokenId) public view override;
}
```

---

## 9. AI/ML Integration

### 9.1 OpenAI Vision (Receipt Analysis)

**Current Implementation**
```typescript
const analysis = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [{
    role: "user",
    content: [
      { 
        type: "text", 
        text: "Extract merchant, date, amount, category from this receipt"
      },
      { 
        type: "image_url",
        image_url: { url: base64Image }
      }
    ]
  }],
  max_tokens: 500
});
```

**Response Schema**
```typescript
interface ReceiptAnalysis {
  merchant: string;
  date: string;
  amount: number;
  currency: string;
  category: string;
  notes?: string;
  confidence?: number;
}
```

### 9.2 Planned AI Features

**Event Summarization**
```typescript
interface EventSummary {
  title: string;
  attendees: number;
  highlights: string[];
  photos: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
}
```

**Recommendation Engine**
```typescript
interface Recommendation {
  type: 'project' | 'event' | 'collaborator';
  item: object;
  score: number;
  reason: string;
}
```

---

## 10. Security Architecture

### 10.1 Security Layers

```
┌─────────────────────────────────────┐
│     Vercel Edge (DDoS Protection)   │
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│   Next.js Middleware (Rate Limit)   │
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│     Supabase Auth (JWT Verify)      │
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│   API Route (Authorization Check)   │
└─────────────────────────────────────┘
                ▼
┌─────────────────────────────────────┐
│  Drizzle ORM (SQL Injection Proof)  │
└─────────────────────────────────────┘
```

### 10.2 Environment Variables

**Security Requirements**
- Never commit `.env.local` to version control
- Use Vercel environment variables for production
- Rotate API keys quarterly
- Encrypt sensitive data at rest

**Required Secrets**
```bash
DATABASE_URL              # Turso connection string
DATABASE_AUTH_TOKEN       # Turso auth token
SUPABASE_SERVICE_ROLE_KEY # Admin access
DO_SPACES_SECRET_ACCESS_KEY # Storage access
OPENAI_API_KEY           # AI access
```

### 10.3 Data Encryption

- **In Transit**: TLS 1.3 for all connections
- **At Rest**: Supabase encryption, DO Spaces encryption
- **Sensitive Fields**: Hash passwords (Supabase handles)
- **Private Keys**: Never stored, only user-controlled

---

## 11. Performance & Scalability

### 11.1 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| **Time to First Byte (TTFB)** | < 200ms | ~150ms |
| **First Contentful Paint (FCP)** | < 1.8s | ~1.2s |
| **Largest Contentful Paint (LCP)** | < 2.5s | ~1.8s |
| **API Response Time (p95)** | < 500ms | ~300ms |
| **Database Query Time (p95)** | < 100ms | ~50ms |

### 11.2 Optimization Strategies

**Frontend**
- Static page generation (SSG) for public pages
- Incremental static regeneration (ISR) for dynamic content
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Service worker for offline support (planned)

**Backend**
- Database connection pooling
- Query optimization with indexes
- Edge caching for API responses
- Background jobs for heavy processing (n8n)

**Database**
```sql
-- Key indexes
CREATE INDEX idx_expenses_created_at ON expenses(createdAt);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_profiles_user_id ON profiles(supabaseUserId);
```

### 11.3 Scalability Plan

**Phase 1 (Current)**: Single-region deployment
- Vercel Edge (global)
- Turso (Detroit region)
- DO Spaces (NYC region)

**Phase 2 (1,000 users)**: Multi-region database
- Turso replicas in key regions
- CDN for all static assets
- API rate limiting per user

**Phase 3 (10,000 users)**: Distributed architecture
- Read replicas for analytics
- Event streaming (Kafka/Redis)
- Microservices for heavy features

---

## 12. Development Workflow

### 12.1 Branch Strategy

```
main (production)
  └── develop (staging)
       ├── feature/xyz
       ├── fix/abc
       └── docs/update
```

### 12.2 Development Process

1. **Local Development**
   ```bash
   git checkout -b feature/new-feature
   yarn dev                    # Start dev server
   yarn db:push                # Update local DB
   ```

2. **Testing** (Planned)
   ```bash
   yarn test                   # Run unit tests
   yarn test:e2e               # Run E2E tests
   yarn lint                   # Check code quality
   ```

3. **Pull Request**
   - Create PR to `develop`
   - Automated checks run
   - Code review required
   - Merge to `develop`

4. **Deployment**
   - Merge `develop` → `main`
   - Vercel auto-deploys
   - Database migrations run
   - Monitor for errors

### 12.3 Code Organization

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Form.tsx
│   └── Layout.tsx
├── lib/                # Utility functions
│   ├── api.ts          # API client helpers
│   ├── auth.ts         # Auth utilities
│   ├── imageCompression.ts
│   └── metamask-usdc.ts
├── pages/              # Next.js pages
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   ├── index.tsx       # Homepage
│   └── roadmap.tsx     # Public roadmap
├── styles/             # Global styles
│   ├── globals.css
│   └── theme.ts
└── types/              # TypeScript types
    └── index.ts
```

---

## 13. Deployment & Infrastructure

### 13.1 Hosting

**Vercel**
- Automatic deployments from GitHub
- Preview deployments for PRs
- Edge Functions for dynamic routes
- Analytics and monitoring

**Configuration**: `vercel.json`
```json
{
  "framework": "nextjs",
  "buildCommand": "yarn build",
  "devCommand": "yarn dev",
  "installCommand": "yarn install",
  "env": {
    "DATABASE_URL": "@database-url",
    "DATABASE_AUTH_TOKEN": "@database-auth-token"
  }
}
```

### 13.2 Database (Turso)

**Configuration**
- Primary database in Detroit region
- Automatic backups (daily)
- Point-in-time recovery (7 days)
- Connection via libSQL protocol

**Migrations**
```bash
yarn db:generate        # Generate migration
yarn db:push            # Apply to dev
yarn db:migrate         # Apply to production
```

### 13.3 CI/CD Pipeline

```
GitHub Push → Vercel Build → Tests → Deploy to Preview
                                ↓
                          Manual Approval
                                ↓
                        Deploy to Production
                                ↓
                        Health Check → Monitor
```

---

## 14. Monitoring & Observability

### 14.1 Monitoring Stack (Planned)

| Component | Tool | Purpose |
|-----------|------|---------|
| **Application Monitoring** | Vercel Analytics | Page views, performance |
| **Error Tracking** | Sentry | Exception tracking |
| **Log Aggregation** | Vercel Logs | Centralized logging |
| **Uptime Monitoring** | UptimeRobot | Availability checks |
| **Database Metrics** | Turso Dashboard | Query performance |

### 14.2 Key Metrics

**Application Health**
- Request rate (req/min)
- Error rate (%)
- Response time (p50, p95, p99)
- Availability (uptime %)

**Business Metrics**
- Daily active users (DAU)
- Project creations
- Event check-ins
- Treasury transactions

### 14.3 Alerting

**Critical Alerts** (Immediate response)
- API error rate > 5%
- Database connection failures
- Payment processing errors
- Security incidents

**Warning Alerts** (Monitor closely)
- Response time > 1s
- Disk usage > 80%
- Rate limit hits increasing
- Failed login attempts spiking

---

## 15. Future Architecture

### 15.1 Decentralization Roadmap

**Phase 1**: Centralized with blockchain payments ✅ (Current)
- Traditional database
- Blockchain for payments only

**Phase 2**: Hybrid architecture (Q2 2026)
- DID integration (LUKSO, Ceramic)
- Decentralized storage (IPFS) for static assets
- On-chain credentials

**Phase 3**: Fully decentralized (2027)
- Peer-to-peer data sync
- DAO governance
- Smart contract automation
- No single point of failure

### 15.2 Advanced Features

**AI Agent Layer**
```
Community Agent → Autonomous Actions
├── Event summarization
├── Content moderation
├── Recommendation engine
└── Automated reporting
```

**Real-time Collaboration**
```
WebSocket Server → Presence System
├── Live document editing
├── Real-time chat
├── Collaborative planning
└── Event live streaming
```

**Analytics Platform**
```
Data Warehouse → Business Intelligence
├── Community impact metrics
├── Resource allocation tracking
├── Trend analysis
└── Predictive modeling
```

---

## Appendix

### A. Related Documents

- **[Product Requirements (PRD)](PRD.md)** - What we're building
- **[README](../README.md)** - Getting started guide
- **[Community Charter](charter.md)** - Governance and values (Coming Soon)

### B. Glossary

- **DID**: Decentralized Identifier
- **SSG**: Static Site Generation
- **SSR**: Server-Side Rendering
- **ISR**: Incremental Static Regeneration
- **JWT**: JSON Web Token
- **POAP**: Proof of Attendance Protocol
- **CDN**: Content Delivery Network
- **ORM**: Object-Relational Mapping

### C. Architecture Decision Records (ADRs)

**ADR-001**: Choose Next.js over separate frontend/backend
- **Status**: Accepted
- **Reason**: Simplified deployment, better DX, built-in optimizations

**ADR-002**: Use Turso instead of PostgreSQL
- **Status**: Accepted
- **Reason**: Edge database, lower cost, SQLite compatibility

**ADR-003**: Styled Components over Tailwind
- **Status**: Accepted
- **Reason**: Theme system, component-scoped styles, existing codebase

**ADR-004**: Base network over Ethereum mainnet
- **Status**: Accepted
- **Reason**: Lower fees, faster transactions, USDC native

---

**Document Status:** Living Document  
**Last Updated:** October 2025  
**Next Review:** January 2026

**Feedback**: Open an issue or PR on [GitHub](https://github.com/buidl-renaissance/commons.builddetroit.xyz)

