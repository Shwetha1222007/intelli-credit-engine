import { useState, useEffect } from 'react'
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import {
    TrendingUp, TrendingDown, Clock, CheckCircle, XCircle,
    AlertTriangle, Activity, FileText, Search, Brain,
    ArrowRight, Zap, Shield, Users, Database, BarChart2
} from 'lucide-react'

const approvalTrendData = [
    { month: 'Sep', approved: 42, rejected: 18, pending: 12 },
    { month: 'Oct', approved: 48, rejected: 14, pending: 15 },
    { month: 'Nov', approved: 38, rejected: 22, pending: 10 },
    { month: 'Dec', approved: 55, rejected: 10, pending: 20 },
    { month: 'Jan', approved: 61, rejected: 16, pending: 18 },
    { month: 'Feb', approved: 67, rejected: 12, pending: 22 },
    { month: 'Mar', approved: 72, rejected: 9, pending: 25 },
]

const sectorData = [
    { name: 'Manufacturing', value: 28, color: '#2541b2' },
    { name: 'Infrastructure', value: 22, color: '#f5a623' },
    { name: 'Retail & FMCG', value: 18, color: '#00d98b' },
    { name: 'IT & Services', value: 16, color: '#8b5cf6' },
    { name: 'Real Estate', value: 10, color: '#ff4d6d' },
    { name: 'Others', value: 6, color: '#06b6d4' },
]

const recentApplications = [
    { id: 'IC-2024-0892', company: 'Tata Motors Ltd', amount: '₹850 Cr', score: 78, risk: 'Low', status: 'Approved', sector: 'Automotive' },
    { id: 'IC-2024-0891', company: 'Piramal Pharma', amount: '₹320 Cr', score: 65, risk: 'Medium', status: 'Under Review', sector: 'Pharma' },
    { id: 'IC-2024-0890', company: 'Adani Ports', amount: '₹1200 Cr', score: 82, risk: 'Low', status: 'Approved', sector: 'Logistics' },
    { id: 'IC-2024-0889', company: 'Reliance Retail', amount: '₹500 Cr', score: 45, risk: 'High', status: 'Rejected', sector: 'Retail' },
    { id: 'IC-2024-0888', company: 'Mahindra Agri', amount: '₹180 Cr', score: 71, risk: 'Low', status: 'Approved', sector: 'Agriculture' },
]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', padding: '10px 14px', fontSize: '12px'
            }}>
                <p style={{ color: '#8892b0', marginBottom: '4px', fontWeight: 600 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, fontWeight: 600 }}>
                        {p.name}: <span style={{ color: '#f0f4ff' }}>{p.value}</span>
                    </p>
                ))}
            </div>
        )
    }
    return null
}

export default function Dashboard({ setCurrentPage }) {
    const [animateStats, setAnimateStats] = useState(false)

    useEffect(() => {
        setTimeout(() => setAnimateStats(true), 100)
    }, [])

    const getRiskStyle = (risk) => {
        const map = { 'Low': 'risk-low', 'Medium': 'risk-medium', 'High': 'risk-high' }
        return map[risk] || 'risk-medium'
    }

    const getStatusStyle = (status) => {
        const map = { 'Approved': 'badge-emerald', 'Rejected': 'badge-ruby', 'Under Review': 'badge-gold' }
        return map[status] || 'badge-gray'
    }

    return (
        <div>
            {/* Hero Banner */}
            <div className="hero-banner">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span className="badge badge-blue">🤖 AI-Powered</span>
                        <span className="badge badge-emerald">RBI Basel III Compliant</span>
                        <span className="badge badge-gold">CIBIL Integrated</span>
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '10px' }}>
                        Intelli-Credit Command Center
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '14px' }}>
                        AI-powered credit decisioning engine reducing appraisal time from <strong style={{ color: 'var(--accent-gold)' }}>3-4 weeks to under 30 minutes</strong> with 94.2% prediction accuracy and full explainability.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <button className="btn btn-primary" onClick={() => setCurrentPage('ingestion')}>
                            <Zap size={15} /> Start New Assessment
                        </button>
                        <button className="btn btn-secondary" onClick={() => setCurrentPage('tracker')}>
                            <Activity size={15} /> View Pipeline
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="stats-grid">
                {[
                    { color: 'blue', icon: '📋', value: animateStats ? '1,247' : '0', label: 'Total Applications', change: '+18.3%', dir: 'up' },
                    { color: 'emerald', icon: '✅', value: animateStats ? '847' : '0', label: 'Approved Loans', change: '+12.7%', dir: 'up' },
                    { color: 'ruby', icon: '⚡', value: animateStats ? '28 min', label: 'Avg Appraisal Time', change: '↓ 96% faster', dir: 'up' },
                    { color: 'gold', icon: '🎯', value: animateStats ? '94.2%', label: 'Model Accuracy', change: '+2.1% MoM', dir: 'up' },
                    { color: 'violet', icon: '💰', value: animateStats ? '₹47,320 Cr', label: 'Portfolio Managed', change: '+₹3,200 Cr', dir: 'up' },
                    { color: 'cyan', icon: '🛡️', value: animateStats ? '0.8%', label: 'NPA Rate', change: '−0.3% YoY', dir: 'up' },
                ].map((s, i) => (
                    <div className={`stat-card ${s.color}`} key={i}>
                        <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                        <div className="stat-info">
                            <div className="stat-value" style={{ fontSize: s.value.length > 8 ? '18px' : '24px' }}>{s.value || '—'}</div>
                            <div className="stat-label">{s.label}</div>
                            <div className={`stat-change ${s.dir}`}>
                                <TrendingUp size={11} /> {s.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid-2" style={{ marginBottom: '28px' }}>
                {/* Approval Trend */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Credit Decision Trend</div>
                            <div className="card-subtitle">Monthly approval / rejection breakdown</div>
                        </div>
                        <span className="badge badge-blue">Last 7 Months</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={approvalTrendData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00d98b" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#00d98b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff4d6d" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="approved" name="Approved" stroke="#00d98b" strokeWidth={2} fill="url(#colorApproved)" />
                            <Area type="monotone" dataKey="rejected" name="Rejected" stroke="#ff4d6d" strokeWidth={2} fill="url(#colorRejected)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Sector Distribution */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Sector Exposure</div>
                            <div className="card-subtitle">Portfolio concentration by industry</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <ResponsiveContainer width={160} height={160}>
                            <PieChart>
                                <Pie data={sectorData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                                    {sectorData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ flex: 1 }}>
                            {sectorData.map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: '12px', flex: 1 }}>{s.name}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: s.color }}>{s.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Modules Status */}
            <div className="card" style={{ marginBottom: '28px' }}>
                <div className="card-header">
                    <div>
                        <div className="card-title">AI Module Status</div>
                        <div className="card-subtitle">Real-time health of all engine components</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent-emerald)' }}>
                        <div className="status-dot" /> All Systems Operational
                    </div>
                </div>
                <div className="grid-4">
                    {[
                        { name: 'OCR Engine', status: 'Active', load: 72, icon: '📄', color: 'blue' },
                        { name: 'NLP Processor', status: 'Active', load: 58, icon: '🧠', color: 'violet' },
                        { name: 'Research Crawler', status: 'Active', load: 45, icon: '🌐', color: 'cyan' },
                        { name: 'ML Decision Model', status: 'Active', load: 88, icon: '⚡', color: 'gold' },
                        { name: 'CIBIL Connector', status: 'Active', load: 30, icon: '🔗', color: 'emerald' },
                        { name: 'CAM Generator', status: 'Active', load: 25, icon: '📑', color: 'blue' },
                        { name: 'Anomaly Detector', status: 'Active', load: 62, icon: '🛡️', color: 'ruby' },
                        { name: 'MCA Fetcher', status: 'Standby', load: 10, icon: '🏛️', color: 'gray' },
                    ].map((m, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)',
                            borderRadius: 'var(--radius-md)', padding: '14px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '18px' }}>{m.icon}</span>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{m.name}</div>
                                    <div style={{ fontSize: '11px', color: m.status === 'Active' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>{m.status}</div>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <div className={`progress-fill ${m.color}`} style={{ width: `${m.load}%` }} />
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', textAlign: 'right' }}>{m.load}% load</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Applications */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-title">Recent Applications</div>
                        <div className="card-subtitle">Latest credit assessments processed by AI</div>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('tracker')}>
                        View All <ArrowRight size={13} />
                    </button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Company</th>
                            <th>Sector</th>
                            <th>Loan Amount</th>
                            <th>AI Credit Score</th>
                            <th>Risk Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentApplications.map((app, i) => (
                            <tr key={i}>
                                <td><code style={{ fontSize: '12px', color: 'var(--primary-200)' }}>{app.id}</code></td>
                                <td><span style={{ fontWeight: 600 }}>{app.company}</span></td>
                                <td><span className="badge badge-gray">{app.sector}</span></td>
                                <td><span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{app.amount}</span></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div className="progress-bar" style={{ width: '60px', height: '4px' }}>
                                            <div className="progress-fill blue" style={{ width: `${app.score}%` }} />
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: '13px' }}>{app.score}</span>
                                    </div>
                                </td>
                                <td><span className={`risk-badge ${getRiskStyle(app.risk)}`}>● {app.risk}</span></td>
                                <td><span className={`badge ${getStatusStyle(app.status)}`}>{app.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
