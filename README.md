# GCA Live

A modern web application for viewing live Rubik's Cube competitions in Germany, built by the German Cube Association (GCA).

## Features

- **Real-time Competition Listings**: View upcoming Rubik's Cube competitions in Germany
- **Internationalization**: Full support for German and English languages
- **Theme Switching**: Light (Emerald) and dark (Night) theme options
- **QR Code Generation**: Generate QR codes for easy mobile access to competition details
- **Responsive Design**: Optimized for desktop and mobile devices
- **SEO Optimized**: Full meta tags, Open Graph, and structured data support
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.48.0
- **Language**: TypeScript 5.9.3
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) 3.4.18
  - [DaisyUI](https://daisyui.com/) 4.12.24
- **Testing**:
  - [Vitest](https://vitest.dev/) 4.0.4
  - [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro/) 5.2.8
- **Deployment**: Netlify
- **Build Tool**: Vite 6.4.1

## Prerequisites

- Node.js >= 18.x (Recommended: 20.19+ for latest dependency updates)
- npm 9.x or higher

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gca-live
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

### Development

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```
gca-live/
├── src/
│   ├── lib/
│   │   ├── assets/          # Static assets (logo, images)
│   │   ├── components/      # Reusable Svelte components
│   │   │   ├── CompetitionCard.svelte
│   │   │   ├── QRCode.svelte
│   │   │   ├── SEO.svelte
│   │   │   └── LoadingSpinner.svelte
│   │   ├── translations/    # i18n translation files
│   │   │   ├── de/         # German translations
│   │   │   └── en/         # English translations
│   │   ├── types/          # TypeScript type definitions
│   │   │   └── competition.ts
│   │   ├── config.ts       # Centralized configuration
│   │   ├── themes/         # Theme configuration
│   │   └── translations.ts # i18n setup
│   ├── routes/
│   │   ├── api/           # API endpoints
│   │   │   └── competitions/
│   │   ├── competitions/  # Competition detail pages
│   │   │   └── [id]/
│   │   ├── +layout.svelte # Root layout
│   │   ├── +page.svelte   # Home page
│   │   ├── +error.svelte  # Error page
│   │   └── +loading.svelte # Loading page
│   ├── app.css            # Global styles
│   └── app.html           # HTML template
├── static/                # Static files served at root
├── tests/                 # Test files
├── vitest.config.ts       # Vitest configuration
├── svelte.config.js       # SvelteKit configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── netlify.toml          # Netlify deployment config
```

## Configuration

The application uses centralized configuration in `src/lib/config.ts`:

- **External URLs**: WCA Live, Competition Groups, social media links
- **API Settings**: Cache duration, request timeouts, default values
- **Theme Settings**: Available themes, default theme, cookie settings
- **Locale Settings**: Default language, available languages
- **SEO Settings**: Site name, descriptions, Open Graph data

## Data Source

Competition data is fetched from the [WCA REST API](https://github.com/robiningelbrecht/wca-rest-api) hosted on GitHub. The application caches responses for 5 minutes to reduce API calls.

## Deployment

The application is configured for deployment on Netlify using the `@sveltejs/adapter-netlify` adapter.

### Deploy to Netlify

1. Connect your repository to Netlify
2. Build settings are configured in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18.x

### Environment Variables

No environment variables are required for basic operation. All configuration is in `src/lib/config.ts`.

## Testing

The project uses Vitest and Testing Library for testing:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Visual UI
npm run test:ui

# Coverage report
npm run test:coverage
```

## Internationalization (i18n)

The app supports German (de) and English (en):

- Default language: German
- Translation files: `src/lib/translations/{locale}/content.json`
- Language switcher in navbar
- Persisted via cookies

## Theme Management

- Light theme: "Emerald" (default)
- Dark theme: "Night"
- Toggle in navbar
- Persisted via localStorage and cookies
- Server-side theme application for no-flash loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- TypeScript strict mode enabled
- Prettier for code formatting
- Pre-commit hooks via Husky
- lint-staged for staged file linting

## License

This project is maintained by the German Cube Association (GCA).

## Links

- [German Cube Association Website](https://www.germancubeassociation.de/)
- [Instagram](https://www.instagram.com/germancubeassociation/)
- [Discord](https://discord.gg/wvSPg8k9)
- [World Cube Association](https://www.worldcubeassociation.org/)

## Support

For issues or questions, please open an issue on GitHub or contact the German Cube Association.
