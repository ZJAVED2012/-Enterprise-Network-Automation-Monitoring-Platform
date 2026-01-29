
import React from 'react';
// Added Activity to imports from lucide-react to fix missing reference on line 84
import { Database, Code2, ShieldCheck, Share2, Layers, Cpu, Server, Key, Network, Globe, Lock, Activity } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Technical System Architecture</h2>
          <p className="text-slate-400">Deep-dive into the NetGenius backend, relational schema, and RBAC logic.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-widest">
            <Globe className="w-4 h-4" />
            Air-Gap Ready (ISO Version)
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl font-bold border border-slate-700 hover:bg-slate-700 transition-all text-xs uppercase tracking-widest">
            <Share2 className="w-4 h-4" />
            Export Schema
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
              <Layers className="w-5 h-5 text-blue-400" />
              PostgreSQL Schema (Authentication & RBAC)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Connector lines visual */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-48 bg-slate-800 hidden md:block opacity-20"></div>
              
              {/* Table Users */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-emerald-500/50 transition-all group">
                <div className="bg-emerald-500/10 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400 font-mono">auth.users</span>
                  <Lock className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">email</span> <span className="text-slate-600">VARCHAR UNIQUE</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">password_hash</span> <span className="text-slate-600">TEXT (Argon2)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">mfa_secret</span> <span className="text-slate-600">TEXT NULL</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">created_at</span> <span className="text-slate-600">TIMESTAMPTZ</span></div>
                </div>
              </div>

              {/* Table User Profiles / RBAC */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-blue-500/50 transition-all group">
                <div className="bg-blue-500/10 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-400 font-mono">auth.user_profiles</span>
                  <Key className="w-3 h-3 text-blue-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">user_id</span> <span className="text-slate-600">UUID (FK -> users.id)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">full_name</span> <span className="text-slate-600">VARCHAR</span></div>
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">role_id</span> <span className="text-slate-600">UUID (FK -> roles.id)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">last_ip</span> <span className="text-slate-600">INET</span></div>
                </div>
              </div>

              {/* Table Roles */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/50 transition-all">
                <div className="bg-purple-500/10 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-400 font-mono">auth.roles</span>
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">name</span> <span className="text-slate-600">VARCHAR (Super Admin, etc)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">permissions</span> <span className="text-slate-600">JSONB (ACL List)</span></div>
                </div>
              </div>

              {/* Table Audit Sessions */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-red-500/50 transition-all border-dashed">
                <div className="bg-red-500/10 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-red-400 font-mono">monitoring.user_sessions</span>
                  <Activity className="w-3 h-3 text-red-400" />
                </div>
                <div className="p-4 space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-100 font-bold">id</span> <span className="text-slate-600">UUID (PK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">user_id</span> <span className="text-slate-600">UUID (FK)</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">ua_string</span> <span className="text-slate-600">TEXT</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">is_active</span> <span className="text-slate-600">BOOLEAN</span></div>
                  <div className="flex justify-between"><span className="text-slate-100">revoked_at</span> <span className="text-slate-600">TIMESTAMPTZ NULL</span></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-500 leading-relaxed italic">
              All authentication flows are proxied via a secure middleware layer. Row-Level Security (RLS) is enabled on all tables to ensure strict data isolation between departments.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
              <Code2 className="w-5 h-5 text-emerald-400" />
              RBAC Authorization Logic (Node.js/FastAPI)
            </h3>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-400 leading-relaxed whitespace-pre overflow-x-auto">
{`// Security Middleware Example
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const { role } = req.user;
    const permissions = RoleManager.getPermissions(role);
    
    if (permissions.includes(requiredPermission)) {
      return next();
    }
    
    Logger.warn('Unauthorized Access Attempt', { 
      user: req.user.id, 
      resource: req.path 
    });
    
    return res.status(403).json({ error: 'CLEARANCE_REQUIRED' });
  };
};`}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Security Stack
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Auth Strategy', val: 'JWT + Refresh Tokens', color: 'text-blue-400' },
                { label: 'Password Hashing', val: 'Argon2id', color: 'text-emerald-400' },
                { label: 'RBAC Policy', val: 'Fine-Grained ACL', color: 'text-purple-400' },
                { label: 'Audit Logging', val: 'Immutable WAL', color: 'text-amber-400' },
                { label: 'Encryption', val: 'AES-256-GCM (At Rest)', color: 'text-indigo-400' },
                { label: 'Session Management', val: 'Redis Distributed', color: 'text-red-400' },
              ].map((tech, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-800 last:border-0 group">
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{tech.label}</span>
                  <span className={`text-xs font-bold ${tech.color}`}>{tech.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <ShieldCheck className="w-12 h-12 mb-6 text-blue-400 opacity-60" />
            <h4 className="text-xl font-bold mb-3 tracking-tight">Zero-Trust Ready</h4>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Implemented NIST SP 800-207 standards. Every request is verified, authorized, and logged regardless of origin.
            </p>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-6">
               <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Audit Protocol</p>
               <p className="text-xs text-white font-mono">FEDERAL_STANDARD_12.0</p>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:shadow-xl transition-all active:scale-95">
              Review Security Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
