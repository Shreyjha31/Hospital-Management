import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, CreditCard, UserCog, FlaskRound as Flask, Pill, Building2 } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patients', icon: Users, label: 'Patients' },
  { path: '/appointments', icon: Calendar, label: 'Appointments' },
  { path: '/medical-records', icon: FileText, label: 'Medical Records' },
  { path: '/billing', icon: CreditCard, label: 'Billing' },
  { path: '/staff', icon: UserCog, label: 'Staff' },
  { path: '/laboratory', icon: Flask, label: 'Laboratory' },
  { path: '/medications', icon: Pill, label: 'Medications' },
  { path: '/equipment', icon: Building2, label: 'Equipment' }
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">HMS Admin</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;