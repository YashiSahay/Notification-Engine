import React, { useState, useEffect } from 'react';

// --- RECHARTS (Charts) ---
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer, // Fixed: Added this
    AreaChart,
    Area
} from 'recharts';

// --- LUCIDE ICONS ---
import {
    LayoutDashboard,
    Edit3,
    ShieldCheck,
    User,
    BarChart2,
    Mail,
    MessageSquare,
    Bell,
    RotateCcw,
    ChevronDown,
    Send,
    Settings,
    Eye,
    Calendar,
    Clock,
    AlertCircle,
    Download,
    FileText,
    CheckCircle,
    CheckCircle2, // Fixed: Added for AuthPage
    Hash,
    Zap,          // Fixed: Added for AuthPage
    Activity      // Fixed: Added for AuthPage
} from 'lucide-react';

const chartData = [
    { day: 'Mon', email: 40, sms: 20, push: 10 },
    { day: 'Tue', email: 65, sms: 35, push: 12 },
    { day: 'Wed', email: 50, sms: 25, push: 11 },
    { day: 'Thu', email: 85, sms: 45, push: 13 },
    { day: 'Fri', email: 60, sms: 30, push: 15 },
    { day: 'Sat', email: 75, sms: 40, push: 18 },
    { day: 'Sun', email: 55, sms: 28, push: 20 },
];

const DashboardHeader = ({ title, onLogout, onToggleSettings, onToggleUser, isSettingsOpen, isUserOpen, setActiveTab, triggerToast }) => {
    const userEmail = localStorage.getItem('userEmail') || 'admin@notifyengine.io';
    const userInitials = userEmail.substring(0, 2).toUpperCase();

    return (
        <header className="relative flex justify-between items-center mb-0 px-8 py-5 z-[100] bg-[#1E40AF] shadow-lg">
            {/* Title & Status Section */}
            <div>
                <h1 className="text-2xl font-black text-white tracking-tighter uppercase font-sans">
                    Notification Engine
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <p className="text-xs text-blue-200 font-bold tracking-widest uppercase">Engine Cluster • Live</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 relative">

                {/* SETTINGS */}
                <button
                    onClick={onToggleSettings}
                    className={`p-3 rounded-2xl border transition-all duration-300 ${isSettingsOpen ? 'bg-white text-[#1E40AF] border-white shadow-lg scale-110' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                >
                    <Settings size={20} />
                </button>

                {/* USER */}
                <button
                    onClick={onToggleUser}
                    className={`p-3 rounded-2xl border transition-all duration-300 ${isUserOpen ? 'bg-white text-[#1E40AF] border-white shadow-lg scale-110' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                >
                    <User size={20} />
                </button>

                {/* SIGN OUT */}
                <button
                    onClick={onLogout}
                    className="ml-2 flex items-center gap-2 px-6 py-3 bg-white text-[#1E40AF] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 shadow-xl active:scale-95 transition-all"
                >
                    Sign Out
                </button>

                {/* SETTINGS DROPDOWN */}
                {isSettingsOpen && (
                    <div className="absolute top-full right-24 mt-4 w-80 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-6 animate-in slide-in-from-top-2 duration-300">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
                            App Settings
                        </h4>

                        <div className="space-y-1">
                            {/* Notification Settings */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                                onClick={() => { setActiveTab('Preferences'); onToggleSettings(); }}
                            >
                                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <Bell size={15} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-black text-slate-700">Notification Preferences</span>
                                    <span className="text-[9px] text-slate-400 font-bold">Channels, quiet hours, types</span>
                                </div>
                                <ChevronDown size={12} className="text-slate-300 ml-auto -rotate-90" />
                            </div>

                            {/* API Keys */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                                onClick={() => { onToggleSettings(); triggerToast("API KEY MANAGER: 3 ACTIVE KEYS", "success"); }}
                            >
                                <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
                                    <ShieldCheck size={15} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-black text-slate-700">API Keys & Webhooks</span>
                                    <span className="text-[9px] text-slate-400 font-bold">Manage integration credentials</span>
                                </div>
                                <ChevronDown size={12} className="text-slate-300 ml-auto -rotate-90" />
                            </div>

                            {/* SMTP Config */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                                onClick={() => { onToggleSettings(); triggerToast("SMTP RELAY: GMAIL • CONNECTED", "success"); }}
                            >
                                <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                    <Mail size={15} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-black text-slate-700">SMTP Configuration</span>
                                    <span className="text-[9px] text-emerald-500 font-bold">Gmail Relay • Connected</span>
                                </div>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full ml-auto" />
                            </div>

                            {/* Rate Limits */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                                onClick={() => { onToggleSettings(); triggerToast("RATE LIMIT: 100 REQ/15MIN ACTIVE", "success"); }}
                            >
                                <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                                    <Activity size={15} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-black text-slate-700">Rate Limiting</span>
                                    <span className="text-[9px] text-slate-400 font-bold">100 requests / 15 min</span>
                                </div>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full ml-auto" />
                            </div>

                            {/* Logs */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                                onClick={() => { setActiveTab('Analytics'); onToggleSettings(); }}
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
                                    <FileText size={15} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-black text-slate-700">View Delivery Logs</span>
                                    <span className="text-[9px] text-slate-400 font-bold">Full audit trail</span>
                                </div>
                                <ChevronDown size={12} className="text-slate-300 ml-auto -rotate-90" />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-slate-50 px-2">
                            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                                NotifyEngine v1.0.0 • All systems operational
                            </p>
                        </div>
                    </div>
                )}

                {/* USER DROPDOWN */}
                {isUserOpen && (
                    <div className="absolute top-full right-12 mt-4 w-80 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-6 animate-in slide-in-from-top-2 duration-300">
                        {/* User Card */}
                        <div className="flex items-center gap-3 mb-5 p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-md">
                                {userInitials}
                            </div>
                            <div>
                                <p className="text-[13px] font-black text-[#0F172A]">{userEmail}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">Active Session</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            {/* Profile Settings */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                                onClick={() => { setActiveTab('Preferences'); onToggleUser(); }}
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <User size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-700">Profile & Preferences</span>
                                    <span className="text-[9px] text-slate-400 font-bold">Notification settings</span>
                                </div>
                                <ChevronDown size={12} className="text-slate-300 ml-auto -rotate-90" />
                            </div>

                            {/* Activity */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                                onClick={() => { setActiveTab('Analytics'); onToggleUser(); }}
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                    <BarChart2 size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-700">My Activity</span>
                                    <span className="text-[9px] text-slate-400 font-bold">View sent notifications</span>
                                </div>
                                <ChevronDown size={12} className="text-slate-300 ml-auto -rotate-90" />
                            </div>

                            {/* Security */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                                onClick={() => { onToggleUser(); triggerToast("SESSION TOKEN: VALID • EXPIRES IN 7 DAYS", "success"); }}
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                                    <ShieldCheck size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-700">Security</span>
                                    <span className="text-[9px] text-slate-400 font-bold">JWT token • 7 days validity</span>
                                </div>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full ml-auto" />
                            </div>

                            {/* Queue Status */}
                            <div
                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                                onClick={() => { setActiveTab('Queue'); onToggleUser(); }}
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                    <Hash size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black text-slate-700">Queue Status</span>
                                    <span className="text-[9px] text-slate-400 font-bold">Monitor job pipeline</span>
                                </div>
                                <ChevronDown size={12} className="text-slate-300 ml-auto -rotate-90" />
                            </div>

                            {/* Divider + Logout */}
                            <div className="border-t border-slate-50 my-2 pt-2">
                                <div
                                    className="flex items-center gap-3 p-3 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors group"
                                    onClick={onLogout}
                                >
                                    <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                                        <AlertCircle size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-rose-500">Sign Out</span>
                                        <span className="text-[9px] text-slate-400 font-bold">End current session</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

const App = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this line
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const [toast, setToast] = useState({ show: false, message: '', type: '' });


    // TOAST LOGIC - Moved inside App
    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    // Add this block here
    if (!isLoggedIn) {
        return <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-sans text-[#475569]">
            {/* SIDEBAR SECTION - Locked UI */}
            {/* BLUE NAVBAR - full width */}
            <DashboardHeader
                title={activeTab}
                onLogout={() => setIsLoggedIn(false)}
                isSettingsOpen={isSettingsOpen}
                isUserOpen={isUserOpen}
                setActiveTab={setActiveTab}
                triggerToast={triggerToast}
                onToggleSettings={() => { setIsSettingsOpen(!isSettingsOpen); setIsUserOpen(false); }}
                onToggleUser={() => { setIsUserOpen(!isUserOpen); setIsSettingsOpen(false); }}
            />{/* SIDEBAR + CONTENT ROW */}
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-72 bg-white border-r border-slate-100 p-8 flex flex-col gap-4 sticky top-0 h-screen">
                    <nav className="flex flex-col gap-2 mt-4">
                        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                        <NavItem icon={<Edit3 size={20} />} label="Compose" active={activeTab === 'Compose'} onClick={() => setActiveTab('Compose')} />
                        <NavItem icon={<ShieldCheck size={20} />} label="Queue Monitor" active={activeTab === 'Queue'} onClick={() => setActiveTab('Queue')} />
                        <NavItem icon={<User size={20} />} label="Preferences" active={activeTab === 'Preferences'} onClick={() => setActiveTab('Preferences')} />
                        <NavItem icon={<BarChart2 size={20} />} label="Logs & Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
                    </nav>
                </aside>

                <main className="flex-1 overflow-y-auto bg-[rgb(248,250,252)]">
                    {activeTab === 'Dashboard' && <DashboardView />}
                    {activeTab === 'Compose' && <ComposeView triggerToast={triggerToast} />}
                    {activeTab === 'Analytics' && <AnalyticsView />}
                    {activeTab === 'Queue' && <QueueMonitorView />}
                    {activeTab === 'Preferences' && <UserPreferencesView />}
                </main>
            </div>

            {/* TOAST */}
            {toast.show && (
                <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-right-10 duration-500">
                    <div className={`flex items-center gap-4 px-8 py-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-l-4 backdrop-blur-md ${toast.type === 'success' ? 'bg-[#0F172A] border-emerald-500 text-white' : 'bg-[#0F172A] border-rose-500 text-white'
                        }`}>
                        <div className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px] ${toast.type === 'success' ? 'bg-emerald-500 shadow-emerald-500' : 'bg-rose-500 shadow-rose-500'
                            }`} />
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">System Notification</span>
                            <span className="text-[12px] font-bold tracking-tight font-sans">{toast.message}</span>
                        </div>
                        <button
                            onClick={() => setToast({ ...toast, show: false })}
                            className="ml-6 p-1 hover:bg-slate-800 rounded-lg transition-colors opacity-40 hover:opacity-100"
                        >
                            <RotateCcw size={14} className="rotate-45" />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

// --- 1. DASHBOARD VIEW: FULLY DYNAMIC WITH REAL-TIME MONGODB DATA ---
const DashboardView = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dateRange, setDateRange] = useState('Last 7 days');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // States for Real Data
    const [displayStats, setDisplayStats] = useState({ sent: '0', del: '0', fail: '0', pend: '0' });
    const [currentChart, setCurrentChart] = useState([]);
    const [activityFeed, setActivityFeed] = useState([]);

    const fetchDashboardData = async () => {
        setIsRefreshing(true);
        try {
            const response = await fetch('https://notification-engine-wdmj.onrender.com/api/notifications');
            const allData = await response.json();

            // 1. Calculate Real Stat Card Values
            const sent = allData.length;
            const del = allData.filter(n => n.status === 'sent').length;
            const fail = allData.filter(n => n.status === 'failed').length;
            const pend = allData.filter(n => n.status === 'queued').length;

            setDisplayStats({
                sent: sent.toLocaleString(),
                del: del.toLocaleString(),
                fail: fail.toLocaleString(),
                pend: pend.toLocaleString()
            });

            // 2. Map Real Data to the LineChart (Last 7 Days)
            const last7Days = [...Array(7)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
                const dayISO = d.toISOString().split('T')[0];

                // Filter records specifically for this date
                const dayRecords = allData.filter(n => n.createdAt.startsWith(dayISO));

                return {
                    day: dayLabel,
                    email: dayRecords.filter(n => n.channels?.includes('Email')).length,
                    sms: dayRecords.filter(n => n.channels?.includes('SMS')).length,
                    push: dayRecords.filter(n => n.channels?.includes('Push')).length,
                };
            });
            setCurrentChart(last7Days);

            // 3. Update Activity Feed with the latest 3 real notifications
            setActivityFeed(allData.slice(0, 3));

        } catch (err) {
            console.error("Dashboard Sync Error:", err);
        } finally {
            // Short timeout to show the refresh animation clearly
            setTimeout(() => setIsRefreshing(false), 800);
        }
    };

    // Auto-fetch on load and whenever dateRange changes
    useEffect(() => {
        fetchDashboardData();
    }, [dateRange]);

    const handleDateSelect = (range) => {
        setDateRange(range);
        setIsDropdownOpen(false);
        // Note: Real filtering logic would happen here based on 'range'
    };

    return (
        <div className="pt-6 px-12 pb-12 animate-in fade-in duration-500">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Dashboard</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Overview</p>
                </div>
                <div className="flex items-center gap-3 relative">
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 bg-white border border-slate-200 px-6 h-[48px] rounded-2xl text-sm font-bold text-[#334155] shadow-sm cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <span className="min-w-[80px]">{dateRange}</span>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full right-16 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-2 animate-in slide-in-from-top-2 duration-200">
                            {['Last 24 hours', 'Last 7 days', 'Last 30 days', 'All time'].map((range) => (
                                <div
                                    key={range}
                                    onClick={() => handleDateSelect(range)}
                                    className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors ${dateRange === range ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {range}
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={fetchDashboardData}
                        className="bg-white border border-slate-200 w-[48px] h-[48px] flex items-center justify-center rounded-2xl text-[#64748B] shadow-sm hover:bg-slate-50 transition-all active:rotate-180 duration-500 group"
                    >
                        <RotateCcw size={20} className={isRefreshing ? 'animate-spin' : 'group-hover:text-blue-600'} />
                    </button>
                </div>
            </header>

            {/* Real Stat Cards */}
            <div className={`grid grid-cols-4 gap-6 mb-10 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
                <StatCard title="SENT" value={displayStats.sent} color="text-emerald-500" />
                <StatCard title="DELIVERED" value={displayStats.del} />
                <StatCard title="FAILED" value={displayStats.fail} color="text-rose-500" />
                <StatCard title="PENDING" value={displayStats.pend} />
            </div>

            <div className={`grid grid-cols-3 gap-8 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
                {/* Real-Data LineChart */}
                <div className="col-span-2 bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm">
                    <h3 className="text-[#1E293B] font-bold text-xs tracking-widest uppercase mb-10">Real-Time Channel Delivery</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentChart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} axisLine={false} tickLine={false} dy={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="email" stroke="#3B82F6" strokeWidth={4} dot={false} />
                                <Line type="monotone" dataKey="sms" stroke="#10B981" strokeWidth={4} dot={false} />
                                <Line type="monotone" dataKey="push" stroke="#8B5CF6" strokeWidth={4} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Real-Data Activity Feed */}
                <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm space-y-10">
                    <h3 className="text-[#1E293B] font-bold text-xs tracking-widest uppercase">Live Activity Feed</h3>
                    {activityFeed.length > 0 ? activityFeed.map((item) => (
                        <ActivityRow
                            key={item._id}
                            icon={item.channels?.includes('Email') ? <Mail size={20} /> : <MessageSquare size={20} />}
                            title={`${item.type} → ${item.recipient.substring(0, 15)}...`}
                            status={item.status === 'sent' ? 'Delivered' : item.status}
                            sColor={item.status === 'sent' ? "text-emerald-500" : "text-amber-500"}
                        />
                    )) : (
                        <p className="text-xs font-bold text-slate-400 uppercase text-center py-20">No recent activity</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 2. COMPOSE VIEW: VERIFIED DYNAMIC PREVIEWS & CHANNELS ---
const ComposeView = ({ triggerToast }) => {
    const typeConfig = {
        OTP: { subject: 'Your OTP for login', attempts: 3, priority: 'High', pLabel: '1 — High', pColor: 'text-rose-500' },
        Transactional: { subject: 'Your order has been confirmed', attempts: 3, priority: 'Medium', pLabel: '2 — Medium', pColor: 'text-amber-500' },
        Promotional: { subject: 'Special offer just for you', attempts: 1, priority: 'Low', pLabel: '3 — Low', pColor: 'text-emerald-500' },
        Alert: { subject: 'Action required on your account', attempts: 2, priority: 'High', pLabel: '1 — High', pColor: 'text-rose-500' }
    };

    const priorityStyles = {
        High: { btn: 'bg-rose-50 border-rose-200 text-rose-600', text: 'text-rose-500', label: '1 — High' },
        Medium: { btn: 'bg-amber-50 border-amber-200 text-amber-600', text: 'text-amber-500', label: '2 — Medium' },
        Low: { btn: 'bg-emerald-50 border-emerald-200 text-emerald-600', text: 'text-emerald-500', label: '3 — Low' }
    };

    const [type, setType] = useState('OTP');
    const [channels, setChannels] = useState(['Email', 'SMS']);
    const [priority, setPriority] = useState('High');
    const [subject, setSubject] = useState(typeConfig.OTP.subject);
    const [body, setBody] = useState('Your OTP is 482910. Valid for 10 minutes. Do not share with anyone.');
    const [sendOpt, setSendOpt] = useState('now');

    // States for interactive Date and Time
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('10:00');
    const [recipient, setRecipient] = useState('');

    const handleSend = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://notification-engine-wdmj.onrender.com/api/notifications/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type, channels, recipient, subject, body, priority })
            });
            const data = await response.json();
            if (response.ok) triggerToast('Notification queued successfully', 'success');
            else triggerToast(data.message, 'error');
        } catch (err) {
            triggerToast('Backend not reachable', 'error');
        }
    };

    const handleTypeChange = (t) => {
        setType(t);
        setSubject(typeConfig[t].subject);
    };

    return (
        <div className="p-12 animate-in fade-in duration-500 max-w-6xl mx-auto space-y-6">
            <header className="mb-10"><h1 className="text-3xl font-bold text-[#1E293B]">Compose new notification</h1></header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Notification details</h3>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-tighter">Notification type</label>
                            <div className="flex flex-wrap gap-2">
                                {['OTP', 'Transactional', 'Promotional', 'Alert'].map(t => (
                                    <button key={t} onClick={() => handleTypeChange(t)}
                                        className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${type === t ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-tighter">Send via</label>
                            <div className="flex gap-2">
                                {['Email', 'SMS', 'Push'].map(c => (
                                    <button key={c} onClick={() => setChannels(prev => prev.includes(c) ? prev.filter(i => i !== c) : [...prev, c])}
                                        className={`px-6 py-2 rounded-full text-xs font-bold border transition-all ${channels.includes(c) ? 'bg-slate-100 text-[#1E293B] border-slate-300' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}>
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tighter">
                                Recipients
                            </label>
                            <textarea
                                id="recipient"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="Enter email addresses or phone numbers, comma separated"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-sans"
                                style={{ minHeight: '60px' }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tighter">Subject line</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-sans" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tighter">Message body</label>
                            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none font-sans" rows="3" />
                            <p className="text-[10px] text-right text-slate-400 font-bold uppercase mt-2">{body.length} / 160 characters</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-tighter">Priority</label>
                            <div className="flex gap-3">
                                {['High', 'Medium', 'Low'].map(p => (
                                    <button key={p} onClick={() => setPriority(p)}
                                        className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition-all uppercase tracking-tight ${priority === p ? priorityStyles[p].btn : 'bg-white border-slate-200 text-slate-400'}`}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-4 uppercase tracking-tighter">Send options</label>
                            <div className="flex gap-8 mb-4">
                                <label className="flex items-center gap-3 cursor-pointer font-bold text-slate-600"><input type="radio" checked={sendOpt === 'now'} onChange={() => setSendOpt('now')} className="accent-blue-600 w-4 h-4" /> Send now</label>
                                <label className="flex items-center gap-3 cursor-pointer font-bold text-slate-600"><input type="radio" checked={sendOpt === 'schedule'} onChange={() => setSendOpt('schedule')} className="accent-blue-600 w-4 h-4" /> Schedule</label>
                            </div>
                            {sendOpt === 'schedule' && (
                                <div className="flex gap-3 animate-in slide-in-from-top-2 duration-300">
                                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 text-sm flex items-center gap-3">
                                        <Calendar size={16} className="text-slate-400" />
                                        <input
                                            type="date"
                                            value={scheduleDate}
                                            onChange={(e) => setScheduleDate(e.target.value)}
                                            className="bg-transparent outline-none w-full cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 text-sm font-medium flex items-center justify-between">
                                        <div className="flex items-center gap-3 w-full">
                                            <Clock size={16} className="text-slate-400" />
                                            <input
                                                type="time"
                                                value={scheduleTime}
                                                onChange={(e) => setScheduleTime(e.target.value)}
                                                className="bg-transparent outline-none w-full cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button className="flex-1 py-4 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all font-sans">Preview</button>
                            <button
                                onClick={handleSend}
                                className="flex-1 py-4 rounded-2xl bg-[#0F172A] text-white text-sm font-bold hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2 font-sans transition-all">
                                Send now <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Email Preview</h3>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Subject</div>
                        <div className="text-sm font-bold text-[#1E293B] mb-4">{subject}</div>
                        <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-600 leading-relaxed min-h-[100px]">{body}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">SMS Preview</h3>
                        <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-600 italic leading-relaxed font-sans">[YourApp] {body}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-4 text-sm font-sans font-bold">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Queue Config</h3>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-400 font-medium">Attempts</span><span className="text-[#1E293B] font-black">{typeConfig[type].attempts}</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-400 font-medium">Priority</span><span className={`${priorityStyles[priority].text} font-black uppercase`}>{priorityStyles[priority].label}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400 font-medium">Delivery</span><span className="text-[#1E293B] font-black uppercase">{sendOpt === 'now' ? 'Immediate' : 'Scheduled'}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. ANALYTICS VIEW: CONNECTED TO REAL MONGODB LOGS ---

// --- 3. ANALYTICS VIEW: FULLY FUNCTIONAL FILTERING & CUSTOM UI ---
const AnalyticsView = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter State - Professional Object mapping
    const [filters, setFilters] = useState({
        channel: 'All Channels',
        status: 'All Status',
        type: 'All Types'
    });

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('https://notification-engine-wdmj.onrender.com/api/notifications');
                const data = await response.json();
                setLogs(data);
                setFilteredLogs(data); // Default view shows everything
                setLoading(false);
            } catch (err) {
                console.error("Cluster Sync Error:", err);
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    // Filter Logic: Runs when "Apply Filters" is clicked
    const handleApplyFilters = () => {
        let results = [...logs];

        if (filters.channel !== 'All Channels') {
            results = results.filter(log => log.channels?.includes(filters.channel));
        }
        if (filters.status !== 'All Status') {
            results = results.filter(log => log.status?.toLowerCase() === filters.status.toLowerCase());
        }
        if (filters.type !== 'All Types') {
            results = results.filter(log => log.type === filters.type);
        }

        setFilteredLogs(results);
    };

    return (
        <div className="p-12 animate-in fade-in duration-500 space-y-8 max-w-[1600px] mx-auto">
            <header className="px-2">
                <h1 className="text-3xl font-bold text-[#0F172A] uppercase tracking-tight font-sans">Logs & Analytics</h1>
            </header>

            {/* FILTER SECTION: Pinterest-style Custom Dropdowns */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex items-center gap-4 z-[50]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">Filter section</span>

                <FilterDropdown
                    label={filters.channel}
                    options={['All Channels', 'Email', 'SMS', 'Push']}
                    onSelect={(val) => setFilters({ ...filters, channel: val })}
                />

                <FilterDropdown
                    label={filters.status}
                    options={['All Status', 'Sent', 'Failed', 'Queued']}
                    onSelect={(val) => setFilters({ ...filters, status: val })}
                />

                <FilterDropdown
                    label={filters.type}
                    options={['All Types', 'OTP', 'Transactional', 'Promotional', 'Alert']}
                    onSelect={(val) => setFilters({ ...filters, type: val })}
                />

                <button
                    onClick={handleApplyFilters}
                    className="bg-[#0F172A] text-white px-8 py-3 rounded-2xl text-xs font-black uppercase ml-auto hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                    Apply Filters
                </button>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm overflow-hidden min-h-[400px]">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 font-sans px-2">Complete Delivery Log table</h3>

                {loading ? (
                    <div className="text-center py-20 font-bold text-slate-300 animate-pulse uppercase text-xs tracking-widest">Synchronizing Cluster...</div>
                ) : filteredLogs.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 font-bold uppercase text-xs">No logs found matching these filters.</div>
                ) : (
                    <table className="w-full text-left text-xs uppercase font-bold text-slate-400 font-sans tracking-tight">
                        <thead className="border-b border-slate-50">
                            <tr>
                                <th className="pb-4 px-2">ID</th>
                                <th className="pb-4 px-2">Recipient</th>
                                <th className="pb-4 px-2">Type</th>
                                <th className="pb-4 px-2">Channel</th>
                                <th className="pb-4 px-2">Status</th>
                                <th className="pb-4 px-2">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredLogs.map((log) => (
                                <tr key={log._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-5 px-2 text-blue-500 font-mono tabular-nums">{log._id.substring(0, 8)}...</td>
                                    <td className="py-5 px-2 text-slate-700 font-black max-w-[250px] truncate">{log.recipient}</td>
                                    <td className="py-5 px-2 text-slate-500">{log.type}</td>
                                    <td className="py-5 px-2 text-slate-400 group-hover:text-slate-600">{log.channels?.join(', ')}</td>
                                    <td className={`py-5 px-2 font-black ${log.status === 'sent' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {log.status || 'queued'}
                                    </td>
                                    <td className="py-5 px-2 text-slate-400 font-medium lowercase">
                                        {new Date(log.createdAt).toLocaleTimeString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="flex justify-end gap-3 mt-8">
                    <button className="px-5 py-2 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase">Load More</button>
                    <button className="px-5 py-2 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
                        <Download size={14} /> Export to CSV
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- HELPER COMPONENT: CUSTOM DROPDOWN ---
// Put this below AnalyticsView but above App
const FilterDropdown = ({ label, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl text-[11px] text-slate-600 font-black uppercase transition-all hover:bg-white hover:border-blue-200 hover:shadow-sm"
            >
                {label} <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                        {options.map((opt) => (
                            <div
                                key={opt}
                                onClick={() => { onSelect(opt); setIsOpen(false); }}
                                className="px-4 py-2 text-[10px] font-black text-slate-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer uppercase transition-colors"
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// --- 4. QUEUE MONITOR VIEW: VERIFIED LIVE PULSE ---
const QueueMonitorView = () => {
    const [metrics, setMetrics] = useState({ queued: 0, processing: 0, completed: 0, failed: 0 });
    const [recentJobs, setRecentJobs] = useState([]);

    const fetchQueueStats = async () => {
        try {
            const response = await fetch('https://notification-engine-wdmj.onrender.com/api/notifications');
            const data = await response.json();

            // Calculate real-time metrics based on database statuses
            const stats = {
                queued: data.filter(j => j.status === 'queued').length,
                processing: data.filter(j => j.status === 'processing').length,
                completed: data.filter(j => j.status === 'sent').length,
                failed: data.filter(j => j.status === 'failed').length
            };

            setMetrics(stats);
            setRecentJobs(data.slice(0, 5)); // Show only the 5 most recent jobs
        } catch (err) {
            console.error("Queue Monitor Fetch Error:", err);
        }
    };

    useEffect(() => {
        fetchQueueStats();
        // Poll every 5 seconds to show "Live" movement
        const intervalId = setInterval(fetchQueueStats, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="p-12 animate-in fade-in duration-500 space-y-8 max-w-6xl mx-auto font-sans">
            <header className="flex justify-between items-center px-2">
                <div>
                    <h1 className="text-2xl font-bold text-[#1E293B]">Queue Monitor</h1>
                    <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider opacity-60">
                        Live Database State • Cluster Port 5000
                    </p>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 text-[11px] font-black uppercase tracking-widest">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Live
                </div>
            </header>

            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Queued</p>
                    <h4 className="text-3xl font-black text-amber-500">{metrics.queued}</h4>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Processing</p>
                    <h4 className="text-3xl font-black text-blue-500">{metrics.processing}</h4>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Completed</p>
                    <h4 className="text-3xl font-black text-emerald-500">{metrics.completed}</h4>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Failed</p>
                    <h4 className="text-3xl font-black text-rose-500">{metrics.failed}</h4>
                </div>
            </div>

            {/* Recent Jobs Table */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm overflow-hidden">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 px-2">Live Job Stream</h3>
                <table className="w-full text-left text-xs uppercase font-bold text-slate-400 tracking-tight">
                    <thead className="border-b border-slate-50">
                        <tr>
                            <th className="pb-4 px-2">Job ID</th>
                            <th className="pb-4 px-2">Type</th>
                            <th className="pb-4 px-2">Recipient</th>
                            <th className="pb-4 px-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[13px]">
                        {recentJobs.map((job) => (
                            <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-2 font-mono text-slate-400">{job._id.substring(0, 6)}</td>
                                <td className="py-4 px-2 text-slate-700 font-bold">{job.type}</td>
                                <td className="py-4 px-2 text-slate-500">{job.recipient}</td>
                                <td className="py-4 px-2">
                                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-black ${job.status === 'sent' ? 'bg-emerald-50 text-emerald-600' :
                                            job.status === 'failed' ? 'bg-rose-50 text-rose-600' :
                                                'bg-blue-50 text-blue-600'
                                        }`}>
                                        {job.status || 'queued'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- 5. USER PREFERENCES VIEW: FULLY FUNCTIONAL WITH PROTECTED UI ---
const UserPreferencesView = () => {
    const [showToast, setShowToast] = useState(false);

    // Unified state to mirror your exact UI toggles
    const [prefs, setPrefs] = useState({
        email: true,
        sms: true,
        push: false,
        orders: true,
        promo: false,
        updates: true,
        quietMode: true,
        startTime: "22:00",
        endTime: "07:00"
    });

    // Fetch existing settings on load without shifting the layout
    useEffect(() => {
        const fetchCurrentPrefs = async () => {
            try {
                const response = await fetch('https://notification-engine-wdmj.onrender.com/api/preferences');
                if (response.ok) {
                    const data = await response.json();
                    setPrefs(data);
                }
            } catch (err) {
                console.log("Using local state (Backend cluster offline)");
            }
        };
        fetchCurrentPrefs();
    }, []);

    const handleSave = async () => {
        try {
            await fetch('https://notification-engine-wdmj.onrender.com/api/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prefs)
            });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            console.error("Connection lost during save");
        }
    };

    const getSummaryText = () => {
        const activeChans = [
            prefs.email && 'EMAIL',
            prefs.sms && 'SMS',
            prefs.push && 'PUSH'
        ].filter(Boolean).join(' and ');

        return `Receiving ${prefs.orders ? 'order, ' : ''}${prefs.promo ? 'promo, ' : ''}${prefs.updates ? 'product ' : ''}updates via ${activeChans || 'No Channels'}. Quiet hours ${prefs.quietMode ? `${prefs.startTime}–${prefs.endTime}` : 'Disabled'}. Max 5 notifications/day.`;
    };

    return (
        <div className="p-12 animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8 font-sans">
            <header className="px-2">
                <h1 className="text-2xl font-bold text-[#1E293B]">User preferences</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium tracking-tight">Per-user notification control panel</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm space-y-10">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Channels</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <ChannelCardFunctional
                                icon="✉"
                                name="Email"
                                active={prefs.email}
                                onClick={() => setPrefs(p => ({ ...p, email: !p.email }))}
                            />
                            <ChannelCardFunctional
                                icon="💬"
                                name="SMS"
                                active={prefs.sms}
                                onClick={() => setPrefs(p => ({ ...p, sms: !p.sms }))}
                            />
                            <ChannelCardFunctional
                                icon="🔔"
                                name="Push"
                                active={prefs.push}
                                onClick={() => setPrefs(p => ({ ...p, push: !p.push }))}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Notification types</h3>
                        <ToggleRow label="OTP & security alerts" sub="Always on — cannot be disabled" active disabled />
                        <ToggleRow
                            label="Order updates"
                            sub="Shipping, delivery, status changes"
                            active={prefs.orders}
                            onClick={() => setPrefs(p => ({ ...p, orders: !p.orders }))}
                        />
                        <ToggleRow
                            label="Promotions"
                            sub="Offers, discounts, campaigns"
                            active={prefs.promo}
                            onClick={() => setPrefs(p => ({ ...p, promo: !p.promo }))}
                        />
                        <ToggleRow
                            label="Product updates"
                            sub="New features and announcements"
                            active={prefs.updates}
                            onClick={() => setPrefs(p => ({ ...p, updates: !p.updates }))}
                        />
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Quiet hours</h3>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                            <div className="font-sans font-black uppercase text-xs text-slate-700 tracking-tight">Enable quiet hours</div>
                            <div
                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${prefs.quietMode ? 'bg-blue-500' : 'bg-slate-200'}`}
                                onClick={() => setPrefs(p => ({ ...p, quietMode: !p.quietMode }))}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${prefs.quietMode ? 'right-1' : 'left-1'}`} />
                            </div>
                        </div>
                        <div className={`space-y-4 transition-opacity duration-300 ${prefs.quietMode ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                            <div className="flex items-center gap-4 text-xs font-black uppercase text-slate-400">
                                <span className="w-12">From</span>
                                <input
                                    type="time"
                                    value={prefs.startTime}
                                    onChange={(e) => setPrefs(p => ({ ...p, startTime: e.target.value }))}
                                    className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl outline-none text-slate-700 font-sans"
                                />
                            </div>
                            <div className="flex items-center gap-4 text-xs font-black uppercase text-slate-400">
                                <span className="w-12">To</span>
                                <input
                                    type="time"
                                    value={prefs.endTime}
                                    onChange={(e) => setPrefs(p => ({ ...p, endTime: e.target.value }))}
                                    className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl outline-none text-slate-700 font-sans"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm space-y-8">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Summary</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-bold italic opacity-80">"{getSummaryText()}"</p>
                        <button onClick={handleSave} className="w-full py-4 bg-[#0F172A] rounded-[1.5rem] text-sm font-black text-white hover:bg-slate-800 shadow-xl flex items-center justify-center gap-3 font-sans transition-all active:scale-95 uppercase tracking-widest">
                            Save preferences <CheckCircle size={18} />
                        </button>
                        {showToast && <div className="text-emerald-600 text-xs font-black uppercase text-center animate-pulse">✓ Preferences saved successfully!</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- UNIVERSAL REUSABLE HELPERS ---
const NavItem = ({ icon, label, active, onClick }) => (
    <div onClick={onClick} className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 group ${active ? 'bg-blue-50 text-blue-600 font-black shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
        <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>{icon}</div>
        <span className="text-[15px] tracking-tight">{label}</span>
    </div>
);

const StatCard = ({ title, value, change, sub, color }) => (
    <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default">
        <p className="text-[10px] font-black text-slate-400 tracking-[0.15em] mb-4 uppercase">{title}</p>
        <h4 className="text-4xl font-black text-[#0F172A] mb-1 font-sans">{value}</h4>
        <div className="flex items-center gap-2">
            {change && <span className={`text-xs font-black ${color} tracking-tight`}>{change}</span>}
            {sub && <span className="text-xs text-slate-400 font-bold tabular-nums tracking-tighter">{sub}</span>}
        </div>
    </div>
);

const ActivityRow = ({ icon, title, status, sColor }) => (
    <div className="flex gap-5 group cursor-default transition-all duration-300">
        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all shadow-sm">
            {icon}
        </div>
        <div className="flex flex-col justify-center">
            <h5 className="text-[15px] font-black text-[#1E293B] group-hover:text-blue-600 transition-colors tracking-tight font-sans">{title}</h5>
            <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">
                Status: <span className={`${sColor} font-black`}>{status}</span>
            </p>
        </div>
    </div>
);

const HealthBarVerbose = ({ label, val, color, count }) => (
    <div className="flex items-center gap-6 text-xs font-black font-sans group">
        <span className="text-slate-400 w-24 uppercase tracking-tighter group-hover:text-slate-600 transition-colors">{label}</span>
        <div className="flex-1 bg-slate-50 border border-slate-100 h-3.5 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full ${color} transition-all duration-1000 ease-out shadow-sm`} style={{ width: `${val}%` }} />
        </div>
        <span className="text-slate-700 w-10 text-right tabular-nums uppercase">{count}</span>
    </div>
);

const ToggleRow = ({ label, sub, active = false, disabled = false, onClick }) => (
    <div className={`flex justify-between items-center py-4 border-b border-slate-50 last:border-0 ${disabled ? 'opacity-60' : ''}`}>
        <div>
            <p className="text-sm font-black text-slate-700 uppercase tracking-tighter">{label}</p>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight italic">{sub}</p>
        </div>
        <div
            className={`w-10 h-5 rounded-full relative shadow-inner transition-colors duration-300 ${active ? 'bg-blue-500' : 'bg-slate-200'} ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={!disabled ? onClick : null}
        >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${active ? 'right-1' : 'left-1'}`} />
        </div>
    </div>
);

const ChannelCardFunctional = ({ icon, name, active, onClick }) => (
    <div onClick={onClick} className={`p-6 border rounded-2xl text-center shadow-sm transition-all cursor-pointer ${active ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-white hover:bg-slate-50'}`}>
        <div className="text-xl mb-2">{icon}</div>
        <div className={`text-xs font-black uppercase ${active ? 'text-blue-600' : 'text-slate-700'}`}>{name}</div>
        <div className={`text-[10px] font-bold uppercase mt-1 ${active ? 'text-blue-400' : 'text-slate-400'}`}>{active ? 'Enabled' : 'Disabled'}</div>
    </div>
);

export default App;

const AuthPage = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [emailSent, setEmailSent] = useState(false); // Track if recovery email was "sent"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`https://notification-engine-wdmj.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                onLoginSuccess();
            }
            else {
                const data = await response.json();
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Infrastructure offline: Backend not reachable");
        }
    };
   useEffect(() => {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
        window.google.accounts.id.initialize({
            client_id: '1091954939952-vl37plq92jukaa02l21rotvhv7eofpfr.apps.googleusercontent.com',
            callback: async (response) => {
                try {
                    const res = await fetch('https://notification-engine-wdmj.onrender.com/api/auth/google', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ credential: response.credential })
                    });
                    const data = await res.json();
                    if (res.ok) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userEmail', data.email);
                        onLoginSuccess();
                    } else {
                        setError(data.message || 'Google login failed');
                    }
                } catch (err) {
                    setError('Google auth failed — backend unreachable');
                }
            }
        });
        window.google.accounts.id.renderButton(
            document.getElementById('google-signin-btn'),
            { theme: 'outline', size: 'large', width: 400 } // ✅ fixed pixel width
        );
    };
}, []);
   
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
            {/* NAVBAR */}
            <header className="sticky top-0 w-full bg-[#1E40AF] px-8 py-5 flex items-center justify-between z-50 shadow-lg">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                        Notification Engine
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <p className="text-xs text-blue-200 font-bold tracking-widest uppercase">Engine Cluster • Live</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl text-blue-200 border border-white/20 hover:bg-white/10 hover:text-white transition-all">
                        <Settings size={19} />
                    </button>
                    <button className="p-2.5 rounded-xl text-blue-200 border border-white/20 hover:bg-white/10 hover:text-white transition-all">
                        <User size={19} />
                    </button>
                </div>
            </header>

            <div className="flex w-full max-w-6xl mx-auto flex-1 items-center">

                {/* LEFT SIDE: DASHBOARD PREVIEW */}
                <div className="hidden lg:flex w-[45%] bg-slate-50 border-r border-slate-100 flex-col p-10 pt-8 justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-10">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Bell size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">Notify<span className="text-blue-600">Engine</span></span>
                        </div>

                        <h1 className="text-5xl font-extrabold leading-tight mb-6">
                            Built for <span className="text-blue-600">scale.</span><br />
                            Designed for speed.
                        </h1>
                        <p className="text-slate-500 text-lg max-w-sm">
                            Real-time notification infrastructure for modern engineering teams.
                        </p>
                    </div>

                    <div className="space-y-4 max-w-xs">
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <Send size={16} />
                                </div>
                                <span className="font-semibold text-slate-600 text-sm">Delivered today</span>
                            </div>
                            <span className="text-md font-bold tabular-nums">1,240</span>
                        </div>

                        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span className="font-semibold text-slate-600 text-sm">Delivery rate</span>
                            </div>
                            <span className="text-md font-bold text-emerald-600 tabular-nums">99.9%</span>
                        </div>

                        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                                    <Zap size={16} />
                                </div>
                                <span className="font-semibold text-slate-600 text-sm">Avg. Latency</span>
                            </div>
                            <span className="text-md font-bold text-amber-600 tabular-nums">45ms</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Cluster Online</span>
                    </div>
                </div>

                {/* RIGHT SIDE: AUTH FORM */}
                <div className="w-full lg:w-[55%] flex items-center justify-center p-10 pt-8">
                    <div className="max-w-md w-full">

                        {/* Header Section */}
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold mb-2">
                                {emailSent ? 'Check your email' : isForgot ? 'Reset password' : isLogin ? 'Sign in' : 'Create account'}
                            </h2>
                            <p className="text-slate-500">
                                {emailSent
                                    ? "We've sent a recovery link to your inbox."
                                    : isForgot
                                        ? "Enter your email to receive a recovery link"
                                        : "Enter your credentials to access the dashboard"}
                            </p>
                        </div>

                        {!isForgot ? (
                            /* LOGIN / REGISTER VIEW */
                            <>
                                <div className="flex border-b border-slate-100 mb-8">
                                    <button onClick={() => setIsLogin(true)} className={`pb-4 px-6 text-sm font-bold transition-all border-b-2 ${isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}>Sign in</button>
                                    <button onClick={() => setIsLogin(false)} className={`pb-4 px-6 text-sm font-bold transition-all border-b-2 ${!isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}>Create account</button>
                                </div>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    {!isLogin && (
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Full Name</label>
                                            <input type="text" placeholder="Jane Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-sans" />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
                                        <input type="email" placeholder="you@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-sans" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                                            <button type="button" onClick={() => setIsForgot(true)} className="text-xs font-bold text-blue-600 hover:underline">Forgot?</button>
                                        </div>
                                        <div className="relative">
                                            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all pr-12 font-sans" />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2">
                                        {isLogin ? 'Sign in to Dashboard' : 'Get Started'}
                                    </button>

                                    <div className="flex items-center gap-3 my-2">
                                        <div className="flex-1 h-px bg-slate-100" />
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
                                        <div className="flex-1 h-px bg-slate-100" />
                                    </div>
                                    <div id="google-signin-btn" className="w-full"></div>
                                </form>
                            </>
                        ) : !emailSent ? (
                            /* FORGOT PASSWORD FORM */
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Registered Email</label>
                                        <input type="email" placeholder="you@company.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-sans" />
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Send Recovery Link</button>
                                    <button type="button" onClick={() => setIsForgot(false)} className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-all">← Back to login</button>
                                </form>
                            </div>
                        ) : (
                            /* SUCCESS STATE */
                            <div className="text-center py-4 animate-in zoom-in-95 duration-300">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">Email sent!</h3>
                                <p className="text-slate-500 text-sm mb-8">If an account exists for that email, you will receive a reset link shortly.</p>
                                <button onClick={() => { setIsForgot(false); setEmailSent(false); }} className="w-full py-4 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">Return to sign in</button>
                            </div>
                        )}

                        {!isForgot && (
                            <p className="mt-8 text-center text-sm text-slate-400">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button onClick={() => setIsLogin(!isLogin)} className="ml-1 font-bold text-blue-600 hover:underline">
                                    {isLogin ? 'Register here' : 'Login here'}
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
