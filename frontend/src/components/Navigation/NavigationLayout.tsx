"use client";
import React, {  useState } from "react";
import { FaOutdent, FaBars, FaTimes, FaHome,  FaCog, FaUserPlus, FaCalendarCheck, FaPills, FaUser, FaDollarSign, FaSearch } from "react-icons/fa";
import "./NavigationLayout.css";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link'
import { BsBell } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { removeToken } from "@/lib";
interface NavigationLayoutProps {
  children: React.ReactNode;
}



const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  const navigation = useRouter()
  const router = usePathname();
  const [loading, setLoading] = useState(false);
  const [sidenav, setSidenav] = useState(false);
  const [mobileNav, setMobileNav] = useState(false)


  const SidebarNavLink = ({ href, children, icon: Icon }: { href: string, children: React.ReactNode, icon: any }) => {
    const isActive = router === href;
    return (
      <Link href={href} className={`flex hover:scale-110 transition-all duration-300 relative items-center space-x-3 px-4 py-3 text-gray-600    rounded-lg transition-all duration-200 ${isActive ? "bg-white text-[#718EBF] bg-opacity-20" : ""}`}>
        {isActive ? 
        <div className="w-[10px] absolute left-0 rounded-r-md bg-[#718EBF] h-full"></div>
        : <></>
        }
      <Icon className="text-xl" />
      <span>{children}</span>
    </Link>
  )}

  const messages = true;
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Overlay for mobile */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Sidebar Space */}
      <div className="hidden lg:block min-w-40" />

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bg-white z-50 w-40 min-h-screen flex flex-col shadow-md transition-transform duration-300
        ${mobileNav ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                TMDb
              </span>
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-100"
              onClick={() => setMobileNav(false)}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="grow  py-4 justify-between flex flex-col space-y-6">
          <div className="flex flex-col space-y-6">
            <div className="space-y-1">
              <SidebarNavLink href="/" icon={FaHome}>Dashboard</SidebarNavLink>
              <SidebarNavLink href="/stuff" icon={FaUser}> stuff </SidebarNavLink>
              <SidebarNavLink href="/patients" icon={FaUserGroup}> patients </SidebarNavLink>
              {/* <SidebarNavLink href="/Appointments" icon={FaCalendarCheck}> Appointments </SidebarNavLink>
              <SidebarNavLink href="/Performance/Efficiency" icon={FaCog}> Performance/Efficiency </SidebarNavLink>
              <SidebarNavLink href="/Insights" icon={FaDollarSign}>  Insights </SidebarNavLink> */}
            </div>

            <div className="space-y-1">
              {/* <SidebarNavLink href="/admin" icon={FaUserPlus}>Add Student</SidebarNavLink> */}
            </div>
          </div>

          <div className="px-3 pt-6">
            <button
              onClick={() => {
                removeToken()
                navigation.push('/login')
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
        <div className="sticky top-0 z-40 bg-white  shadow-md transition-colors duration-200">
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
             
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300  flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-gray-200 ">
                  <BsBell className="text-gray-500 " />
                </div>
                
                <div className="w-10 h-10 rounded-full bg-gray-300  flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-gray-200">
                  <FaCog className="text-gray-500 " />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300  flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-gray-200 ">
                  <FaUser className="text-gray-500 " />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-2 bg-gray-100 min-h-screen pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavigationLayout;
