import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  CheckCircle,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  X,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  MapPin,
} from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function NJProCleaningWebsite() {
  // ==============================
  // 🔗 FORM CONNECTION (Web3Forms)
  // 1) Go to https://web3forms.com
  // 2) Create a free Access Key
  // 3) Replace YOUR_ACCESS_KEY below
  // ==============================
  const WEB3FORMS_KEY = "f78f1b19-9993-4a0a-86e6-920a5ebaac60";

  // ==============================
  // 📸 SOCIAL + REVIEWS WIDGETS
  // Recommended: Elfsight widgets
  // 1) Create widgets for Instagram Feed + Google Reviews
  // 2) Replace the App IDs below
  // https://elfsight.com
  // ==============================
  const ELSFIGHT_INSTAGRAM_APP = "YOUR_ELFSIGHT_INSTAGRAM_APP_ID";
  const ELSFIGHT_GOOGLE_REVIEWS_APP = "YOUR_ELFSIGHT_GOOGLE_REVIEWS_APP_ID";

  const FACEBOOK_PAGE_URL = "https://www.facebook.com/njprocleaningservices";
  const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/njprocleaningservices";

  // ✅ Set your real domain when deployed
  const SITE = {
    name: "NJ Pro Cleaning Services",
    phone: "0401 263 036",
    email: "njprocleaningservices@gmail.com",
    city: "Perth",
    region: "WA",
    country: "AU",
    url: "https://example.com",
    googleMapsEmbed:
      "https://www.google.com/maps?output=embed&q=NJ+Pro+Cleaning+Services,+57B+Thomas+St,+East+Cannington+WA+6107",
    socials: [FACEBOOK_PAGE_URL, INSTAGRAM_PROFILE_URL],
  };

  // ✅ Put your images in: /public/work/ and /public/logo.png
  const workImages = useMemo(
    () => [
      {
        src: "/work/gym-weights-1.jpg",
        alt: "Gym cleaning - equipment floor area",
        tag: "Gym & Fitness",
      },
      {
        src: "/work/gym-lounge-1.jpg",
        alt: "Gym cleaning - lounge area",
        tag: "Gym & Fitness",
      },
      {
        src: "/work/office-tiles-1.jpg",
        alt: "Office cleaning - polished tiled floor",
        tag: "Office",
      },
      {
        src: "/work/venue-carpet-1.jpg",
        alt: "Venue cleaning - carpeted area",
        tag: "Hospitality",
      },
      {
        src: "/work/venue-floor-1.jpg",
        alt: "Hospitality cleaning - polished floor",
        tag: "Hospitality",
      },
      {
        src: "/work/restroom-black-tiles-1.jpg",
        alt: "Bathroom cleaning - black tiled restroom",
        tag: "Bathrooms",
      },
      {
        src: "/work/restroom-sinks-1.jpg",
        alt: "Bathroom cleaning - sinks and mirrors",
        tag: "Bathrooms",
      },
      {
        src: "/work/office-reception-1.jpg",
        alt: "Office cleaning - reception and floor finish",
        tag: "Office",
      },
      {
        src: "/work/window-clean-1.jpg",
        alt: "Window cleaning - exterior pole system",
        tag: "Windows",
      },
      {
        src: "/work/window-clean-2.jpg",
        alt: "Window cleaning - finished exterior window",
        tag: "Windows",
      },
      {
        src: "/work/gym-cardio-1.jpg",
        alt: "Gym cleaning - cardio area",
        tag: "Gym & Fitness",
      },
      {
        src: "/work/office-carpet-1.jpg",
        alt: "Office carpet cleaning - extraction",
        tag: "Carpet",
      },
      {
        src: "/work/office-carpet-2.jpg",
        alt: "Office carpet cleaning - conference room",
        tag: "Carpet",
      },
    ],
    []
  );

  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [status, setStatus] = useState("");

  const tags = useMemo(() => {
    const set = new Set(workImages.map((i) => i.tag));
    return ["All", ...Array.from(set)];
  }, [workImages]);

  const filtered = useMemo(() => {
    if (activeTag === "All") return workImages;
    return workImages.filter((i) => i.tag === activeTag);
  }, [activeTag, workImages]);

  const openAt = (idx) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(-1);
  const prev = () =>
    setLightboxIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  const next = () =>
    setLightboxIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));

  // Load Elfsight platform script once (Instagram + Google Reviews widgets)
  useEffect(() => {
    const needsElfsight =
      (ELSFIGHT_INSTAGRAM_APP && !ELSFIGHT_INSTAGRAM_APP.includes("YOUR_")) ||
      (ELSFIGHT_GOOGLE_REVIEWS_APP &&
        !ELSFIGHT_GOOGLE_REVIEWS_APP.includes("YOUR_"));

    if (!needsElfsight) return;

    const existing = document.querySelector(
      'script[src="https://static.elfsight.com/platform/platform.js"]'
    );
    if (existing) return;

    const s = document.createElement("script");
    s.src = "https://static.elfsight.com/platform/platform.js";
    s.defer = true;
    document.body.appendChild(s);
  }, [ELSFIGHT_INSTAGRAM_APP, ELSFIGHT_GOOGLE_REVIEWS_APP]);

  // SEO
  const pageTitle = "Commercial Cleaning Perth | NJ Pro Cleaning Services";
  const description =
    "Premium commercial cleaning in Perth. Office cleaning, gym cleaning, hospitality venues, bathrooms, carpets and windows. Quality matters.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: [{ "@type": "City", name: SITE.city }],
    address: {
      "@type": "PostalAddress",
      streetAddress: "57B Thomas St",
      addressLocality: "East Cannington",
      addressRegion: SITE.region,
      postalCode: "6107",
      addressCountry: SITE.country,
    },
    sameAs: SITE.socials,
    description,
    image: SITE.url + "/logo.png",
    serviceType: [
      "Commercial cleaning",
      "Office cleaning",
      "Gym cleaning",
      "Window cleaning",
      "Carpet cleaning",
      "Bathroom cleaning",
    ],
  };

  return (
    <HelmetProvider>
      <div className="font-sans text-gray-200 bg-slate-800">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={description} />
          <meta
            name="keywords"
            content="commercial cleaning perth, office cleaning perth, gym cleaning perth, carpet cleaning perth, window cleaning perth, bathroom cleaning perth"
          />
          <link rel="canonical" href={SITE.url} />

          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={SITE.url} />
          <meta property="og:image" content={SITE.url + "/logo.png"} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={SITE.url + "/logo.png"} />

          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* Header */}
        <header className="bg-slate-900 shadow-md fixed w-full z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="NJ Pro Cleaning Services Logo"
                className="h-12 w-auto"
              />
              <span className="text-xl font-semibold text-amber-400 hidden md:block">
                NJ Pro Cleaning Services
              </span>
            </div>
            <nav className="space-x-6 hidden md:block">
              <a href="#services" className="hover:text-amber-400">
                Services
              </a>
              <a href="#work" className="hover:text-amber-400">
                Our Work
              </a>
              <a href="#social" className="hover:text-amber-400">
                Reviews
              </a>
              <a href="#industries" className="hover:text-amber-400">
                Industries
              </a>
              <a href="#about" className="hover:text-amber-400">
                About
              </a>
              <a
                href="#contact"
                className="bg-amber-500 text-slate-900 px-4 py-2 rounded-2xl shadow-lg font-semibold"
              >
                Get Quote
              </a>
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-300 hover:text-amber-400"
              >
                <Facebook size={18} />
              </a>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-300 hover:text-amber-400"
              >
                <Instagram size={18} />
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-32 pb-24 text-center bg-slate-800">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-amber-400"
          >
            Premium Commercial Cleaning in Perth
          </motion.h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-300">
            Quality matters. We deliver detail-focused cleaning for offices, gyms,
            hospitality venues, bathrooms, carpets and windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl text-lg shadow-xl font-semibold"
            >
              Book Free Site Inspection
            </a>
            <a
              href="#work"
              className="border border-amber-500 text-amber-400 px-8 py-4 rounded-2xl text-lg shadow font-semibold"
            >
              See Our Results
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 bg-slate-700">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-12 text-amber-400">Our Services</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Office Cleaning",
                "Gym & Fitness Cleaning",
                "Hospitality Cleaning",
                "Bathroom & Amenities",
                "Carpet Extraction",
                "Window Cleaning",
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
                >
                  <CheckCircle className="mx-auto mb-4 text-amber-400" />
                  <h4 className="font-semibold text-xl text-white">{service}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Work */}
        <section id="work" className="py-20 bg-slate-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-amber-400">Our Work</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Real results from commercial sites — polished floors, restored
                carpets, spotless bathrooms and streak-free windows.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 justify-center">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTag(t);
                    setLightboxIndex(-1);
                  }}
                  className={
                    "px-4 py-2 rounded-2xl border text-sm font-semibold transition " +
                    (activeTag === t
                      ? "bg-amber-500 text-slate-900 border-amber-500"
                      : "border-slate-600 text-gray-200 hover:border-amber-500 hover:text-amber-400")
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => openAt(idx)}
                  className="group text-left bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                  title="Click to view"
                >
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-52 w-full object-cover group-hover:scale-[1.02] transition"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-semibold bg-amber-500 text-slate-900 px-3 py-1 rounded-2xl">
                      {img.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold">{img.alt}</p>
                    <p className="text-gray-400 text-sm mt-1">Tap to enlarge</p>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {lightboxIndex >= 0 && filtered[lightboxIndex] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
                  onClick={close}
                >
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    className="relative max-w-5xl w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={close}
                      className="absolute -top-12 right-0 text-white/90 hover:text-white flex items-center gap-2"
                    >
                      <X size={18} /> Close
                    </button>

                    <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={filtered[lightboxIndex].src}
                        alt={filtered[lightboxIndex].alt}
                        className="w-full max-h-[75vh] object-contain bg-black"
                      />
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-white font-semibold">
                            {filtered[lightboxIndex].alt}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {filtered[lightboxIndex].tag}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={prev}
                            className="px-4 py-2 rounded-2xl border border-slate-700 text-gray-200 hover:border-amber-500 hover:text-amber-400"
                          >
                            <span className="inline-flex items-center gap-2">
                              <ChevronLeft size={16} /> Prev
                            </span>
                          </button>
                          <button
                            onClick={next}
                            className="px-4 py-2 rounded-2xl border border-slate-700 text-gray-200 hover:border-amber-500 hover:text-amber-400"
                          >
                            <span className="inline-flex items-center gap-2">
                              Next <ChevronRight size={16} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Social + Reviews */}
        <section id="social" className="bg-slate-900 py-20">
          <div className="max-w-6xl mx-auto px-4">
            {/* Follow CTA */}
            <div className="bg-amber-500 text-slate-900 rounded-2xl p-10 text-center shadow-2xl">
              <h3 className="text-3xl font-bold mb-3">Follow Us For Real Cleaning Results</h3>
              <p className="mb-6">See our latest projects, before/after results and ongoing work.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 text-amber-400 px-6 py-3 rounded-2xl shadow-lg font-semibold"
                >
                  <Facebook size={18} /> Facebook
                </a>
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 text-amber-400 px-6 py-3 rounded-2xl shadow-lg font-semibold"
                >
                  <Instagram size={18} /> Instagram
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="mt-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-amber-400 mb-3">Latest On Instagram</h3>
                <p className="text-gray-300 mb-8">
                  Live feed from @njprocleaningservices.
                </p>
              </div>
              {ELSFIGHT_INSTAGRAM_APP.includes("YOUR_") ? (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-gray-300">
                  <p className="font-semibold text-white mb-2">Setup needed</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Create an Instagram Feed widget on Elfsight.</li>
                    <li>Copy the App ID and paste into ELSFIGHT_INSTAGRAM_APP.</li>
                  </ol>
                  <p className="mt-4">
                    Open Instagram profile: {" "}
                    <a
                      className="text-amber-400 underline"
                      href={INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </p>
                </div>
              ) : (
                <div className={"elfsight-app-" + ELSFIGHT_INSTAGRAM_APP} />
              )}
            </div>

            {/* Facebook */}
            <div className="mt-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-amber-400 mb-3">Facebook</h3>
                <p className="text-gray-300 mb-8">
                  Official Facebook Page plugin with timeline and messages.
                </p>
              </div>
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <iframe
                  title="NJ Pro Cleaning Services Facebook Page"
                  src={
                    "https://www.facebook.com/plugins/page.php?" +
                    "href=" +
                    encodeURIComponent(FACEBOOK_PAGE_URL) +
                    "&tabs=timeline,messages" +
                    "&width=1000&height=700" +
                    "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                  }
                  style={{ border: "none", overflow: "hidden", width: "100%", height: 700 }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>

            {/* Google Reviews */}
            <div className="mt-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-amber-400 mb-3">Google Reviews</h3>
                <p className="text-gray-300 mb-8">
                  Live Google reviews from your Business Profile (via widget).
                </p>
              </div>
              {ELSFIGHT_GOOGLE_REVIEWS_APP.includes("YOUR_") ? (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-gray-300">
                  <p className="font-semibold text-white mb-2">Setup needed</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Create a Google Reviews widget on Elfsight.</li>
                    <li>Copy the App ID and paste into ELSFIGHT_GOOGLE_REVIEWS_APP.</li>
                  </ol>
                </div>
              ) : (
                <div className={"elfsight-app-" + ELSFIGHT_GOOGLE_REVIEWS_APP} />
              )}
            </div>

            {/* Google Maps */}
            <div className="mt-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-amber-400 mb-3">Find Us On Google</h3>
                <p className="text-gray-300 mb-8">
                  Service area: Perth and surrounds.
                </p>
              </div>
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <iframe
                  title="NJ Pro Cleaning Services on Google Maps"
                  src={SITE.googleMapsEmbed}
                  style={{ border: 0, width: "100%", height: 500 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="text-center mt-6">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=NJ%20Pro%20Cleaning%20Services%2C%2057B%20Thomas%20St%2C%20East%20Cannington%20WA%206107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-400 underline"
                >
                  <MapPin size={18} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="py-20 bg-slate-800">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h3 className="text-3xl font-bold mb-12 text-amber-400">
              Industries We Service
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                "Corporate Offices",
                "Medical Centres",
                "Gyms & Fitness",
                "Hospitality Venues",
              ].map((industry, index) => (
                <div
                  key={index}
                  className="p-6 border border-amber-500 rounded-2xl shadow-md bg-slate-900"
                >
                  <Building2 className="mx-auto mb-4 text-amber-400" />
                  <p className="font-medium text-white">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="bg-slate-900 py-20">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h3 className="text-3xl font-bold mb-12 text-amber-400">
              Why Choose NJ Pro Cleaning?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <ShieldCheck className="mx-auto mb-4 text-amber-400" />
                <p>Fully insured and police-cleared staff</p>
              </div>
              <div className="p-6">
                <ClipboardCheck className="mx-auto mb-4 text-amber-400" />
                <p>Strict quality control inspections</p>
              </div>
              <div className="p-6">
                <CheckCircle className="mx-auto mb-4 text-amber-400" />
                <p>Flexible after-hours cleaning</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 bg-slate-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className="text-3xl font-bold mb-6 text-amber-400">
              About NJ Pro Cleaning Services
            </h3>
            <p className="text-gray-300">
              Perth-based commercial cleaning specialists delivering premium,
              consistent results. We focus on compliance, hygiene standards,
              structured quality checks and clear communication.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-slate-950 text-white py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className="text-3xl font-bold mb-6 text-amber-400">
              Request a Free Quote
            </h3>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={() => setStatus("Sending...")}
              className="grid gap-4 text-slate-900 max-w-xl mx-auto"
            >
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="New Quote Request - NJ Pro Cleaning"
              />

              <input
                name="company"
                required
                type="text"
                placeholder="Company Name"
                className="p-3 rounded"
              />
              <input
                name="contact"
                required
                type="text"
                placeholder="Contact Person"
                className="p-3 rounded"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email"
                className="p-3 rounded"
              />
              <input
                name="phone"
                required
                type="tel"
                placeholder="Phone"
                className="p-3 rounded"
              />
              <textarea
                name="message"
                required
                placeholder="Tell us about your premises (sqm, frequency, suburb/address)"
                className="p-3 rounded"
                rows={4}
              />

              <button className="bg-amber-500 text-slate-900 py-3 rounded-2xl shadow-lg font-semibold">
                Submit Quote Request
              </button>
            </form>

            {status && <p className="mt-4 text-amber-400">{status}</p>}

            <div className="mt-8 text-gray-300">
              <p className="flex justify-center items-center gap-2">
                <Phone size={18} /> {SITE.phone}
              </p>
              <p className="flex justify-center items-center gap-2">
                <Mail size={18} /> {SITE.email}
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <Facebook size={18} /> Facebook
                </a>
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <Instagram size={18} /> Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-gray-400 text-center p-6">
          <p>
            © {new Date().getFullYear()} NJ Pro Cleaning Services | Perth Commercial
            Cleaning Specialists
          </p>
        </footer>
      </div>
    </HelmetProvider>
  );
}
