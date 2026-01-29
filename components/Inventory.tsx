
import React, { useState, useMemo } from 'react';
import { MOCK_DEVICES } from '../constants';
import { Vendor, NetworkDevice } from '../types';
import { 
  MoreVertical, 
  Search, 
  Plus, 
  Filter, 
  Monitor, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Loader2, 
  X, 
  ChevronDown,
  RotateCcw,
  Database,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  Settings,
  Activity,
  History,
  Terminal,
  BarChart3,
  Download,
  ExternalLink,
  ChevronRight,
  Gauge,
  PlusCircle,
  Network
} from 'lucide-react';
import { findNearbyServices } from '../services/gemini';

const Inventory: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>(MOCK_DEVICES as NetworkDevice[]);
  const [searchingMaps, setSearchingMaps] = useState(false);
  const [mapsResult, setMapsResult] = useState<any>(null);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'metrics' | 'config' | 'ztp'>('metrics');
  
  // Add Device Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [newDevice, setNewDevice] = useState<Partial<NetworkDevice>>({
    name: '',
    vendor: Vendor.CISCO,
    model: '',
    role: 'Router',
    ipAddress: '',
    status: 'Online',
    healthScore: 100,
    ztp: 'Provisioned'
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const handleMapsQuery = async () => {
    setSearchingMaps(true);
    try {
      const res = await findNearbyServices(33.6844, 73.0479, "Find nearest ISP offices and Cisco certified service centers in Islamabad.");
      setMapsResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchingMaps(false);
    }
  };

  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      const matchesSearch = 
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.ipAddress.includes(searchQuery) ||
        device.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesVendor = selectedVendor === 'All' || device.vendor === selectedVendor;
      const matchesRole = selectedRole === 'All' || device.role === selectedRole;
      const matchesStatus = selectedStatus === 'All' || device.status === selectedStatus;

      return matchesSearch && matchesVendor && matchesRole && matchesStatus;
    });
  }, [devices, searchQuery, selectedVendor, selectedRole, selectedStatus]);

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice.name || !newDevice.ipAddress) return;

    setIsProvisioning(true);
    
    // Simulate orchestration and SSH push delay
    setTimeout(() => {
      const device: NetworkDevice = {
        id: (devices.length + 1).toString(),
        name: newDevice.name || 'NEW-NODE',
        vendor: newDevice.vendor || Vendor.CISCO,
        model: newDevice.model || 'Generic Node',
        role: (newDevice.role as any) || 'Router',
        ipAddress: newDevice.ipAddress || '0.0.0.0',
        status: 'Online',
        healthScore: 100,
        ztp: 'Provisioned'
      };
      setDevices([device, ...devices]);
      setIsAddModalOpen(false);
      setIsProvisioning(false);
      setNewDevice({
        name: '',
        vendor: Vendor.CISCO,
        model: '',
        role: 'Router',
        ipAddress: '',
        status: 'Online',
        healthScore: 100,
        ztp: 'Provisioned'
      });
    }, 2000);
  };

  // Status badge logic using the added AlertTriangle icon
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Online': return <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[10px] uppercase"><CheckCircle2 className="w-3 h-3" /> Online</span>;
      case 'Alerting': return <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px] uppercase"><AlertTriangle className="w-3 h-3" /> Alerting</span>;
      default: return <span className="flex items-center gap-1.5 text-slate-500 font-bold bg-slate-500/10 px-2 py-0.5 rounded-full border border-slate-500/20 text-[10px] uppercase"><AlertCircle className="w-3 h-3" /> Offline</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Sites & Network Assets</h2>
          <p className="text-slate-400">Inventory of managed infrastructure across all regional clusters.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleMapsQuery}
            disabled={searchingMaps}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-all text-xs uppercase tracking-widest"
          >
            {searchingMaps ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4 text-emerald-400" />}
            Scan Nearby Support
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Add New Node
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by Hostname, IP, Vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
            />
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setShowFilters(!showFilters)} className={`p-3 rounded-xl border transition-all ${showFilters ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <Filter className="w-4 h-4" />
             </button>
             <div className="h-10 w-[1px] bg-slate-800"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{filteredDevices.length} Nodes Loaded</span>
          </div>
        </div>

        {showFilters && (
          <div className="p-6 bg-slate-950/50 border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Vendor Filter</label>
                <select 
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="All">All Vendors</option>
                  {Object.values(Vendor).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Operational Role</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Router">Router</option>
                  <option value="Switch">Switch</option>
                  <option value="Firewall">Firewall</option>
                  <option value="WLC">WLC</option>
                  <option value="AP">Access Point</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Health Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Online">Online</option>
                  <option value="Alerting">Alerting</option>
                  <option value="Offline">Offline</option>
                </select>
             </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/50">
                <th className="px-8 py-5">Node Identity</th>
                <th className="px-8 py-5">Platform</th>
                <th className="px-8 py-5">Network IP</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Health</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {filteredDevices.map((device) => (
                <tr 
                  key={device.id} 
                  className="group hover:bg-slate-800/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedDevice(device)}
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl border ${device.status === 'Alerting' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-800 border-slate-700 text-slate-400 group-hover:text-emerald-400'}`}>
                        {device.role === 'Firewall' ? <ShieldCheck className="w-4 h-4" /> : device.role === 'Router' ? <Network className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200 tracking-tight">{device.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{device.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-slate-300 font-medium">{device.vendor}</p>
                    <p className="text-[10px] text-slate-600 uppercase">{device.model}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{device.ipAddress}</span>
                  </td>
                  <td className="px-8 py-4">{getStatusBadge(device.status)}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${device.healthScore > 90 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : device.healthScore > 70 ? 'bg-amber-500' : 'bg-red-500'}`} 
                          style={{ width: `${device.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-slate-400">{device.healthScore}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-600 hover:text-white transition-all"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDevices.length === 0 && (
            <div className="p-20 text-center opacity-40">
               <Database className="w-12 h-12 mx-auto mb-4 text-slate-700" />
               <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">No Nodes Match Current Filter</p>
            </div>
          )}
        </div>
      </div>

      {mapsResult && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 animate-in slide-in-from-bottom-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" /> Nearby Support Infrastructure
              </h3>
              <button onClick={() => setMapsResult(null)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapsResult.chunks?.map((chunk: any, i: number) => chunk.maps && (
                <a key={i} href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="bg-slate-900 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col gap-2 group">
                   <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{chunk.maps.title}</span>
                      <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                   </div>
                   <span className="text-[10px] text-slate-500 leading-relaxed italic line-clamp-2">"Found via Google Maps Grounding Layer"</span>
                </a>
              ))}
           </div>
        </div>
      )}

      {/* Add Device Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] w-full max-w-xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                 <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                    <PlusCircle className="w-6 h-6 text-emerald-400" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Onboard New Node</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ansible Orchestration Required</p>
                 </div>
               </div>
               <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-500 hover:text-white transition-all"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleAddDevice} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Hostname / Label</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. CORE-RT-01"
                      value={newDevice.name}
                      onChange={e => setNewDevice({...newDevice, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">IP Address</label>
                    <input 
                      required
                      type="text" 
                      placeholder="10.0.0.1"
                      value={newDevice.ipAddress}
                      onChange={e => setNewDevice({...newDevice, ipAddress: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Vendor Platform</label>
                    <select 
                      value={newDevice.vendor}
                      onChange={e => setNewDevice({...newDevice, vendor: e.target.value as Vendor})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/40 cursor-pointer"
                    >
                      {Object.values(Vendor).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Deployment Role</label>
                    <select 
                      value={newDevice.role}
                      onChange={e => setNewDevice({...newDevice, role: e.target.value as any})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/40 cursor-pointer"
                    >
                      <option value="Router">Router</option>
                      <option value="Switch">Switch</option>
                      <option value="Firewall">Firewall</option>
                      <option value="WLC">WLC</option>
                      <option value="AP">Access Point</option>
                    </select>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Hardware Model / OS Version</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Catalyst 9500 / IOS-XE 17.3"
                    value={newDevice.model}
                    onChange={e => setNewDevice({...newDevice, model: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                  />
               </div>

               <div className="pt-6 border-t border-slate-800 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-4 bg-slate-800 text-slate-400 font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-750 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isProvisioning}
                    className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl shadow-xl shadow-emerald-500/20 text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                  >
                    {isProvisioning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                    {isProvisioning ? 'Provisioning...' : 'Authorize Provisioning'}
                  </button>
               </div>
               
               <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <p className="text-[9px] text-slate-600 uppercase font-bold leading-relaxed">
                    System will perform automated SSH push, verify credentials via vault, and perform ZTP handshake upon authorization.
                  </p>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Device Details Panel */}
      {selectedDevice && (
        <div className="fixed inset-0 z-[160] flex items-center justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSelectedDevice(null)}></div>
           <div className="w-full max-w-2xl h-full bg-slate-900 border-l border-slate-800 shadow-2xl relative animate-in slide-in-from-right-full duration-500 flex flex-col">
              <div className="p-8 border-b border-slate-800 bg-slate-950/20">
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                       <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                          <Cpu className="w-8 h-8 text-emerald-400" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black text-white tracking-tight">{selectedDevice.name}</h3>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{selectedDevice.vendor} • {selectedDevice.model}</p>
                       </div>
                    </div>
                    <button onClick={() => setSelectedDevice(null)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 transition-all"><X className="w-5 h-5" /></button>
                 </div>

                 <div className="flex gap-4">
                    <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">IP Node</p>
                       <p className="text-sm font-mono text-emerald-400 font-bold">{selectedDevice.ipAddress}</p>
                    </div>
                    <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Health Score</p>
                       <p className="text-sm font-bold text-white">{selectedDevice.healthScore}% - <span className="text-emerald-500">OPTIMAL</span></p>
                    </div>
                 </div>
              </div>

              <div className="flex border-b border-slate-800 px-8">
                 {[
                   { id: 'metrics', label: 'Real-time Metrics', icon: <Activity className="w-4 h-4" /> },
                   { id: 'config', label: 'Running Config', icon: <Terminal className="w-4 h-4" /> },
                   { id: 'ztp', label: 'Audit History', icon: <History className="w-4 h-4" /> }
                 ].map(tab => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveDetailTab(tab.id as any)}
                     className={`px-6 py-5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeDetailTab === tab.id ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                   >
                     {tab.icon}
                     {tab.label}
                   </button>
                 ))}
              </div>

              <div className="flex-1 p-8 overflow-y-auto bg-slate-950/10 custom-scrollbar">
                 {activeDetailTab === 'metrics' && (
                   <div className="space-y-8 animate-in fade-in duration-300">
                      <div className="grid grid-cols-2 gap-6">
                         {[
                           { label: 'CPU Utilization', val: '12%', color: 'text-emerald-400' },
                           { label: 'Memory Usage', val: '4.2GB / 16GB', color: 'text-blue-400' },
                           { label: 'Interface Errors', val: '0 (Clean)', color: 'text-emerald-400' },
                           { label: 'Uptime', val: '142 Days, 4h', color: 'text-slate-400' }
                         ].map((m, i) => (
                           <div key={i} className="bg-slate-900/50 p-5 rounded-3xl border border-slate-800 group hover:border-slate-700 transition-all">
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{m.label}</p>
                              <p className={`text-xl font-bold ${m.color}`}>{m.val}</p>
                           </div>
                         ))}
                      </div>
                      <div className="bg-slate-900/50 p-8 rounded-[32px] border border-slate-800">
                         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Gauge className="w-4 h-4 text-emerald-400" /> Throughput (Gbps)
                         </h4>
                         <div className="h-40 flex items-end gap-1.5 px-2">
                            {[...Array(24)].map((_, i) => (
                              <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm hover:bg-emerald-500/40 transition-colors cursor-pointer" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
                            ))}
                         </div>
                         <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                            <span>00:00</span>
                            <span>24H LIVE LOG</span>
                            <span>23:59</span>
                         </div>
                      </div>
                   </div>
                 )}

                 {activeDetailTab === 'config' && (
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-slate-500 leading-relaxed overflow-x-auto animate-in fade-in duration-300">
                      <p className="text-emerald-500 mb-2">! Running Configuration of {selectedDevice.name}</p>
                      <p className="text-emerald-500 mb-4">! Version: 17.3.1 - Managed by NetGenius AI</p>
                      <p>hostname {selectedDevice.name}</p>
                      <p>interface GigabitEthernet0/0/1</p>
                      <p>  description LINK_TO_CORE_BACKBONE</p>
                      <p>  ip address {selectedDevice.ipAddress} 255.255.255.0</p>
                      <p>  speed 1000</p>
                      <p>  duplex full</p>
                      <p>  no shutdown</p>
                      <p>!</p>
                      <p>router ospf 1</p>
                      <p>  network 10.0.0.0 0.255.255.255 area 0</p>
                      <p>!</p>
                      <p>snmp-server community NETGENIUS_READ RO</p>
                      <p>line vty 0 4</p>
                      <p>  transport input ssh</p>
                      <p>  login local</p>
                      <p>!</p>
                      <p>end</p>
                   </div>
                 )}

                 {activeDetailTab === 'ztp' && (
                   <div className="space-y-4 animate-in fade-in duration-300">
                      {[
                        { date: '2024-11-12 14:30', event: 'Firmware Update', detail: 'v17.2 -> v17.3 Push Success', status: 'Success' },
                        { date: '2024-11-01 09:12', event: 'ACL Policy Update', detail: 'Restrict SSH to ISB-NOC-SUBNET', status: 'Success' },
                        { date: '2024-10-25 22:00', event: 'Interface Reset', detail: 'Gigabit0/0/2 Flap Detected/Resolved', status: 'Auto-Fix' },
                        { date: '2024-10-15 11:45', event: 'Initial ZTP Onboarding', detail: 'Designed by Mr. Zeeshan Javed', status: 'Complete' }
                      ].map((log, i) => (
                        <div key={i} className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex justify-between items-center group hover:bg-slate-900 transition-all">
                           <div>
                              <p className="text-xs font-bold text-white mb-1">{log.event}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{log.detail}</p>
                              <p className="text-[9px] font-mono text-slate-600 mt-2 uppercase">{log.date}</p>
                           </div>
                           <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">{log.status}</span>
                        </div>
                      ))}
                   </div>
                 )}
              </div>

              <div className="p-8 border-t border-slate-800 bg-slate-950/20 flex gap-4">
                 <button className="flex-1 py-4 bg-slate-800 text-slate-300 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700">
                    Run Connectivity Test
                 </button>
                 <button className="flex-1 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10">
                    Force Config Sync
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
