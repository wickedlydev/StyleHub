# StyleHub

StyleHub is a Firebase-backed clothing storefront built with the latest React and Vite tooling. The experience includes authenticated shopping, category previews, cart management, and a fully responsive UI styled with Sass.

## Tech Stack

- React 19 + React Router 7
- Vite 7 for development/build
- Firebase v12 Authentication and Firestore
- Sass for styling
- Vitest + Testing Library for unit tests

## Prerequisites

- Node.js 20 or newer (required by the Vite/React Router toolchain)
- npm 10+

## Setup

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/wickedlydev/StyleHub-master.git
   cd StyleHub-master
   npm install
   ```
   2. Configure Firebase credentials inside `src/utils/firebase.utils.js` (create a Firebase project, copy the config object, and replace the placeholder values).
   3. Download a Firebase service-account JSON (Project settings → Service accounts) and either:
      - Save it at the repository root (e.g., `new-dev-b41dc-firebase-adminsdk-xxxxx.json`, the default path in `scripts/seedCategories.js`), or
      - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the file:
        ```powershell
        setx GOOGLE_APPLICATION_CREDENTIALS "C:\\path\\to\\service-account.json"
        ```
   4. (One-time) Seed your Firestore `categories` collection with the bundled sample data (uses the Admin SDK, so security rules are bypassed):
      ```bash
      npm run seed:categories
      ```
      The script only writes data if the collection is empty.
   5. Start the dev server:
   ```bash
   npm run dev
   ```
   The app will be served on the port that Vite reports (default 5173).

## Available Scripts

- `npm run dev` – Start Vite in development mode with fast HMR.
- `npm run build` – Produce a production build in `dist/`.
- `npm run preview` – Preview the production build locally.
- `npm run test -- --run` – Execute the Vitest suite once in CI mode.

## Deployment

1. Build the project with `npm run build`.
2. Deploy the generated `dist/` folder to any static host (Netlify, Vercel, Firebase Hosting, etc.).

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit and push your changes.
4. Open a pull request describing the improvements.

## License

This project is distributed under the MIT License. See `LICENSE` for details.
