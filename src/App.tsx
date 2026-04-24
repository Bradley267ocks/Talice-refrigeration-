import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageCircle, Menu, X, CheckCircle2, ChevronRight, Mail, MapPin, Clock, Star, ArrowRight, ShieldCheck, Zap, Settings, Snowflake, Thermometer, Wind, WashingMachine, Refrigerator, Wrench } from "lucide-react";
import * as Icons from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { BUSINESS_INFO, SERVICES, TESTIMONIALS, GALLERY_IMAGES, Service } from "./constants";

// --- Schema Injection ---
const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_INFO.name,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    "@id": "",
    "url": window.location.origin,
    "telephone": BUSINESS_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gauteng",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -26.2041,
      "longitude": 28.0473
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: ReactNode, className?: string, key?: string | number }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-[2rem] hover:border-blue-500/30 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-950/95 backdrop-blur-md py-2 border-b border-white/10" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-5 flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setActiveTab("home")}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-600/30 transition-transform group-hover:scale-105">
            <Icons.Zap size={20} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-white uppercase">
            TALICE<span className="text-blue-500">REF</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-xs font-bold tracking-widest uppercase transition-all hover:text-blue-500 ${
                activeTab === item.id ? "text-blue-500" : "text-white/80"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setActiveTab("contact")}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/40"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-t border-white/10"
          >
            <div className="p-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                  className={`text-xl font-black text-left uppercase tracking-tight py-2 ${
                    activeTab === item.id ? "text-blue-500" : "text-white/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="text-center mb-10 md:mb-16 px-4">
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp}
    >
      <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2.5">
        {subtitle}
      </span>
      <h2 className={`text-2xl md:text-4xl font-black tracking-tight ${light ? "text-white" : "text-slate-950"} max-w-2xl mx-auto leading-tight uppercase`}>
        {title}
      </h2>
    </motion.div>
  </div>
);

const Footer = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <footer className="bg-slate-950 text-white/50 pt-32 pb-24 px-6 border-t border-white/5">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-1 text-left">
        <div className="flex items-center gap-3 mb-10 group">
          <Zap className="text-blue-600 h-8 w-8" />
          <span className="text-3xl font-black tracking-tighter text-white uppercase">
            TALICE<span className="text-blue-500">REF</span>
          </span>
        </div>
        <p className="text-white/50 leading-relaxed mb-10 text-lg">
          South Africa's premier appliance repair experts. We combine speed, tech-precision, and trust to keep your home running.
        </p>
        <div className="flex gap-4">
          {[Phone, MessageCircle, Mail].map((Icon, i) => (
            <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all text-white">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-10">Quick Navigation</h4>
        <ul className="space-y-6">
          <li><button onClick={() => setActiveTab("home")} className="hover:text-blue-500 transition-all font-bold">Home Portal</button></li>
          <li><button onClick={() => setActiveTab("services")} className="hover:text-blue-500 transition-all font-bold">Services List</button></li>
          <li><button onClick={() => setActiveTab("about")} className="hover:text-blue-500 transition-all font-bold">Our Philosophy</button></li>
          <li><button onClick={() => setActiveTab("contact")} className="hover:text-blue-500 transition-all font-bold">Secure Booking</button></li>
        </ul>
      </div>

      <div className="md:col-span-2">
        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-10">Instant Contact</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">Direct Line</span>
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-lg font-black text-white hover:text-blue-500 transition-all">{BUSINESS_INFO.phone}</a>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">WhatsApp Chat</span>
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="text-lg font-black text-white hover:text-blue-500 transition-all">Start Chat</a>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">Secure Email</span>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-lg font-black text-white hover:text-blue-500 transition-all break-all">{BUSINESS_INFO.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-black tracking-widest text-white/20">
      <span>&copy; {new Date().getFullYear()} TALICE REFRIGERATION. AUTHENTIC BUILD.</span>
      <div className="flex gap-8">
        <a href="#" className="hover:text-blue-500 transition-all">Privacy</a>
        <a href="#" className="hover:text-blue-500 transition-all">Terms</a>
        <a href="#" className="hover:text-blue-500 transition-all">SLA</a>
      </div>
    </div>
  </footer>
);

const FloatingActions = () => (
  <>
    {/* Desktop Floating WhatsApp */}
    <a 
      href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} 
      className="hidden md:flex fixed bottom-10 right-10 z-50 bg-blue-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black uppercase tracking-widest whitespace-nowrap px-0 group-hover:px-4">
        WhatsApp Us
      </span>
    </a>

    {/* Mobile Sticky Bar */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 flex gap-4">
      <a 
        href={`tel:${BUSINESS_INFO.phone}`} 
        className="flex-1 bg-white text-slate-950 h-16 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
      >
        <Phone size={20} />
        Call
      </a>
      <a 
        href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} 
        className="flex-1 bg-blue-600 text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
      >
        <MessageCircle size={20} />
        Chat
      </a>
    </div>
  </>
);

// --- Pages ---

const HomePage = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[75vh] md:h-[80vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop" 
            alt="Premium Appliance Care"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          {/* Animated Glows */}
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-5 relative z-10 max-w-6xl">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
                {["Same-Day Repair", "Expert Service"].map((badge, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest text-blue-400">
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5 md:mb-6 uppercase">
                APPLIANCE REPAIRS <br />
                <span className="text-blue-500">YOU CAN TRUST</span>
              </h1>
              <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8 max-w-xl leading-relaxed">
                Fast, professional, and guaranteed. We fix fridges, freezers, and aircons across South Africa with same-day precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`tel:${BUSINESS_INFO.phone}`} 
                  className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-base hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Phone size={18} />
                  Call Now
                </a>
                <a 
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
                  className="bg-blue-600/10 text-blue-400 border border-blue-500/20 backdrop-blur-md px-8 py-4 rounded-2xl font-black text-base hover:bg-blue-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-slate-950 border-y border-white/5 py-12">
        <div className="container mx-auto px-6 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-20 opacity-40">
             <span className="text-white text-xs font-black uppercase tracking-[0.5em] whitespace-nowrap">Serving Local Homes</span>
             <div className="h-px shrink-0 w-8 bg-white/20 hidden md:block"></div>
             <span className="text-white text-xs font-black uppercase tracking-[0.5em] whitespace-nowrap">Fast & Reliable Service</span>
             <div className="h-px shrink-0 w-8 bg-white/20 hidden md:block"></div>
             <span className="text-white text-xs font-black uppercase tracking-[0.5em] whitespace-nowrap">100% Satisfaction Guarantee</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-slate-50 px-5">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader subtitle="Expertise" title="Core Repair Solutions" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((service, idx) => {
              const Icon = Icons[service.icon as keyof typeof Icons] || Icons.Zap;
              return (
                <GlassCard key={service.id} className="p-8 group bg-white border-slate-200 hover:border-blue-500 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 mb-3 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm mb-6">{service.description}</p>
                  <button 
                    onClick={() => setActiveTab("contact")}
                    className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[9px]"
                  >
                    Quick Booking <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </GlassCard>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-24 bg-slate-950 px-5 relative overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2.5 block">Proven Experience</span>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6 md:mb-8 uppercase">THE TECH-LED <br className="hidden md:block" /> CHOICE FOR SA</h2>
            <div className="space-y-6 md:space-y-8">
              {[
                { icon: <Clock size={18} />, title: "Instant Response", desc: "Most repairs initiated quickly." },
                { icon: <ShieldCheck size={18} />, title: "Secure Warranty", desc: "Full protection of 6 months." },
                { icon: <Settings size={18} />, title: "Advanced Diagnostics", desc: "Precision tools for accuracy." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight mb-0.5">{item.title}</h4>
                    <p className="text-white/40 text-[11px] md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
              <img 
                src="https://images.unsplash.com/photo-1581092122397-2666f11dbf10?auto=format&fit=crop&q=80&w=800" 
                alt="Pro Technician" 
                className="w-full h-full object-cover scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-blue-600 p-10 rounded-[3rem] shadow-2xl">
              <div className="text-5xl font-black text-white leading-none mb-1">10+</div>
              <div className="text-xs font-black text-white/70 uppercase tracking-widest">Years Depth</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-white px-5">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader subtitle="The Journey" title="Simple Fix Process" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            {[
              { n: "01", t: "Contact Us", d: "Send a message or call instantly." },
              { n: "02", t: "Get Quote", d: "Fair estimates provided." },
              { n: "03", t: "Visit Site", d: "Tech arrives at your doorstep." },
              { n: "04", t: "Fixed", d: "Appliance is back to operating status." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="text-6xl font-black text-slate-100 mb-6 group-hover:text-blue-50 transition-colors">{step.n}</div>
                <h4 className="text-lg font-black text-slate-950 uppercase tracking-tighter mb-3">{step.t}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-slate-950 px-5">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader subtitle="Showcase" title="Quality in Action" light />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 0.98 }}
                className="aspect-square rounded-2xl overflow-hidden border border-white/5 cursor-pointer relative group"
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <span className="text-white font-black uppercase tracking-widest text-[10px]">{img.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-slate-50 px-5">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader subtitle="Trust" title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative group hover:shadow-md transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="fill-blue-500 text-blue-500" />)}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-blue-500 text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">{t.name}</h5>
                    <span className="text-[9px] uppercase font-bold text-slate-400">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-blue-600 relative overflow-hidden px-6 md:rounded-t-[4rem]">
        <div className="absolute inset-0 opacity-10 blur-[80px]">
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 md:mb-8 tracking-tighter uppercase">NEED URGENT <br /> REPAIRS?</h2>
          <p className="text-base md:text-xl text-blue-50 mb-8 md:mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            Don't let a broken appliance ruin your day. Call or WhatsApp right now for same-day expert service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`} 
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <Phone size={20} />
              Call Now
            </a>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} 
              className="bg-slate-950 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = () => (
  <div className="pt-20 md:pt-32 pb-16 md:pb-24 px-5 bg-slate-50 min-h-screen font-sans">
    <div className="container mx-auto max-w-6xl">
      <div className="max-w-3xl mb-12 md:mb-16">
        <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Portfolio</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 leading-tight mb-6 uppercase">Our Repair Solutions</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Surgical-grade appliance repair for home and industrial environments. We use original parts and state-of-the-art diagnostic equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((s) => {
          const Icon = Icons[s.icon as keyof typeof Icons] || Icons.Zap;
          return (
            <div key={s.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-8 hover:shadow-md transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-all duration-500">
                <Icon size={28} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {["Original Parts", "Warranty"].map((t, i) => (
                    <span key={i} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-20 md:pt-32 pb-16 md:pb-24 px-5 bg-white font-sans">
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <SectionHeader subtitle="Genesis" title="Crafted with Technical Integrity" />
          <p className="text-lg text-slate-500 mb-6 leading-relaxed">
            Talice Refrigeration was born from a passion for mechanical excellence. In a market flooded with "temporary fixes," we chose a different path: engineering-grade appliance repair that actually lasts.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-10">
            <div>
              <div className="text-4xl font-black text-blue-600 mb-1">3k+</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jobs Resolved</p>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-600 mb-1">100%</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Honesty Policy</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
            <img src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80&w=800" alt="Tech" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [done, setDone] = useState(false);

  return (
    <div className="pt-20 md:pt-32 pb-16 md:pb-24 px-5 bg-slate-950 font-sans min-h-screen overflow-hidden relative">
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-blue-600/5 blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <SectionHeader subtitle="Booking" title="Secure Your Fast Fix" light />
            <p className="text-lg text-white/40 mb-12 max-w-md">
              Available for emergency call-outs. Fill the secure form and we will contact you within 60 minutes.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: <Phone size={20} />, label: "Dispatcher Hotline", val: BUSINESS_INFO.phone, link: `tel:${BUSINESS_INFO.phone}` },
                { icon: <Mail size={20} />, label: "Direct Support", val: BUSINESS_INFO.email, link: `mailto:${BUSINESS_INFO.email}` },
                { icon: <MapPin size={20} />, label: "Service Region", val: BUSINESS_INFO.address, link: "#" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">{item.label}</span>
                    <a href={item.link} className="text-xl font-black text-white hover:text-blue-500 transition-all">{item.val}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <GlassCard className="p-8 md:p-12 relative bg-white/5 backdrop-blur-xl">
            {!done ? (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Rapid Booking</h3>
                <div>
                  <label className="block text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 px-1">Identity Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-base focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 px-1">Mobile Number</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-base focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10" placeholder="+27 ..." />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 px-1">Fault Description</label>
                  <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-base focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10" placeholder="Issue details..."></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white h-16 rounded-xl font-black uppercase tracking-widest text-base shadow-xl hover:bg-blue-700 transition-all">
                  Initiate Request
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Sent Successfully</h3>
                <p className="text-white/40 text-sm max-w-xs mb-8">Technician dispatch verified. We will call you within 60 minutes.</p>
                <button onClick={() => setDone(false)} className="text-blue-500 text-xs font-black uppercase tracking-widest hover:underline">Back to Form</button>
              </motion.div>
            )}
          </GlassCard>
        </div>

        {/* Map View */}
        <div className="mt-20 h-[300px] w-full rounded-[3rem] overflow-hidden border border-white/5 grayscale saturate-50 opacity-40">
           <div className="w-full h-full bg-slate-900 flex items-center justify-center">
             <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Map View: {BUSINESS_INFO.address}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-500 selection:text-white">
      <LocalBusinessSchema />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "home" && <HomePage setActiveTab={setActiveTab} />}
            {activeTab === "services" && <ServicesPage />}
            {activeTab === "about" && <AboutPage />}
            {activeTab === "contact" && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActiveTab={setActiveTab} />
      <FloatingActions />
    </div>
  );
}
