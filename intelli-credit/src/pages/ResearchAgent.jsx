import { useState } from 'react'
import { Globe, Search, RefreshCw, ExternalLink, AlertTriangle, CheckCircle, Clock, TrendingDown, TrendingUp, Plus, Save } from 'lucide-react'

const newsArticles = [
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
        source: 'RBI Circular',
        time: '1 day ago',
        title: 'RBI tightens ECL provisioning norms for textile sector exposures',
        summary: 'Banks required to maintain 15% additional provision on new textile sector exposures above ₹100 Cr effective April 2024.',
        sentiment: 'warning',
        relevance: 88,
        tags: ['Regulatory', 'RBI'],
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
    {
        source: 'CIBIL TransUnion',
        time: '1 week ago',
        title: 'Company credit bureau score maintained at 782 (Prime segment)',
        summary: 'No reported defaults or DPDs in last 36 months. 2 consortium banking relationships active with SBI and HDFC Bank.',
        sentiment: 'positive',
        relevance: 99,
        tags: ['Credit Bureau', 'CIBIL'],
    },
]

const litigationRecords = [
    { court: 'Bombay High Court', case: 'WP/2847/2023', nature: 'Labour Dispute', amount: '₹12.4 Cr', status: 'Pending', risk: 'medium' },
    { court: 'NCLT Mumbai', case: 'IB-122/2022', nature: 'Operational Creditor', amount: '₹8.2 Cr', status: 'Resolved', risk: 'low' },
    { court: 'Income Tax Tribunal', case: 'ITA/4521/2023', nature: 'Tax Assessment', amount: '₹34.6 Cr', status: 'Pending', risk: 'high' },
    { court: 'Consumer Forum', case: 'CC/887/2023', nature: 'Product Liability', amount: '₹0.8 Cr', status: 'Pending', risk: 'low' },
]

const mcaData = [
    { field: 'Company Type', value: 'Private Limited Company' },
    { field: 'Incorporation Date', value: '14 March 2008' },
    { field: 'Authorised Capital', value: '₹500 Cr' },
    { field: 'Paid-up Capital', value: '₹187.4 Cr' },
    { field: 'Director Count', value: '8 (4 Independent)' },
    { field: 'Registered Office', value: 'Nashik, Maharashtra' },
    { field: 'Last AGM Filed', value: '29 September 2023' },
    { field: 'Annual Return Filed', value: 'Yes – Oct 2023' },
    { field: 'Charges Registered', value: '3 (All Active, ₹840 Cr)' },
    { field: 'DIN Status (Promoters)', value: 'Active – No DIN disqualification' },
]

const qualitativeInputs = [
    { id: 'factory_util', label: 'Factory Utilization', type: 'range', value: 74, unit: '%', desc: 'Current capacity utilization across all plants' },
    { id: 'mgmt_credibility', label: 'Management Credibility Score', type: 'range', value: 7, unit: '/10', desc: 'Credit officer assessment of management quality' },
    { id: 'market_position', label: 'Market Position', type: 'select', options: ['Leader', 'Strong #2', 'Mid-tier', 'Niche', 'Weak'], value: 'Strong #2' },
]

export default function ResearchAgent() {
    const [activeTab, setActiveTab] = useState('news')
    const [isResearching, setIsResearching] = useState(false)
    const [qualValues, setQualValues] = useState({ factory_util: 74, mgmt_credibility: 7 })
    const [siteVisitNotes, setSiteVisitNotes] = useState('Plant visited on 08-Mar-2024. Operations running smoothly. Modern machinery upgraded in FY23. Workforce appears well-managed. Labour relations satisfactory. Inventory management system in place.')

    const getSentimentStyle = (s) => {
        if (s === 'positive') return { color: 'var(--accent-emerald)', icon: '✅' }
        if (s === 'negative') return { color: 'var(--accent-ruby)', icon: '⚠️' }
        return { color: 'var(--accent-gold)', icon: '⚡' }
    }

    const runResearch = () => {
        setIsResearching(true)
        setTimeout(() => setIsResearching(false), 3000)
    }

    return (
        <div>
            {/* Company Research Header */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '20px' }}>🔍</span>
                            <span style={{ fontSize: '18px', fontWeight: 700 }}>Agrawal Textiles Pvt Ltd</span>
                            <span className="badge badge-blue">CIN: U17111MH2008PTC184765</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AI Research Agent fetching real-time intelligence from 12 data sources</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className={`btn ${isResearching ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={runResearch}
                            disabled={isResearching}
                            id="btn-run-research"
                        >
                            {isResearching
                                ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Fetching Intelligence...</>
                                : <><Globe size={14} /> Run Research Agent</>}
                        </button>
                    </div>
                </div>

                {/* Data Sources */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {[
                        { label: 'News Portals', status: 'done' },
                        { label: 'MCA21', status: 'done' },
                        { label: 'eCourts', status: 'done' },
                        { label: 'CIBIL', status: 'done' },
                        { label: 'RBI Circular', status: 'done' },
                        { label: 'SEBI EDGAR', status: 'done' },
                        { label: 'BSE/NSE', status: 'partial' },
                        { label: 'SerpAPI News', status: 'done' },
                        { label: 'Zauba Trade Data', status: 'done' },
                    ].map((s, i) => (
                        <span key={i} className={`badge ${s.status === 'done' ? 'badge-emerald' : 'badge-gold'}`}>
                            {s.status === 'done' ? '✓' : '⟳'} {s.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="pill-tabs" style={{ marginBottom: '20px', width: 'fit-content' }}>
                {[
                    { id: 'news', label: '📰 News & Sentiment' },
                    { id: 'litigation', label: '⚖️ Litigation (eCourts)' },
                    { id: 'mca', label: '🏛️ MCA Filings' },
                    { id: 'qualitative', label: '📋 Credit Officer Inputs' },
                ].map(t => (
                    <button key={t.id} className={`pill-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)} id={`tab-research-${t.id}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {activeTab === 'news' && (
                <div>
                    {/* Sentiment Summary */}
                    <div className="grid-3" style={{ marginBottom: '20px' }}>
                        {[
                            { label: 'Overall Sentiment', value: 'Cautious', icon: '⚡', color: 'gold', sub: 'Mixed signals detected' },
                            { label: 'Positive News', value: '3 Articles', icon: '📈', color: 'emerald', sub: 'Export order, CIBIL score' },
                            { label: 'Risk Signals', value: '2 Alerts', icon: '⚠️', color: 'ruby', sub: 'Promoter pledge, sector' },
                        ].map((s, i) => (
                            <div key={i} className={`stat-card ${s.color}`}>
                                <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: 800 }}>{s.value}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* News Articles */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {newsArticles.map((article, i) => {
                            const sent = getSentimentStyle(article.sentiment)
                            return (
                                <div key={i} className="card" style={{
                                    borderLeft: `3px solid ${sent.color}`,
                                    padding: '16px 20px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>{article.source}</span>
                                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>·</span>
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{article.time}</span>
                                                {article.tags.map((tag, j) => (
                                                    <span key={j} className="badge badge-gray" style={{ fontSize: '10px' }}>{tag}</span>
                                                ))}
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.4 }}>
                                                {sent.icon} {article.title}
                                            </div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                                {article.summary}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', flexShrink: 0 }}>
                                            <div style={{ fontSize: '20px', fontWeight: 800, color: sent.color }}>{article.relevance}%</div>
                                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Relevance</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Promoter Profile */}
                    <div className="card" style={{ marginTop: '20px' }}>
                        <div className="card-title" style={{ marginBottom: '14px' }}>👤 Promoter Intelligence</div>
                        <div className="grid-2">
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Mr. Vikram Agrawal</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Chairman & Managing Director — 36 years industry experience</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {[
                                        { label: 'Director in Other Cos', value: '4 companies', st: 'neutral' },
                                        { label: 'DIN Status', value: 'Active (No Disqualification)', st: 'positive' },
                                        { label: 'Promoter Holding', value: '62.4% (Direct + PAC)', st: 'positive' },
                                        { label: 'Promoter Pledge', value: '38.4% of holding pledged', st: 'negative' },
                                        { label: 'Past Defaults', value: 'None reported', st: 'positive' },
                                        { label: 'Criminal Record', value: 'None (eCourts verified)', st: 'positive' },
                                    ].map((r, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                                            <span style={{ fontWeight: 600, color: r.st === 'positive' ? 'var(--accent-emerald)' : r.st === 'negative' ? 'var(--accent-ruby)' : 'var(--text-primary)' }}>{r.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sector Risk Matrix</div>
                                {[
                                    { factor: 'Cotton Price Risk', level: 'High', pct: 80 },
                                    { factor: 'Export Demand', level: 'Stable', pct: 60 },
                                    { factor: 'Competition', level: 'Medium', pct: 55 },
                                    { factor: 'Regulatory (PLI)', level: 'Favorable', pct: 25 },
                                    { factor: 'FX Exposure', level: 'Medium', pct: 50 },
                                ].map((r, i) => (
                                    <div key={i} style={{ marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                                            <span>{r.factor}</span>
                                            <span style={{ color: r.pct > 70 ? 'var(--accent-ruby)' : r.pct > 45 ? 'var(--accent-gold)' : 'var(--accent-emerald)', fontWeight: 600 }}>{r.level}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className={`progress-fill ${r.pct > 70 ? 'ruby' : r.pct > 45 ? 'gold' : 'emerald'}`} style={{ width: `${r.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'litigation' && (
                <div>
                    <div className="alert-box warning" style={{ marginBottom: '20px' }}>
                        <AlertTriangle size={16} />
                        <div>
                            <strong>3 Active Legal Matters Detected</strong> — eCourts API returned 4 cases (1 resolved). Total exposure: ₹55.8 Cr. High-risk item: Income Tax Tribunal case of ₹34.6 Cr.
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">⚖️ eCourts Litigation Records</div>
                            <span className="badge badge-blue">Auto-fetched via eCourts API</span>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Court</th>
                                    <th>Case Number</th>
                                    <th>Nature of Dispute</th>
                                    <th>Financial Exposure</th>
                                    <th>Status</th>
                                    <th>Risk Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {litigationRecords.map((l, i) => (
                                    <tr key={i}>
                                        <td style={{ fontSize: '12px' }}>{l.court}</td>
                                        <td><code style={{ fontSize: '11px', color: 'var(--primary-200)' }}>{l.case}</code></td>
                                        <td>{l.nature}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--accent-ruby)' }}>{l.amount}</td>
                                        <td>
                                            <span className={`badge ${l.status === 'Resolved' ? 'badge-emerald' : 'badge-gold'}`}>{l.status}</span>
                                        </td>
                                        <td>
                                            <span className={`risk-badge risk-${l.risk}`}>{l.risk.charAt(0).toUpperCase() + l.risk.slice(1)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'mca' && (
                <div>
                    <div className="alert-box success" style={{ marginBottom: '20px' }}>
                        <CheckCircle size={16} />
                        <div><strong>MCA21 Filing Status: Compliant</strong> — Annual returns, financial statements, and ROC filings are up to date. No strike-off or disqualification notices found.</div>
                    </div>
                    <div className="grid-2">
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>🏛️ MCA21 Company Master</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {mcaData.map((d, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '13px' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>{d.field}</span>
                                        <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>👥 Director Profile Summary</div>
                            {[
                                { name: 'Vikram Agrawal', role: 'CMD', din: '00234567', status: 'Active' },
                                { name: 'Sunita Agrawal', role: 'WTD', din: '00345678', status: 'Active' },
                                { name: 'Rajesh Mehta', role: 'Ind. Director', din: '00456789', status: 'Active' },
                                { name: 'CA Priya Sharma', role: 'Ind. Director', din: '00567890', status: 'Active' },
                                { name: 'Gaurav Agrawal', role: 'Jt. MD', din: '00678901', status: 'Active' },
                            ].map((d, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{d.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.role} · DIN: {d.din}</div>
                                    </div>
                                    <span className="badge badge-emerald">{d.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'qualitative' && (
                <div>
                    <div className="alert-box info" style={{ marginBottom: '20px' }}>
                        <span>💡</span>
                        <div>Enter qualitative insights gathered from site visits and management interactions. The AI incorporates these into the final risk scoring model with appropriate weightings.</div>
                    </div>

                    <div className="grid-2" style={{ marginBottom: '20px' }}>
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '16px' }}>📊 Quantitative Qualitative Inputs</div>
                            {[
                                { id: 'factory_util', label: 'Factory Utilization (%)', min: 0, max: 100, value: qualValues.factory_util || 74 },
                                { id: 'mgmt_score', label: 'Management Credibility (0–10)', min: 0, max: 10, value: qualValues.mgmt_credibility || 7 },
                                { id: 'collateral_cover', label: 'Collateral Coverage (%)', min: 0, max: 300, value: 145 },
                            ].map((item) => (
                                <div className="form-group" key={item.id}>
                                    <label className="form-label">{item.label}</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <input
                                            type="range"
                                            min={item.min}
                                            max={item.max}
                                            defaultValue={item.value}
                                            style={{ flex: 1, accentColor: 'var(--primary-400)' }}
                                            id={`range-${item.id}`}
                                        />
                                        <span style={{ fontWeight: 700, fontSize: '16px', minWidth: '40px', color: 'var(--primary-200)' }}>{item.value}</span>
                                    </div>
                                </div>
                            ))}

                            <div className="form-group">
                                <label className="form-label">Market Position</label>
                                <select className="form-select" id="sel-market-position">
                                    <option>Leader</option>
                                    <option selected>Strong #2 Player</option>
                                    <option>Mid-tier</option>
                                    <option>Niche</option>
                                    <option>Weak</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Management Succession Plan</label>
                                <select className="form-select" id="sel-succession">
                                    <option>Clearly Defined</option>
                                    <option selected>Partially Defined</option>
                                    <option>Not Defined</option>
                                </select>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '16px' }}>🔍 Site Visit Observations</div>
                            <div className="form-group">
                                <label className="form-label">Date of Visit</label>
                                <input className="form-input" defaultValue="08 March 2024" id="inp-visit-date" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Site Visit Officer</label>
                                <input className="form-input" defaultValue="Rajesh Kumar (Sr. Credit Manager)" id="inp-visit-officer" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Observations & Notes</label>
                                <textarea
                                    className="form-textarea"
                                    value={siteVisitNotes}
                                    onChange={e => setSiteVisitNotes(e.target.value)}
                                    rows={5}
                                    id="txt-site-observations"
                                    style={{ minHeight: '120px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Overall Assessment</label>
                                <select className="form-select" id="sel-overall-assessment">
                                    <option>Excellent</option>
                                    <option selected>Good</option>
                                    <option>Satisfactory</option>
                                    <option>Below Expectation</option>
                                    <option>Unsatisfactory</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-title" style={{ marginBottom: '14px' }}>🧠 AI Sentiment from Qualitative Inputs</div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                            NLP model processed your qualitative inputs and site visit notes. Here's the AI-generated summary for risk model integration:
                        </p>
                        <div style={{ background: 'rgba(37,65,178,0.08)', border: '1px solid rgba(37,65,178,0.2)', borderRadius: 'var(--radius-md)', padding: '16px', fontSize: '13px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--primary-200)' }}>AI Summary:</strong> The company demonstrates solid operational efficiency with 74% factory utilisation, indicating headroom for growth. On-site observations reflect well-structured management practices and modern infrastructure. Primary concerns are elevated promoter pledge levels (38.4%) and an ongoing income tax dispute (₹34.6 Cr). The textile sector outlook is <em>cautious</em> due to cotton price pressure, partially offset by PLI scheme tailwinds. Management credibility is rated <strong>7/10</strong> — stable but promoter succession planning needs formalisation. <strong style={{ color: 'var(--accent-gold)' }}>Net qualitative risk adjustment: Moderate Positive (+4 points to base score).</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', gap: '10px' }}>
                            <button className="btn btn-secondary">Clear</button>
                            <button className="btn btn-primary" id="btn-save-qualitative">
                                <Save size={14} /> Save to Risk Model
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
