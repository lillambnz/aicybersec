# Medical AI Scribe Application - Design Document

## Executive Summary
A cloud-based AI medical scribe application that transcribes patient consultations, generates clinical documentation, and integrates with EHR systems to help doctors reduce documentation time and improve patient care.

---

## 1. Core Features

### 1.1 Real-Time Transcription
- **Speech-to-Text Engine**: Real-time audio transcription during patient consultations
- **Multi-language Support**: Support for 50+ languages initially (expandable)
- **Speaker Diarization**: Distinguish between doctor and patient voices
- **Medical Terminology Recognition**: Specialized vocabulary for medical terms

### 1.2 Clinical Note Generation
- **Multiple Note Formats**:
  - SOAP (Subjective, Objective, Assessment, Plan)
  - CHEDDAR (Chief complaint, History, Examination, Diagnostics, Discussion, Assessment, Resolution)
  - DAP (Data, Assessment, Plan)
  - Custom templates
- **AI-Powered Structuring**: Automatically organize conversation into appropriate sections
- **Smart Summarization**: Extract key clinical information

### 1.3 Document Management
- **File Upload Support**:
  - PDFs, DOC/DOCX files
  - Medical images (JPEG, PNG)
  - Handwritten notes (OCR processing)
- **Document Context**: Use uploaded files to inform note generation
- **Patient History Integration**: Access previous consultation notes

### 1.4 Billing & Coding
- **Automated ICD-10 Coding**: Suggest diagnosis codes based on conversation
- **CPT Code Suggestions**: Recommend procedure codes
- **Medicare/PBS Compliance**: Australian billing code support
- **Billing Summary Export**: Generate itemized billing reports

### 1.5 EHR Integration
- **Initial Integration Targets**:
  - Best Practice Software (popular in Australia)
  - MedicalDirector
  - Genie Solutions
  - Zedmed
- **API Connectivity**: RESTful APIs for bidirectional data exchange
- **HL7/FHIR Support**: Standard healthcare data formats

### 1.6 Security & Compliance
- **Data Encryption**: End-to-end encryption for all patient data
- **Compliance Standards**:
  - Australian Privacy Principles (APP)
  - ISO 27001
  - SOC 2 Type II (target)
  - HIPAA (for US expansion)
- **Audit Logging**: Complete audit trail of all access and changes
- **Role-Based Access Control**: Different permissions for doctors, admin staff, etc.

---

## 2. Technical Architecture

### 2.1 Technology Stack

#### Frontend
- **Framework**: React 18+ with TypeScript
- **UI Components**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand or Redux Toolkit
- **Real-time Audio**: Web Audio API
- **Mobile Apps**: React Native (iOS/Android)

#### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js or NestJS
- **API Design**: RESTful + WebSocket for real-time features
- **Authentication**: JWT + OAuth 2.0

#### AI/ML Services
- **Speech-to-Text**:
  - Primary: OpenAI Whisper API (or self-hosted)
  - Alternative: AWS Transcribe Medical / Google Cloud Speech-to-Text
- **Natural Language Processing**:
  - OpenAI GPT-4 / GPT-4o for note generation
  - Claude 3.5 Sonnet as alternative
  - Medical NER: spaCy with custom medical entity recognition
- **OCR**: Tesseract OCR or Google Cloud Vision API

#### Database
- **Primary DB**: PostgreSQL (for structured data)
  - User accounts, consultations, notes, billing data
- **Document Storage**: AWS S3 or Cloudflare R2
- **Vector Database**: Pinecone or Weaviate (for semantic search)
- **Cache**: Redis (session management, rate limiting)

#### Infrastructure
- **Cloud Provider**: AWS or Google Cloud Platform
- **Containerization**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Datadog or New Relic
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

### 2.2 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Web App (React)  │  iOS App  │  Android App  │  Desktop    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Load Balancer  │  Rate Limiting  │  Authentication          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Services                      │
├─────────────────────────────────────────────────────────────┤
│  User Service  │  Consultation Service  │  Transcription    │
│  Note Service  │  Billing Service       │  File Service     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       AI/ML Services                         │
├─────────────────────────────────────────────────────────────┤
│  Speech-to-Text  │  NLP/Note Generation  │  OCR Processing  │
│  Medical Coding  │  Quality Assurance    │                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL  │  Redis Cache  │  S3 Storage  │  Vector DB    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Integrations                     │
├─────────────────────────────────────────────────────────────┤
│  EHR Systems  │  Payment Processors  │  Email/SMS Providers │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema

### 3.1 Core Tables

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL, -- 'doctor', 'admin', 'staff'
  license_number VARCHAR(100), -- Medical license/registration
  specialty VARCHAR(100),
  phone VARCHAR(50),
  organization_id UUID REFERENCES organizations(id),
  subscription_tier VARCHAR(50), -- 'free', 'professional', 'enterprise'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### organizations
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  abn VARCHAR(50), -- Australian Business Number
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  subscription_plan VARCHAR(50),
  billing_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### patients
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id), -- The doctor who created this record
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  medicare_number VARCHAR(50), -- Australian Medicare
  emergency_contact JSONB,
  medical_history TEXT,
  allergies TEXT,
  current_medications TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### consultations
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES users(id) NOT NULL,
  patient_id UUID REFERENCES patients(id) NOT NULL,
  consultation_date TIMESTAMP NOT NULL,
  duration_minutes INTEGER,
  consultation_type VARCHAR(50), -- 'in-person', 'telehealth'
  status VARCHAR(50), -- 'scheduled', 'in-progress', 'completed', 'cancelled'
  chief_complaint TEXT,
  audio_file_url VARCHAR(500),
  audio_duration_seconds INTEGER,
  transcription_status VARCHAR(50), -- 'pending', 'processing', 'completed', 'failed'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### transcriptions
```sql
CREATE TABLE transcriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id) NOT NULL,
  raw_transcript TEXT,
  structured_transcript JSONB, -- Speaker-separated conversation
  language VARCHAR(10) DEFAULT 'en',
  confidence_score DECIMAL(3,2),
  processing_time_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### clinical_notes
```sql
CREATE TABLE clinical_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id) NOT NULL,
  transcription_id UUID REFERENCES transcriptions(id),
  note_format VARCHAR(50), -- 'SOAP', 'CHEDDAR', 'DAP', 'custom'
  content JSONB, -- Structured note with sections
  plain_text TEXT,
  is_finalized BOOLEAN DEFAULT false,
  signed_by UUID REFERENCES users(id),
  signed_at TIMESTAMP,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### billing_codes
```sql
CREATE TABLE billing_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id) NOT NULL,
  code_type VARCHAR(50), -- 'ICD-10', 'CPT', 'MBS' (Medicare Benefits Schedule)
  code VARCHAR(50) NOT NULL,
  description TEXT,
  is_primary BOOLEAN DEFAULT false,
  ai_suggested BOOLEAN DEFAULT true,
  confirmed_by_doctor BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### uploaded_files
```sql
CREATE TABLE uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id),
  patient_id UUID REFERENCES patients(id),
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50), -- 'pdf', 'image', 'document'
  file_url VARCHAR(500) NOT NULL,
  file_size_bytes BIGINT,
  ocr_text TEXT, -- Extracted text from OCR
  processed BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### audit_logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50), -- 'consultation', 'patient', 'note'
  resource_id UUID,
  ip_address VARCHAR(50),
  user_agent TEXT,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 4. User Workflows

### 4.1 Doctor Workflow - Live Consultation

1. **Pre-Consultation**
   - Doctor logs in to app
   - Selects patient from list or creates new patient
   - Reviews patient history and previous notes
   - Starts new consultation session

2. **During Consultation**
   - App starts recording audio (with patient consent)
   - Real-time transcription displays on screen
   - Doctor can add manual notes/amendments
   - Upload relevant files (lab results, x-rays)

3. **Post-Consultation**
   - Stop recording
   - AI generates clinical note in preferred format
   - Doctor reviews and edits the note
   - Add/confirm billing codes
   - Finalize and sign the note
   - Export to EHR or download as PDF

### 4.2 Offline/Dictation Mode

1. Doctor records audio offline or dictates summary
2. Upload audio file to app
3. AI processes and generates note
4. Doctor reviews and approves

---

## 5. Pricing Model

### Free Tier
- 10 consultations per month
- Basic SOAP notes
- No EHR integration
- Email support

### Professional - $99/month
- Unlimited consultations
- All note formats
- Single EHR integration
- Billing code suggestions
- Priority email support
- Mobile app access

### Enterprise - Custom Pricing
- Everything in Professional
- Multiple EHR integrations
- Custom templates
- Dedicated account manager
- Phone support
- On-premise deployment option
- Custom SLA
- Team management features

---

## 6. Go-To-Market Strategy

### Target Customers
1. **Primary**: General Practitioners (GPs) in Australia
2. **Secondary**: Specialists (dermatologists, psychiatrists, etc.)
3. **Tertiary**: Medical clinics and group practices

### Sales Channels
1. Direct sales to individual doctors
2. Partnerships with medical software vendors
3. Medical conferences and trade shows
4. Online marketing (Google Ads, LinkedIn)
5. Referral program

### Key Differentiators
- **Australian-focused**: Medicare/PBS coding, local compliance
- **Privacy-first**: All data stored in Australia
- **Accuracy**: Medical terminology specialization
- **Ease of use**: Minimal learning curve
- **Cost-effective**: Competitive pricing vs. Heidi Health

---

## 7. Development Roadmap

### Phase 1: MVP (3-4 months)
- [ ] User authentication and basic dashboard
- [ ] Audio recording and upload
- [ ] Speech-to-text transcription (English only)
- [ ] SOAP note generation
- [ ] Basic patient management
- [ ] PDF export

### Phase 2: Core Features (2-3 months)
- [ ] Multiple note formats (CHEDDAR, DAP)
- [ ] Billing code suggestions (MBS, ICD-10)
- [ ] File upload and OCR
- [ ] Template customization
- [ ] Mobile app (React Native)

### Phase 3: Integrations (2-3 months)
- [ ] Best Practice Software integration
- [ ] MedicalDirector integration
- [ ] Payment processing (Stripe)
- [ ] Email/SMS notifications

### Phase 4: Scale & Optimize (Ongoing)
- [ ] Multi-language support
- [ ] Advanced AI features (quality checks)
- [ ] Team collaboration features
- [ ] Analytics and reporting
- [ ] HIPAA compliance (US expansion)

---

## 8. Technical Requirements

### Development Team
- 1 Frontend Developer (React/React Native)
- 1 Backend Developer (Node.js)
- 1 ML Engineer (AI/NLP)
- 1 DevOps Engineer
- 1 UI/UX Designer
- 1 QA Engineer

### Infrastructure Costs (Monthly Estimates)
- Cloud hosting (AWS/GCP): $500-1,000
- AI API costs (OpenAI/Whisper): $1,000-5,000 (scales with usage)
- Database hosting: $200-500
- Monitoring/logging: $100-200
- Email/SMS services: $50-100
- **Total**: ~$2,000-7,000/month

### Third-Party Services
- OpenAI API (GPT-4, Whisper)
- Stripe (payments)
- SendGrid (email)
- Twilio (SMS)
- AWS S3 (file storage)
- Auth0 or Clerk (authentication)

---

## 9. Legal & Compliance

### Required Documentation
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Data Processing Agreement
- [ ] Informed Consent Forms (for patients)
- [ ] Security Documentation (ISO 27001 audit)

### Australian Compliance
- [ ] TGA (Therapeutic Goods Administration) registration if classified as medical device
- [ ] OAIC (Office of the Australian Information Commissioner) - Privacy Act compliance
- [ ] Australian Cyber Security Centre (ACSC) guidelines
- [ ] Medical Board of Australia - ensure doesn't conflict with medical practice standards

### Insurance
- Professional indemnity insurance
- Cyber liability insurance

---

## 10. Success Metrics

### Key Performance Indicators (KPIs)
- **User Acquisition**: New signups per month
- **Activation Rate**: % of signups who complete first consultation
- **Retention Rate**: Monthly/annual retention
- **Revenue Metrics**: MRR, ARR, ARPU
- **Product Metrics**:
  - Average transcription accuracy (target: >95%)
  - Note generation time (target: <2 minutes)
  - Time saved per consultation (target: >50%)
- **Customer Satisfaction**: NPS score (target: >50)

---

## Next Steps

1. **Validate the idea**: Interview 10-20 GPs to validate pain points and willingness to pay
2. **Build MVP**: Focus on core transcription and note generation
3. **Beta testing**: Recruit 5-10 doctors for beta testing
4. **Iterate based on feedback**
5. **Launch marketing website**
6. **Apply for TGA clearance** (if required)
7. **Start sales and marketing efforts**

---

## Estimated Budget

### Development (MVP)
- Development team (6 people x 4 months): $150,000-250,000
- Design and UX: $15,000-25,000
- Legal and compliance: $10,000-20,000
- Infrastructure (4 months): $10,000
- **Total Development**: $185,000-305,000

### Post-Launch (Annual)
- Team salaries: $400,000-600,000
- Infrastructure: $25,000-85,000
- Marketing and sales: $50,000-100,000
- Legal and compliance: $10,000-20,000
- **Total Year 1**: $485,000-805,000

### Break-even Analysis
- At $99/month per user
- Need ~410-680 paying customers to break even in Year 1
- With 10% conversion from free to paid, need ~4,100-6,800 signups

---

*Document Version: 1.0*
*Last Updated: 2025-11-07*
