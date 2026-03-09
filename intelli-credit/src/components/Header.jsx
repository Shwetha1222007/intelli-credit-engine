import { Bell, Cpu, RefreshCw, Search, Zap } from 'lucide-react'

export default function Header({ title, subtitle }) {
    return (
        <header className="top-header">
            <div>
                <div className="header-title">{title}</div>
                <div className="header-subtitle">{subtitle}</div>
            </div>
            <div className="header-actions">
                <div className="header-badge">
                    <div className="status-dot" />
                    AI Engine Active
                </div>
                <div className="header-badge" style={{ background: 'rgba(245,166,35,0.1)', borderColor: 'rgba(245,166,35,0.3)', color: 'var(--accent-gold)' }}>
                    <Cpu size={12} />
                    RBI Compliant
                </div>
                <button className="btn btn-secondary btn-sm" style={{ padding: '6px 10px' }}>
                    <Bell size={14} />
                </button>
            </div>
        </header>
    )
}
