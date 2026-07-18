'use client';

import { useEffect, useState } from 'react';
import { menuCategories, type MenuItem, type MenuCategory } from '@/constants/menu-data';
import { defaultSiteConfig, type SiteConfig } from '@/constants/site-config';
import { backendUrl } from '@/lib/backend';
import SubmissionsPanel from '@/components/admin/SubmissionsPanel';
import { 
  Lock, 
  LogOut, 
  Settings, 
  Utensils, 
  Inbox, 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Calendar, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  Image as ImageIcon,
  Check,
  ChevronRight,
  Upload
} from 'lucide-react';

const emptyMenuItem = (): MenuItem => ({
  id: `custom-${Date.now()}`,
  name: '',
  description: '',
  price: 0,
  category: 'meals',
  image: '/assets/tiffins-menu.jpg',
  isVeg: true,
  isSpicy: false,
  isPopular: false,
  isChefSpecial: false,
});

type TabType = 'overview' | 'settings' | 'menu' | 'inbox';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginSecret, setLoginSecret] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [dailySpecials, setDailySpecials] = useState(defaultSiteConfig.dailySpecialIds.join(', '));
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Stats data
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);

  // Menu Category Filter for Edit tab
  const [menuFilter, setMenuFilter] = useState<MenuCategory | 'all'>('all');

  // Verify session on mount
  useEffect(() => {
    const checkSession = async () => {
      const storedSecret = sessionStorage.getItem('admin_secret');
      if (storedSecret) {
        try {
          const response = await fetch(backendUrl('/api/admin/session'), {
            headers: { 'x-admin-secret': storedSecret },
            credentials: 'include',
          });
          const result = await response.json();
          if (result?.ok) {
            setSecret(storedSecret);
            setIsAuthenticated(true);
            await loadConfig();
            await loadSubmissionsData(storedSecret);
          } else {
            sessionStorage.removeItem('admin_secret');
          }
        } catch {
          // Ignore error on load, fallback to login screen
        }
      } else {
        // Check if cookie-based session is already active
        try {
          const response = await fetch(backendUrl('/api/admin/session'), {
            credentials: 'include',
          });
          const result = await response.json();
          if (result?.ok) {
            setIsAuthenticated(true);
            await loadConfig();
            await loadSubmissionsData('');
          }
        } catch {
          // Ignore error
        }
      }
      setCheckingSession(false);
    };

    void checkSession();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch(backendUrl('/api/site-config'), { cache: 'no-store' });
      const result = await response.json();
      if (result?.ok && result?.data) {
        setConfig(result.data as SiteConfig);
        setDailySpecials((result.data as SiteConfig).dailySpecialIds.join(', '));
      }
    } catch {
      // Keep defaults
    }
  };

  const loadSubmissionsData = async (adminSecretKey: string) => {
    setStatsLoading(true);
    try {
      const response = await fetch(backendUrl('/api/admin/submissions'), {
        headers: adminSecretKey ? { 'x-admin-secret': adminSecretKey } : {},
        credentials: 'include',
      });
      const result = await response.json();
      if (result?.ok && result?.data) {
        setSubmissions(result.data);
      }
    } catch {
      // Ignore
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginSecret.trim()) {
      setLoginError('Please enter the admin secret.');
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch(backendUrl('/api/admin/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret: loginSecret }),
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result?.ok) {
        setLoginError(result?.message || 'Invalid admin secret.');
        setLoginLoading(false);
        return;
      }

      // Login success
      sessionStorage.setItem('admin_secret', loginSecret);
      setSecret(loginSecret);
      setIsAuthenticated(true);
      await loadConfig();
      await loadSubmissionsData(loginSecret);
    } catch {
      setLoginError('Unable to connect to the server.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(backendUrl('/api/admin/logout'), {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore
    }
    sessionStorage.removeItem('admin_secret');
    setSecret('');
    setIsAuthenticated(false);
    setActiveTab('overview');
  };

  const save = async () => {
    const payload: SiteConfig = {
      ...config,
      dailySpecialIds: dailySpecials
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    setStatus('saving');
    setMessage('Saving changes...');

    try {
      const response = await fetch(backendUrl('/api/site-config'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(secret ? { 'x-admin-secret': secret } : {}),
        },
        body: JSON.stringify({ config: payload }),
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result?.ok) {
        setStatus('error');
        setMessage(result?.message || 'Failed to save site configuration.');
        return;
      }

      setConfig(payload);
      setStatus('saved');
      setMessage('Site configuration saved successfully.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch {
      setStatus('error');
      setMessage('Network error. Failed to save configuration.');
    }
  };

  // Image Upload Button Sub-component
  const ImageUploadButton = ({ onUploadComplete }: { onUploadComplete: (url: string) => void }) => {
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Limit file size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('File size is too large. Max limit is 5MB.');
        return;
      }

      setUploading(true);
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = await fetch(backendUrl('/api/admin/upload'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(secret ? { 'x-admin-secret': secret } : {}),
            },
            body: JSON.stringify({ image: reader.result as string }),
            credentials: 'include',
          });
          
          const result = await response.json();
          
          if (result?.ok && result?.url) {
            onUploadComplete(result.url);
          } else {
            alert(result?.message || 'Failed to upload photo.');
          }
        } catch {
          alert('Upload failed due to network error.');
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    };

    return (
      <label className="relative flex items-center justify-center rounded-xl bg-gold px-4 text-xs font-bold uppercase tracking-wider text-primary-green hover:bg-light-gold transition cursor-pointer shrink-0 min-w-[110px] text-center select-none shadow-luxury-sm">
        {uploading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-green border-t-transparent"></div>
        ) : (
          <span className="flex items-center gap-1"><Upload className="h-3.5 w-3.5" /> Upload</span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>
    );
  };

  // Compute Stats
  const reservationsCount = submissions.filter((s) => s.type === 'reservation').length;
  const contactsCount = submissions.filter((s) => s.type === 'contact').length;
  const feedbacks = submissions.filter((s) => s.type === 'feedback');
  const feedbacksCount = feedbacks.length;
  const avgRating =
    feedbacksCount > 0
      ? (feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacksCount).toFixed(1)
      : '0.0';

  const menuItemsFiltered =
    menuFilter === 'all'
      ? config.menuItems
      : config.menuItems.filter((item) => item.category === menuFilter);

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-primary-green">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-primary-green mx-auto"></div>
          <p className="font-[family-name:var(--font-poppins)] text-sm font-medium tracking-wide">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream/30 bg-texture-paper px-4 py-12">
        <div className="w-full max-w-md rounded-[32px] bg-primary-green p-8 text-ivory shadow-luxury-xl border border-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gold/10 blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-secondary-green/20 blur-xl -ml-24 -mb-24"></div>

          <div className="relative text-center mb-8">
            <span className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Secured Console
            </span>
            <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl font-bold tracking-tight">
              Palle Aathidhyam
            </h1>
            <div className="mx-auto mt-4 h-1 w-12 bg-gold rounded"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="block font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider text-ivory/80">
                Admin Secret Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginSecret}
                  onChange={(e) => setLoginSecret(e.target.value)}
                  placeholder="Enter system secret"
                  className="w-full rounded-2xl border border-gold/20 bg-secondary-green/30 px-4 py-3.5 pr-12 font-[family-name:var(--font-poppins)] text-sm text-ivory placeholder-ivory/40 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="font-[family-name:var(--font-poppins)] text-xs text-red-300 font-medium bg-red-950/30 rounded-xl px-4 py-2 border border-red-500/20">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="flex w-full items-center justify-center rounded-2xl bg-gold py-4 font-[family-name:var(--font-poppins)] text-sm font-bold uppercase tracking-wider text-primary-green shadow-gold transition hover:bg-light-gold disabled:opacity-50"
            >
              {loginLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-green border-t-transparent"></div>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Authenticate
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Authenticated Screen
  return (
    <main className="min-h-screen bg-ivory bg-texture-paper text-wood-brown">
      {/* Upper Brand Header */}
      <header className="sticky top-0 z-10 border-b border-border/80 bg-white/95 backdrop-blur-md px-6 py-4 shadow-luxury-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-green flex items-center justify-center text-gold font-[family-name:var(--font-cormorant)] text-xl font-bold border border-gold/30">
              PA
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-primary-green leading-none">
                Palle Aathidhyam
              </h1>
              <p className="mt-1 font-[family-name:var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Premium Control Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-full bg-cream px-3 py-1 font-[family-name:var(--font-poppins)] text-[11px] font-medium text-primary-green border border-border">
              Secure Session Active
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 font-[family-name:var(--font-poppins)] text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex overflow-x-auto gap-2 border-b border-border pb-px no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3.5 font-[family-name:var(--font-poppins)] text-xs sm:text-sm font-semibold tracking-wide transition shrink-0 ${
              activeTab === 'overview'
                ? 'border-gold text-primary-green'
                : 'border-transparent text-wood-brown/60 hover:text-wood-brown hover:border-border'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3.5 font-[family-name:var(--font-poppins)] text-xs sm:text-sm font-semibold tracking-wide transition shrink-0 ${
              activeTab === 'settings'
                ? 'border-gold text-primary-green'
                : 'border-transparent text-wood-brown/60 hover:text-wood-brown hover:border-border'
            }`}
          >
            <Settings className="h-4 w-4" /> Site Settings
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3.5 font-[family-name:var(--font-poppins)] text-xs sm:text-sm font-semibold tracking-wide transition shrink-0 ${
              activeTab === 'menu'
                ? 'border-gold text-primary-green'
                : 'border-transparent text-wood-brown/60 hover:text-wood-brown hover:border-border'
            }`}
          >
            <Utensils className="h-4 w-4" /> Menu Management
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3.5 font-[family-name:var(--font-poppins)] text-xs sm:text-sm font-semibold tracking-wide transition shrink-0 ${
              activeTab === 'inbox'
                ? 'border-gold text-primary-green'
                : 'border-transparent text-wood-brown/60 hover:text-wood-brown hover:border-border'
            }`}
          >
            <Inbox className="h-4 w-4" /> Inbox Submissions
          </button>
        </div>

        {/* Tab Contents */}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Stat Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[24px] border border-border bg-white p-6 shadow-luxury-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-wider text-wood-brown/60">
                    Table Bookings
                  </p>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-primary-green">
                    {statsLoading ? '...' : reservationsCount}
                  </h3>
                </div>
                <div className="rounded-2xl bg-cream p-3 text-primary-green">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-white p-6 shadow-luxury-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-wider text-wood-brown/60">
                    Contact Queries
                  </p>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-primary-green">
                    {statsLoading ? '...' : contactsCount}
                  </h3>
                </div>
                <div className="rounded-2xl bg-cream p-3 text-primary-green">
                  <Mail className="h-6 w-6" />
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-white p-6 shadow-luxury-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-wider text-wood-brown/60">
                    Average Feedback
                  </p>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-primary-green">
                    {statsLoading ? '...' : `${avgRating} ★`}
                  </h3>
                </div>
                <div className="rounded-2xl bg-cream p-3 text-gold">
                  <Star className="h-6 w-6 fill-current" />
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-white p-6 shadow-luxury-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-[family-name:var(--font-poppins)] text-[11px] font-semibold uppercase tracking-wider text-wood-brown/60">
                    Active Dishes
                  </p>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-primary-green">
                    {config.menuItems.length}
                  </h3>
                </div>
                <div className="rounded-2xl bg-cream p-3 text-primary-green">
                  <Utensils className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Quick Actions & Welcome Box */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 rounded-[28px] border border-border bg-white p-6 sm:p-8 shadow-luxury-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/5 -mr-10 -mt-10 blur-xl"></div>
                <div className="space-y-4 relative">
                  <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-primary-green">
                    Welcome to the Palle Aathidhyam Dashboard
                  </h2>
                  <p className="font-[family-name:var(--font-poppins)] text-sm leading-relaxed text-wood-brown/70 max-w-xl">
                    Configure your restaurant info, add or remove dishes on the menu, and handle reservations or feedback. Any updates you save are updated on the live site immediately via MongoDB.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="flex items-center gap-1.5 rounded-full bg-primary-green px-5 py-3 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-ivory transition hover:bg-primary-green/90"
                  >
                    <Settings className="h-4 w-4" /> Edit Info
                  </button>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="flex items-center gap-1.5 rounded-full bg-gold px-5 py-3 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-primary-green transition hover:bg-gold/90"
                  >
                    <Plus className="h-4 w-4" /> Manage Menu
                  </button>
                  <button
                    onClick={() => {
                      void loadSubmissionsData(secret);
                      void loadConfig();
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-3 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown hover:bg-cream transition"
                  >
                    <RotateCcw className="h-4 w-4" /> Refresh Stats
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-white p-6 shadow-luxury-md space-y-5">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-primary-green">
                  Quick Details
                </h3>
                <div className="space-y-4 font-[family-name:var(--font-poppins)] text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-cream p-1.5 text-primary-green shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Restaurant Phone</p>
                      <p className="text-wood-brown/70">{config.footerLinks.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-cream p-1.5 text-primary-green shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Inbox</p>
                      <p className="text-wood-brown/70">{config.footerLinks.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-cream p-1.5 text-primary-green shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-wood-brown/70 line-clamp-2">{config.footerLinks.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="rounded-[28px] bg-white p-6 sm:p-8 shadow-luxury-md border border-border/60">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
                <div>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-primary-green">
                    General Information
                  </h2>
                  <p className="mt-1 font-[family-name:var(--font-poppins)] text-xs text-wood-brown/60">
                    Edit brand properties and contact information stored in MongoDB.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {message && (
                    <span className={`font-[family-name:var(--font-poppins)] text-xs font-semibold ${
                      status === 'error' ? 'text-red-600' : 'text-leaf-green'
                    }`}>
                      {message}
                    </span>
                  )}
                  <button
                    onClick={save}
                    disabled={status === 'saving'}
                    className="flex items-center gap-1.5 rounded-full bg-primary-green px-5 py-2.5 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-ivory hover:bg-primary-green/90 transition shadow-luxury-sm"
                  >
                    <Save className="h-4 w-4" /> Save Settings
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Restaurant Name
                  </span>
                  <input
                    value={config.restaurantInfo.name}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        restaurantInfo: { ...current.restaurantInfo, name: e.target.value },
                      }))
                    }
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Telugu Tagline
                  </span>
                  <input
                    value={config.restaurantInfo.tagline}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        restaurantInfo: { ...current.restaurantInfo, tagline: e.target.value },
                      }))
                    }
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Description
                  </span>
                  <textarea
                    value={config.restaurantInfo.description}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        restaurantInfo: { ...current.restaurantInfo, description: e.target.value },
                      }))
                    }
                    rows={3}
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Phone Contact
                  </span>
                  <input
                    value={config.footerLinks.contact.phone}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        footerLinks: {
                          ...current.footerLinks,
                          contact: { ...current.footerLinks.contact, phone: e.target.value },
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Email Contact
                  </span>
                  <input
                    value={config.footerLinks.contact.email}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        footerLinks: {
                          ...current.footerLinks,
                          contact: { ...current.footerLinks.contact, email: e.target.value },
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Location Address
                  </span>
                  <input
                    value={config.footerLinks.contact.address}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        footerLinks: {
                          ...current.footerLinks,
                          contact: { ...current.footerLinks.contact, address: e.target.value },
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Map Embed URL
                  </span>
                  <input
                    value={config.footerLinks.contact.mapEmbedUrl}
                    onChange={(e) =>
                      setConfig((current) => ({
                        ...current,
                        footerLinks: {
                          ...current.footerLinks,
                          contact: { ...current.footerLinks.contact, mapEmbedUrl: e.target.value },
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            </div>

            {/* Asset Configuration */}
            <div className="rounded-[28px] bg-white p-6 sm:p-8 shadow-luxury-md border border-border/60">
              <h2 className="mb-5 font-[family-name:var(--font-cormorant)] text-2xl font-bold text-primary-green border-b border-border pb-4">
                Website Images & Assets
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Logo Image URL
                  </span>
                  <div className="flex gap-2">
                    <input
                      value={config.images.logo}
                      onChange={(e) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, logo: e.target.value },
                        }))
                      }
                      className="flex-1 rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <ImageUploadButton
                      onUploadComplete={(url) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, logo: url },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Hero Landing Image URL
                  </span>
                  <div className="flex gap-2">
                    <input
                      value={config.images.heroBg}
                      onChange={(e) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, heroBg: e.target.value },
                        }))
                      }
                      className="flex-1 rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <ImageUploadButton
                      onUploadComplete={(url) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, heroBg: url },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Ambience Image URL
                  </span>
                  <div className="flex gap-2">
                    <input
                      value={config.images.ambience}
                      onChange={(e) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, ambience: e.target.value },
                        }))
                      }
                      className="flex-1 rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <ImageUploadButton
                      onUploadComplete={(url) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, ambience: url },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Menu Card Image URL
                  </span>
                  <div className="flex gap-2">
                    <input
                      value={config.images.menuCard}
                      onChange={(e) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, menuCard: e.target.value },
                        }))
                      }
                      className="flex-1 rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                    <ImageUploadButton
                      onUploadComplete={(url) =>
                        setConfig((current) => ({
                          ...current,
                          images: { ...current.images, menuCard: url },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <span className="block font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-wood-brown/85">
                    Daily Signature Item IDs (comma separated)
                  </span>
                  <input
                    value={dailySpecials}
                    onChange={(e) => setDailySpecials(e.target.value)}
                    placeholder="ml-02, br-02, bg-01"
                    className="w-full rounded-2xl border border-border bg-cream/30 px-4 py-3 font-[family-name:var(--font-poppins)] text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MENU MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="rounded-[28px] bg-white p-6 sm:p-8 shadow-luxury-md border border-border/60">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
                <div>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-primary-green">
                    Menu Offerings
                  </h2>
                  <p className="mt-1 font-[family-name:var(--font-poppins)] text-xs text-wood-brown/60">
                    Add, delete, or modify food and beverage items shown on the site.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setConfig((current) => ({ ...current, menuItems: [...current.menuItems, emptyMenuItem()] }))}
                    className="flex items-center gap-1 rounded-full bg-gold px-4 py-2 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-primary-green hover:bg-gold/90 transition shadow-luxury-sm"
                  >
                    <Plus className="h-4 w-4" /> Add New Item
                  </button>

                  <button
                    onClick={save}
                    className="flex items-center gap-1.5 rounded-full bg-primary-green px-5 py-2.5 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wider text-ivory hover:bg-primary-green/90 transition shadow-luxury-sm"
                  >
                    <Save className="h-4 w-4" /> Save Menu Changes
                  </button>
                </div>
              </div>

              {/* Menu Categories Filter */}
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setMenuFilter('all')}
                  className={`rounded-full px-4 py-2 font-[family-name:var(--font-poppins)] text-xs font-semibold border transition ${
                    menuFilter === 'all'
                      ? 'bg-primary-green border-primary-green text-ivory'
                      : 'bg-white border-border text-wood-brown/70 hover:bg-cream'
                  }`}
                >
                  All Items ({config.menuItems.length})
                </button>
                {menuCategories.map((category) => {
                  const count = config.menuItems.filter((item) => item.category === category.id).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setMenuFilter(category.id)}
                      className={`rounded-full px-4 py-2 font-[family-name:var(--font-poppins)] text-xs font-semibold border transition ${
                        menuFilter === category.id
                          ? 'bg-primary-green border-primary-green text-ivory'
                          : 'bg-white border-border text-wood-brown/70 hover:bg-cream'
                      }`}
                    >
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Menu Items List */}
              <div className="space-y-4">
                {menuItemsFiltered.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border rounded-[24px]">
                    <Utensils className="h-10 w-10 text-wood-brown/30 mx-auto mb-2" />
                    <p className="font-[family-name:var(--font-poppins)] text-sm text-wood-brown/60">
                      No items found in this category.
                    </p>
                  </div>
                ) : (
                  menuItemsFiltered.map((item, idx) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-border/80 bg-cream/20 p-5 shadow-luxury-sm hover:border-gold/30 transition duration-300"
                    >
                      <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-[family-name:var(--font-poppins)] text-xs font-bold text-gold">
                            #{item.id}
                          </span>
                          <span className="rounded-full bg-cream px-2.5 py-0.5 font-[family-name:var(--font-poppins)] text-[10px] font-semibold text-primary-green uppercase border border-border">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setConfig((current) => ({
                              ...current,
                              menuItems: current.menuItems.filter((entry) => entry.id !== item.id),
                            }))
                          }
                          className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>

                      {/* Inputs Fields Grid */}
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-1">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                            Item Name (English & Telugu)
                          </span>
                          <input
                            value={item.name}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id ? { ...entry, name: e.target.value } : entry
                                ),
                              }))
                            }
                            placeholder="e.g. ఇడ్లీ వడ (Idli Vada)"
                            className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                            Category Selection
                          </span>
                          <select
                            value={item.category}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, category: e.target.value as MenuCategory }
                                    : entry
                                ),
                              }))
                            }
                            className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                          >
                            {menuCategories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                            Price (₹ INR)
                          </span>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, price: Number(e.target.value) }
                                    : entry
                                ),
                              }))
                            }
                            placeholder="120"
                            className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-3">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                            Image Asset Path / Cloudinary URL
                          </span>
                          <div className="flex gap-2">
                            <input
                              value={item.image}
                              onChange={(e) =>
                                setConfig((current) => ({
                                  ...current,
                                  menuItems: current.menuItems.map((entry) =>
                                    entry.id === item.id ? { ...entry, image: e.target.value } : entry
                                  ),
                                }))
                              }
                              placeholder="e.g. /assets/tiffins-menu.jpg"
                              className="flex-1 rounded-xl border border-border bg-white px-3 py-2.5 text-sm transition focus:border-gold focus:ring-1 focus:ring-gold"
                            />
                            <ImageUploadButton
                              onUploadComplete={(url) =>
                                setConfig((current) => ({
                                  ...current,
                                  menuItems: current.menuItems.map((entry) =>
                                    entry.id === item.id ? { ...entry, image: url } : entry
                                  ),
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-1 md:col-span-3">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-wood-brown/65">
                            Item Description
                          </span>
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, description: e.target.value }
                                    : entry
                                ),
                              }))
                            }
                            placeholder="Add appetizing description..."
                            rows={2}
                            className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm transition focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                          />
                        </div>
                      </div>

                      {/* Flags Checkboxes */}
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/30 pt-3">
                        <label className="inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-xs font-semibold cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={item.isVeg}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id ? { ...entry, isVeg: e.target.checked } : entry
                                ),
                              }))
                            }
                            className="rounded border-border text-primary-green focus:ring-primary-green h-4 w-4"
                          />
                          Vegetarian Dish (Veg)
                        </label>

                        <label className="inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-xs font-semibold cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={item.isSpicy}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id ? { ...entry, isSpicy: e.target.checked } : entry
                                ),
                              }))
                            }
                            className="rounded border-border text-primary-green focus:ring-primary-green h-4 w-4"
                          />
                          Spicy Dish
                        </label>

                        <label className="inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-xs font-semibold cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={item.isPopular}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id ? { ...entry, isPopular: e.target.checked } : entry
                                ),
                              }))
                            }
                            className="rounded border-border text-primary-green focus:ring-primary-green h-4 w-4"
                          />
                          Popular / Signature Dish
                        </label>

                        <label className="inline-flex items-center gap-2 font-[family-name:var(--font-poppins)] text-xs font-semibold cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={item.isChefSpecial}
                            onChange={(e) =>
                              setConfig((current) => ({
                                ...current,
                                menuItems: current.menuItems.map((entry) =>
                                  entry.id === item.id ? { ...entry, isChefSpecial: e.target.checked } : entry
                                ),
                              }))
                            }
                            className="rounded border-border text-primary-green focus:ring-primary-green h-4 w-4"
                          />
                          Chef's Recommendation
                        </label>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUBMISSIONS INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-6 animate-fade-in-up">
            <SubmissionsPanel adminSecret={secret} />
          </div>
        )}
      </div>
    </main>
  );
}
