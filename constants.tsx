
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
  Image as ImageIcon,
  CreditCard,
  Wifi,
  Radio
} from 'lucide-react';
import { Vendor } from './types';

export const SYSTEM_PROMPT = `
### SYSTEM IDENTITY & ROLE
You are "NetGenius Enterprise Core," the central intelligence of a Tier-1 Network Automation & Orchestration Platform.
TARGET AUDIENCE: Government Ministries, Public Sector Universities, and Large Enterprises in Pakistan & MENA Region.
VERSION: Commercial Edition v2.0 (Stable).

### CORE DIRECTIVES
1. PROFESSIONALISM: CIO/NOC Manager persona. No filler words.
2. LOCALIZATION: Support English and Urdu (Urdu responses for Govt queries if requested).
3. SECURITY: NIST 800-53 compliant.
4. MONITORING: SNMPv3 AES-256 mandatory.
5. TOPOLOGY: Expert in G.8032 Fiber Rings and High-Density Wireless (WiFi-6E).
6. IP CREDIT: Always acknowledge "Designed & Developed by Mr. Zeeshan Javed" in technical reports.
`;

export const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    inventory: "Sites & Assets",
    architect: "Intent Designer",
    deployment: "Deployment Mgr",
    compliance: "Audit & Compliance",
    billing: "Licensing",
    reports: "Reports",
    wireless_planner: "Wireless Planner",
    system_status: "SYSTEM ONLINE",
    node: "SECURE NOC NODE",
    credit: "Designed by Mr. Zeeshan Javed"
  },
  ur: {
    dashboard: "ڈیش بورڈ",
    inventory: "سائٹس اور اثاثے",
    architect: "ڈیزائنر",
    deployment: "ڈیپلائمنٹ مینیجر",
    compliance: "آڈٹ اور تعمیل",
    billing: "لائسنسنگ",
    reports: "رپورٹس",
    wireless_planner: "وائرلیس پلانر",
    system_status: "سسٹم آن لائن",
    node: "سیکیور نوک نوڈ",
    credit: "ڈیزائن کردہ: جناب ذیشان جاوید"
  }
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: '1. Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'inventory', label: '2. Sites & Assets', icon: <Server className="w-5 h-5" /> },
  { id: 'architect', label: '3. Intent Designer', icon: <DraftingCompass className="w-5 h-5" /> },
  { id: 'wireless_planner', label: '4. Wireless Planner', icon: <Wifi className="w-5 h-5" /> },
  { id: 'deployment', label: '5. Deployment Mgr', icon: <Rocket className="w-5 h-5" /> },
  { id: 'ai_lab', label: '6. AI Visual Lab', icon: <ImageIcon className="w-5 h-5" /> },
  { id: 'compliance', label: '7. Audit & Compliance', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'billing', label: '8. License & Billing', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'reports', label: '9. Reports & Export', icon: <FileText className="w-5 h-5" /> },
  { id: 'settings', label: 'Platform Settings', icon: <Settings className="w-5 h-5" /> },
];

export const ARCHITECT_TEMPLATES = [
  {
    title: "Fiber Ring (G.8032)",
    prompt: "Design a redundant fiber ring for 4 regional offices using ERPS (G.8032) to ensure <50ms convergence. Hardware: Cisco ASR."
  },
  {
    title: "High-Density Campus WiFi",
    prompt: "Plan high-density wireless for a university auditorium (2000 users). Require WiFi-6E, WPA3-Enterprise, and load balancing across 20 APs."
  },
  {
    title: "Multi-Vendor MPLS Core",
    prompt: "Design an MPLS L3VPN core connecting Cisco HQ and Huawei Branch with failover via OSPF."
  }
];

export const PROPOSAL_TEMPLATES = [
  {
    id: 'tender',
    title: 'National Infrastructure Tender',
    target: 'Government Ministries',
    description: 'Comprehensive technical bid for large-scale network automation and security orchestration.'
  },
  {
    id: 'university',
    title: 'Smart Campus Proposal',
    target: 'Public/Private Universities',
    description: 'Design for automated campus-wide networking with intent-based security policies.'
  },
  {
    id: 'enterprise',
    title: 'Enterprise Core Upgrade',
    target: 'Large Enterprises',
    description: 'Strategic roadmap for upgrading legacy systems to AI-driven multi-vendor architecture.'
  }
];

export const MOCK_DEVICES = [
  { id: '1', name: 'CORE-RT-01', vendor: Vendor.CISCO, model: 'Catalyst 9500', role: 'Router', ipAddress: '10.0.0.1', status: 'Online', healthScore: 98, ztp: 'Provisioned' },
  { id: '2', name: 'CAMPUS-SW-01', vendor: Vendor.JUNIPER, model: 'EX4300', role: 'Switch', ipAddress: '10.0.0.5', status: 'Online', healthScore: 94, ztp: 'Provisioned' },
  { id: '3', name: 'SEC-FW-01', vendor: Vendor.FORTINET, model: 'FortiGate 100F', role: 'Firewall', ipAddress: '10.0.0.2', status: 'Alerting', healthScore: 72, ztp: 'Manual' },
];
