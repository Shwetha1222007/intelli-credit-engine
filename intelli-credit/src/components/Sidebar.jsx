import {
    LayoutDashboard, Upload, Search, Brain, FileText,
    ClipboardList, Settings, Bell, ChevronRight,
    TrendingUp, Shield, Activity, Users
} from 'lucide-react'

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'ingestion', label: 'Data Ingestion', icon: Upload, badge: '3' },
    { id: 'research', label: 'Research Agent', icon: Search, badge: 'AI' },
    { id: 'recommendation', label: 'Decision Engine', icon: Brain, badge: null },
    { id: 'cam', label: 'CAM Generator', icon: FileText, badge: null },
    { id: 'tracker', label: 'App Tracker', icon: ClipboardList, badge: '12' },
]

export default function Sidebar({ currentPage, setCurrentPage }) {
    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-brand">
                    <div className="logo-icon">🏦</div>
                    <div className="logo-text">
                        <span className="logo-title">Intelli-Credit</span>
                        <span className="logo-subtitle">AI Credit Engine v2.0</span>
                    </div>
                </div>
            </div>

            <div className="sidebar-nav">
                <div className="nav-section-label">Main Modules</div>
                {navItems.map(item => {
                    const Icon = item.icon
                    return (
                        <div
                            key={item.id}
                            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => setCurrentPage(item.id)}
                            id={`nav-${item.id}`}
                        >
                            <div className="nav-item-icon">
                                <Icon size={17} />
                            </div>
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className="nav-badge">{item.badge}</span>
                            )}
                        </div>
                    )
                })}

                <div className="nav-section-label">System</div>
                <div className="nav-item">
                    <div className="nav-item-icon"><Bell size={17} /></div>
                    <span>Alerts & Notifications</span>
                    <span className="nav-badge" style={{ background: 'var(--gradient-ruby)' }}>5</span>
                </div>
                <div className="nav-item">
                    <div className="nav-item-icon"><Settings size={17} /></div>
                    <span>Configuration</span>
                </div>
            </div>

            <div className="sidebar-footer">
                <div className="user-card">
                    <div className="user-avatar">RK</div>
                    <div className="user-info">
                        <div className="user-name">Rajesh Kumar</div>
                        <div className="user-role">Senior Credit Manager</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
