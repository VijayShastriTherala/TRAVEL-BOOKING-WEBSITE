# Roamly Travel

A responsive travel booking experience built with React, React Router, and Vite. Explore handpicked trips, filter and search destinations, view package details, calculate a booking total, and manage saved bookings in browser localStorage.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Pages

- `/` — Home page and featured trips
- `/destinations` — Search, filter, and sort trips
- `/package/:id` — Package details
- `/book/:id` — Validated booking form and price calculation
- `/bookings` — Saved bookings, with cancellation

Bookings are stored in the browser under the `roamly-bookings` localStorage key. No backend or payment processing is connected.
