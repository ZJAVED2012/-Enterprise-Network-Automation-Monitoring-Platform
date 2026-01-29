
export enum Vendor {
  CISCO = 'Cisco',
  MIKROTIK = 'MikroTik',
  FORTINET = 'Fortinet',
  JUNIPER = 'Juniper',
  HP = 'HP',
  UBIQUITI = 'Ubiquiti',
  PALOALTO = 'Palo Alto',
  PFSENSE = 'pfSense'
}

export type Role = 'Super Admin' | 'Network Admin' | 'NOC Operator' | 'Auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastLogin: string;
}

export interface NetworkDevice {
  id: string;
  name: string;
  vendor: Vendor;
  model: string;
  role: 'Router' | 'Switch' | 'Firewall' | 'WLC' | 'AP';
  ipAddress: string;
  status: 'Online' | 'Offline' | 'Alerting';
  healthScore: number;
  ztp?: string;
}

export type ViewState = 
  | 'dashboard' 
  | 'inventory' 
  | 'architect' 
  | 'deployment' 
  | 'compliance' 
  | 'reports' 
  | 'architecture' 
  | 'roadmap' 
  | 'settings'
  | 'ai_lab'
  | 'billing'
  | 'wireless_planner'
  | 'chat';
