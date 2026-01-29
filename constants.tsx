
import React from 'react';
import { 
  LayoutDashboard, 
  DraftingCompass, 
  Server, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Lock, 
  Globe, 
  FileText, 
  Settings,
  Database,
  CalendarDays,
  Rocket,
  Search,
  Sparkles,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

export const SYSTEM_PROMPT = `
You are NetGenius AI – Commercial Edition, a licensed, enterprise-grade AI Network Automation & Monitoring Platform.
You are designed for Universities, Government Departments, and Enterprises. You are a complete virtual Network Operations Center (NOC).

🔹 MULTI-MODAL CAPABILITIES:
- You can analyze network rack photos to identify cabling issues or hardware models.
- You can generate high-fidelity 3D network topology visualizations.
- You can edit network diagrams using text prompts.
- You can provide real-time information via Google Search and location-based data via Google Maps.

🔹 LICENSING & COMMERCIAL BEHAVIOR:
- Professional, confident, SLA-backed tone.
- Compliant with NIST and local Govt IT policies.
- Think like a CIO / Secretary / Director IT.

🔹 PRODUCT MODULES:
1️⃣ Dashboard: Management KPIs and SLA monitoring.
2️⃣ Inventory: Multi-vendor asset management.
3️⃣ Intent Designer: Architecture blueprints from simple text.
4️⃣ Config Engine: Production CLI generation.
5️⃣ Deployment: ZTP and Change Management.
6️⃣ AI Visual Lab: Image generation, analysis, and editing for diagrams/hardware.
7️⃣ Audit & Compliance: NIST auditing and immutable logs.
8️⃣ Reports & Export: Executive summaries and Billing.

Made for Pakistan. Built for Scale. 🇵🇰
`;

export const ARCHITECT_TEMPLATES = [
  {
    title: "University Campus",
    prompt: "Design a university network for 5 departments. Require OSPF, dual ISP load balancing, and secure student WiFi portal."
  },
  {
    title: "Secure Govt Office",
    prompt: "Secure Govt office network with air-gapped zones, strict audit logging, and NIST compliance using Fortinet firewalls."
  },
  {
    title: "Enterprise HQ",
    prompt: "Multi-vendor HQ deployment with Cisco Core, MikroTik Branch VPNs, and Ubiquiti Wireless density optimization."
  }
];

export const PROPOSAL_TEMPLATES = [
  {
    id: 'uni',
    title: "University Smart-Campus Proposal",
    target: "Director IT / Vice Chancellor",
    description: "AI-driven centralized management for large educational institutions."
  },
  {
    id: 'govt',
    title: "Government Infrastructure Modernization",
    target: "Secretary IT / Director General",
    description: "NIST compliant, secure network automation for government departments."
  },
  {
    id: 'tender',
    title: "Official Tender Response (Pakistan Govt)",
    target: "Procurement Committee / Secretary IT",
    description: "Formal bid response following standard govt procurement protocols."
  }
];

export const MOCK_DEVICES = [
  { id: '1', name: 'CORE-RT-01', vendor: 'Cisco', model: 'Catalyst 9500', role: 'Router', ipAddress: '10.0.0.1', status: 'Online', healthScore: 98, ztp: 'Provisioned' },
  { id: '2', name: 'CAMPUS-SW-01', vendor: 'Juniper', model: 'EX4300', role: 'Switch', ipAddress: '10.0.0.5', status: 'Online', healthScore: 94, ztp: 'Provisioned' },
  { id: '3', name: 'SEC-FW-01', vendor: 'Fortinet', model: 'FortiGate 100F', role: 'Firewall', ipAddress: '10.0.0.2', status: 'Alerting', healthScore: 72, ztp: 'Manual' },
  { id: '4', name: 'WIFI-WLC-01', vendor: 'Ubiquiti', model: 'Dream Machine Pro', role: 'WLC', ipAddress: '10.0.0.10', status: 'Online', healthScore: 88, ztp: 'Provisioned' },
  { id: '5', name: 'DEPT-SW-02', vendor: 'MikroTik', model: 'CRS326', role: 'Switch', ipAddress: '10.0.1.20', status: 'Online', healthScore: 99, ztp: 'Pending' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: '1. Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'inventory', label: '2. Sites & Assets', icon: <Server className="w-5 h-5" /> },
  { id: 'architect', label: '3. Intent Designer', icon: <DraftingCompass className="w-5 h-5" /> },
  { id: 'deployment', label: '5. Deployment Mgr', icon: <Rocket className="w-5 h-5" /> },
  { id: 'ai_lab', label: '6. AI Visual Lab', icon: <ImageIcon className="w-5 h-5" /> },
  { id: 'compliance', label: '7. Audit & Compliance', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'reports', label: '8. Reports & Export', icon: <FileText className="w-5 h-5" /> },
  { id: 'architecture', label: 'System Architecture', icon: <Database className="w-5 h-5" /> },
  { id: 'roadmap', label: 'Development Roadmap', icon: <CalendarDays className="w-5 h-5" /> },
  { id: 'settings', label: 'Platform Settings', icon: <Settings className="w-5 h-5" /> },
];
