import { useState } from 'react'
import { Globe, Search, RefreshCw, ExternalLink, AlertTriangle, CheckCircle, Clock, TrendingDown, TrendingUp, Plus, Save, Server, Shield, Link } from 'lucide-react'

const newsArticlesData = [
    {
        source: 'Economic Times',
        time: '2 hours ago',
        title: 'Textile sector faces headwinds as cotton prices surge 18% YoY',
        summary: 'Rising raw material costs squeeze margins across Indian textile manufacturers. Companies with long-term cotton procurement contracts better positioned.',
        sentiment: 'negative',
        relevance: 92,
        tags: ['Sector Risk', 'Raw Material'],
    },
    {
        source: 'Business Standard',
        time: '5 hours ago',
        title: 'Agrawal Textiles wins ₹180 Cr export order from EU buyer',
        summary: 'Agrawal Textiles Pvt Ltd secures a significant multi-year export contract with a leading European retailer. Order execution starts Q1 FY25.',
        sentiment: 'positive',
        relevance: 98,
        tags: ['Company News', 'Export'],
    },
    {
        source: 'Moneycontrol',
        time: '3 days ago',
        title: 'Promoter Vikram Agrawal pledges additional 8% stake with lenders',
        summary: 'Promoter pledge ratio increases to 38.4%. Signals potential liquidity stress at promoter level though company fundamentals remain stable.',
        sentiment: 'negative',
        relevance: 95,
        tags: ['Promoter Risk', 'Pledge'],
    },
]

const litigationRecordsData = [
    { court: 'Bombay High Court', case: 'WP/2847/2023', nature: 'Labour Dispute', amount: '₹12.4 Cr', status: 'Pending', risk: 'medium' },
    { court: 'Income Tax Tribunal', case: 'ITA/4521/2023', nature: 'Tax Assessment', amount: '₹34.6 Cr', status: 'Pending', risk: 'high' },
    { court: 'NCLT Mumbai', case: 'IB-122/2022', nature: 'Operational Creditor', amount: '₹8.2 Cr', status: 'Resolved', risk: 'low' },
]

const mcaData = [
    { field: 'Incorporation Date', value: '14 March 2008' },
    { field: 'Authorised Capital', value: '₹500 Cr' },
    { field: 'Paid-up Capital', value: '₹187.4 Cr' },
    { field: 'Charges Registered', value: '3 Active (₹840 Cr)' },
    { field: 'DIN Status', value: 'Active – No Disqualification' },
]

const researchSteps = [
    { site: 'www.mca.gov.in', status: 'Fetching Company Master...', progress: 40 },
    { site: 'ecourts.gov.in', status: 'Scanning High Court Records...', progress: 65 },
    { site: 'google.news/search', status: 'Performing Sentiment Analysis...', progress: 85 },
    { site: 'cibil.com/business', status: 'Retrieving Bureau Report...', progress: 95 },
]

export default function ResearchAgent() {
    const [activeTab, setActiveTab] = useState('news')
    const [isResearching, setIsResearching] = useState(false)
    const [researchIndex, setResearchIndex] = useState(0)
    const [siteVisitNotes, setSiteVisitNotes] = useState('Plant visited on 08-Mar-2024. Modern machinery recently upgraded. Operations running at near-optimum capacity.')

    const runResearch = () => {
        setIsResearching(true)
        setResearchIndex(0)
        const interval = setInterval(() => {
            setResearchIndex(prev => {
                if (prev >= researchSteps.length - 1) {
                    clearInterval(interval)
                    setTimeout(() => setIsResearching(false), 800)
                    return researchSteps.length - 1
                }
                return prev + 1
            })
        }, 1200)
    }

    const getSentimentColor = (s) => (s === 'positive' ? 'var(--accent-emerald)' : s === 'negative' ? 'var(--accent-ruby)' : 'var(--accent-gold)')

    return (
        <div style={{ position: 'relative' }}>
            {/* Agent Overlay */}
            {isResearching && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(10,14,24,0.95)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }}>
                    <div className="card" style={{ width: '450px', padding: '32px', textAlign: 'center', background: 'var(--surface-dropdown)' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                            <div className="spinner-border" style={{ width: '40px', height: '40px', borderWidth: '4px', borderColor: 'var(--primary-500) transparent var(--primary-500) transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'white' }}>AI Agent Crawling Web...</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Connecting to government portals & news engines</p>

                        <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', padding: '16px', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <Globe size={16} className="text-blue" />
                                <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary-200)' }}>GET https://{researchSteps[researchIndex].site}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Status: {researchSteps[researchIndex].status}</div>
                            <div className="progress-bar" style={{ height: '4px' }}>
                                <div className="progress-fill blue" style={{ width: `${researchSteps[researchIndex].progress}%`, transition: 'width 1s ease-in-out' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-muted)' }}>CRAWLING: {researchSteps[researchIndex].site}</div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '20px' }}>🏢</span>
                            <span style={{ fontSize: '18px', fontWeight: 800 }}>Agrawal Textiles — Research Intel</span>
                            <span className="badge badge-emerald">Live Connections</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AI Agent consolidating data from MCA21, eCourts, NewsAPI, and Zauba</p>
                    </div>
                    <button className="btn btn-primary" onClick={runResearch} id="btn-run-research">
                        <RefreshCw size={14} className={isResearching ? 'spin' : ''} /> Run AI Research
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="pill-tabs" style={{ marginBottom: '20px', width: 'fit-content' }}>
                {['news', 'litigation', 'mca', 'qualitative'].map(t => (
                    <button key={t} className={`pill-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} id={`tab-res-${t}`}>
                        {t === 'news' ? '📰 News' : t === 'litigation' ? '⚖️ Legal' : t === 'mca' ? '🏛️ MCA' : '📋 Inputs'}
                    </button>
                ))}
            </div>

            {activeTab === 'news' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="grid-3" style={{ marginBottom: '8px' }}>
                        <div className="stat-card gold"><div className="stat-value">Mixed</div><div className="stat-label">Sentiment Score</div></div>
                        <div className="stat-card emerald"><div className="stat-value">98.4%</div><div className="stat-label">Relevance Avg</div></div>
                        <div className="stat-card ruby"><div className="stat-value">2</div><div className="stat-label">Risk Signals</div></div>
                    </div>
                    {newsArticlesData.map((a, i) => (
                        <div key={i} className="card" style={{ borderLeft: `3px solid ${getSentimentColor(a.sentiment)}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>{a.source} · {a.time}</span>
                                <span className="badge badge-gray">{a.relevance}% Match</span>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{a.title}</div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.summary}</p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'litigation' && (
                <div className="card">
                    <div className="card-header"><div className="card-title">⚖️ eCourts Litigation records</div></div>
                    <table className="data-table">
                        <thead><tr><th>Court</th><th>Case ID</th><th>Exposure</th><th>Status</th><th>Risk</th></tr></thead>
                        <tbody>
                            {litigationRecordsData.map((l, i) => (
                                <tr key={i}>
                                    <td style={{ fontSize: '12px' }}>{l.court}</td>
                                    <td><code style={{ fontSize: '11px' }}>{l.case}</code></td>
                                    <td style={{ fontWeight: 700, color: 'var(--accent-ruby)' }}>{l.amount}</td>
                                    <td><span className={`badge ${l.status === 'Resolved' ? 'badge-emerald' : 'badge-gold'}`}>{l.status}</span></td>
                                    <td><span className={`risk-badge risk-${l.risk}`}>{l.risk}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'mca' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-title" style={{ marginBottom: '14px' }}>🏛️ MCA21 Master Data</div>
                        {mcaData.map((d, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '13px' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{d.field}</span>
                                <span style={{ fontWeight: 600 }}>{d.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <div className="card-title" style={{ marginBottom: '14px' }}>🛡️ Director Check</div>
                        {[
                            { name: 'Vikram Agrawal', role: 'CMD', status: 'Active' },
                            { name: 'Sunita Agrawal', role: 'WTD', status: 'Active' },
                            { name: 'Rajesh Mehta', role: 'Ind. Dir', status: 'Active' },
                        ].map((d, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <div><div style={{ fontSize: '13px', fontWeight: 600 }}>{d.name}</div><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.role}</div></div>
                                <span className="badge badge-emerald">{d.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'qualitative' && (
                <div className="card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>📋 Site Visit & Qualitative Input</div>
                    <div className="form-group">
                        <label className="form-label">Site Visit Observation</label>
                        <textarea className="form-textarea" value={siteVisitNotes} onChange={e => setSiteVisitNotes(e.target.value)} rows={4} />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                        <div style={{ flex: 1 }} className="form-group">
                            <label className="form-label">Management Quality (1-10)</label>
                            <input type="range" min="1" max="10" defaultValue="8" style={{ width: '100%', accentColor: 'var(--primary-400)' }} />
                        </div>
                        <div style={{ flex: 1 }} className="form-group">
                            <label className="form-label">Succession Plan</label>
                            <select className="form-select"><option>Defined</option><option>In-Progress</option><option>Not Defined</option></select>
                        </div>
                    </div>
                    <div style={{ background: 'rgba(37,65,178,0.08)', borderRadius: 'var(--radius-md)', padding: '16px', marginTop: '20px', border: '1px solid rgba(37,65,178,0.2)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-200)', marginBottom: '8px' }}>🤖 NLP Summary of Qualitative inputs</div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            "Site visit confirms high operational discipline; machinery is modern and well-maintained. Management shows strong domain knowledge. <strong>Succession planning remains an area of concern</strong> but is balanced by a professional second-line management team. Qualitative risk adjustment: <strong>+2 Score points.</strong>"
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
