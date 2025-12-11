  ## ConnecT

  A full-stack app for tracking and reconnecting with people you've met. Features location-based search and user authentication.

  ### Features

  - User authentication with Passport.js and bcrypt
  - PostgreSQL database with session management
  - MapBox GL integration for location capture
  - Search and filter encounters

  ### Tech Stack

  Express, React, PostgreSQL, Passport.js, MapBox GL, Docker

  ### Run Locally

  ```bash
  npm install
  npm run prestart   # Start PostgreSQL via Docker
  npm run dev        # Start Express server
  cd client && npm start  # Start React app
