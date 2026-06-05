# PHASE 1 — Developer Reference Guide
## ShopnerGhorBari Real Estate Website

> **Audience:** Developers maintaining or extending this project  
> **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · EmailJS

---

## 1. Project Setup

```bash
# Clone and install
git clone <repo-url>
cd shopnerghorbari
npm install

# Create env file
cp .env.local.example .env.local   # or create manually
# Fill in NEXT_PUBLIC_EMAILJS_* values

# Dev server
npm run dev        # Turbopack → http://localhost:3000

# Production build
npm run build
npm start
```

### Node & NPM version
- Node.js ≥ 18 required (Next.js 16 requirement)
- NPM ≥ 9

---

## 2. Folder Structure

```
shopnerghorbari/
├── app/
│   ├── layout.tsx          # Root layout, Inter font, metadata
│   ├── page.tsx            # Main page — composes all sections + inline WhyUs/Footer
│   └── globals.css         # Tailwind directives + custom CSS classes
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── PropertyMatchQuiz.tsx
│   │   ├── FeaturedProperties.tsx
│   │   ├── PropertyExplorer.tsx
│   │   ├── KolkataMap.tsx
│   │   ├── BuyingJourney.tsx
│   │   ├── Testimonials.tsx
│   │   ├── AgentBio.tsx
│   │   ├── FAQ.tsx
│   │   ├── WhatsAppFAB.tsx
│   │   └── LeadPopup.tsx
│   └── lib/
│       ├── i18n.ts         # All translations (EN + BN) + Translations type
│       └── utils.ts        # cn() helper (clsx + tailwind-merge)
│
├── public/
│   └── images/
│       ├── properties/     # 24 JPEG property images
│       ├── testimonials/   # 4 JPEG client photos
│       ├── agent/          # 2 JPEG agent photos
│       ├── hero/           # Hero background image
│       ├── backgrounds/    # Section backgrounds
│       └── icons/          # SVG icons
│
├── .env.local              # EmailJS credentials (NOT committed)
├── PHASE_1.md              # Full project documentation
├── PHASE_1_DEVELOPER.md    # This file
├── CLIENT-TEMPLATE-GUIDE-REAL-ESTATE.md  # Client onboarding template
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 3. Key Dependencies

```json
{
  "next": "16.1.6",              // App Router, Turbopack
  "react": "^19.0.0",
  "typescript": "^5",
  "tailwindcss": "^3.4",
  "framer-motion": "^12.0",     // All animations
  "@emailjs/browser": "^4.4",   // Lead form email sending
  "embla-carousel-react": "^8", // Featured + Testimonials carousels
  "react-hook-form": "^7",      // Form state management
  "@hookform/resolvers": "^4",  // Zod adapter for react-hook-form
  "zod": "^3",                  // Form validation schemas
  "canvas-confetti": "^1",      // Quiz result confetti
  "react-countup": "^6",        // Animated number counter (quiz result)
  "react-leaflet": "^4",        // Interactive Kolkata map
  "leaflet": "^1",              // Leaflet core
  "lucide-react": "^0.475"      // Icon library
}
```

---

## 4. Environment Variables

```env
# .env.local — all NEXT_PUBLIC_ so they're available client-side
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

**Access in code:**
```typescript
const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";
```

> ⚠️ Never commit `.env.local`. It's in `.gitignore`.

---

## 5. TypeScript Path Aliases

```typescript
// tsconfig.json paths
"@/*"             → "./*"
"@/components/*"  → "./src/components/*"
"@/lib/*"         → "./src/lib/*"
```

Usage:
```typescript
import Navbar from "@/components/Navbar";
import { t, Lang, Translations } from "@/lib/i18n";
```

---

## 6. i18n System

**File:** `src/lib/i18n.ts`

```typescript
export const translations = {
  en: { nav, hero, quiz, buyingJourney, why, featured, explorer,
        testimonials, agent, faq, contact, footer },
  bn: { /* identical keys, Bengali values */ },
};

export type Lang = "en" | "bn";
export type Translations = typeof translations.en;
// Cast to allow dynamic lang indexing without union type issues:
export const t = translations as Record<Lang, Translations>;
```

### Usage in components
```typescript
import { Translations } from "@/lib/i18n";

export default function MyComponent({ t }: { t: Translations }) {
  return <h1>{t.hero.headline1}</h1>;
}
```

### Usage in `app/page.tsx`
```typescript
import { t as getT, Lang, Translations } from "@/lib/i18n";
const [lang, setLang] = useState<Lang>("en");
const t = getT[lang];  // Fully typed Translations object
```

### Adding a new translation key
1. Add to `en` object in `i18n.ts`
2. Add matching key to `bn` object  
3. `Translations` type auto-updates (derived from `typeof translations.en`)  
4. TypeScript will error on any component using the type if key is missing

---

## 7. Global CSS Classes (`app/globals.css`)

```css
/* Key custom utility classes */
.glass          /* glassmorphism card */
.glass-dark     /* darker glass variant */
.glass-card     /* hover-aware glass card */
.btn-primary    /* gold filled CTA button */
.btn-whatsapp   /* green WhatsApp button */
.section-tag    /* small gold uppercase label chip */
.no-scrollbar   /* hide scrollbar but allow scroll */
.text-gold      /* color: #d4a853 */
.bg-gold        /* background: #d4a853 */
.border-gold    /* border-color: #d4a853 */
.bg-navy        /* background: #0a0f1a */
.bg-navy-light  /* background: #141c2e */
```

---

## 8. Component Patterns

### Opening a Lead Popup from anywhere
```typescript
// Dispatch this custom event from any component
window.dispatchEvent(new Event("open-lead-popup"));
```

### Smooth scroll to a section
```typescript
document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
```

### WhatsApp deep link
```typescript
const phone = t.contact.phone.replace(/[^0-9]/g, ""); // "919883203782"
const msg = encodeURIComponent(t.contact.whatsappMsg);
window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
```

### Section wrapper pattern
```tsx
<section id="section-id" className="py-24 px-4 sm:px-8" style={{ background: "#0a0f1a" }}>
  <div className="max-w-6xl mx-auto">
    {/* Section tag */}
    <span className="section-tag">{t.section.tag}</span>
    <h2 className="text-4xl sm:text-5xl font-black text-white">{t.section.h2}</h2>
    {/* content */}
  </div>
</section>
```

---

## 9. EmailJS Integration

**File:** `src/components/LeadPopup.tsx`

```typescript
import emailjs from "@emailjs/browser";

await emailjs.send(
  SERVICE_ID,
  TEMPLATE_ID,
  {
    from_name:    data.name,
    from_phone:   `+91 ${data.phone}`,
    locality:     data.locality || "Not specified",
    budget:       data.budget   || "Not specified",
    to_name:      "Arjun Roy",
    enquiry_time: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
    source: "Website Lead Popup",
  },
  { publicKey: PUBLIC_KEY }
);
```

### EmailJS Template Variables
```
{{from_name}}     — Visitor's full name
{{from_phone}}    — +91 XXXXXXXXXX
{{locality}}      — Preferred area (or "Not specified")
{{budget}}        — Budget range (or "Not specified")
{{to_name}}       — Agent name
{{enquiry_time}}  — IST formatted datetime
{{source}}        — "Website Lead Popup"
```

---

## 10. Map (Leaflet)

**File:** `src/components/KolkataMap.tsx`

- Uses `next/dynamic` with `{ ssr: false }` to prevent SSR hydration errors
- Leaflet CSS imported directly in component
- Custom gold SVG marker created via `L.Icon` after client mount
- Dark tiles: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`

```typescript
// Always dynamic-import Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
```

---

## 11. Carousel (Embla)

Used in: `FeaturedProperties.tsx`, `Testimonials.tsx`

```typescript
import useEmblaCarousel from "embla-carousel-react";

const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, align: "start" });
const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

// Auto-rotate (Testimonials)
useEffect(() => {
  if (!emblaApi) return;
  const timer = setInterval(() => emblaApi.scrollNext(), 5500);
  return () => clearInterval(timer);
}, [emblaApi]);
```

---

## 12. Form Validation (Zod + react-hook-form)

```typescript
const schema = z.object({
  name:     z.string().min(2),
  phone:    z.string().min(10).max(10),
  locality: z.string().optional(),
  budget:   z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

---

## 13. Adding a New Property

### 1. Add image to `/public/images/properties/`
Name it descriptively: `Property_Type_Location_Room_Description.jpeg`

### 2. Update `FeaturedProperties.tsx`
```typescript
const properties = [
  // ...existing properties
  {
    id: 7,
    title: "New Property Title",
    locality: "Locality",
    bhk: 3,
    sqft: 1200,
    price: "₹90L",
    status: "Ready to Move",
    features: ["PARKING", "GYM"],
    imgs: [
      "/images/properties/New_Property_Image_1.jpeg",
      "/images/properties/New_Property_Image_2.jpeg",
    ],
  },
];
```

### 3. Update `PropertyExplorer.tsx` similarly
Add with `price` as a number (in Lakhs) for filter matching logic.

### 4. Update `i18n.ts` `featured.properties[]` (optional)
Only needed if components consume `t.featured.properties`.

---

## 14. Adding a New Section

1. Create `src/components/NewSection.tsx`
   ```typescript
   import { Translations } from "@/lib/i18n";
   export default function NewSection({ t }: { t: Translations }) { ... }
   ```
2. Add translation keys to BOTH `en` and `bn` in `src/lib/i18n.ts`
3. Import + insert in `app/page.tsx` at the correct position
4. Give the section an `id` for navbar anchor linking

---

## 15. TSConfig Notes

```json
{
  "exclude": ["node_modules", "ignite-kolkata-academy"]
}
```

> ⚠️ **Critical:** `ignite-kolkata-academy/` is a **separate unrelated project** stored in this folder. It MUST stay in the `exclude` array or the TypeScript build will fail with module-not-found errors.

---

## 16. Build Checklist Before Deployment

- [ ] Fill `.env.local` with real EmailJS credentials
- [ ] Run `npm run build` → should exit with code 0, zero warnings
- [ ] Test lead popup form submission (check inbox)
- [ ] Test both EN and BN language toggle
- [ ] Test on mobile viewport (375px)
- [ ] Test WhatsApp links on mobile device
- [ ] Verify all images load (no 404s in network tab)
- [ ] Check Leaflet map loads correctly (may need internet for tile CDN)
- [ ] Add Vercel env vars: `NEXT_PUBLIC_EMAILJS_*`

---

## 17. Common Gotchas

| Gotcha | Explanation |
|---|---|
| Leaflet SSR error | Always use `next/dynamic` with `{ ssr: false }` for Leaflet components |
| `translations[lang]` TS error | Use `const t = getT[lang]` where `getT = translations as Record<Lang, Translations>` |
| Image 404 | Next.js serves from `public/` — paths must exactly match including spaces and case |
| `open-lead-popup` event | Must be dispatched on `window`, not `document` |
| BN missing keys | When adding new EN keys, always add matching BN key or TS build fails |
| `items: [` regex issue | PowerShell regex once replaced `faq.items` with testimonial data; use specific string matching |

---

## 18. Git Workflow (Suggested)

```bash
# Feature branch
git checkout -b feature/phase-2-property-detail-pages

# Before merge
npm run build           # Must pass
npm run lint            # Fix all warnings

# Commit convention
git commit -m "feat(components): add property detail page"
git commit -m "fix(i18n): add missing BN explorer keys"
git commit -m "chore(deps): upgrade framer-motion to v12"
```
