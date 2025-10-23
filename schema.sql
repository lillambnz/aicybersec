-- Cloudflare D1 Database Schema for AI CyberSec
-- Run with: wrangler d1 execute aicybersec_db --file=./schema.sql

-- Contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

-- Scans table for storing security scan results
CREATE TABLE IF NOT EXISTS scans (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  threat_level TEXT NOT NULL,
  analysis TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_scans_type ON scans(type);
CREATE INDEX idx_scans_threat_level ON scans(threat_level);
CREATE INDEX idx_scans_created_at ON scans(created_at);

-- Bookings table for service bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  plan TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL,
  scheduled_date TEXT
);

CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL
);

CREATE INDEX idx_newsletter_email ON newsletter(email);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  event_data TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
