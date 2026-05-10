import React from 'react';
import {
  CreditCard, Wallet, Receipt, HelpCircle,
  Star, Info, MessageSquare, UserPlus, Briefcase, FileText, ChevronRight
} from 'lucide-react';
import './ProfilePage.css';

/* ── 2×2 Quick-Action card ── */
const ActionCard = ({ icon: Icon, label }) => (
  <button className="profile-action-card">
    <div className="profile-action-icon"><Icon size={22} /></div>
    <span className="profile-action-label">{label}</span>
  </button>
);

/* ── Full-width list row ── */
const ListRow = ({ label }) => (
  <button className="profile-list-row">
    <span>{label}</span>
    <ChevronRight size={18} className="profile-row-chevron" />
  </button>
);

const ProfilePage = () => {
  return (
    <div className="profile-page">
      {/* ── Header: name left, photo right ── */}
      <div className="profile-top">
        <div className="profile-name-block">
          <h1 className="profile-name">Breck A</h1>
          <p className="profile-subtitle">Profile Settings</p>
        </div>
        <img
          src="/images/breck.jpg"
          alt="Breck Abugan"
          className="profile-avatar-circle"
        />
      </div>

      {/* ── 2×2 action grid ── */}
      <div className="profile-action-grid">
        <ActionCard icon={CreditCard} label="Payment" />
        <ActionCard icon={Receipt}    label="Receipts" />
        <ActionCard icon={Wallet}     label="Check Balances" />
        <ActionCard icon={HelpCircle} label="Support" />
      </div>

      {/* ── Full-width list rows ── */}
      <div className="profile-list">
        <ListRow label="Nutrition Allergen Info" />
        <ListRow label="Rate Order" />
        <ListRow label="Survey & Input" />
        <ListRow label="Dining Support Form" />
        <ListRow label="Invite A Friend" />
        <ListRow label="Dining Services is Hiring!" />
      </div>
    </div>
  );
};

export default ProfilePage;
