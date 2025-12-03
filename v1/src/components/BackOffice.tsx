import { useState } from 'react';
import { motion } from 'motion/react';
import { Dashboard } from './backoffice/Dashboard';
import { UserManagement } from './backoffice/UserManagement';
import { ContentManagement } from './backoffice/ContentManagement';
import { Analytics } from './backoffice/Analytics';
import { Settings } from './backoffice/Settings';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings as SettingsIcon,
  LogOut,
  Sparkles
} from 'lucide-react';
import logoImage from 'figma:asset/bbc7e7be3abb244bf87b69f0d4ce2499833be811.png';

type MenuItem = 'dashboard' | 'users' | 'content' | 'analytics' | 'settings';

interface BackOfficeProps {
  onExit?: () => void;
}

export function BackOffice({ onExit }: BackOfficeProps = {}) {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');

  const handleLogout = () => {
    if (onExit) {
      onExit();
    }
  };

  const menuItems = [
    { id: 'dashboard' as MenuItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as MenuItem, label: 'Users', icon: Users },
    { id: 'content' as MenuItem, label: 'Content', icon: FileText },
    { id: 'analytics' as MenuItem, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as MenuItem, label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#7F5AF0]/20 via-[#1B1B2F]/40 to-[#0D0D12]"></div>
        
        {/* Animated stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#7F5AF0]/30 blur-[100px]"
          style={{ top: '10%', left: '20%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-[#1B1B2F]/60 backdrop-blur-sm border-r border-[#7F5AF0]/30 flex flex-col"
        >
          {/* Logo */}
          <div className="p-6 border-b border-[#7F5AF0]/30">
            <motion.img
              src={logoImage}
              alt="Galactic Star Astrology"
              className="w-full h-auto mb-2"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="flex items-center justify-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-[#FFCB6B]" />
              <p className="text-[#F7EDEA] text-sm">Back Office</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.4)]'
                      : 'text-[#E0E0E0] hover:bg-[#7F5AF0]/10 hover:text-[#F7EDEA]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#7F5AF0]/30">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#E0E0E0] hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Exit to App</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
