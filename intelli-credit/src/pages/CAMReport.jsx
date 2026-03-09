import { useState } from 'react'
import { FileText, Download, Printer, Share2, CheckCircle, Clock, Eye } from 'lucide-react'

const camSections = [
    { id: 'company', label: '1. Company Profile', status: 'complete' },
    { id: 'financial', label: '2. Financial Summary', status: 'complete' },
    { id: 'fivecs', label: '3. Five Cs Analysis', status: 'complete' },
    { id: 'risk', label: '4. Risk Analysis', status: 'complete' },
    { id: 'litigation', label: '5. Litigation & Legal', status: 'complete' },
    { id: 'sector', label: '6. Industry Outlook', status: 'complete' },
    { id: 'collateral', label: '7. Collateral & Security', status: 'complete' },
    { id: 'aiscore', label: '8. AI Credit Score', status: 'complete' },
    { id: 'recommendation', label: '9. Recommendation', status: 'complete' },
]

function SectionDivider({ title }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0 18px' }}>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-300)', padding: '4px 12px', background: 'rgba(37,65,178,0.15)', borderRadius: '20px', border: '1px solid rgba(37,65,178,0.3)' }}>{title}</span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>
    )
}

function FinancialTable({ data }) {
    return (
        <table className="data-table" style={{ fontSize: '12px' }}>
            <thead>
                <tr>
                    {data.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td key={j} style={{
                                fontWeight: j === 0 ? 500 : 600,
                                color: j === 0 ? 'var(--text-secondary)' : cell?.startsWith?.('−') ? 'var(--accent-ruby)' : j > 0 ? 'var(--text-primary)' : ''
                            }}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default function CAMReport() {
    const [generating, setGenerating] = useState(false)
    const [generated, setGenerated] = useState(true)
    const [activeSection, setActiveSection] = useState('company')

    const financialData = {
        headers: ['Parameter', 'FY2022', 'FY2023', 'FY2024', 'H1 FY25'],
        rows: [
            ['Revenue from Operations', '₹2,214 Cr', '₹2,541 Cr', '₹2,847 Cr', '₹1,490 Cr'],
            ['Revenue Growth (YoY)', '—', '+14.8%', '+12.0%', '+9.2% ann.'],
            ['EBITDA', '₹358 Cr', '₹446 Cr', '₹533 Cr', '₹282 Cr'],
            ['EBITDA Margin', '16.2%', '17.6%', '18.7%', '18.9%'],
            ['PAT (Net Profit)', '₹198 Cr', '₹281 Cr', '₹342 Cr', '₹184 Cr'],
            ['PAT Margin', '8.9%', '11.1%', '12.0%', '12.3%'],
            ['Total Borrowings', '₹1,420 Cr', '₹1,340 Cr', '₹1,250 Cr', '₹1,210 Cr'],
            ['Net Worth', '₹524 Cr', '₹612 Cr', '₹686 Cr', '₹744 Cr'],
            ['Debt / Equity Ratio', '2.71x', '2.19x', '1.82x', '1.63x'],
            ['Interest Coverage Ratio', '2.8x', '3.1x', '3.4x', '3.6x'],
            ['DSCR', '1.74x', '1.96x', '2.18x', '2.31x'],
            ['Current Ratio', '1.82x', '2.01x', '2.14x', '2.19x'],
        ]
    }

    const handleGenerate = () => {
        setGenerating(true)
        setTimeout(() => { setGenerating(false); setGenerated(true) }, 2500)
    }

    return (
        <div>
            {/* Top Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span className="badge badge-emerald">✓ CAM Generated</span>
                        <span className="badge badge-blue">9 Sections Complete</span>
                        <span className="badge badge-gold">Confidential</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Credit Appraisal Memo — <strong style={{ color: 'var(--text-primary)' }}>Agrawal Textiles Pvt Ltd</strong> — IC-2024-0893</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {!generated && (
                        <button className="btn btn-primary" onClick={handleGenerate} disabled={generating} id="btn-generate-cam">
                            {generating ? <><Clock size={14} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><FileText size={14} /> Generate CAM</>}
                        </button>
                    )}
                    {generated && (
                        <>
                            <button className="btn btn-secondary btn-sm" id="btn-preview-cam">
                                <Eye size={14} /> Preview
                            </button>
                            <button className="btn btn-secondary btn-sm" id="btn-print-cam">
                                <Printer size={14} /> Print
                            </button>
                            <button className="btn btn-gold btn-sm" id="btn-download-word">
                                📄 Download Word
                            </button>
                            <button className="btn btn-primary btn-sm" id="btn-download-pdf">
                                <Download size={14} /> Download PDF
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                {/* Section Navigator */}
                <div style={{ width: '200px', flexShrink: 0 }}>
                    <div className="card" style={{ padding: '14px', position: 'sticky', top: '84px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Sections</div>
                        {camSections.map(s => (
                            <div
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer', fontSize: '12px',
                                    background: activeSection === s.id ? 'rgba(37,65,178,0.2)' : 'transparent',
                                    color: activeSection === s.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    fontWeight: activeSection === s.id ? 600 : 400,
                                    transition: 'all 0.2s',
                                    marginBottom: '2px',
                                }}
                                id={`nav-cam-${s.id}`}
                            >
                                <CheckCircle size={12} color="var(--accent-emerald)" />
                                {s.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CAM Document Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="card" style={{ padding: '36px' }}>
                        {/* Letterhead */}
                        <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid rgba(37,65,178,0.3)' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '4px' }}>CONFIDENTIAL — FOR CREDIT COMMITTEE USE ONLY</div>
                            <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--primary-200)', marginBottom: '2px' }}>INTELLI-CREDIT AI SYSTEM</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AI-Generated Credit Appraisal Memorandum (CAM)</div>
                            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                <span>📋 Ref: IC-2024-0893</span>
                                <span>📅 09 March 2024</span>
                                <span>👤 Prepared by: AI Engine + Rajesh Kumar</span>
                            </div>
                        </div>

                        <SectionDivider title="1. Company Profile" />
                        <div className="grid-2" style={{ marginBottom: '16px' }}>
                            <div>
                                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Agrawal Textiles Pvt Ltd</h2>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>
                                    Incorporated in 2008, Agrawal Textiles Pvt Ltd is a mid-large textile manufacturer based in Nashik, Maharashtra. The company operates across the value chain from cotton procurement to finished woven fabric, serving both domestic retailers and export markets (Europe, USA, Middle East).
                                </p>
                                {[
                                    ['CIN', 'U17111MH2008PTC184765'],
                                    ['Constitution', 'Private Limited Company'],
                                    ['Industry', 'Manufacturing — Textiles (NIC: 13111)'],
                                    ['Registered Office', 'Plot 48, MIDC Nashik, Maharashtra 422010'],
                                    ['Promoters', 'Vikram Agrawal (55.2%) + Family (7.2%)'],
                                    ['Bankers', 'State Bank of India, HDFC Bank (Consortium)'],
                                ].map(([k, v], i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '12.5px', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <span style={{ width: '120px', flexShrink: 0, color: 'var(--text-secondary)' }}>{k}</span>
                                        <span style={{ fontWeight: 500 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>Loan Request Summary</div>
                                {[
                                    ['Loan Amount', '₹250 Crore'],
                                    ['Purpose', 'Capacity Expansion (Surat Plant)'],
                                    ['Loan Type', 'Term Loan (10 yr amort.)'],
                                    ['Collateral', '4 manufacturing plants'],
                                    ['Moratorium', '18 months (principal)'],
                                    ['CIBIL Score', '782 (Prime)'],
                                    ['External Rating', 'BB+ (CRISIL, 2023)'],
                                    ['Existing Exposure', '₹840 Cr (SBI + HDFC)'],
                                ].map(([k, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                                        <span style={{ fontWeight: 600 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <SectionDivider title="2. Financial Summary" />
                        <FinancialTable data={financialData} />

                        <SectionDivider title="3. Five Cs Analysis" />
                        <div className="five-c-grid" style={{ marginBottom: '16px' }}>
                            {[
                                { letter: 'C1', name: 'Character', score: 68, color: '#2541b2', verdict: 'Satisfactory' },
                                { letter: 'C2', name: 'Capacity', score: 74, color: '#00d98b', verdict: 'Good' },
                                { letter: 'C3', name: 'Capital', score: 62, color: '#f5a623', verdict: 'Adequate' },
                                { letter: 'C4', name: 'Collateral', score: 80, color: '#8b5cf6', verdict: 'Strong' },
                                { letter: 'C5', name: 'Conditions', score: 55, color: '#06b6d4', verdict: 'Cautious' },
                            ].map((c, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center', borderTop: `3px solid ${c.color}` }}>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>{c.letter}</div>
                                    <div style={{ fontSize: '26px', fontWeight: 900, color: c.color, fontFamily: 'Outfit', margin: '4px 0' }}>{c.score}</div>
                                    <div style={{ fontSize: '12px', fontWeight: 700, color: c.color }}>{c.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{c.verdict}</div>
                                </div>
                            ))}
                        </div>

                        <SectionDivider title="4. Risk Analysis" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                            {[
                                { category: 'Credit Risks', icon: '💳', items: ['High promoter pledge (38.4%) — leverage risk', 'Stretched D/E at 1.82x (improving trend)', 'Contingent liabilities of ₹185 Cr'] },
                                { category: 'Market Risks', icon: '📉', items: ['Cotton price inflation +18% YoY', 'Export demand dependent on EU economy', 'Currency (USD/INR) exposure on exports'] },
                                { category: 'Operational Risks', icon: '⚙️', items: ['4 plants — geographic concentration manageable', 'Labour-intensive — minimum wage risk', 'Water-intensive manufacturing — ESG'] },
                                { category: 'Mitigants', icon: '🛡️', items: ['Strong DSCR 2.18x — debt service well covered', 'PLI scheme benefit ≈ ₹45 Cr p.a.', 'ISO certified, GOTS — premium market access'] },
                            ].map((r, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{r.icon} {r.category}</div>
                                    {r.items.map((item, j) => (
                                        <div key={j} style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '3px 0', display: 'flex', gap: '6px' }}>
                                            <span style={{ color: i === 3 ? 'var(--accent-emerald)' : 'var(--accent-ruby)' }}>{i === 3 ? '✓' : '•'}</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <SectionDivider title="5. Litigation Findings" />
                        <div className="alert-box warning" style={{ marginBottom: '14px', fontSize: '13px' }}>
                            <span>⚖️</span>
                            <div>3 active cases identified via eCourts. Total contingent exposure: <strong>₹55.8 Cr</strong> (primary concern: IT Tribunal ₹34.6 Cr). Recommend legal undertaking to notify bank of any new cases ≥ ₹5 Cr.</div>
                        </div>
                        <table className="data-table" style={{ fontSize: '12px' }}>
                            <thead><tr><th>Court</th><th>Nature</th><th>Exposure</th><th>Status</th><th>Risk</th></tr></thead>
                            <tbody>
                                {[
                                    ['Bombay HC', 'Labour Dispute', '₹12.4 Cr', 'Pending', 'Medium'],
                                    ['NCLT Mumbai', 'Operational Creditor', '₹8.2 Cr', 'Resolved ✓', 'Low'],
                                    ['IT Tribunal', 'Tax Assessment', '₹34.6 Cr', 'Pending', 'High'],
                                    ['Consumer Forum', 'Product Liability', '₹0.8 Cr', 'Pending', 'Low'],
                                ].map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j} style={{
                                                color: j === 4 ? (cell === 'High' ? 'var(--accent-ruby)' : cell === 'Medium' ? 'var(--accent-gold)' : 'var(--accent-emerald)') : ''
                                            }}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <SectionDivider title="6. Industry Outlook" />
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '12px' }}>
                            The Indian textile industry (₹12 lakh crore market) is the second-largest employer. Short-term outlook is <strong style={{ color: 'var(--accent-gold)' }}>cautious</strong> due to cotton price inflation and global demand moderation. Medium-term outlook is <strong style={{ color: 'var(--accent-emerald)' }}>positive</strong> driven by China+1 strategy, PLI scheme (₹10,683 Cr outlay), and Free Trade Agreement with EU expected in 2025.
                        </p>
                        <div className="grid-3" style={{ marginBottom: '16px' }}>
                            {[
                                { label: 'Short-term Outlook', value: 'Cautious', color: 'var(--accent-gold)' },
                                { label: 'Medium-term Outlook', value: 'Positive', color: 'var(--accent-emerald)' },
                                { label: 'RBI Sensitivity', value: 'Monitored', color: 'var(--primary-200)' },
                            ].map((o, i) => (
                                <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 800, color: o.color }}>{o.value}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{o.label}</div>
                                </div>
                            ))}
                        </div>

                        <SectionDivider title="7. Collateral & Security" />
                        <table className="data-table" style={{ fontSize: '12px', marginBottom: '16px' }}>
                            <thead><tr><th>Security</th><th>Description</th><th>FMRV</th><th>Charge</th></tr></thead>
                            <tbody>
                                {[
                                    ['Primary — Fixed Assets', 'Plant & machinery, Nashik + Aurangabad units', '₹245 Cr', '1st Pari Passu'],
                                    ['Primary — Trade Receivables', 'Book debts < 90 days', '₹85 Cr (hyp)', '1st Pari Passu'],
                                    ['Collateral — Land & Buildings', 'Nashik plant (leasehold 99yr RoR)', '₹120 Cr', '1st Charge'],
                                    ['Personal Guarantee', 'Mr. Vikram Agrawal (CMD)', 'Unlimited', 'Ongoing'],
                                ].map((row, i) => (
                                    <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-emerald)', marginBottom: '16px' }}>
                            ✓ Total Security Coverage: ₹450 Cr / Proposed Exposure ₹250 Cr = <strong>Coverage Ratio: 180%</strong>
                        </div>

                        <SectionDivider title="8. AI Credit Score" />
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', background: 'rgba(37,65,178,0.08)', border: '1px solid rgba(37,65,178,0.2)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '16px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '56px', fontWeight: 900, fontFamily: 'Outfit', color: '#f5a623', lineHeight: 1 }}>67</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AI Credit Score</div>
                                <div style={{ fontSize: '11px', color: 'var(--accent-gold)', marginTop: '4px', fontWeight: 700 }}>BB+ / CONDITIONAL</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>Score Composition</div>
                                {[
                                    { label: 'Character (20% weight)', score: 68, pct: 20 },
                                    { label: 'Capacity (25% weight)', score: 74, pct: 25 },
                                    { label: 'Capital (20% weight)', score: 62, pct: 20 },
                                    { label: 'Collateral (20% weight)', score: 80, pct: 20 },
                                    { label: 'Conditions (15% weight)', score: 55, pct: 15 },
                                ].map((s, i) => (
                                    <div key={i} style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                                            <span style={{ fontWeight: 700, fontSize: '12px' }}>{s.score}/100 → {((s.score * s.pct) / 100).toFixed(1)} pts</span>
                                        </div>
                                        <div className="progress-bar" style={{ height: '4px' }}>
                                            <div className="progress-fill blue" style={{ width: `${s.score}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <SectionDivider title="9. Final Recommendation" />
                        <div style={{ background: 'rgba(245,166,35,0.08)', border: '2px solid rgba(245,166,35,0.3)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--accent-gold)', marginBottom: '12px' }}>
                                ⚡ CONDITIONAL APPROVAL RECOMMENDED
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                {[
                                    ['Sanction Amount', '₹200 Crore'],
                                    ['Interest Rate', 'MCLR + 2.25% = ~10.75% p.a.'],
                                    ['Tenor', '7 Years (incl. 18M moratorium)'],
                                    ['Repayment', 'Structured EMIs post-moratorium'],
                                    ['Internal Rating', 'BB+ (Watch List)'],
                                    ['Review Frequency', 'Quarterly + Annual Site Visit'],
                                ].map(([k, v], i) => (
                                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-gold)' }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <strong style={{ color: 'var(--text-primary)' }}>Key Conditions:</strong> (i) First pari passu charge on fixed assets ≥ ₹365 Cr FMRV; (ii) Personal guarantee of CMD; (iii) Quarterly financial covenants: DSCR ≥ 1.75x, D/E ≤ 2.0x; (iv) Promoter pledge to reduce to ≤30% within 18 months; (v) Satisfactory resolution of IT Tribunal matter within 24 months or adequate provisioning.
                            </div>
                        </div>

                        {/* Signatories */}
                        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            {[
                                { role: 'Credit Manager', name: 'Rajesh Kumar', date: '09.03.2024' },
                                { role: 'Zonal Credit Head', name: 'Sunita Verma', date: '' },
                                { role: 'Credit Committee Chair', name: 'Dr. A.K. Mehta', date: '' },
                            ].map((s, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 auto 8px' }} />
                                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{s.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.role}</div>
                                    {s.date && <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{s.date}</div>}
                                </div>
                            ))}
                        </div>

                        {/* AI Disclosure */}
                        <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                            <strong style={{ color: 'var(--text-secondary)' }}>AI Disclosure:</strong> This CAM was AI-generated by Intelli-Credit v2.0 using LLM + XGBoost + spaCy pipeline. Data sourced from submitted documents (OCR/NLP extracted), MCA21, eCourts, CIBIL TransUnion, and public news. AI model confidence: 97.3%. Final credit decision remains subject to human review and credit committee approval. Generated on 09 March 2024, 14:15 IST.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
