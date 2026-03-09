import { useState } from 'react'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts'
import { CheckCircle, XCircle, AlertTriangle, Zap, Brain, TrendingUp, Info } from 'lucide-react'

const radarData = [
    { subject: 'Character', score: 68, fullMark: 100 },
    { subject: 'Capacity', score: 74, fullMark: 100 },
    { subject: 'Capital', score: 62, fullMark: 100 },
    { subject: 'Collateral', score: 80, fullMark: 100 },
    { subject: 'Conditions', score: 55, fullMark: 100 },
]

const fiveCData = [
    {
        letter: 'C1', name: 'Character', fullName: 'Promoter Credibility',
        score: 68, color: '#2541b2',
        factors: [
            { name: 'Industry experience (36 yrs)', score: 9, weight: 20 },
            { name: 'DIN Active / No disqualification', score: 10, weight: 15 },
            { name: 'Promoter pledge (38.4%)', score: 4, weight: 25 },
            { name: 'CIBIL Score (782)', score: 8, weight: 20 },
            { name: 'Past defaults (None)', score: 10, weight: 20 },
        ],
        insight: 'High promoter pledge is a concern. No past defaults strengthen credibility.',
    },
    {
        letter: 'C2', name: 'Capacity', fullName: 'Repayment Ability',
        score: 74, color: '#00d98b',
        factors: [
            { name: 'DSCR (2.18x)', score: 8, weight: 30 },
            { name: 'ICR (3.4x)', score: 7, weight: 20 },
            { name: 'Operating Cash Flow', score: 8, weight: 25 },
            { name: 'Working capital cycle', score: 6, weight: 15 },
            { name: 'Revenue stability', score: 7, weight: 10 },
        ],
        insight: 'Strong DSCR of 2.18x well above 1.5x threshold. Adequate repayment capacity.',
    },
    {
        letter: 'C3', name: 'Capital', fullName: 'Financial Strength',
        score: 62, color: '#f5a623',
        factors: [
            { name: 'Net worth (₹686 Cr)', score: 7, weight: 25 },
            { name: 'Debt/Equity (1.82x)', score: 5, weight: 30 },
            { name: 'EBITDA margin (18.7%)', score: 8, weight: 20 },
            { name: 'Promoter contribution', score: 7, weight: 15 },
            { name: 'Contingent liabilities', score: 3, weight: 10 },
        ],
        insight: 'D/E ratio slightly stretched at 1.82x. Contingent liabilities add risk.',
    },
    {
        letter: 'C4', name: 'Collateral', fullName: 'Asset Backing',
        score: 80, color: '#8b5cf6',
        factors: [
            { name: 'FMRV of security (₹365 Cr)', score: 9, weight: 35 },
            { name: 'Coverage ratio (146%)', score: 8, weight: 30 },
            { name: 'Asset quality', score: 8, weight: 20 },
            { name: 'Enforceability', score: 7, weight: 15 },
        ],
        insight: 'Collateral coverage of 146% provides good security cushion for lenders.',
    },
    {
        letter: 'C5', name: 'Conditions', fullName: 'Industry & Economy',
        score: 55, color: '#06b6d4',
        factors: [
            { name: 'Sector outlook (Cautious)', score: 5, weight: 30 },
            { name: 'Cotton price risk', score: 4, weight: 25 },
            { name: 'Export demand (Stable)', score: 7, weight: 20 },
            { name: 'PLI scheme benefit', score: 8, weight: 15 },
            { name: 'Regulatory compliance', score: 7, weight: 10 },
        ],
        insight: 'Sector under pressure from commodity prices. PLI scheme a positive offset.',
    },
]

const featureImportance = [
    { name: 'DSCR', importance: 18.4, positive: true },
    { name: 'Promoter Pledge', importance: 14.2, positive: false },
    { name: 'D/E Ratio', importance: 12.8, positive: false },
    { name: 'CIBIL Score', importance: 11.3, positive: true },
    { name: 'EBITDA Margin', importance: 10.1, positive: true },
    { name: 'Litigation Exposure', importance: 8.7, positive: false },
    { name: 'Collateral Cover', importance: 8.2, positive: true },
    { name: 'Sector Outlook', importance: 7.9, positive: false },
    { name: 'Revenue Growth', importance: 7.4, positive: true },
    { name: 'Tax Compliance', importance: 5.1, positive: true },
]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'rgba(13,17,23,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px' }}>
                <p style={{ color: '#8892b0', marginBottom: '4px', fontWeight: 600 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.fill || p.color, fontWeight: 600 }}>
                        {p.name}: <span style={{ color: '#f0f4ff' }}>{p.value}</span>
                    </p>
                ))}
            </div>
        )
    }
    return null
}

export default function RecommendationEngine() {
    const [selectedC, setSelectedC] = useState(null)
    const [activeTab, setActiveTab] = useState('overview')

    const totalScore = Math.round(fiveCData.reduce((acc, c) => acc + c.score, 0) / fiveCData.length)
    const decision = totalScore >= 70 ? 'APPROVED' : totalScore >= 55 ? 'CONDITIONAL' : 'REJECTED'
    const decisionColor = decision === 'APPROVED' ? 'var(--accent-emerald)' : decision === 'CONDITIONAL' ? 'var(--accent-gold)' : 'var(--accent-ruby)'

    const ScoreGauge = ({ score, size = 140 }) => {
        const radius = (size / 2) - 10
        const circumference = 2 * Math.PI * radius
        const dashOffset = circumference - (score / 100) * circumference
        const color = score >= 70 ? '#00d98b' : score >= 55 ? '#f5a623' : '#ff4d6d'
        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle
                    cx={size / 2} cy={size / 2} r={radius} fill="none"
                    stroke={color} strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: 'stroke-dashoffset 1.5s ease', filter: `drop-shadow(0 0 8px ${color})` }}
                />
                <text x={size / 2} y={size / 2 - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill={color} fontFamily="Outfit, sans-serif">{score}</text>
                <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="11" fill="#8892b0">/ 100</text>
            </svg>
        )
    }

    return (
        <div>
            {/* Decision Banner */}
            <div style={{
                background: decision === 'APPROVED' ? 'rgba(0,217,139,0.08)' : decision === 'CONDITIONAL' ? 'rgba(245,166,35,0.08)' : 'rgba(255,77,109,0.08)',
                border: `1px solid ${decisionColor}33`,
                borderRadius: 'var(--radius-xl)',
                padding: '28px 32px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                flexWrap: 'wrap',
            }}>
                <ScoreGauge score={totalScore} size={140} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>AI Credit Decision</div>
                    <div style={{ fontSize: '36px', fontWeight: 900, fontFamily: 'Outfit', color: decisionColor, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {decision === 'APPROVED' ? <CheckCircle size={32} /> : decision === 'CONDITIONAL' ? <AlertTriangle size={32} /> : <XCircle size={32} />}
                        {decision === 'CONDITIONAL' ? 'CONDITIONAL APPROVAL' : decision}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--text-primary)' }}>AI Rationale:</strong> Loan recommended for conditional approval with enhanced covenant package. Adequate DSCR (2.18x) and strong collateral coverage (146%). Primary concerns: elevated promoter pledge (38.4%), stretched D/E ratio (1.82x), and cautious sector outlook. Recommend quarterly financial covenant monitoring and promoter de-pledge milestone.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)' }}>₹200 Cr</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Sanctioned Limit</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)' }}>10.75%</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Risk-based Rate</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)' }}>7 Years</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Recommended Tenor</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: decisionColor }}>{decision === 'CONDITIONAL' ? 'BB+' : decision === 'APPROVED' ? 'BBB' : 'BB-'}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Internal Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="pill-tabs" style={{ marginBottom: '20px', width: 'fit-content' }}>
                {['overview', 'five-cs', 'explainability', 'conditions'].map(t => (
                    <button key={t} className={`pill-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} id={`tab-rec-${t}`}>
                        {t === 'overview' ? '📊 Score Overview' : t === 'five-cs' ? '🎯 Five Cs Analysis' : t === 'explainability' ? '🔍 XAI Explainability' : '📋 Conditions'}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div>
                    {/* Five Cs Summary Cards */}
                    <div className="five-c-grid" style={{ marginBottom: '24px' }}>
                        {fiveCData.map((c, i) => (
                            <div
                                key={i} className="five-c-card"
                                style={{ borderTop: `3px solid ${c.color}`, cursor: 'pointer', background: selectedC === i ? 'rgba(255,255,255,0.05)' : '' }}
                                onClick={() => setSelectedC(selectedC === i ? null : i)}
                                id={`card-five-c-${c.letter.toLowerCase()}`}
                            >
                                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{c.letter}</div>
                                <div className="five-c-score" style={{ color: c.color }}>{c.score}</div>
                                <div className="five-c-label" style={{ color: c.color }}>{c.name}</div>
                                <div className="five-c-name">{c.fullName}</div>
                                <div style={{ marginTop: '8px' }}>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${c.score}%`, background: c.color }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Radar Chart */}
                    <div className="grid-2">
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '10px' }}>🕸️ Five Cs Radar Assessment</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#8892b0' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#4a5568' }} />
                                    <Radar name="Score" dataKey="score" stroke="#2541b2" fill="#2541b2" fillOpacity={0.25} strokeWidth={2} dot={{ fill: '#5577f0', r: 4 }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '10px' }}>📈 Key Financial Ratios vs Benchmark</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {[
                                    { label: 'DSCR', actual: 2.18, benchmark: 1.5, unit: 'x', positive: true },
                                    { label: 'Current Ratio', actual: 2.14, benchmark: 1.5, unit: 'x', positive: true },
                                    { label: 'Debt / Equity', actual: 1.82, benchmark: 2.0, unit: 'x', positive: true },
                                    { label: 'EBITDA Margin', actual: 18.7, benchmark: 12, unit: '%', positive: true },
                                    { label: 'ICR', actual: 3.4, benchmark: 2.5, unit: 'x', positive: true },
                                    { label: 'NPA Risk Score', actual: 22, benchmark: 30, unit: '/100', positive: false },
                                ].map((r, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 600 }}>{r.label}</span>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Benchmark: {r.benchmark}{r.unit}</span>
                                                <span style={{ fontWeight: 700, color: r.positive ? 'var(--accent-emerald)' : 'var(--accent-ruby)' }}>
                                                    {r.actual}{r.unit} {r.positive ? '✓' : '⚠'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{
                                                width: `${Math.min((r.actual / (r.benchmark * 1.5)) * 100, 100)}%`,
                                                background: r.positive ? 'var(--gradient-emerald)' : 'var(--gradient-ruby)'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'five-cs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {fiveCData.map((c, i) => (
                        <div key={i} className="card" style={{ borderLeft: `3px solid ${c.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: c.color, fontFamily: 'Outfit' }}>{c.letter}</div>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: 800 }}>{c.name} — {c.fullName}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.insight}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: 900, color: c.color, fontFamily: 'Outfit' }}>{c.score}<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/100</span></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                                {c.factors.map((f, j) => (
                                    <div key={j} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>{f.name}</span>
                                            <span style={{ fontWeight: 700, color: c.color }}>{f.score}/10</span>
                                        </div>
                                        <div className="progress-bar" style={{ height: '4px' }}>
                                            <div className="progress-fill" style={{ width: `${f.score * 10}%`, background: c.color }} />
                                        </div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Weight: {f.weight}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'explainability' && (
                <div>
                    <div className="alert-box info" style={{ marginBottom: '20px' }}>
                        <Brain size={16} />
                        <div>
                            <strong>XGBoost + SHAP Explainability</strong> — The decision engine uses an ensemble XGBoost model trained on 12 years of Indian corporate credit data (47,000+ observations). SHAP values explain each factor's contribution to the final score.
                        </div>
                    </div>

                    <div className="grid-2" style={{ marginBottom: '20px' }}>
                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>🔑 Feature Importance (SHAP Values)</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={featureImportance} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                                    <XAxis type="number" tick={{ fontSize: 10, fill: '#8892b0' }} axisLine={false} tickLine={false} />
                                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#8892b0' }} axisLine={false} tickLine={false} width={100} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="importance" name="Importance %" radius={[0, 4, 4, 0]}>
                                        {featureImportance.map((entry, index) => (
                                            <Cell key={index} fill={entry.positive ? '#00d98b' : '#ff4d6d'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '11px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)' }}><div style={{ width: '10px', height: '10px', background: '#00d98b', borderRadius: '2px' }} /> Positive Factor</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-ruby)' }}><div style={{ width: '10px', height: '10px', background: '#ff4d6d', borderRadius: '2px' }} /> Risk Factor</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>📝 Decision Explanation (Plain Language)</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { type: 'positive', text: 'DSCR of 2.18x (benchmark 1.5x) indicates strong debt service ability from operations.' },
                                    { type: 'positive', text: 'Collateral coverage of 146% provides adequate security for the proposed exposure.' },
                                    { type: 'positive', text: 'No historical defaults or DPD in last 36 months per CIBIL bureau data.' },
                                    { type: 'positive', text: 'EBITDA margin of 18.7% above textile sector average of 12%, reflecting operational efficiency.' },
                                    { type: 'negative', text: 'Promoter pledge of 38.4% creates refinancing risk and signals potential liquidity stress at promoter level.' },
                                    { type: 'negative', text: 'D/E ratio of 1.82x is elevated. Additional debt of ₹250 Cr would further stress the balance sheet.' },
                                    { type: 'negative', text: 'Income Tax Tribunal demand of ₹34.6 Cr remains unresolved — contingent liability risk.' },
                                    { type: 'negative', text: 'Textile sector facing cotton price inflation of 18% YoY, compressing margins industry-wide.' },
                                ].map((e, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', alignItems: 'flex-start' }}>
                                        <span style={{ color: e.type === 'positive' ? 'var(--accent-emerald)' : 'var(--accent-ruby)', flexShrink: 0, marginTop: '2px' }}>
                                            {e.type === 'positive' ? '✅' : '⚠️'}
                                        </span>
                                        <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{e.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '16px', background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 'var(--radius-sm)', padding: '12px', fontSize: '13px', color: 'var(--accent-gold-light)' }}>
                                <strong>Final AI Verdict:</strong> Conditional approval recommended at ₹200 Cr (vs ₹250 Cr requested) at 10.75% with quarterly financial covenants and de-pledge milestone for promoter.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'conditions' && (
                <div>
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-title" style={{ marginBottom: '16px' }}>📋 Recommended Sanction Conditions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { category: 'Financial Covenants', items: ['DSCR ≥ 1.75x (tested quarterly)', 'Debt/Equity ≤ 2.0x at all times', 'Minimum EBITDA of ₹480 Cr per annum', 'Current Ratio ≥ 1.5x'] },
                                { category: 'Security', items: ['First pari passu charge on fixed assets ₹365 Cr', 'Personal guarantee of Mr. Vikram Agrawal (CMD)', 'Post-dated cheques for 12 installments', 'Pledge of additional 5% promoter shares'] },
                                { category: 'Information Undertakings', items: ['Quarterly financial statements within 45 days', 'Annual audited accounts within 120 days', 'Immediate notification of any legal notices > ₹5 Cr', 'Monthly stock statements for working capital'] },
                                { category: 'Milestones / Monitoring', items: ['Promoter pledge to reduce to ≤30% within 18 months', 'Resolution of IT Tribunal case within 24 months', 'Annual site inspection by credit officer', 'External rating review every 12 months'] },
                            ].map((section, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '14px 18px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-200)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{section.category}</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '6px' }}>
                                        {section.items.map((item, j) => (
                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                <span style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }}>→</span>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
