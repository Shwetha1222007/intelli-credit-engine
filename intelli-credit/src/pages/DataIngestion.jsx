import { useState } from 'react'
import { Upload, FileText, CheckCircle, Clock, AlertTriangle, X, Eye, Cpu, Zap, Search, ShieldCheck, Database, FileSearch } from 'lucide-react'

const documentTypes = [
    { id: 'gst', label: 'GST Returns', desc: 'GSTR-1, GSTR-3B, GSTR-9 filings', icon: '🧾', category: 'structured', required: true },
    { id: 'itr', label: 'Income Tax Returns', desc: 'ITR-6 for last 3 years with computation', icon: '📊', category: 'structured', required: true },
    { id: 'bank', label: 'Bank Statements', desc: '12-month detailed statements (all accounts)', icon: '🏦', category: 'structured', required: true },
    { id: 'annual', label: 'Annual Reports', desc: 'Audited statements with directors report', icon: '📋', category: 'unstructured', required: true },
    { id: 'financial', label: 'Financial Statements', desc: 'Balance sheet, P&L, cash flow', icon: '📈', category: 'unstructured', required: true },
    { id: 'board', label: 'Board Meeting Minutes', desc: 'Last 4 quarters board resolutions', icon: '🤝', category: 'unstructured', required: false },
    { id: 'rating', label: 'Rating Agency Reports', desc: 'CRISIL, ICRA, CARE rating reports', icon: '⭐', category: 'unstructured', required: false },
    { id: 'shareholding', label: 'Shareholding Pattern', desc: 'MCA shareholding & promoter details', icon: '👥', category: 'unstructured', required: false },
    { id: 'legal', label: 'Legal Notices / Court Orders', desc: 'All pending legal matters', icon: '⚖️', category: 'unstructured', required: false },
]

const extractedMetricsData = [
    { label: 'Revenue (FY24)', value: '₹2,847 Cr', trend: '+12.3%', status: 'verified' },
    { label: 'EBITDA Margin', value: '18.7%', trend: '+1.2%', status: 'verified' },
    { label: 'Net Profit', value: '₹342 Cr', trend: '+8.5%', status: 'verified' },
    { label: 'Total Debt', value: '₹1,250 Cr', trend: '-5.2%', status: 'verified' },
    { label: 'Debt/Equity Ratio', value: '1.82x', trend: '-0.12', status: 'verified' },
    { label: 'Current Ratio', value: '2.14x', trend: '+0.08', status: 'verified' },
    { label: 'GST Turnover (FY24)', value: '₹2,910 Cr', trend: '+14.1%', status: 'verified' },
    { label: 'GST vs Bank Mismatch', value: '2.2%', trend: '⚡ Anomaly Check', status: 'warning' },
    { label: 'Tax Compliance Score', value: '94/100', trend: 'No defaults', status: 'verified' },
]

const anomaliesData = [
    { severity: 'warning', title: 'GST-Bank Statement Variance Detected', desc: 'GST declared turnover ₹2,910 Cr vs bank credits ₹2,847 Cr. Variance of 2.2% – within acceptable threshold but flagged for review.' },
    { severity: 'success', title: 'No Circular Trading Pattern', desc: 'AI analysis of GST GSTR-1 data shows no significant circular trading patterns. Top 10 buyers and sellers cross-checked.' },
    { severity: 'danger', title: 'Contingent Liabilities Identified', desc: 'Annual report discloses ₹185 Cr in contingent liabilities related to pending litigation. Incorporated in risk model.' },
]

const aiSteps = [
    { label: 'Initializing Vision OCR Engines...', icon: <FileText size={18} /> },
    { label: 'Scanning GSTR-1 vs Bank Credits for Circular Trading...', icon: <Search size={18} /> },
    { label: 'Parsing UNSTRUCTURED Annual Reports (210 pages)...', icon: <FileSearch size={18} /> },
    { label: 'Identifying Financial Commitments and Liabilities...', icon: <ShieldCheck size={18} /> },
    { label: 'Cross-checking MCA Filings for Promoter Background...', icon: <Database size={18} /> },
    { label: 'Generating Financial Insight Vector Map...', icon: <Zap size={18} /> },
]

export default function DataIngestion() {
    const [uploadedDocs, setUploadedDocs] = useState({
        gst: { status: 'done', pages: 48, extractedAt: '14:02' },
        itr: { status: 'done', pages: 124, extractedAt: '14:03' },
        bank: { status: 'done', pages: 380, extractedAt: '14:05' },
    })
    const [activeTab, setActiveTab] = useState('upload')
    const [isExtracting, setIsExtracting] = useState(false)
    const [extractProgress, setExtractProgress] = useState(0)
    const [activeAiStep, setActiveAiStep] = useState(0)
    const [companyName, setCompanyName] = useState('Agrawal Textiles Pvt Ltd')

    const runExtraction = () => {
        setIsExtracting(true)
        setExtractProgress(0)
        setActiveAiStep(0)

        const interval = setInterval(() => {
            setExtractProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsExtracting(false)
                        setActiveTab('extracted')
                    }, 800)
                    return 100
                }
                const next = prev + 1.2
                if (next > (setActiveAiStep + 1) * (100 / aiSteps.length)) {
                    setActiveAiStep(s => Math.min(s + 1, aiSteps.length - 1))
                }
                return next
            })
        }, 50)
    }

    const simulateUpload = (id) => {
        setUploadedDocs(prev => ({ ...prev, [id]: { status: 'processing', pages: null, extractedAt: null } }))
        setTimeout(() => {
            setUploadedDocs(prev => ({
                ...prev,
                [id]: { status: 'done', pages: Math.floor(Math.random() * 200) + 20, extractedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
            }))
        }, 1500)
    }

    return (
        <div style={{ position: 'relative' }}>
            {/* Extraction Overlay */}
            {isExtracting && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(10,14,24,0.92)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', color: 'white'
                }}>
                    <div className="card" style={{ width: '500px', border: '1px solid rgba(37,65,178,0.4)', padding: '32px', textAlign: 'center', background: 'var(--surface-card)' }}>
                        <div style={{ marginBottom: '24px', position: 'relative' }}>
                            <div className="ai-icon-pulse" style={{ fontSize: '48px' }}>🤖</div>
                            <div className="status-dot active" style={{ position: 'absolute', bottom: '10px', right: '40%' }} />
                        </div>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Intelli-Credit AI Extraction</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>Processing multidimensional financial datasets...</p>

                        <div className="progress-bar" style={{ height: '8px', marginBottom: '24px' }}>
                            <div className="progress-fill blue" style={{ width: `${extractProgress}%`, boxShadow: '0 0 12px var(--primary-500)' }} />
                        </div>

                        <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                            {aiSteps.map((step, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', marginBottom: '12px',
                                    opacity: i === activeAiStep ? 1 : i < activeAiStep ? 0.6 : 0.3,
                                    transition: 'all 0.3s ease',
                                    color: i < activeAiStep ? 'var(--accent-emerald)' : 'white'
                                }}>
                                    <div style={{ color: i === activeAiStep ? 'var(--accent-gold)' : i < activeAiStep ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                                        {i < activeAiStep ? <CheckCircle size={16} /> : step.icon}
                                    </div>
                                    <span style={{ fontWeight: i === activeAiStep ? 700 : 400 }}>{step.label}</span>
                                    {i === activeAiStep && <div className="status-dot active" style={{ marginLeft: 'auto' }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Company Info */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                    <div className="card-title">New Credit Assessment</div>
                    <span className="badge badge-gold">IC-2024-0893</span>
                </div>
                <div className="grid-3" style={{ gap: '16px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Company Name</label>
                        <input className="form-input" value={companyName} onChange={e => setCompanyName(e.target.value)} id="inp-company-name" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">CIN</label>
                        <input className="form-input" defaultValue="U17111MH2008PTC184765" id="inp-cin" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Loan Amount</label>
                        <input className="form-input" defaultValue="₹250 Crore" id="inp-loan-amount" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Sector</label>
                        <select className="form-select" id="sel-sector">
                            <option>Manufacturing - Textiles</option>
                            <option>Infrastructure</option>
                            <option>Retail & FMCG</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Type</label>
                        <select className="form-select" id="sel-loan-type">
                            <option>Term Loan</option>
                            <option>Cash Credit</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Date</label>
                        <input className="form-input" type="date" defaultValue="2024-03-09" />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="pill-tabs" style={{ marginBottom: '20px', width: 'fit-content' }}>
                {['upload', 'extracted', 'anomalies'].map(t => (
                    <button key={t} className={`pill-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} id={`tab-${t}`}>
                        {t === 'upload' ? '📤 Document Upload' : t === 'extracted' ? '📊 Extracted Insights' : '⚠️ Anomaly Detection'}
                    </button>
                ))}
            </div>

            {activeTab === 'upload' && (
                <div>
                    <div className="upload-zone" style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Upload Financial Data</div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>OCR enabled for scanned documents</p>
                        <button className="btn btn-primary"><Upload size={15} /> Select Files</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {documentTypes.map(doc => {
                            const st = uploadedDocs[doc.id]
                            return (
                                <div key={doc.id} style={{
                                    background: 'var(--surface-card)',
                                    border: `1px solid ${st?.status === 'done' ? 'rgba(0,217,139,0.2)' : 'var(--surface-border)'}`,
                                    borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px'
                                }}>
                                    <span style={{ fontSize: '24px' }}>{doc.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{doc.label} {doc.required && <span style={{ color: 'var(--accent-ruby)', fontSize: '10px' }}>*</span>}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{doc.desc}</div>
                                        {st && <div style={{ fontSize: '10px', color: 'var(--accent-emerald)', marginTop: '2px' }}>✓ {st.pages || '...'} pages · {st.extractedAt || 'Processing'}</div>}
                                    </div>
                                    {st?.status === 'done' ? <CheckCircle size={16} color="var(--accent-emerald)" /> : <button className="btn btn-secondary btn-sm" onClick={() => simulateUpload(doc.id)}><Upload size={12} /></button>}
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary" onClick={runExtraction} id="btn-run-extraction">
                            <Cpu size={15} /> Run AI Extraction
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'extracted' && (
                <div>
                    <div className="alert-box info" style={{ marginBottom: '20px' }}>
                        <Cpu size={16} />
                        <div><strong>AI Extraction Complete</strong> — 97.3% Confidence score across 552 pages. Financial indicators validated.</div>
                    </div>
                    <div className="card">
                        <div className="card-header"><div className="card-title">📊 Extracted Financial Indicators</div></div>
                        <table className="data-table">
                            <thead><tr><th>Metric</th><th>Value</th><th>YoY</th><th>Status</th></tr></thead>
                            <tbody>
                                {extractedMetricsData.map((m, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 500 }}>{m.label}</td>
                                        <td style={{ fontWeight: 700 }}>{m.value}</td>
                                        <td style={{ color: m.trend.includes('+') ? 'var(--accent-emerald)' : 'var(--accent-ruby)', fontSize: '12px', fontWeight: 600 }}>{m.trend}</td>
                                        <td><span className={`badge ${m.status === 'verified' ? 'badge-emerald' : 'badge-gold'}`}>{m.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'anomalies' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {anomaliesData.map((a, i) => (
                        <div key={i} className={`alert-box ${a.severity}`}>
                            <AlertTriangle size={18} />
                            <div><div style={{ fontWeight: 700 }}>{a.title}</div><div style={{ opacity: 0.8, fontSize: '13px' }}>{a.desc}</div></div>
                        </div>
                    ))}
                    <div className="card">
                        <div className="card-title" style={{ marginBottom: '12px' }}>🔍 Network Graph Analysis</div>
                        <div style={{ height: '100px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--text-muted)', border: '1px dashed var(--surface-border)' }}>
                            [AI Network Visualization: No Circular Trading Chains Detected]
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
