"use client";
import React, { useState } from "react";
import { IoMailOutline, IoMailUnreadOutline } from "react-icons/io5";
import { FaRegUserCircle, FaOutdent, FaBars, FaTimes, FaHome, FaChartPie, FaUsers, FaCog, FaUserPlus } from "react-icons/fa";
import { LuSquareMenu } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import "./NavigationLayout.css";
// import { removeToken } from "@/lib";
import { useRouter } from "next/navigation";
import Link from 'next/link'

interface NavigationLayoutProps {
  children: React.ReactNode;
}

const SidebarNavLink = ({ href, children, icon: Icon }: { href: string, children: React.ReactNode, icon: any }) => (
  <Link href={href} className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200">
    <Icon className="text-xl" />
    <span>{children}</span>
  </Link>
)

const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  const navigation = useRouter()
  const [loading, setLoading] = useState(false);
  const [sidenav, setSidenav] = useState(false);
  const [mobileNav, setMobileNav] = useState(false)

  const messages = true;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Overlay for mobile */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Sidebar Space */}
      <div className="hidden lg:block min-w-64" />

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 w-64 min-h-screen bg-white dark:bg-gray-800 shadow-md transition-transform duration-300
        ${mobileNav ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/ZITFUSE LOGO 3.png" alt="Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                ZitFuse
              </span>
            </div>
            <button
              className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              onClick={() => setMobileNav(false)}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="px-3 py-4 space-y-6">
          <div className="space-y-1">
            <SidebarNavLink href="/" icon={FaHome}>Dashboard</SidebarNavLink>
            <SidebarNavLink href="/demography" icon={FaChartPie}>Demography</SidebarNavLink>
            <SidebarNavLink href="/revenue" icon={FaUsers}>Revenue</SidebarNavLink>
          </div>

          <div className="space-y-1">
            <SidebarNavLink href="/admin" icon={FaUserPlus}>New Admin</SidebarNavLink>
            <SidebarNavLink href="/settings" icon={FaCog}>Settings</SidebarNavLink>
          </div>

          <div className="px-3 pt-6">
            <button
              onClick={() => {
                navigation.push('/login')
                removeToken()
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
            >
              <span className="font-medium">Sign Out</span>
              <FaOutdent className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                onClick={() => setMobileNav(true)}
              >
                <FaBars className="text-xl" />
              </button>
            </div>
            <div className="flex items-center w-full justify-end space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                <FaUsers className="text-gray-500 dark:text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavigationLayout;
