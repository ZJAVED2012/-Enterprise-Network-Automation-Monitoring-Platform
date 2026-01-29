
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

export interface GeneratedConfig {
  architectureSummary: string;
  deviceConfigs: {
    deviceName: string;
    vendor: string;
    model: string;
    config: string;
  }[];
  monitoringSetup: string;
  complianceSecurity: string;
  deploymentInstructions: string;
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
  | 'chat';
