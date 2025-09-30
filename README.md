♟️ GM Wiki

A React + TypeScript application that lists Chess Grandmasters (from Chess.com’s public API
) with detailed profile modals, pagination, search, filtering, and light/dark themes.

🚀 Live Demo

👉 [View Demo](https://chessgm-wiki-by-art.netlify.app/)

✨ Features

📋 Grandmasters List: Paginated (25 per page), searchable, and filterable by country.

🧑‍💼 Profile Modal: Click on a Grandmaster to view details such as:

Name, username, avatar, country flag

Joined date, last online, status

FIDE rating

League, verified, streamer info

Time since last online (auto-updating HH:MM:SS clock)

🎨 Tournament Theme: SCSS-based styling with responsive design.

🌗 Dark/Light Theme Toggle: Global theming with persistence.

📱 Mobile Responsive: Optimized layout for smaller devices.

✅ Jest + React Testing Library: Unit tests + snapshot tests for:

Dropdown, Pagination, SearchBar, GrandmasterModal, and GrandmastersList

🛠 TypeScript: Strong typing for reliability and clarity.

🛠️ Installation

Clone the repo:

git clone https://github.com/<your-username>/gm-wiki.git
cd gm-wiki


Install dependencies:

npm install


Start the dev server:

npm run dev


Build for production:

npm run build


Preview production build:

npm run preview

🎨 Styling

Uses SCSS modules under src/styles/

Global theme variables for light/dark mode

Tournament-style cards and layout

Mobile-first responsive design

🌗 Dark Mode

Toggle available in the header.
Theme preference is saved to localStorage.

✅ Testing

We use Jest + React Testing Library.

Run all tests:

npm test


Update snapshots:

npm test -- -u


Test files are located under:

src/components/__tests__/

src/pages/__tests__/

Included tests

Dropdown: rendering, snapshot, order toggling

Pagination: navigation between pages

SearchBar: filtering results

GrandmasterModal: player details, modal close, snapshots (clock and date are mocked for stability)

GrandmastersList: integration snapshot with mocked Chess.com API

📡 API Endpoints Used

List Grandmasters:
https://api.chess.com/pub/titled/GM

Player Profile:
https://api.chess.com/pub/player/{username}

Player Stats (FIDE rating):
https://api.chess.com/pub/player/{username}/stats

Country Info:
https://api.chess.com/pub/country/{code}

📂 Project Structure
src/
  components/
    Dropdown.tsx
    Pagination.tsx
    SearchBar.tsx
    GrandmasterModal.tsx
  pages/
    GrandmastersList.tsx
  styles/
    _variables.scss
    _cards.scss
    _layout.scss
  utils/
    useClock.ts
  __tests__/
    (unit + snapshot tests)
