'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { eventsIcon, organizationsIcon } from '@/app/lib/icons';

const navigation = [
  { name: 'Events', href: '/student-admin/events', icon: eventsIcon },
  { name: 'Organizations', href: '/student-admin/organizations', icon: organizationsIcon },
];

export default function StudentAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        console.log('Student admin check - session data:', data); // Debug log
        const user = data?.user || data;
        if (!user) {
          // Not logged in, redirect to signin
          console.log('User not logged in, redirecting...');
          router.push('/signin');
          return;
        }
        if (user?.is_admin) {
          // Admins should use admin panel, not student portal
          console.log('Admin user, redirecting to admin panel...');
          router.push('/admin');
          return;
        }
        setSession(data);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/signin');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const user = session?.user || session;
  if (!user) {
    return null; // Will redirect in useEffect
  }

  const isActive = (href: string) => {
    if (href === '/student-admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-green-700 hover:text-green-800 focus:outline-none font-bold flex-shrink-0"
              >
                <span className="text-xl sm:text-2xl">{sidebarOpen ? '☰' : '☰'}</span>
              </button>
              <h1 className="ml-2 sm:ml-4 text-sm sm:text-xl font-bold text-gray-900 truncate">
                USC-VT Student Portal
              </h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link
                href="/"
                className="text-gray-900 hover:text-green-700 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 cursor-pointer"
              >
                <span>←</span>
                <span className="hidden sm:inline">Back to Map</span>
                <span className="sm:hidden">Map</span>
              </Link>
              <button 
                onClick={handleSignOut}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 overflow-y-auto`}
        >
          <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2 mt-14 sm:mt-0">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                    active
                      ? 'bg-green-50 text-black font-bold'
                      : 'text-black hover:bg-green-50'
                  }`}
                >
                  <Image src={item.icon} alt="" width={18} height={18} className="sm:w-5 sm:h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-3 sm:p-6 lg:p-8 min-w-0 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}
