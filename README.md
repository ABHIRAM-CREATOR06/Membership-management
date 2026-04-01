# TinkerHub SNGCE Club Manager

A comprehensive club management system for the TinkerHub SNGCE chapter, designed to streamline member management, task coordination, event planning, and team collaboration with a distinctive neubrutalist design aesthetic.

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)

## Features

### Core Functionality
- **Dashboard Analytics** - Real-time statistics, high-priority tasks, event tracking, and top performer rankings
- **Kanban Task Management** - Drag-and-drop task board with priority filtering, status tracking, and team assignment
- **Member Directory** - Comprehensive member profiles with performance metrics and portfolio tracking
- **Event Management** - Event planning with budget tracking, team assignment, and task progress monitoring
- **Financial Tracking** - Budget vs expenses monitoring for all events
- **Performance Analytics** - Member efficiency calculations based on task completion rates

### Design & UX
- **Neubrutalist Design System** - Bold borders, sharp corners, and brutal shadows for a distinctive aesthetic
- **Dark/Light Theme** - Toggle between light and dark modes
- **Responsive Design** - Optimized for desktop and mobile devices
- **Offline Capable** - Local storage persistence without backend requirements

## Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and context API
- **TypeScript 5.8.3** - Full type safety and developer experience
- **Vite 5.4.19** - Lightning-fast build tool and dev server
- **React Router 6.30.1** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Comprehensive accessible component library
- **shadcn/ui** - Pre-built UI components
- **Framer Motion 12.34.3** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### State & Data
- **React Context API** - Global state management
- **Local Storage** - Client-side data persistence
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tinkerhub-sngce-club-manager.git
   cd tinkerhub-sngce-club-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or use the Windows batch file
   start_app.bat
   ```

The application will be available at `http://localhost:8080`

### Alternative Setup (Windows)

For Windows users, batch files are provided:
- `start_app.bat` - Installs dependencies and starts the development server
- `start_server.bat` - Starts the development server only

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppLayout.tsx    # Main layout wrapper
│   ├── AppSidebar.tsx   # Navigation sidebar
│   ├── EventDialog.tsx  # Event create/edit modal
│   ├── MemberDialog.tsx # Member create/edit modal
│   ├── StatCard.tsx     # Statistics display card
│   ├── TaskCard.tsx     # Task display card
│   └── ui/              # shadcn/ui components
├── context/
│   └── DataContext.tsx  # Global state management
├── data/
│   └── mockData.ts      # Sample data models & seeds
├── hooks/
│   ├── useData.ts       # Custom hook for data context
│   └── use-toast.ts     # Toast notification hook
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Tasks.tsx        # Kanban task board
│   ├── Members.tsx      # Member directory
│   └── Events.tsx       # Event management
├── test/                # Test files
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Architecture

### State Management
- **Context + Reducer Pattern** - Centralized state management using React Context API with reducer functions
- **Local Storage Synchronization** - Automatic persistence of members, tasks, and events data
- **Event-Task Synchronization** - Event progress updates automatically based on task completion

### Data Flow
1. **DataContext** - Provides global state and dispatch functions
2. **useData Hook** - Custom hook for component-level state access
3. **Local Storage** - Client-side persistence layer
4. **Component Updates** - React re-renders on state changes

### Component Patterns
- **Composition Pattern** - Reusable UI components built with shadcn/ui
- **Dialog Components** - Modal forms for CRUD operations
- **Kanban Board** - Drag-and-drop interface for task management
- **Responsive Grids** - Adaptive layouts for different screen sizes

### Design Patterns
- **Neubrutalist Design System** - Consistent visual language with bold aesthetics
- **CSS Variables** - Theme customization through CSS custom properties
- **Utility-First Styling** - Tailwind CSS for rapid UI development

### Performance Optimizations
- **Code Splitting** - Vite's automatic code splitting for faster loads
- **Tree Shaking** - Unused code elimination in production builds
- **Optimized Bundles** - Minimized bundle size with Vite's optimization
- **Local Storage Caching** - Reduced API calls through client-side caching
- **Lazy Loading** - Components loaded on demand for better performance

### Security Considerations
- **Client-Side Only** - No backend to secure, all data stored locally
- **XSS Protection** - React's built-in XSS protection
- **Input Validation** - Zod schema validation for all form inputs
- **Secure Headers** - Proper security headers in production builds
- **No External APIs** - No third-party data transmission

### Accessibility Features
- **ARIA Labels** - Proper semantic markup for screen readers
- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **Focus Management** - Visible focus indicators and logical tab order
- **Color Contrast** - High contrast neubrutalist design system
- **Responsive Text** - Scalable typography for different screen sizes

## Key Features

### Dashboard
- Real-time statistics cards
- High-priority task alerts
- Event countdown and progress
- Top performer leaderboards
- Quick action buttons

### Task Management
- Kanban-style board with drag-and-drop
- Priority levels (High, Medium, Low)
- Status tracking (To Do, In Progress, Review, Done)
- Team member assignment
- Deadline management
- Comment tracking

### Member Management
- Member profiles with roles and teams
- Performance efficiency calculations
- Portfolio and skill tracking
- Add/edit/delete members
- Team organization

### Event Planning
- Event creation and management
- Budget vs expenses tracking
- Team assignment
- Task progress monitoring
- Event status tracking (Upcoming, Ongoing, Completed)

## Configuration

### Environment Variables
No environment variables required. The application uses local storage for data persistence.

### Path Aliases
- `@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts)

### Port Configuration
Development server runs on port 8080 (configured in `vite.config.ts`)

## Data Models

### Member
```typescript
interface Member {
  id: string;
  name: string;
  role: "Club Lead" | "Coordinator" | "Member" | "Designer" | "Developer";
  team: string;
}
```

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "review" | "done";
  deadline: string;
  assignees: string[];
  event: string;
  comments: number;
  createdAt: string;
}
```

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  status: "upcoming" | "ongoing" | "completed";
  team: string[];
  tasksTotal: number;
  tasksDone: number;
  coverColor: string;
  budget: number;
  expenses: number;
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Testing

Testing is configured with:
- **Vitest** as test runner
- **React Testing Library** for component testing
- **jsdom** as test environment

Test files are located in `src/test/` directory.

### Deployment

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

#### Deployment Options
- **Static Hosting** - Deploy to Vercel, Netlify, or GitHub Pages
- **CDN** - Upload built files to any CDN
- **Local Server** - Serve built files with any static file server
- **Docker** - Containerize with a simple Dockerfile

#### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### CI/CD Pipeline

#### GitHub Actions Example
```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### Required Secrets
- No secrets required for build
- Add `GITHUB_TOKEN` for deployment to GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript and React best practices
- Use Tailwind CSS for styling
- Maintain consistent component patterns
- Write meaningful commit messages

## Design System

The application uses a neubrutalist design system with:
- **Sharp corners** (border-radius: 0px)
- **Bold 4px borders** with high contrast colors
- **Brutal shadows** (4px 4px 0px 0px)
- **Italic uppercase typography**
- **Space Grotesk** for headings, **Inter** for body text
- **High contrast color palette** with yellow, pink, and teal accents

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Part of the [TinkerHub](https://tinkerhub.org/) community

## Support

For support, email [your-email@example.com] or open an issue on the repository.

## Roadmap

- [ ] Backend integration with API endpoints
- [ ] User authentication and authorization
- [ ] Real-time collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with calendar services
- [ ] Notification system
- [ ] Export/import functionality

---

**TinkerHub SNGCE Club Manager** - Streamlining club operations with modern web technology.