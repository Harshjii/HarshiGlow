import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Play, 
  Check, 
  Clock, 
  Calendar, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  MessageCircle, 
  ExternalLink, 
  CheckCircle2, 
  Heart,
  ShieldCheck,
  Award,
  Users,
  SunMedium,
  ChevronRight,
  ChevronLeft,
  Eye,
  Volume2,
  Share2,
  Bookmark
} from 'lucide-react';

const Instagram = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const PLANS = {
  standard: {
    id: 'standard',
    name: 'Standard Glow Batch',
    basePrice: 2499,
    description: '3 Days / Week (Group Guidance)',
    features: [
      'Pay as you go monthly batch', 
      'Ideal for beginners & busy schedule', 
      'Breath & alignment flow sequences', 
      'Weekly posture correction tips'
    ]
  },
  professional: {
    id: 'professional',
    name: 'Glow Flow Intensive',
    basePrice: 4999,
    featured: true,
    description: 'Daily Live Sessions (Mon - Fri)',
    features: [
      'Unlimited live batch access (Mon-Fri)', 
      'Mindful movement & asana flows', 
      'Pranayama routines & diet guidance', 
      'Interactive doubt clearance & Q&A'
    ]
  },
  private: {
    id: 'private',
    name: 'Private VIP 1-on-1',
    basePrice: 8999,
    description: 'Exclusive Personal Mentorship',
    features: [
      'Dedicated personal time slot', 
      'Customized posture therapy & healing', 
      'Direct WhatsApp 1-on-1 mentorship', 
      'Holistic nutrition & lifestyle plan'
    ]
  }
};

const REELS = [
  {
    id: 'DU0VzW_Ccm3',
    url: 'https://www.instagram.com/p/DU0VzW_Ccm3/',
    title: 'Mindful Morning Flow & Asana Balance',
    duration: 'Reel • Morning Asana',
    category: 'morning',
    views: '34.2K',
    likes: '2.8K',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'DUjuhJIk-oZ',
    url: 'https://www.instagram.com/p/DUjuhJIk-oZ/',
    title: 'Core Strength & Fluid Spine Stretches',
    duration: 'Reel • Flexibility',
    category: 'flexibility',
    views: '48.9K',
    likes: '4.1K',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'DUe5scMCeh3',
    url: 'https://www.instagram.com/p/DUe5scMCeh3/',
    title: 'Stress Relief & Calming Breathwork',
    duration: 'Reel • Pranayama',
    category: 'pranayama',
    views: '29.5K',
    likes: '2.3K',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'DNYOIRhzUPl',
    url: 'https://www.instagram.com/p/DNYOIRhzUPl/',
    title: 'Graceful Transitions & Posture Correction',
    duration: 'Reel • Flow & Alignment',
    category: 'alignment',
    views: '52.1K',
    likes: '5.4K',
    image: 'https://images.unsplash.com/photo-1552196563-552343272dd3?auto=format&fit=crop&w=600&q=80'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [batchMode, setBatchMode] = useState('online');
  const [timeSlot, setTimeSlot] = useState('06:30 AM - Sunrise Glow Flow');
  
  // Reels Category Filter & View Mode
  const [reelFilter, setReelFilter] = useState('all');
  const [likedReels, setLikedReels] = useState({});
  const reelScrollRef = useRef(null);

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    healthNotes: ''
  });

  // Receipt Modal State
  const [receiptData, setReceiptData] = useState(null);

  // Prevent scrolling when mobile drawer or modal is open
  useEffect(() => {
    if (mobileMenuOpen || activeReel || receiptData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, activeReel, receiptData]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'SAKSHI25' || cleanCode === 'HARSHI25') {
      setAppliedDiscount(0.25);
      setCouponMsg('✨ Success! 25% Off discount code applied.');
    } else {
      setCouponMsg('Invalid code. Try using HARSHI25');
    }
  };

  const toggleLikeReel = (reelId) => {
    setLikedReels(prev => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const scrollReels = (direction) => {
    if (reelScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      reelScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredReels = reelFilter === 'all' 
    ? REELS 
    : REELS.filter(r => r.category === reelFilter);

  const currentPlan = PLANS[selectedPlan];
  const originalPrice = currentPlan.basePrice;
  const discountAmount = Math.round(originalPrice * appliedDiscount);
  const finalPrice = originalPrice - discountAmount;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const bookingID = 'HG-' + Math.floor(100000 + Math.random() * 900000);
    setReceiptData({
      bookingID,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      email: formData.email,
      plan: currentPlan.name,
      mode: batchMode === 'online' ? 'Online Live (Zoom)' : 'In-Studio Offline',
      slot: timeSlot,
      amount: finalPrice,
      healthNotes: formData.healthNotes
    });
  };

  const openWhatsAppPayment = (receipt) => {
    const text = encodeURIComponent(
      `Namaste Yogini Harshu!\n\nMaine HarshiGlow website se class book ki hai.\n\n` +
      `📌 Booking ID: ${receipt.bookingID}\n` +
      `👤 Name: ${receipt.name}\n` +
      `📱 Phone: ${receipt.phone}\n` +
      `🧘‍♀️ Plan: ${receipt.plan}\n` +
      `📍 Mode: ${receipt.mode}\n` +
      `⏰ Slot: ${receipt.slot}\n` +
      `💰 Amount Due: ₹${receipt.amount.toLocaleString()}\n` +
      (receipt.healthNotes ? `📝 Note: ${receipt.healthNotes}\n\n` : `\n`) +
      `Kripya payment ke liye UPI QR code aur batch details bhej dijiye. Dhanyawad!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const quickWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Namaste Yogini Harshu! Mujhe HarshiGlow yoga classes ke baare me inquiry karni hai.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#242424] font-body selection:bg-[#eeddc9] selection:text-[#622d5b] flex flex-col justify-between overflow-x-hidden">
      
      <div>
        {/* 1. TOP PROMO BAR */}
        <div className="bg-[#181818] text-[#e0e0e0] text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-white/5">
          <div className="max-w-6xl mx-auto flex items-center justify-between sm:justify-center gap-2">
            <span className="flex items-center gap-1.5 text-left sm:text-center truncate sm:overflow-visible">
              <Sparkles className="w-3.5 h-3.5 text-[#eeddc9] shrink-0" />
              <span className="truncate sm:overflow-visible">
                ✨ Mindful Movement | Code <strong className="text-[#eeddc9] font-bold">HARSHI25</strong> for 25% Off
              </span>
            </span>
            <a 
              href="#booking" 
              className="bg-[#eeddc9] text-[#622d5b] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 rounded-full hover:bg-white transition shrink-0 shadow-sm"
            >
              Join Batch
            </a>
          </div>
        </div>

        {/* 2. HEADER & LOGO */}
        <header className="sticky top-0 z-40 bg-[#622d5b] shadow-md text-white backdrop-blur-md bg-opacity-95">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
            
            {/* HarshiGlow Custom Logo */}
            <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group text-left">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#eeddc9] to-white p-0.5 shadow flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#622d5b] fill-current">
                  <circle cx="50" cy="50" r="48" fill="#fdfbf8" />
                  <path d="M50 20 C52 28 58 32 66 34 C58 37 54 44 50 54 C46 44 42 37 34 34 C42 32 48 28 50 20 Z" fill="#eeddc9" opacity="0.6" />
                  <path d="M50 30 C53 30 55 27 55 24 C55 21 53 18 50 18 C47 18 45 21 45 24 C45 27 47 30 50 30 Z" fill="#622d5b" />
                  <path d="M50 32 C45 38 41 45 42 54 C44 58 48 62 52 64 C50 67 47 70 42 72 C50 72 58 66 60 58 C62 50 56 42 50 32 Z" fill="#622d5b" />
                  <path d="M30 78 C42 70 58 70 70 78 C60 84 40 84 30 78 Z" fill="#e27c78" opacity="0.8" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  Harshi<span className="text-[#eeddc9] font-light">Glow</span>
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[2.5px] uppercase font-semibold text-[#eeddc9] mt-0.5">
                  Yoga & Wellness
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#f4e6f3]">
              <a href="#home" className="hover:text-[#eeddc9] transition">Home</a>
              <a href="#about" className="hover:text-[#eeddc9] transition">About Coach</a>
              <a href="#reels" className="hover:text-[#eeddc9] transition flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-[#eeddc9]" /> Reels
              </a>
              <a href="#pricing" className="hover:text-[#eeddc9] transition">Pricing</a>
              <a href="#booking" className="text-[#eeddc9] font-semibold flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-full hover:bg-white/20 transition border border-white/10">
                <Calendar className="w-3.5 h-3.5" /> Book Class
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a 
                href="https://www.instagram.com/yogini_harshu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#eeddc9] text-[#eeddc9] hover:bg-[#eeddc9] hover:text-[#622d5b] transition shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5" /> @yogini_harshu
              </a>

              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg focus:outline-none touch-manipulation"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer Modal */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full bg-[#4c2046] text-white rounded-t-3xl p-6 shadow-2xl border-t border-white/20 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xl font-bold text-white">Harshi<span className="text-[#eeddc9]">Glow</span></span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3.5 py-5 text-base font-medium">
                <a 
                  href="#home" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-2 px-3 rounded-lg hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-[#eeddc9]" />
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-2 px-3 rounded-lg hover:bg-white/10 flex items-center justify-between"
                >
                  <span>About Yogini Harshu</span>
                  <ChevronRight className="w-4 h-4 text-[#eeddc9]" />
                </a>
                <a 
                  href="#reels" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-2 px-3 rounded-lg hover:bg-white/10 text-[#eeddc9] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram Reels</span>
                  <ChevronRight className="w-4 h-4 text-[#eeddc9]" />
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="py-2 px-3 rounded-lg hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Pricing Plans</span>
                  <ChevronRight className="w-4 h-4 text-[#eeddc9]" />
                </a>
                <a 
                  href="#booking" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="bg-[#eeddc9] text-[#622d5b] font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <Calendar className="w-4 h-4" /> Book Your Yoga Batch
                </a>
                <a 
                  href="https://www.instagram.com/yogini_harshu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 text-xs text-[#eeddc9] pt-3 border-t border-white/10"
                >
                  <Instagram className="w-4 h-4" /> Follow @yogini_harshu on Instagram
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 3. HERO SECTION */}
        <section id="home" className="relative bg-gradient-to-br from-[#622d5b] via-[#52234c] to-[#3a1835] text-white py-12 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1 rounded-full text-xs text-[#eeddc9] font-medium backdrop-blur-sm">
                <span>🧘 Authentic Yoga</span>
                <span>•</span>
                <span>🌿 Holistic Wellness</span>
              </div>
              
              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight">
                Transforming Lives Through <span className="text-[#eeddc9] italic font-serif">Mindful Movement</span>.
              </h1>
              
              <p className="text-xs sm:text-sm md:text-base text-[#e5d4e4] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Step onto the mat with <strong>Yogini Harshu</strong>. Realign posture, quiet mental chatter, and awaken joyful radiance through traditional breathwork and flow sequences.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <a 
                  href="#booking" 
                  className="bg-[#eeddc9] text-[#622d5b] font-bold text-sm py-3.5 px-7 rounded-full hover:bg-white transition flex items-center justify-center gap-2 shadow-xl hover:scale-105 transform duration-200"
                >
                  Join Class Today <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/yogini_harshu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition backdrop-blur-sm"
                >
                  <Instagram className="w-4 h-4" /> Visit Instagram
                </a>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-5 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-center sm:text-left">
                <div className="bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-[#eeddc9]">500+</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-300">Active Yogis</div>
                </div>
                <div className="bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-[#eeddc9]">4.9★</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-300">Learner Rating</div>
                </div>
                <div className="bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-[#eeddc9]">Live</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-300">Daily Batches</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Arch */}
            <div className="lg:col-span-5 flex justify-center mt-2 lg:mt-0">
              <div className="relative w-full max-w-[270px] sm:max-w-[340px] md:max-w-[380px]">
                <div className="absolute -inset-2 bg-[#eeddc9]/25 arch-hero -rotate-2"></div>
                <div className="relative arch-hero overflow-hidden border-4 border-white/20 shadow-2xl h-[340px] sm:h-[440px]">
                  <img 
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80" 
                    alt="Yogini Harshu Flow" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. INSTAGRAM REELS SHOWCASE SECTION (HIGHLY MOBILE RESPONSIVE WITH CAROUSEL & FILTERS) */}
        <section id="reels" className="py-12 sm:py-20 px-4 sm:px-6 bg-[#ffffff]">
          <div className="max-w-6xl mx-auto">
            
            {/* Header with IG Branding & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-4">
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-[3px] text-[#622d5b] font-bold flex items-center gap-1.5">
                  <Instagram className="w-4 h-4 text-[#622d5b]" /> Trending Flows
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl font-bold mt-1.5 text-gray-900">
                  Latest Instagram Reels
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Guided snippets, flow transitions & breathwork from <strong>@yogini_harshu</strong>
                </p>
              </div>

              {/* Desktop Scroll & External link */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <div className="hidden sm:flex items-center gap-1.5">
                  <button 
                    onClick={() => scrollReels('left')}
                    className="w-8 h-8 rounded-full border border-gray-200 bg-[#fcfaf7] hover:bg-[#622d5b] hover:text-white transition flex items-center justify-center text-gray-700"
                    aria-label="Previous Reel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => scrollReels('right')}
                    className="w-8 h-8 rounded-full border border-gray-200 bg-[#fcfaf7] hover:bg-[#622d5b] hover:text-white transition flex items-center justify-center text-gray-700"
                    aria-label="Next Reel"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <a 
                  href="https://www.instagram.com/yogini_harshu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#622d5b] hover:text-[#4c2046] transition bg-[#fbf8f5] px-3.5 py-2 rounded-full border border-gray-200 shadow-sm"
                >
                  <span>Open Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Category Filter Pills (Touch friendly scroll on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar text-xs">
              {[
                { id: 'all', label: '✨ All Reels' },
                { id: 'morning', label: '🌅 Morning Asanas' },
                { id: 'flexibility', label: '🧘‍♀️ Flexibility & Core' },
                { id: 'pranayama', label: '🌿 Breathwork' },
                { id: 'alignment', label: '📐 Posture Correction' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setReelFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition cursor-pointer touch-manipulation shrink-0 text-xs ${
                    reelFilter === tab.id
                      ? 'bg-[#622d5b] text-white shadow-md'
                      : 'bg-[#fcfaf7] text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Reel Swipeable Carousel / Desktop Grid */}
            <div 
              ref={reelScrollRef}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar"
            >
              {filteredReels.map((reel) => {
                const isLiked = likedReels[reel.id];
                return (
                  <div 
                    key={reel.id} 
                    className="w-[260px] sm:w-auto shrink-0 snap-start bg-[#fcfaf7] border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Reel Video Thumbnail Container */}
                    <div 
                      onClick={() => setActiveReel(reel)}
                      className="relative w-full aspect-[9/14] bg-black cursor-pointer overflow-hidden flex items-center justify-center touch-manipulation"
                    >
                      <img 
                        src={reel.image}
                        alt={reel.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>
                      
                      {/* Top Header: Reel Badge & Views */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                        <div className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] text-white flex items-center gap-1.5">
                          <Instagram className="w-3 h-3 text-[#eeddc9]" />
                          <span>{reel.duration}</span>
                        </div>
                        <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white flex items-center gap-1">
                          <Eye className="w-3 h-3 text-[#eeddc9]" />
                          <span>{reel.views}</span>
                        </div>
                      </div>

                      {/* Play Overlay Button */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#622d5b]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#622d5b] transition">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>

                      {/* Floating Engagement Icons (Like/Comments simulated) */}
                      <div className="absolute right-2.5 bottom-12 flex flex-col items-center gap-2 z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLikeReel(reel.id);
                          }}
                          className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition shadow ${
                            isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                          title="Like Reel"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                        </button>
                        <span className="text-[10px] text-white font-medium drop-shadow">
                          {isLiked ? 'Liked' : reel.likes}
                        </span>
                      </div>

                      {/* Bottom Title & Audio */}
                      <div className="absolute bottom-2.5 inset-x-2.5 pr-10 text-white text-xs font-medium line-clamp-2 leading-snug">
                        {reel.title}
                      </div>
                    </div>

                    {/* Card Footer Bar */}
                    <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
                      <button 
                        onClick={() => setActiveReel(reel)}
                        className="text-xs font-bold text-[#622d5b] hover:underline flex items-center gap-1.5 cursor-pointer touch-manipulation"
                      >
                        <Play className="w-3 h-3 fill-current" /> Play Preview
                      </button>
                      <a 
                        href={reel.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-pink-600 transition flex items-center gap-1 text-xs" 
                        title="Open on Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-semibold text-gray-500">Instagram</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile swipe helper hint */}
            <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-[11px] text-gray-400">
              <span>👈 Swipe to explore more reels 👉</span>
            </div>

          </div>
        </section>

        {/* 5. ABOUT COACH SECTION */}
        <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fbf8f5]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            
            {/* Coach Photo */}
            <div className="relative max-w-[340px] sm:max-w-[420px] mx-auto lg:mx-0 w-full">
              <div className="arch-hero overflow-hidden border-4 border-[#eeddc9] shadow-xl h-[380px] sm:h-[460px]">
                <img 
                  src="https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80" 
                  alt="Coach Harshu" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative sm:absolute -mt-6 sm:mt-0 sm:-bottom-6 sm:-right-4 bg-[#622d5b] text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-[260px] mx-auto sm:mx-0">
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#eeddc9] block leading-none">@yogini_harshu</span>
                <p className="text-[10px] sm:text-[11px] text-[#e0cfdf] mt-1">Holistic Wellness Coach & Asana Mentor</p>
              </div>
            </div>

            {/* Coach Details */}
            <div className="space-y-4 sm:space-y-5 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[3px] text-[#622d5b] font-bold">About Yogini Harshu</span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold">Awaken Harmony, Strength & Inner Stillness</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Believing that yoga is far beyond stretching, Harshu blends authentic yogic philosophy with functional bio-mechanics. Every sequence is tailored to restore spinal agility, dissolve stiffness, and empower your day.
              </p>
              <ul className="space-y-2.5 text-xs text-gray-700 text-left max-w-lg mx-auto lg:mx-0">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#eeddc9] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#622d5b]" />
                  </div>
                  <span>Certified Posture Alignment & Flow Instructor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#eeddc9] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#622d5b]" />
                  </div>
                  <span>Breathwork & Meditation techniques for deep stress reduction</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#eeddc9] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#622d5b]" />
                  </div>
                  <span>Daily interactive support for beginner to advanced learners</span>
                </li>
              </ul>
              <div className="pt-2">
                <a href="#booking" className="inline-block bg-[#622d5b] text-white text-xs font-bold px-7 sm:px-8 py-3.5 rounded-full hover:bg-[#4c2046] transition shadow-md">
                  Start Your Glow Journey
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PRICING SECTION */}
        <section id="pricing" className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs uppercase tracking-[3px] text-[#622d5b] font-bold">Membership Plans</span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold mt-1.5 sm:mt-2">Invest In Your Well-being</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Pick your batch plan below. Confirmation and payment are completed directly on WhatsApp.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {Object.values(PLANS).map((p) => {
                const isSelected = selectedPlan === p.id;
                return (
                  <div 
                    key={p.id}
                    className={`arch-card p-6 sm:p-7 bg-white border transition-all text-center flex flex-col justify-between ${
                      p.featured 
                        ? 'border-2 border-[#622d5b] shadow-xl md:-translate-y-2 bg-[#faf6f2]' 
                        : 'border-gray-200 shadow-sm hover:shadow-lg'
                    }`}
                  >
                    <div>
                      {p.featured ? (
                        <span className="inline-block bg-[#622d5b] text-white text-[10px] uppercase font-bold tracking-widest py-1 px-4 rounded-full mb-3 shadow">
                          Recommended Plan
                        </span>
                      ) : (
                        <div className="h-4 sm:h-6 mb-2 sm:mb-3"></div>
                      )}
                      
                      <h3 className="font-heading text-xl font-bold mb-1.5 text-gray-900">{p.name}</h3>
                      <p className="text-xs text-gray-500 mb-4">{p.description}</p>
                      <div className="text-2xl sm:text-3xl font-heading font-bold text-[#622d5b] mb-5">
                        ₹{p.basePrice.toLocaleString()} <span className="text-xs font-body font-normal text-gray-400">/ month</span>
                      </div>
                      <ul className="space-y-2.5 text-xs text-gray-600 mb-6 sm:mb-8 text-left max-w-[240px] mx-auto">
                        {p.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#622d5b] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a 
                      href="#booking"
                      onClick={() => setSelectedPlan(p.id)}
                      className={`block w-full py-3.5 rounded-full text-xs font-bold transition shadow-sm touch-manipulation ${
                        isSelected || p.featured
                          ? 'bg-[#622d5b] text-white hover:bg-[#4c2046]'
                          : 'bg-[#eeddc9] text-[#622d5b] hover:bg-[#622d5b] hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ Plan Selected' : 'Choose Plan'}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. CLASS BOOKING PORTAL (ONLINE & OFFLINE) */}
        <section id="booking" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#fbf8f5] border-t border-[#eeddc9]/60">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs uppercase tracking-[3px] text-[#622d5b] font-bold flex items-center justify-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#622d5b]" /> Easy Enrollment
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold mt-1.5 sm:mt-2">Book Your HarshiGlow Class</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Select your batch, fill your learner details, and finalize your booking on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                
                {/* Step 1: Select Plan */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#622d5b] block mb-3">
                    Step 1: Choose Your Yoga Plan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {Object.values(PLANS).map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer touch-manipulation ${
                          selectedPlan === p.id 
                            ? 'border-[#622d5b] bg-[#fbf8f5] ring-2 ring-[#622d5b]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-gray-800">{p.name}</span>
                        <span className="text-sm sm:text-base font-heading font-bold text-[#622d5b] mt-1.5">
                          ₹{p.basePrice.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Mode & Slots */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#622d5b] block">
                    Step 2: Choose Mode & Batch Slot
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setBatchMode('online')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition cursor-pointer touch-manipulation text-center ${
                        batchMode === 'online'
                          ? 'bg-[#622d5b] text-white border-[#622d5b]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      📹 Online Live (Zoom)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBatchMode('studio')}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition cursor-pointer touch-manipulation text-center ${
                        batchMode === 'studio'
                          ? 'bg-[#622d5b] text-white border-[#622d5b]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      🏡 In-Studio Offline
                    </button>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-600 block mb-2">Available Batch Timings:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        '06:30 AM - Sunrise Glow Flow',
                        '08:00 AM - Traditional Hatha & Alignment',
                        '05:30 PM - Sunset Flexibility Flow',
                        '07:00 PM - Stress Release & Meditation'
                      ].map((slot, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setTimeSlot(slot)}
                          className={`text-xs p-3 rounded-lg border text-left transition cursor-pointer touch-manipulation flex items-center gap-2 ${
                            timeSlot === slot
                              ? 'bg-[#eeddc9] text-[#622d5b] font-bold border-[#622d5b]'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0 text-[#622d5b]" /> 
                          <span className="truncate">{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Learner Information */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#622d5b] block">
                    Step 3: Learner Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="First Name *" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-gray-200 outline-none focus:border-[#622d5b] transition"
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-gray-200 outline-none focus:border-[#622d5b] transition"
                    />
                    <input 
                      type="tel" 
                      placeholder="WhatsApp Phone Number *" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-gray-200 outline-none focus:border-[#622d5b] transition"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address *" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-gray-200 outline-none focus:border-[#622d5b] transition"
                    />
                  </div>
                  <textarea 
                    rows="2" 
                    placeholder="Any back/knee pain or specific yoga goal?"
                    value={formData.healthNotes}
                    onChange={(e) => setFormData({...formData, healthNotes: e.target.value})}
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-gray-200 outline-none focus:border-[#622d5b] transition"
                  ></textarea>
                </div>

              </div>

              {/* Right Summary Box */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#622d5b] shadow-lg lg:sticky lg:top-24 space-y-4 sm:space-y-5">
                  <h3 className="font-heading text-lg font-bold pb-3 border-b border-gray-100 flex items-center justify-between">
                    <span>Registration Summary</span>
                    <span className="text-xs font-body font-bold text-[#622d5b] bg-[#eeddc9] px-2.5 py-0.5 rounded-full">
                      {batchMode === 'online' ? 'Online' : 'In-Studio'}
                    </span>
                  </h3>

                  <div className="space-y-2.5 text-xs text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Plan:</span>
                      <strong className="text-gray-900 text-right">{currentPlan.name}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Batch Slot:</span>
                      <span className="text-gray-900 text-right max-w-[180px] truncate font-medium">{timeSlot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Subtotal:</span>
                      <span>₹{originalPrice.toLocaleString()}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between items-center text-green-600 font-semibold">
                        <span>Discount (25% Code):</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-base font-bold text-[#622d5b]">
                      <span>Total Amount:</span>
                      <span>₹{finalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Code (HARSHI25)" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="text-xs flex-1 p-2.5 rounded-lg border border-gray-300 outline-none uppercase font-semibold"
                      />
                      <button 
                        type="button" 
                        onClick={handleApplyCoupon}
                        className="bg-gray-800 text-white text-xs px-4 rounded-lg font-semibold hover:bg-black transition cursor-pointer shrink-0 touch-manipulation"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMsg && (
                      <p className={`text-[11px] mt-1.5 font-medium ${appliedDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {couponMsg}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Notice */}
                  <div className="bg-[#e9f7ef] border border-[#27ae60]/30 rounded-xl p-3 text-xs text-[#1e8449] flex items-start gap-2.5">
                    <MessageCircle className="w-5 h-5 shrink-0 text-[#27ae60] mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Payment Notice:</strong> Yahan booking submit karne ke baad, WhatsApp par Yogini Harshu se official UPI QR code aur confirmation prapt hoga.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer touch-manipulation"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" /> Confirm Booking on WhatsApp
                  </button>
                </div>
              </div>

            </form>

          </div>
        </section>
      </div>

      {/* 8. FOOTER */}
      <footer className="bg-[#622d5b] text-[#f7ebf6] pt-12 sm:pt-16 pb-8 px-4 sm:px-6 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10 text-center sm:text-left">
          
          <div className="space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start">
            <a href="#home" className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold text-white">Harshi<span className="text-[#eeddc9]">Glow</span></span>
            </a>
            <p className="text-xs text-[#d6bad4] leading-relaxed max-w-xs">
              Transforming lives through mindful movement, breath awareness, and graceful holistic living.
            </p>
            <div className="flex gap-2 pt-1">
              <a 
                href="https://www.instagram.com/yogini_harshu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#eeddc9] hover:text-[#622d5b] flex items-center justify-center transition text-xs"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="text-xs space-y-2 text-[#d6bad4]">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About Yogini Harshu</a></li>
              <li><a href="#reels" className="hover:text-[#eeddc9] transition">Instagram Reels</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing Plans</a></li>
              <li><a href="#booking" className="hover:text-white transition">Book Class</a></li>
            </ul>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Offerings</h4>
            <ul className="text-xs space-y-2 text-[#d6bad4]">
              <li>Mindful Vinyasa Flow</li>
              <li>Restorative Yin Yoga</li>
              <li>Daily Pranayama Batches</li>
              <li>1-on-1 Personal Guidance</li>
            </ul>
          </div>

          <div className="space-y-2.5 sm:space-y-3 flex flex-col items-center sm:items-start">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Official Handles</h4>
            <ul className="text-xs space-y-2.5 text-[#d6bad4]">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#eeddc9]" /> 
                <a href="https://www.instagram.com/yogini_harshu/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  @yogini_harshu
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#eeddc9]" /> +91 98765 43210
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#eeddc9]" /> Studio & Online Live, India
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-6 text-center text-[11px] sm:text-xs text-[#be9ebd]">
          © {new Date().getFullYear()} HarshiGlow Yoga. ✨ Transforming Lives Through Mindful Movement.
        </div>
      </footer>

      {/* 9. REELS POPUP MODAL (IMMERSIVE INSTAGRAM MOBILE REEL VIEWER) */}
      {activeReel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] max-h-[92vh] overflow-hidden bg-[#121212] rounded-3xl shadow-2xl border border-white/20 flex flex-col justify-between animate-in fade-in zoom-in duration-200">
            
            {/* Reel Header */}
            <div className="p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">
                    YH
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold leading-none flex items-center gap-1">
                    <span>yogini_harshu</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  </div>
                  <span className="text-[10px] text-gray-400">Original audio</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveReel(null)}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition cursor-pointer touch-manipulation"
                aria-label="Close Reel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reel Visual Preview Area */}
            <div className="relative flex-1 min-h-[300px] flex items-center justify-center overflow-hidden">
              <img 
                src={activeReel.image} 
                alt={activeReel.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>

              {/* Center Action */}
              <a 
                href={activeReel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-16 h-16 rounded-full bg-[#622d5b]/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition border border-white/30"
              >
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </a>

              {/* Engagement sidebar (Simulated Instagram Reel UI) */}
              <div className="absolute right-3 bottom-14 flex flex-col items-center gap-3 z-10 text-white">
                <button 
                  onClick={() => toggleLikeReel(activeReel.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                    likedReels[activeReel.id] ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedReels[activeReel.id] ? 'fill-white' : ''}`} />
                </button>
                <span className="text-[10px] font-semibold">{likedReels[activeReel.id] ? 'Liked' : activeReel.likes}</span>

                <a 
                  href={activeReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </a>

                <a 
                  href={activeReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </a>
              </div>

              {/* Bottom Caption & Audio */}
              <div className="absolute bottom-3 inset-x-3 pr-14 text-white text-left z-10">
                <div className="inline-block bg-[#622d5b] text-[#eeddc9] text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                  {activeReel.duration}
                </div>
                <h4 className="font-heading text-sm font-bold leading-snug line-clamp-2 text-white">
                  {activeReel.title}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-gray-300 mt-1">
                  <Volume2 className="w-3 h-3 text-[#eeddc9]" />
                  <span>HarshiGlow Mindful Practice Track</span>
                </div>
              </div>
            </div>

            {/* Reel Footer CTAs */}
            <div className="p-3.5 bg-black/95 border-t border-white/10 flex flex-col gap-2">
              <a 
                href={activeReel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-600 to-[#622d5b] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-lg hover:opacity-95 transition"
              >
                <Instagram className="w-4 h-4" /> Watch Reel with Audio on Instagram
              </a>
              <a 
                href="#booking"
                onClick={() => setActiveReel(null)}
                className="w-full text-center py-2 text-[11px] font-semibold text-[#eeddc9] hover:underline"
              >
                Enroll in This Routine's Live Batch →
              </a>
            </div>

          </div>
        </div>
      )}

      {/* 10. BOOKING CONFIRMATION & WHATSAPP RECEIPT MODAL */}
      {receiptData && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl border border-gray-100 text-center relative animate-in fade-in zoom-in duration-200">
            
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-[#27ae60]">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
            <p className="text-xs text-gray-500 mb-4 sm:mb-5">
              Booking ID: <strong className="text-[#622d5b]">{receiptData.bookingID}</strong>
            </p>

            <div className="bg-[#fbf8f5] rounded-xl p-3.5 sm:p-4 text-xs text-left space-y-2 mb-5 sm:mb-6 border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Learner:</span>
                <span className="font-bold text-gray-800 text-right">{receiptData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Mode:</span>
                <span className="font-medium text-gray-800 text-right">{receiptData.mode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Plan:</span>
                <span className="font-medium text-gray-800 text-right">{receiptData.plan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Slot:</span>
                <span className="font-medium text-gray-800 truncate max-w-[170px] text-right">{receiptData.slot}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between items-center font-bold text-sm text-[#622d5b]">
                <span>Total Amount Due:</span>
                <span>₹{receiptData.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button 
                onClick={() => openWhatsAppPayment(receiptData)}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer touch-manipulation"
              >
                <MessageCircle className="w-4 h-4 fill-white" /> Complete Payment on WhatsApp
              </button>

              <button 
                onClick={() => setReceiptData(null)}
                className="text-xs text-gray-400 hover:text-gray-600 block mx-auto pt-1 cursor-pointer py-1"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 11. FLOATING QUICK WHATSAPP BUTTON (MOBILE ONLY) */}
      <button
        onClick={quickWhatsAppInquiry}
        className="md:hidden fixed bottom-5 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl pulse-whatsapp flex items-center justify-center touch-manipulation focus:outline-none"
        aria-label="Chat on WhatsApp"
        title="Chat with Coach"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </button>

    </div>
  );
}
