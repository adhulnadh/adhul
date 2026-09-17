# Adhul Nadh — Developer & Designer Portfolio

A sleek, futuristic single-page portfolio website blending **cybersecurity aesthetics** with **creative designer polish**. Built with semantic HTML5, modern CSS3 (Flexbox + CSS Grid), and vanilla JavaScript.

---

## 🚀 Live Demo & Deployment

This project requires **zero build steps** and zero dependencies. You can immediately deploy it to:

### 1. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `adhulnadh/adhul`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live within seconds!

### 2. Vercel / Netlify
- **Vercel**: Run `npx vercel` or import your GitHub repository directly.
- **Netlify**: Drag and drop the `adhul` folder into [Netlify Drop](https://app.netlify.com/drop), or link your GitHub repo with publish directory set to `/`.

### 3. Local Development
Simply open `index.html` in any web browser, or launch a lightweight local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```
Then visit `http://localhost:8000` in your browser.

---

## 🎨 Color Palette & Typography

- **Background**: `#0a0a0f`
- **Card Background**: `rgba(18, 18, 28, 0.75)`
- **Cyan Accent**: `#00f0ff`
- **Purple Accent**: `#a855f7`
- **Text Primary**: `#ffffff`
- **Muted Text**: `#b0b0b0`
- **Fonts**:
  - Headings: `Space Grotesk` & `Orbitron`
  - Body: `Inter`
  - Terminal/Code: `JetBrains Mono`

---

## 📂 Project Structure

```
adhul/
├── index.html        # Main semantic HTML5 structure with all 8 sections
├── style.css         # Modern CSS design system, dark/light themes, animations & responsive queries
├── script.js         # Interactive engine (canvas, typewriter, filters, modals, lightbox, form)
├── assets/           # Folder for your personal photos and media
│   ├── main.jpg      # Hero profile photo
│   └── profile.jpg   # About section photo
└── README.md         # Documentation & setup guide
```

---

## 🧩 Sections Included (in order)

1. **HERO / HOME**: Fullscreen cyber grid particle background, glowing avatar frame, terminal typing animation rotating through specializations, and direct CTA buttons.
2. **ABOUT**: Two-column layout with personal bio, 4 quick stats cards, and a Download Resume button.
3. **SKILLS**: Categorized skill cards with animated progress indicators covering Cybersecurity (Kali, Wireshark, Burp, Nmap, Metasploit, NetSec, OSINT), Video Editing (DaVinci, Premiere, After Effects, CapCut), and Design (Photoshop, Illustrator, Canva, Figma).
4. **EXPERIENCE**: Vertical neon timeline with glowing nodes detailing cybersecurity research, freelance video editing, and academic milestones.
5. **PROJECTS**: Responsive grid with instant category filtering (`All`, `Cybersecurity`, `Video Editing`, `Design`) and interactive project detail modals.
6. **GALLERY**: Masonry-style media showcase with native `<dialog>` lightbox modal supporting full keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
7. **CONTACT**: Validated form with real-time feedback and submission toast alerts, alongside one-click copy cards for direct email (`adhulnadh39@gmail.com`) and phone (`+91 7012115759`).
8. **FOOTER**: Quick navigation, specialization badges, copyright, and floating Back to Top button.

---

## 🖼️ Adding Your Personal Photos

Drop your photos directly into the `assets/` folder:
- Place your hero picture at `assets/main.jpg`
- Place your square avatar at `assets/profile.jpg`

The code includes graceful fallbacks so the site looks stunning right out of the box!
