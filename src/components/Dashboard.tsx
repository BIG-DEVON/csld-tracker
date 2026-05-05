"use client";

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AlertTriangle, CheckCircle2, Clock, Users, BarChart3, PieChart as PieChartIcon, Lightbulb, Bell, Save, X, Loader2 } from 'lucide-react';
import { updateInitiative } from '../app/actions';

// Strict typing aligned with your new Prisma Database Schema
export interface DBInitiative {
  id: string;
  kpiId: string;
  category: string;
  kpi: string;
  diff: string;
  synergy: string;
  limitations: string;
  status: string;
  suggestedAction: string;
  reminderDate: string | null;
  notes: string | null;
}

export default function Dashboard({ initialData }: { initialData: DBInitiative[] }) {
  // Application State powered by the database payload (WITH CRASH-PROOF SAFETY NET)
  const [data, setData] = useState<DBInitiative[]>(initialData || []);

  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All Difficulties');
  const [activeStatus, setActiveStatus] = useState<string>('All Statuses');
  const [viewMode, setViewMode] = useState<'cards' | 'analytics'>('cards');
  
  // Enterprise Slide-out Panel State
  const [selectedKpi, setSelectedKpi] = useState<DBInitiative | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Secure Database Update Handler
  const handleSave = async (updatedKpi: DBInitiative) => {
    setIsSaving(true); // Trigger loading animation
    
    // Send the update to the SQLite backend via Server Action
    const res = await updateInitiative(updatedKpi.id, {
      status: updatedKpi.status,
      diff: updatedKpi.diff,
      notes: updatedKpi.notes || "",
      reminderDate: updatedKpi.reminderDate || "",
    });

    if (res.success && res.data) {
      // Update the local screen instantly without needing a page refresh
      setData(data.map(item => item.id === res.data.id ? (res.data as DBInitiative) : item));
      setSelectedKpi(null); // Close the panel
    } else {
      alert("Failed to update the database. Please check your connection.");
    }
    
    setIsSaving(false); // Stop loading animation
  };

  // Secondary Safety Net added here just in case!
  const safeData = data || [];
  const categories = ['All Categories', ...new Set(safeData.map(item => item.category))];
  const difficulties = ['All Difficulties', 'Low', 'Medium', 'High'];
  const statuses = ['All Statuses', 'Pending', 'In Progress', 'Completed'];

  // Filter Engine
  const filteredData = useMemo(() => {
    return safeData.filter((item: DBInitiative) => {
      const matchCat = activeCategory === 'All Categories' || item.category === activeCategory;
      const matchDiff = activeDifficulty === 'All Difficulties' || item.diff === activeDifficulty;
      const matchStatus = activeStatus === 'All Statuses' || item.status === activeStatus;
      return matchCat && matchDiff && matchStatus;
    });
  }, [safeData, activeCategory, activeDifficulty, activeStatus]);

  // Analytics Calculations
  const diffChartData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0 };
    filteredData.forEach(item => { 
      if(counts[item.diff as keyof typeof counts] !== undefined) counts[item.diff as keyof typeof counts]++; 
    });
    return [
      { name: 'Low Difficulty', count: counts.Low, color: '#10b981' }, 
      { name: 'Medium Difficulty', count: counts.Medium, color: '#f59e0b' }, 
      { name: 'High Difficulty', count: counts.High, color: '#ef4444' }, 
    ];
  }, [filteredData]);

  const statusChartData = useMemo(() => {
    const counts = { Pending: 0, 'In Progress': 0, Completed: 0 };
    filteredData.forEach(item => { 
      if(counts[item.status as keyof typeof counts] !== undefined) counts[item.status as keyof typeof counts]++; 
    });
    return [
      { name: 'Pending', value: counts.Pending, color: '#94a3b8' }, 
      { name: 'In Progress', value: counts['In Progress'], color: '#3b82f6' }, 
      { name: 'Completed', value: counts.Completed, color: '#10b981' }, 
    ];
  }, [filteredData]);

  const completionRate = useMemo(() => {
    if (safeData.length === 0) return 0;
    const completed = safeData.filter(k => k.status === 'Completed').length;
    return Math.round((completed / safeData.length) * 100);
  }, [safeData]);

  // UI Theming Helpers
  const getDiffColor = (diff: string) => {
    switch (diff) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <div className="w-2 h-2 rounded-full bg-slate-300 m-1" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-4 md:p-8 overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-2 bg-blue-600 rounded-full"></div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">CSLD Operations Tracker</h1>
            </div>
            <p className="text-slate-500 font-medium ml-4 tracking-wide">Communication & Stakeholder Liaison Workplan Management</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 flex-1 md:flex-none">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Initiatives</p>
              <p className="text-3xl font-black text-slate-800 leading-none">{safeData.length}</p>
            </div>
            <div className="bg-blue-600 px-6 py-4 rounded-2xl shadow-lg shadow-blue-200 flex-1 md:flex-none">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Completion</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-black text-white leading-none">{completionRate}%</p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Master Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Initiative Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Implementation Status</label>
                  <div className="flex flex-col gap-2">
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => setActiveStatus(status)}
                        className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                          activeStatus === status 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {status}
                        {activeStatus === status && <div className="w-2 h-2 rounded-full bg-blue-400"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Assessed Difficulty</label>
                  <div className="grid grid-cols-2 gap-2">
                    {difficulties.map(level => (
                      <button
                        key={level}
                        onClick={() => setActiveDifficulty(level)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          activeDifficulty === level 
                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-transparent'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="lg:col-span-9 space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex bg-slate-50 p-1 rounded-xl w-full sm:w-auto">
                <button 
                  onClick={() => setViewMode('cards')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'cards' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <BarChart3 className="w-4 h-4" /> Board View
                </button>
                <button 
                  onClick={() => setViewMode('analytics')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'analytics' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <PieChartIcon className="w-4 h-4" /> Analytics View
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Showing <span className="text-slate-900 font-black">{filteredData.length}</span> initiatives
              </p>
            </div>

            {viewMode === 'analytics' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-700 mb-6 text-center">Implementation Status Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={statusChartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {statusChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-700 mb-6 text-center">Assessed Difficulty Spread</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={diffChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
                          {diffChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max pb-10">
                {filteredData.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-500 font-bold">No initiatives match your current filters.</p>
                  </div>
                ) : (
                  filteredData.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedKpi(item)}
                      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4 gap-2">
                          <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg uppercase tracking-widest truncate border border-blue-100">
                            {item.category}
                          </span>
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold whitespace-nowrap ${getStatusBadge(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </div>
                        </div>
                        <p className="text-slate-800 font-bold text-sm leading-relaxed mb-4 group-hover:text-blue-700 transition-colors">
                          {item.kpi}
                        </p>
                      </div>
                      
                      <div className="space-y-3 mt-auto pt-4 border-t border-slate-100">
                        {item.reminderDate && (
                          <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-2 rounded-lg w-fit mb-2">
                            <Bell className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">Reminder: {item.reminderDate}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Users className="w-4 h-4" />
                            <p className="text-xs font-semibold"><span className="text-slate-400">Synergy:</span> {item.synergy}</p>
                          </div>
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border ${getDiffColor(item.diff)}`}>
                            {item.diff} Difficulty
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ENTERPRISE SLIDE-OUT EDIT PANEL */}
      {selectedKpi && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => !isSaving && setSelectedKpi(null)}
          ></div>
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-black text-slate-800">Manage Initiative</h2>
              <button disabled={isSaving} onClick={() => setSelectedKpi(null)} className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-full border border-slate-200 disabled:opacity-50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{selectedKpi.category}</p>
                <p className="text-sm font-bold text-slate-800 leading-relaxed">{selectedKpi.kpi}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">Suggested Action</p>
                </div>
                <p className="text-sm text-blue-900 font-medium">{selectedKpi.suggestedAction}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Known Limitations</p>
                </div>
                <p className="text-sm text-slate-700">{selectedKpi.limitations}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Update Status</label>
                  <select 
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedKpi.status}
                    onChange={(e) => setSelectedKpi({...selectedKpi, status: e.target.value})}
                    disabled={isSaving}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Adjust Difficulty Level</label>
                  <select 
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedKpi.diff}
                    onChange={(e) => setSelectedKpi({...selectedKpi, diff: e.target.value})}
                    disabled={isSaving}
                  >
                    <option value="Low">Low Difficulty</option>
                    <option value="Medium">Medium Difficulty</option>
                    <option value="High">High Difficulty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Set Follow-up Reminder</label>
                  <input 
                    type="date"
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedKpi.reminderDate || ''}
                    onChange={(e) => setSelectedKpi({...selectedKpi, reminderDate: e.target.value})}
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Internal Notes</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Add progress updates or notes here..."
                    value={selectedKpi.notes || ''}
                    onChange={(e) => setSelectedKpi({...selectedKpi, notes: e.target.value})}
                    disabled={isSaving}
                  ></textarea>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-slate-200 bg-white">
              <button 
                disabled={isSaving}
                onClick={() => handleSave(selectedKpi)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-md"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSaving ? "Saving Updates..." : "Save Updates"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}