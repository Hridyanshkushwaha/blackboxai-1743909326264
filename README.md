# LinkHub - Modern Social Network

A production-ready social networking platform inspired by early Facebook (2005) with modern enhancements.

## Features

- User profiles with cover photos
- News feed with posts
- Friend system
- Messaging
- Account settings
- Responsive design
- Modern UI with Tailwind CSS
- Client-side JavaScript for dynamic content
- Express.js backend

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript (ES6+)
- CSS Framework: Tailwind CSS
- Icons: Font Awesome
- Backend: Node.js, Express
- Build Tools: PostCSS, Autoprefixer

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build CSS:
```bash
npm run build
```

4. Start development server:
```bash
npm run dev
```

5. Open in browser:
```
http://localhost:8000
```

## Production Deployment

1. Set environment variables:
```bash
export NODE_ENV=production
export PORT=8000
```

2. Start server:
```bash
npm start
```

## Project Structure

```
linkhub/
├── public/          # Static assets
│   ├── css/         # Compiled CSS
│   ├── js/          # Client-side JavaScript
│   └── images/      # Image assets
├── src/             # Server source code
├── package.json     # Project configuration
├── server.js        # Entry point
└── tailwind.config.js # Tailwind configuration
```

## License

MIT