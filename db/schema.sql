-- WaaS Builder Schema

-- Users table (Simplified for prototype)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Templates table (To store available templates)
CREATE TABLE templates (
  id VARCHAR(50) PRIMARY KEY, -- e.g., 'minimal-business'
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_config JSONB NOT NULL, -- The base configuration
  thumbnail_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sites table (The generated websites)
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain VARCHAR(63) UNIQUE NOT NULL, -- e.g., 'mybrand' in mybrand.waas.com
  user_id UUID REFERENCES users(id),
  template_id VARCHAR(50) REFERENCES templates(id),
  
  -- The core configuration (Identity, Content, Functional)
  -- Stored as JSONB for flexibility as schema evolves
  config JSONB NOT NULL,
  
  is_published BOOLEAN DEFAULT FALSE,
  custom_domain VARCHAR(255) UNIQUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_sites_subdomain ON sites(subdomain);
CREATE INDEX idx_sites_user_id ON sites(user_id);
