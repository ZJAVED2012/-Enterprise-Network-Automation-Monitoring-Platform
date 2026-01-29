
import React, { useState, useMemo } from 'react';
import { MOCK_DEVICES } from '../constants';
import { Vendor } from '../types';
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
  Database
} from 'lucide-react';
import { findNearbyServices } from '../services/gemini';

const Inventory: React.FC = () => {
  const [searchingMaps, setSearchingMaps] = useState(false);
  const [mapsResult, setMapsResult] = useState<any>(null);
  
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
    return MOCK_DEVICES.filter(device => {
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
  }, [searchQuery, selectedVendor, selectedRole, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedVendor('All');
    setSelectedRole('All');
    setSelectedStatus('All');
  };

  const isFiltered = searchQuery !== '' || selectedVendor !== 'All' || selectedRole !== 'All' || selectedStatus !== 'All';

  const vendors = ['All', ...Object.values(Vendor)];
  const roles = ['All', 'Router', 'Switch', 'Firewall', 'WLC', 'AP'];
  const statuses = ['All', 'Online', 'Offline', 'Alerting'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Asset Lifecycle Management</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Global Infrastructure</h2>
          <p className="text-slate-400 font-medium">Unified inventory across multi-vendor campus and branch locations.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleMapsQuery}
            disabled={searchingMaps}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all border border-slate-700 shadow-xl"
          >
            {searchingMaps ? <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> : <MapPin className="w-5 h-5 text-blue-400" />}
            Nearby Services
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>
      </div>

      {mapsResult && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 relative animate-in slide-in-from-top-4 duration-300">
          <button onClick={() => setMapsResult(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
          <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-widest">
            <MapPin className="w-4 h-4" /> Grounded Location Intelligence
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">{mapsResult.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mapsResult.chunks?.map((chunk: any, i: number) => chunk.maps && (
              <a key={i} href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all group">
                <p className="text-white font-bold text-xs group-hover:text-blue-400">{chunk.maps.title}</p>
                <p className="text-[10px] text-slate-500 mt-1">Click to view on Google Maps</p>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Hostname, IP, Vendor or Model..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 font-medium transition-all placeholder:text-slate-600"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 border transition-all font-bold text-sm uppercase tracking-wider ${
              showFilters || isFiltered
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {isFiltered && <span className="w-2 h-2 bg-emerald-500 rounded-full ml-1"></span>}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl animate-in slide-in-from-top-2 duration-300 shadow-inner">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Vendor Platform</label>
              <div className="relative">
                <select 
                  value={selectedVendor} 
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 appearance-none cursor-pointer"
                >
                  {vendors.map(v => <option key={String(v)} value={String(v)}>{String(v)}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Infrastructure Role</label>
              <div className="relative">
                <select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 appearance-none cursor-pointer"
                >
                  {roles.map(r => <option key={String(r)} value={String(r)}>{String(r)}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Connectivity Status</label>
              <div className="relative">
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 appearance-none cursor-pointer"
                >
                  {statuses.map(s => <option key={String(s)} value={String(s)}>{String(s)}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-end">
              <button 
                onClick={resetFilters}
                disabled={!isFiltered}
                className="w-full py-3 bg-slate-950 hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-800 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Engine
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center px-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Showing <span className="text-emerald-400">{filteredDevices.length}</span> of <span className="text-slate-300">{MOCK_DEVICES.length}</span> Assets
          </p>
          {isFiltered && (
            <button onClick={resetFilters} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest flex items-center gap-1">
              <X className="w-3 h-3" /> Clear All Filters
            </button>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-6 py-4">Hostname & Node ID</th>
                <th className="px-6 py-4">Vendor / Model</th>
                <th className="px-6 py-4">Infra Role</th>
                <th className="px-6 py-4">IP Configuration</th>
                <th className="px-6 py-4">Health Index</th>
                <th className="px-6 py-4">Live Status</th>
                <th className="px-6 py-4">Deployment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <tr key={device.id} className="group hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                          <Monitor className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200">{device.name}</span>
                          <span className="text-[8px] text-slate-500 font-mono uppercase">ID-{device.id.padStart(4, '0')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300">{device.vendor}</span>
                        <span className="text-[10px] text-slate-500">{device.model}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-700">
                        {device.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      {device.ipAddress}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${device.healthScore > 90 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}
                            style={{ width: `${device.healthScore}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300">{device.healthScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          device.status === 'Online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                          device.status === 'Alerting' ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-600'
                        }`}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          device.status === 'Online' ? 'text-emerald-400' : 
                          device.status === 'Alerting' ? 'text-amber-400' : 'text-slate-500'
                        }`}>{device.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-bold uppercase tracking-wider border ${
                        device.ztp === 'Provisioned' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}>
                        {device.ztp || 'Manual'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <Search className="w-12 h-12 mb-4 text-slate-600" />
                      <p className="text-lg font-bold text-slate-300">No Assets Matching Filters</p>
                      <p className="text-sm text-slate-500 max-w-[300px] mt-2 leading-relaxed">Adjust your search parameters or reset the engine to view all global infrastructure.</p>
                      <button 
                        onClick={resetFilters}
                        className="mt-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
