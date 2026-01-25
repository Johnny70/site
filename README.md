# Frilans – React + TypeScript + Vite

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Ett modernt frilansprojekt byggt med React, TypeScript och Vite.

## Funktioner

- ⚡ Snabb utvecklingsmiljö med Vite
- 📘 TypeScript för typkontroll
- 🎨 ESLint, Prettier och Stylelint för kodkvalitet
- ♿ WCAG-kompatibel tillgänglighet
- 🧪 Testning med Vitest och Testing Library
- 🚦 React Router för navigering
- 📊 Web Vitals för performance-mätning

## Kom igång

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Förhandsgranska produktionsbygge
npm run preview
```

## Utvecklingskommandon

```bash
# Linting och formatering
npm run lint              # Kör ESLint
npm run lint:css          # Kör Stylelint på CSS-filer
npm run format            # Formatera kod med Prettier

# Testning
npm run test              # Kör tester i watch-läge
npm run test:ui           # Kör tester med UI
npm run test:run          # Kör tester en gång
npm run coverage          # Generera täckningsrapport
```

## Projektstruktur

```
├── public/              # Statisk media, bilder, fonts, Vanta/Three.js
├── src/
│   ├── components/      # React-komponenter
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── TechStack.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── SkipToContent.tsx
│   │   └── NotFound.tsx
│   ├── data/            # Data och konfiguration
│   │   └── techStack.ts
│   ├── test/            # Test-konfiguration
│   │   └── setup.ts
│   ├── App.tsx          # Huvudkomponent med routing
│   ├── App.css          # Global styling
│   ├── index.css        # Bas-styling
│   ├── main.tsx         # Entrypoint
│   └── reportWebVitals.ts # Performance-mätning
├── .gitignore           # Git ignore-regler
├── package.json         # Projektmetadata
├── vite.config.ts       # Vite-konfiguration
├── vitest.config.ts     # Vitest-konfiguration
└── README.md            # Denna fil
```

## Verktyg och teknologier

### Core
- [Vite](https://vitejs.dev/) – Byggverktyg och dev server
- [React](https://react.dev/) – UI-bibliotek (v19)
- [TypeScript](https://www.typescriptlang.org/) – Typkontroll
- [React Router](https://reactrouter.com/) – Client-side routing

### Kodkvalitet
- [ESLint](https://eslint.org/) – JavaScript/TypeScript linting
- [Stylelint](https://stylelint.io/) – CSS linting
- [Prettier](https://prettier.io/) – Kodformatering

### Testning
- [Vitest](https://vitest.dev/) – Testramverk
- [Testing Library](https://testing-library.com/) – React-testning
- [jsdom](https://github.com/jsdom/jsdom) – DOM-miljö för tester

### Performance
- [web-vitals](https://github.com/GoogleChrome/web-vitals) – Core Web Vitals-mätning
