import { useState } from 'react'
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts'
import { CheckCircle, XCircle, AlertTriangle, Zap, Brain, TrendingUp, Info } from 'lucide-react'

const defaultFiveCData = [
    {
        id: 'character',
        letter: 'C1', name: 'Character', fullName: 'Promoter Credibility',
        score: 68, color: '#2541b2', weight: 20,
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
        id: 'capacity',
        letter: 'C2', name: 'Capacity', fullName: 'Repayment Ability',
        score: 74, color: '#00d98b', weight: 25,
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
        id: 'capital',
        id_str: 'capital',
        letter: 'C3', name: 'Capital', fullName: 'Financial Strength',
        score: 62, color: '#f5a623', weight: 20,
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
        id: 'collateral',
        letter: 'C4', name: 'Collateral', fullName: 'Asset Backing',
        score: 80, color: '#8b5cf6', weight: 20,
        factors: [
            { name: 'FMRV of security (₹365 Cr)', score: 9, weight: 35 },
            { name: 'Coverage ratio (146%)', score: 8, weight: 30 },
            { name: 'Asset quality', score: 8, weight: 20 },
            { name: 'Enforceability', score: 7, weight: 15 },
        ],
        insight: 'Collateral coverage of 146% provides good security cushion for lenders.',
    },
    {
        id: 'conditions',
        letter: 'C5', name: 'Conditions', fullName: 'Industry & Economy',
        score: 55, color: '#06b6d4', weight: 15,
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
    const [fiveCData, setFiveCData] = useState(defaultFiveCData)

    const totalScore = Math.round(
        fiveCData.reduce((acc, c) => acc + (c.score * c.weight) / 100, 0)
    )

    const decision = totalScore >= 75 ? 'APPROVED' : totalScore >= 60 ? 'CONDITIONAL' : 'REJECTED'
    const decisionColor = decision === 'APPROVED' ? 'var(--accent-emerald)' : decision === 'CONDITIONAL' ? 'var(--accent-gold)' : 'var(--accent-ruby)'

    const radarData = fiveCData.map(c => ({
        subject: c.name,
        score: c.score,
        fullMark: 100
    }))

    const updateWeight = (id, newWeight) => {
        setFiveCData(prev => prev.map(c => (c.id === id || c.id_str === id) ? { ...c, weight: parseInt(newWeight) } : c))
    }

    const ScoreGauge = ({ score, size = 140 }) => {
        const radius = (size / 2) - 10
        const circumference = 2 * Math.PI * radius
        const dashOffset = circumference - (score / 100) * circumference
        const color = score >= 75 ? '#00d98b' : score >= 60 ? '#f5a623' : '#ff4d6d'
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
                    style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 8px ${color})` }}
                />
                <text x={size / 2} y={size / 2 - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill={color} fontFamily="Outfit, sans-serif">{score}</text>
                <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="11" fill="#8892b0">/ 100</text>
            </svg>
        )
    }

    const totalWeight = fiveCData.reduce((a, b) => a + b.weight, 0)

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
                transition: 'all 0.5s ease'
            }}>
                <ScoreGauge score={totalScore} size={140} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>AI Credit Decision</div>
                    <div style={{ fontSize: '36px', fontWeight: 900, fontFamily: 'Outfit', color: decisionColor, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {decision === 'APPROVED' ? <CheckCircle size={32} /> : decision === 'CONDITIONAL' ? <AlertTriangle size={32} /> : <XCircle size={32} />}
                        {decision === 'CONDITIONAL' ? 'CONDITIONAL APPROVAL' : decision}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 1.7 }}>
                        <strong style={{ color: 'var(--text-primary)' }}>AI Rationale:</strong> {
                            totalScore >= 75
                                ? "Loan strongly recommended for approval based on superior repayment capability and robust collateral backing."
                                : totalScore >= 60
                                    ? "Loan recommended for conditional approval with enhanced covenant package. Primary concerns: stretched capital structure and cautious sector outlook. Monitoring required."
                                    : "Loan not recommended. Risk score falls below institutional threshold due to critical weaknesses in capital and market conditions."
                        }
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)' }}>₹{totalScore > 75 ? '250' : totalScore > 60 ? '200' : '0'} Cr</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Sanctioned Limit</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-gold)' }}>{totalScore > 80 ? '9.5' : totalScore > 65 ? '10.75' : '12.5'}%</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Risk-based Rate</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '10px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: decisionColor }}>{totalScore >= 85 ? 'A' : totalScore >= 75 ? 'BBB' : totalScore >= 60 ? 'BB+' : 'BB-'}</div>
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
                                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{c.letter} • {c.weight}% Weight</div>
                                <div className="five-c-score" style={{ color: c.color }}>{c.score}</div>
                                <div className="five-c-label" style={{ color: c.color }}>{c.name}</div>
                                <div className="five-c-name">{c.fullName}</div>
                                <div style={{ marginTop: '8px' }}>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${c.score}%`, background: c.color }} />
                                    </div>
                                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>Contribution: {Math.round((c.score * c.weight) / 100)} pts</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Radar & Tuning */}
                    <div className="grid-2">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">🕸️ Five Cs Radar Assessment</div>
                                <div className="badge badge-blue">AI Benchmark</div>
                            </div>
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
                            <div className="card-header">
                                <div className="card-title">🎛️ AI Sensitivity Tuning</div>
                                <div className={`badge ${totalWeight === 100 ? 'badge-emerald' : 'badge-ruby'}`}>{totalWeight === 100 ? 'Weight Balanced' : `Weight mismatch: ${totalWeight}%`}</div>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Adjust individual C-weights to perform sensitivity analysis on the AI credit model.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {fiveCData.map(c => (
                                    <div key={c.id || c.name.toLowerCase()}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 600, color: c.color }}>{c.name} (Weight: {c.weight}%)</span>
                                            <span style={{ fontWeight: 700 }}>{Math.round((c.score * c.weight) / 100)} pts</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input
                                                type="range" min="0" max="40"
                                                value={c.weight}
                                                style={{ flex: 1, accentColor: c.color, height: '4px' }}
                                                onChange={(e) => updateWeight(c.id || c.name.toLowerCase(), e.target.value)}
                                            />
                                            <span style={{ minWidth: '30px', fontSize: '11px', color: 'var(--text-muted)' }}>{c.weight}%</span>
                                        </div>
                                    </div>
                                ))}
                                <div style={{
                                    marginTop: '10px', padding: '12px', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <div style={{ fontSize: '12px' }}>
                                        <div style={{ fontWeight: 700 }}>AI Predicted Score</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Normalized (Total / 100)</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '20px', fontWeight: 900, color: decisionColor }}>{totalScore}</div>
                                        <div style={{ fontSize: '10px', color: decisionColor, fontWeight: 700 }}>{decision}</div>
                                    </div>
                                </div>
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
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Factor weight in {c.letter}: {f.weight}%</div>
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
                            <strong>XGBoost + SHAP Explainability</strong> — The decision engine uses an ensemble model with full explainability. SHAP values indicate how much each feature contributed to the final score delta from the mean.
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
                        </div>

                        <div className="card">
                            <div className="card-title" style={{ marginBottom: '14px' }}>📝 Decision Explanation</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[
                                    { type: 'positive', text: 'DSCR of 2.18x indicates strong debt service capacity.' },
                                    { type: 'positive', text: 'Collateral coverage of 146% provides substantial cushion.' },
                                    { type: 'positive', text: 'Excellent CIBIL score (782) reflecting debt discipline.' },
                                    { type: 'negative', text: 'Promoter pledge (38.4%) is materially higher than industry average of 15%.' },
                                    { type: 'negative', text: 'Sector outlook for Textiles remains cautious due to cotton price volatility.' },
                                ].map((e, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', alignItems: 'flex-start' }}>
                                        <span style={{ color: e.type === 'positive' ? 'var(--accent-emerald)' : 'var(--accent-ruby)', flexShrink: 0 }}>
                                            {e.type === 'positive' ? '✅' : '⚠️'}
                                        </span>
                                        <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{e.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'conditions' && (
                <div className="card">
                    <div className="card-title" style={{ marginBottom: '16px' }}>📋 Recommended Sanction Conditions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { category: 'Financial', items: ['DSCR ≥ 1.75x', 'Debt/Equity ≤ 2.0x', 'Min Net Worth ₹500 Cr'] },
                            { category: 'Security', items: ['Fixed Asset Charge', 'Promoter Guarantee', 'Additional 5% Share Pledge'] },
                            { category: 'Monitoring', items: ['Quarterly Financials', 'Annual Audit', 'Monthly Site Visit'] },
                        ].map((section, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '14px 18px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-200)', marginBottom: '10px' }}>{section.category}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
                                    {section.items.map((item, j) => (
                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            <div style={{ width: '4px', height: '4px', background: 'var(--accent-emerald)', borderRadius: '50%' }} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
