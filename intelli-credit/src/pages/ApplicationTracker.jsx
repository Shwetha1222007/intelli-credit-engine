import { useState } from 'react'
import { Search, Filter, Eye, FileText, TrendingUp, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const applications = [
    { id: 'IC-2024-0893', company: 'Agrawal Textiles Pvt Ltd', sector: 'Textiles', amount: '₹250 Cr', score: 67, rating: 'BB+', risk: 'Medium', status: 'Under Review', stage: 'Recommendation', date: '09 Mar 2024', manager: 'Rajesh Kumar' },
    { id: 'IC-2024-0892', company: 'Tata Motors Ltd', sector: 'Automotive', amount: '₹850 Cr', score: 78, rating: 'A-', risk: 'Low', status: 'Approved', stage: 'CAM Complete', date: '07 Mar 2024', manager: 'Sunita Verma' },
    { id: 'IC-2024-0891', company: 'Piramal Pharma Ltd', sector: 'Pharma', amount: '₹320 Cr', score: 65, rating: 'BB+', risk: 'Medium', status: 'Under Review', stage: 'Research', date: '06 Mar 2024', manager: 'Arun Desai' },
    { id: 'IC-2024-0890', company: 'Adani Ports & SEZ', sector: 'Logistics', amount: '₹1,200 Cr', score: 82, rating: 'A', risk: 'Low', status: 'Approved', stage: 'CAM Complete', date: '05 Mar 2024', manager: 'Kavita Singh' },
    { id: 'IC-2024-0889', company: 'Reliance Retail Ltd', sector: 'Retail', amount: '₹500 Cr', score: 45, rating: 'BB-', risk: 'High', status: 'Rejected', stage: 'Closed', date: '04 Mar 2024', manager: 'Rajesh Kumar' },
    { id: 'IC-2024-0888', company: 'Mahindra Agri Solutions', sector: 'Agriculture', amount: '₹180 Cr', score: 71, rating: 'BBB-', risk: 'Low', status: 'Approved', stage: 'CAM Complete', date: '03 Mar 2024', manager: 'Arun Desai' },
    { id: 'IC-2024-0887', company: 'Jindal Steel Ltd', sector: 'Steel', amount: '₹2,400 Cr', score: 58, rating: 'BB', risk: 'Medium', status: 'Under Review', stage: 'Ingestion', date: '02 Mar 2024', manager: 'Sunita Verma' },
    { id: 'IC-2024-0886', company: 'Zomato Ltd', sector: 'Technology', amount: '₹150 Cr', score: 74, rating: 'BBB-', risk: 'Low', status: 'Under Review', stage: 'Research', date: '01 Mar 2024', manager: 'Kavita Singh' },
    { id: 'IC-2024-0885', company: 'ABB India Ltd', sector: 'Engineering', amount: '₹420 Cr', score: 79, rating: 'A-', risk: 'Low', status: 'Approved', stage: 'CAM Complete', date: '28 Feb 2024', manager: 'Rajesh Kumar' },
    { id: 'IC-2024-0884', company: 'Go First Airlines', sector: 'Aviation', amount: '₹690 Cr', score: 28, rating: 'D', risk: 'Critical', status: 'Rejected', stage: 'Closed', date: '25 Feb 2024', manager: 'Arun Desai' },
    { id: 'IC-2024-0883', company: 'HCL Technologies', sector: 'IT Services', amount: '₹800 Cr', score: 88, rating: 'AA-', risk: 'Low', status: 'Approved', stage: 'CAM Complete', date: '22 Feb 2024', manager: 'Sunita Verma' },
    { id: 'IC-2024-0882', company: 'Vedanta Resources', sector: 'Mining', amount: '₹3,200 Cr', score: 42, rating: 'BB-', risk: 'High', status: 'Rejected', stage: 'Closed', date: '20 Feb 2024', manager: 'Kavita Singh' },
]

const stageBarData = [
    { stage: 'Ingestion', count: 8, color: '#2541b2' },
    { stage: 'Research', count: 14, color: '#8b5cf6' },
    { stage: 'Scoring', count: 11, color: '#f5a623' },
    { stage: 'CAM Draft', count: 9, color: '#06b6d4' },
    { stage: 'Review', count: 16, color: '#ff4d6d' },
    { stage: 'Approved', count: 22, color: '#00d98b' },
    { stage: 'Rejected', count: 7, color: '#4a5568' },
]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px' }}>
                <p style={{ color: '#8892b0', fontWeight: 600 }}>{label}: <span style={{ color: '#f0f4ff' }}>{payload[0].value} apps</span></p>
            </div>
        )
    }
    return null
}

export default function ApplicationTracker() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [selectedApp, setSelectedApp] = useState(null)

    const filtered = applications.filter(a => {
        const matchSearch = a.company.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.includes(searchQuery) || a.sector.toLowerCase().includes(searchQuery.toLowerCase())
        const matchStatus = statusFilter === 'All' || a.status === statusFilter
        return matchSearch && matchStatus
    })

    const getRiskClass = (risk) => {
        const map = { 'Low': 'risk-low', 'Medium': 'risk-medium', 'High': 'risk-high', 'Critical': 'risk-critical' }
        return map[risk] || 'risk-medium'
    }

    const getStatusIcon = (status) => {
        if (status === 'Approved') return <CheckCircle size={13} color="var(--accent-emerald)" />
        if (status === 'Rejected') return <XCircle size={13} color="var(--accent-ruby)" />
        return <AlertTriangle size={13} color="var(--accent-gold)" />
    }

    const totalApproved = applications.filter(a => a.status === 'Approved').length
    const totalRejected = applications.filter(a => a.status === 'Rejected').length
    const totalUnderReview = applications.filter(a => a.status === 'Under Review').length
    const avgScore = Math.round(applications.reduce((s, a) => s + a.score, 0) / applications.length)

    const getStageProgress = (stage) => {
        const map = { 'Ingestion': 15, 'Research': 30, 'Scoring': 50, 'Recommendation': 65, 'CAM Complete': 85, 'Closed': 100 }
        return map[stage] || 50
    }

    return (
        <div>
            {/* Summary Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card blue">
                    <div className="stat-icon blue">📋</div>
                    <div className="stat-info">
                        <div className="stat-value">{applications.length}</div>
                        <div className="stat-label">Total Applications</div>
                    </div>
                </div>
                <div className="stat-card emerald">
                    <div className="stat-icon emerald">✅</div>
                    <div className="stat-info">
                        <div className="stat-value">{totalApproved}</div>
                        <div className="stat-label">Approved</div>
                        <div className="stat-change up">{Math.round((totalApproved / applications.length) * 100)}% approval rate</div>
                    </div>
                </div>
                <div className="stat-card gold">
                    <div className="stat-icon gold">⏳</div>
                    <div className="stat-info">
                        <div className="stat-value">{totalUnderReview}</div>
                        <div className="stat-label">Under Review</div>
                        <div className="stat-change neutral">Active pipeline</div>
                    </div>
                </div>
                <div className="stat-card ruby">
                    <div className="stat-icon ruby">📊</div>
                    <div className="stat-info">
                        <div className="stat-value">{avgScore}</div>
                        <div className="stat-label">Avg. AI Score</div>
                        <div className="stat-change neutral">Portfolio wide</div>
                    </div>
                </div>
            </div>

            {/* Pipeline Chart */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-header">
                    <div className="card-title">📊 Application Pipeline by Stage</div>
                    <span className="badge badge-blue">87 Total Active</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={stageBarData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                        <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Applications" radius={[4, 4, 0, 0]}>
                            {stageBarData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        className="form-input"
                        placeholder="Search company, ID, sector..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: '36px' }}
                        id="inp-search-apps"
                    />
                </div>
                <div className="pill-tabs">
                    {['All', 'Approved', 'Under Review', 'Rejected'].map(s => (
                        <button key={s} className={`pill-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)} id={`filter-${s.replace(' ', '-').toLowerCase()}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Applications Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>App ID</th>
                                <th>Company</th>
                                <th>Sector</th>
                                <th>Amount</th>
                                <th>AI Score</th>
                                <th>Rating</th>
                                <th>Stage</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((app, i) => (
                                <tr key={i} style={{ cursor: 'pointer' }} onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}>
                                    <td><code style={{ fontSize: '11px', color: 'var(--primary-200)' }}>{app.id}</code></td>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{app.company}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{app.manager}</div>
                                    </td>
                                    <td><span className="badge badge-gray" style={{ fontSize: '10px' }}>{app.sector}</span></td>
                                    <td style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '13px' }}>{app.amount}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="progress-bar" style={{ width: '50px', height: '4px' }}>
                                                <div className="progress-fill" style={{
                                                    width: `${app.score}%`,
                                                    background: app.score >= 70 ? 'var(--gradient-emerald)' : app.score >= 50 ? 'var(--gradient-gold)' : 'var(--gradient-ruby)'
                                                }} />
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: '13px' }}>{app.score}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge" style={{
                                            background: app.score >= 70 ? 'rgba(0,217,139,0.12)' : app.score >= 50 ? 'rgba(245,166,35,0.12)' : 'rgba(255,77,109,0.12)',
                                            color: app.score >= 70 ? 'var(--accent-emerald)' : app.score >= 50 ? 'var(--accent-gold)' : 'var(--accent-ruby)',
                                            border: `1px solid ${app.score >= 70 ? 'rgba(0,217,139,0.3)' : app.score >= 50 ? 'rgba(245,166,35,0.3)' : 'rgba(255,77,109,0.3)'}`,
                                        }}>{app.rating}</span>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '12px' }}>{app.stage}</div>
                                        <div className="progress-bar" style={{ marginTop: '4px', height: '3px' }}>
                                            <div className="progress-fill blue" style={{ width: `${getStageProgress(app.stage)}%` }} />
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
                                            {getStatusIcon(app.status)}
                                            <span style={{ color: app.status === 'Approved' ? 'var(--accent-emerald)' : app.status === 'Rejected' ? 'var(--accent-ruby)' : 'var(--accent-gold)' }}>
                                                {app.status}
                                            </span>
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{app.date}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} id={`btn-view-${app.id}`} onClick={(e) => { e.stopPropagation() }}>
                                                <Eye size={12} />
                                            </button>
                                            <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} id={`btn-cam-${app.id}`} onClick={(e) => { e.stopPropagation() }}>
                                                <FileText size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                        <div style={{ fontWeight: 600 }}>No applications match your search</div>
                    </div>
                )}
            </div>

            {/* Expanded Detail Row */}
            {selectedApp && (
                <div className="card" style={{ marginTop: '16px', borderColor: 'rgba(37,65,178,0.4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <div style={{ fontSize: '16px', fontWeight: 800 }}>{selectedApp.company}</div>
                            <code style={{ fontSize: '12px', color: 'var(--primary-200)' }}>{selectedApp.id}</code>
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={() => setSelectedApp(null)}>✕</button>
                    </div>
                    <div className="grid-4">
                        {[
                            { label: 'Loan Amount', value: selectedApp.amount },
                            { label: 'AI Credit Score', value: selectedApp.score + '/100' },
                            { label: 'Internal Rating', value: selectedApp.rating },
                            { label: 'Risk Level', value: selectedApp.risk },
                            { label: 'Current Stage', value: selectedApp.stage },
                            { label: 'Status', value: selectedApp.status },
                            { label: 'Filed Date', value: selectedApp.date },
                            { label: 'Assigned To', value: selectedApp.manager },
                        ].map((f, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{f.label}</div>
                                <div style={{ fontSize: '14px', fontWeight: 700 }}>{f.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
