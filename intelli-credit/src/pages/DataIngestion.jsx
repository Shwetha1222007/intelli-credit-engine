import { useState } from 'react'
import { Upload, FileText, CheckCircle, Clock, AlertTriangle, X, Eye, Cpu, Zap } from 'lucide-react'

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

const extractedMetrics = [
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

const anomalies = [
    { severity: 'warning', title: 'GST-Bank Statement Variance Detected', desc: 'GST declared turnover ₹2,910 Cr vs bank credits ₹2,847 Cr. Variance of 2.2% – within acceptable threshold but flagged for review.' },
    { severity: 'success', title: 'No Circular Trading Pattern', desc: 'AI analysis of GST GSTR-1 data shows no significant circular trading patterns. Top 10 buyers and sellers cross-checked.' },
    { severity: 'danger', title: 'Contingent Liabilities Identified', desc: 'Annual report discloses ₹185 Cr in contingent liabilities related to pending litigation. Incorporated in risk model.' },
]

export default function DataIngestion() {
    const [uploadedDocs, setUploadedDocs] = useState({
        gst: { status: 'done', pages: 48, extractedAt: '14:02' },
        itr: { status: 'done', pages: 124, extractedAt: '14:03' },
        bank: { status: 'done', pages: 380, extractedAt: '14:05' },
        annual: { status: 'processing', pages: 210, extractedAt: null },
        financial: { status: 'pending', pages: null, extractedAt: null },
    })
    const [activeTab, setActiveTab] = useState('upload')
    const [dragActive, setDragActive] = useState(false)
    const [companyName, setCompanyName] = useState('Agrawal Textiles Pvt Ltd')

    const getDocStatus = (id) => uploadedDocs[id] || null

    const simulateUpload = (id) => {
        setUploadedDocs(prev => ({ ...prev, [id]: { status: 'processing', pages: null, extractedAt: null } }))
        setTimeout(() => {
            setUploadedDocs(prev => ({
                ...prev,
                [id]: { status: 'done', pages: Math.floor(Math.random() * 200) + 20, extractedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
            }))
        }, 2000)
    }

    const statusIcon = (status) => {
        if (status === 'done') return <CheckCircle size={15} color="var(--accent-emerald)" />
        if (status === 'processing') return <Clock size={15} color="var(--accent-gold)" style={{ animation: 'spin 1s linear infinite' }} />
        return null
    }

    return (
        <div>
            {/* Company Info */}
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                    <div className="card-title">New Credit Assessment</div>
                    <span className="badge badge-gold">IC-2024-0893</span>
                </div>
                <div className="grid-3" style={{ gap: '16px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Company Name</label>
                        <input className="form-input" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Enter company name" id="inp-company-name" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">CIN / Registration No.</label>
                        <input className="form-input" defaultValue="U17111MH2008PTC184765" id="inp-cin" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Loan Amount Requested</label>
                        <input className="form-input" defaultValue="₹250 Crore" id="inp-loan-amount" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Industry Sector</label>
                        <select className="form-select" id="sel-sector">
                            <option>Manufacturing - Textiles</option>
                            <option>Infrastructure</option>
                            <option>Retail & FMCG</option>
                            <option>IT & Services</option>
                            <option>Pharmaceuticals</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Loan Type</label>
                        <select className="form-select" id="sel-loan-type">
                            <option>Term Loan</option>
                            <option>Working Capital</option>
                            <option>Cash Credit</option>
                            <option>Letter of Credit</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Assessment Date</label>
                        <input className="form-input" type="date" defaultValue="2024-03-09" id="inp-assessment-date" />
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
                    {/* Drop Zone */}
                    <div
                        className={`upload-zone ${dragActive ? 'active' : ''}`}
                        style={{ marginBottom: '20px' }}
                        onDragOver={e => { e.preventDefault(); setDragActive(true) }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={e => { e.preventDefault(); setDragActive(false) }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Drag & Drop Documents Here</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            Supports PDF, Excel, CSV, Word, Images (JPEG/PNG) — OCR enabled for scanned docs
                        </div>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                            <span className="badge badge-blue">📄 PDF</span>
                            <span className="badge badge-blue">📊 Excel</span>
                            <span className="badge badge-blue">🖼️ Images (OCR)</span>
                            <span className="badge badge-blue">📝 Word</span>
                            <span className="badge badge-blue">📁 CSV</span>
                        </div>
                        <button className="btn btn-primary">
                            <Upload size={15} /> Browse Files
                        </button>
                    </div>

                    {/* Document Checklist */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {documentTypes.map(doc => {
                            const st = getDocStatus(doc.id)
                            return (
                                <div key={doc.id} style={{
                                    background: 'var(--surface-card)',
                                    border: `1px solid ${st?.status === 'done' ? 'rgba(0,217,139,0.2)' : st?.status === 'processing' ? 'rgba(245,166,35,0.2)' : 'var(--surface-border)'}`,
                                    borderRadius: 'var(--radius-md)',
                                    padding: '14px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <span style={{ fontSize: '24px' }}>{doc.icon}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{doc.label}</span>
                                            {doc.required && <span className="badge badge-ruby" style={{ fontSize: '9px', padding: '1px 6px' }}>Required</span>}
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{doc.desc}</div>
                                        {st?.status === 'done' && (
                                            <div style={{ fontSize: '10px', color: 'var(--accent-emerald)', marginTop: '3px' }}>
                                                ✓ {st.pages} pages extracted · {st.extractedAt}
                                            </div>
                                        )}
                                        {st?.status === 'processing' && (
                                            <div style={{ fontSize: '10px', color: 'var(--accent-gold)', marginTop: '3px' }}>
                                                ⟳ AI OCR + NLP processing...
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        {statusIcon(st?.status)}
                                        {!st && (
                                            <button className="btn btn-secondary btn-sm" onClick={() => simulateUpload(doc.id)} id={`btn-upload-${doc.id}`}>
                                                <Upload size={12} /> Upload
                                            </button>
                                        )}
                                        {st?.status === 'processing' && (
                                            <span style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>Processing</span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button className="btn btn-secondary">Save Draft</button>
                        <button className="btn btn-primary" id="btn-run-extraction">
                            <Cpu size={15} /> Run AI Extraction
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'extracted' && (
                <div>
                    <div className="alert-box info" style={{ marginBottom: '20px' }}>
                        <Cpu size={16} />
                        <div>
                            <strong>AI Extraction Complete</strong> — OCR + NLP processed 552 pages across 3 documents. Confidence score: <strong>97.3%</strong>. Key financial indicators extracted and cross-validated.
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-header">
                            <div className="card-title">📊 Extracted Financial Indicators</div>
                            <span className="badge badge-emerald">Cross-Validated</span>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Financial Metric</th>
                                    <th>Extracted Value</th>
                                    <th>YoY Change</th>
                                    <th>Validation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extractedMetrics.map((m, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 500 }}>{m.label}</td>
                                        <td><strong style={{ color: 'var(--text-primary)' }}>{m.value}</strong></td>
                                        <td>
                                            <span style={{ color: m.trend.startsWith('+') ? 'var(--accent-emerald)' : m.trend.startsWith('-') ? 'var(--accent-ruby)' : 'var(--accent-gold)', fontWeight: 600, fontSize: '12px' }}>
                                                {m.trend}
                                            </span>
                                        </td>
                                        <td>
                                            {m.status === 'verified'
                                                ? <span className="badge badge-emerald">✓ Verified</span>
                                                : <span className="badge badge-gold">⚠ Flagged</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid-2">
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>🏭 Business Overview (NLP Extracted)</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                                <p><strong style={{ color: 'var(--text-primary)' }}>Founded:</strong> 2008 | Maharashtra</p>
                                <p><strong style={{ color: 'var(--text-primary)' }}>Employees:</strong> 3,240 (FY24)</p>
                                <p><strong style={{ color: 'var(--text-primary)' }}>Main Products:</strong> Cotton yarn, woven fabric</p>
                                <p><strong style={{ color: 'var(--text-primary)' }}>Export Revenue:</strong> 32% of total</p>
                                <p><strong style={{ color: 'var(--text-primary)' }}>Manufacturing Plants:</strong> 4 (Nashik, Aurangabad, Nagpur, Surat)</p>
                                <p><strong style={{ color: 'var(--text-primary)' }}>Certifications:</strong> ISO 9001:2015, GOTS, BCI</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>⚖️ Liabilities & Commitments (Detected)</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { item: 'Existing Term Loans', amount: '₹680 Cr', due: 'Mar 2028' },
                                    { item: 'Working Capital Limits', amount: '₹380 Cr', due: 'Revolving' },
                                    { item: 'Deferred Tax Liability', amount: '₹42 Cr', due: 'Ongoing' },
                                    { item: 'Contingent Liabilities', amount: '₹185 Cr', due: 'Disputed' },
                                    { item: 'FCCB Outstanding', amount: '₹94 Cr', due: 'Dec 2025' },
                                ].map((l, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <span style={{ fontSize: '13px' }}>{l.item}</span>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 700, color: 'var(--accent-ruby)', fontSize: '13px' }}>{l.amount}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{l.due}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'anomalies' && (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                        {anomalies.map((a, i) => (
                            <div key={i} className={`alert-box ${a.severity}`}>
                                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{a.title}</div>
                                    <div style={{ opacity: 0.85, lineHeight: 1.6 }}>{a.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">🔍 Circular Trading Analysis</div>
                            <span className="badge badge-emerald">No Circular Trading Detected</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            AI cross-referenced GSTR-1 buyer/seller data with bank statement beneficiaries. No suspicious circular entity chains detected.
                        </p>
                        <div className="grid-3">
                            {[
                                { label: 'GST Transactions Analyzed', value: '14,892' },
                                { label: 'Related Party Transactions', value: '₹234 Cr (8.2%)' },
                                { label: 'Suspicious Patterns Found', value: '0' },
                            ].map((s, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '14px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-200)', marginBottom: '4px' }}>{s.value}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
