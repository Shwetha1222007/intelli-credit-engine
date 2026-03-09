import { useState } from 'react'
import { FileText, Download, Printer, Share2, CheckCircle, Clock, Eye, ShieldCheck, Loader2 } from 'lucide-react'

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

export default function CAMReport() {
    const [generating, setGenerating] = useState(false)
    const [generated, setGenerated] = useState(true)
    const [activeSection, setActiveSection] = useState('company')
    const [genStep, setGenStep] = useState(0)

    const handleGenerate = () => {
        setGenerating(true)
        setGenerated(false)
        let step = 0
        const interval = setInterval(() => {
            if (step >= camSections.length - 1) {
                clearInterval(interval)
                setGenerating(false)
                setGenerated(true)
            }
            setGenStep(step++)
        }, 300)
    }

    const printReport = () => {
        window.print()
    }

    return (
        <div>
            {/* Top Controls */}
            <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span className={`badge ${generated ? 'badge-emerald' : 'badge-gold'}`}>{generated ? '✓ CAM Generated' : '⟳ Processing'}</span>
                        <span className="badge badge-blue">RBI Compliant</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary btn-sm" onClick={handleGenerate} disabled={generating}>
                        {generating ? <RefreshCw size={14} className="spin" /> : 'Regenerate CAM'}
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={printReport}>
                        <Printer size={14} /> Print Report
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <Download size={14} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Generation Overlay */}
            {generating && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,14,24,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="card" style={{ width: '400px', padding: '32px', textAlign: 'center' }}>
                        <Loader2 size={40} className="spin" style={{ color: 'var(--primary-400)', marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Assembling Section {genStep + 1}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>{camSections[genStep].label}</p>
                        <div className="progress-bar"><div className="progress-fill blue" style={{ width: `${(genStep / camSections.length) * 100}%` }} /></div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', gap: '24px' }}>
                {/* Fixed Nav */}
                <div className="no-print" style={{ width: '220px', flexShrink: 0 }}>
                    <div className="card" style={{ position: 'sticky', top: '80px', padding: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>Report Sections</div>
                        {camSections.map((s, i) => (
                            <div key={s.id} onClick={() => setActiveSection(s.id)} style={{
                                padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '12.5px', marginBottom: '2px',
                                background: activeSection === s.id ? 'rgba(37,65,178,0.2)' : 'transparent',
                                color: activeSection === s.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: activeSection === s.id ? 700 : 400, display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeSection === s.id ? 'var(--primary-400)' : 'transparent', border: '1px solid var(--surface-border)' }} />
                                {s.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Report Content */}
                <div className="cam-document-container" style={{ flex: 1, background: '#fff', color: '#1a1a1a', borderRadius: 'var(--radius-lg)', padding: '60px 80px', minHeight: '1200px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', fontFamily: "'Inter', sans-serif" }}>
                    {/* Header Block */}
                    <div style={{ borderBottom: '2px solid #2541b2', paddingBottom: '30px', marginBottom: '40px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: '10px' }}>Strictly Confidential — Internally Generated</div>
                        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1a1a1a', marginBottom: '5px' }}>INTELLI-CREDIT ENGINE</h1>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#444' }}>Credit Appraisal Memorandum (CAM)</h2>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '13px', color: '#666' }}>
                            <span><strong>Case ID:</strong> IC-2024-0893</span>
                            <span><strong>Date:</strong> 09-Mar-2024</span>
                            <span><strong>Status:</strong> FINAL</span>
                        </div>
                    </div>

                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', fontSize: '18px', color: '#2541b2', fontWeight: 800 }}>1. APPLICANT OVERVIEW</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', marginTop: '20px', marginBottom: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '10px' }}>Agrawal Textiles Pvt Ltd</h3>
                            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#444' }}>Incorporated in 2008. Leading manufacturer of premium cotton fabric for EU and US markets. Operates 4 manufacturing units across Maharashtra and Gujarat.</p>
                            <div style={{ marginTop: '20px' }}>
                                {[
                                    ['CIN', 'U17111MH2008PTC184765'],
                                    ['Sector', 'Textile - Manufacturing'],
                                    ['CIBIL', '782 (Prime)'],
                                    ['Risk Rating', 'BB+ (Watch List)']
                                ].map(([k, v], i) => (
                                    <div key={i} style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
                                        <span style={{ width: '100px', color: '#888', fontWeight: 600 }}>{k}</span>
                                        <span style={{ fontWeight: 700 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: '#f8faff', border: '1px solid #e1e8f5', borderRadius: '12px', padding: '24px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#2541b2', marginBottom: '16px', textTransform: 'uppercase' }}>Proposed Sanction</h3>
                            {[
                                ['Limit Request', '₹250.00 Cr'],
                                ['AI Rec Limit', '₹200.00 Cr'],
                                ['Rate (ROI)', '10.75% p.a.'],
                                ['Tenor', '84 Months'],
                                ['Collateral Cover', '180%']
                            ].map(([k, v], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #dee', fontSize: '13px' }}>
                                    <span style={{ color: '#666' }}>{k}</span>
                                    <span style={{ fontWeight: 800, color: '#1a1a1a' }}>{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', fontSize: '18px', color: '#2541b2', fontWeight: 800, marginTop: '40px' }}>2. AI RISK SCORE & SUMMARY</h2>
                    <div style={{ background: '#fcfcfc', border: '1px solid #eee', padding: '30px', borderRadius: '12px', display: 'flex', gap: '40px', alignItems: 'center', marginTop: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', fontWeight: 900, color: '#f5a623' }}>67</div>
                            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#aaa' }}>Score / 100</div>
                        </div>
                        <div style={{ flex: 1, fontSize: '14px', lineHeight: 1.8, color: '#444' }}>
                            <strong>AI Rationale:</strong> Assessment indicates strong operational efficiency (18.7% EBITDA) but flags <strong>Promoter Pledge (38.4%)</strong> as a key refinement risk. Sector outlook for Textiles is <em>Cautious</em> due to commodity inflation. Collateral coverage is excellent at 1.8x. Verdict: <strong>Conditional Approval recommended.</strong>
                        </div>
                    </div>

                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', fontSize: '18px', color: '#2541b2', fontWeight: 800, marginTop: '40px' }}>3. REPAYMENT CAPACITY (DSCR)</h2>
                    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead style={{ background: '#f5f5f5' }}>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '12px', border: '1px solid #ddd' }}>Metric</th>
                                <th style={{ textAlign: 'right', padding: '12px', border: '1px solid #ddd' }}>FY2022</th>
                                <th style={{ textAlign: 'right', padding: '12px', border: '1px solid #ddd' }}>FY2023</th>
                                <th style={{ textAlign: 'right', padding: '12px', border: '1px solid #ddd' }}>FY2024</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Revenue (INR Cr)', '2,214', '2,541', '2,847'],
                                ['EBITDA (INR Cr)', '358', '446', '533'],
                                ['DSCR (x)', '1.74', '1.96', '2.18']
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 600 }}>{row[0]}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>{row[1]}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right' }}>{row[2]}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 800 }}>{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ textAlign: 'center', width: '200px' }}>
                            <div style={{ borderTop: '1px solid #000', paddingTop: '10px', fontSize: '12px', fontWeight: 700 }}>CREDIT MANAGER</div>
                            <div style={{ fontSize: '11px', color: '#666' }}>ID: Rajesh Kumar</div>
                        </div>
                        <div style={{ textAlign: 'center', width: '200px' }}>
                            <div style={{ borderTop: '1px solid #000', paddingTop: '10px', fontSize: '12px', fontWeight: 700 }}>ZONAL HEAD</div>
                            <div style={{ fontSize: '11px', color: '#666' }}>Pending Approval</div>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px', fontSize: '10px', color: '#999', textAlign: 'center', fontStyle: 'italic' }}>
                        Disclaimer: This report is automatically generated using Intelli-Credit AI models.
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .cam-document-container { 
                        box-shadow: none !important; 
                        margin: 0 !important; 
                        width: 100% !important;
                    }
                }
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    )
}
