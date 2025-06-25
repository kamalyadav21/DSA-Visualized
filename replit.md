# LCS Algorithm Visualizer

## Overview

This is a full-stack web application that provides an interactive visualization of the Longest Common Subsequence (LCS) dynamic programming algorithm. The application demonstrates how the LCS algorithm works step-by-step with a visual matrix interface, control panel, and real-time animation capabilities.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used in current implementation)
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Deployment**: Replit environment with autoscale deployment

## Key Components

### Frontend Architecture (`client/`)

The frontend is built as a Single Page Application (SPA) using React:

- **Main Application**: React app with routing via `wouter`
- **UI Components**: Comprehensive shadcn/ui component library for consistent design
- **Algorithm Visualization**: Custom components for LCS matrix visualization and control panel
- **State Management**: React hooks for local state, TanStack Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming

Key frontend files:
- `client/src/App.tsx` - Main application component with routing
- `client/src/pages/Home.tsx` - Main LCS visualization page
- `client/src/components/GridVisualizer.tsx` - Matrix visualization component
- `client/src/components/ControlPanel.tsx` - Algorithm control interface
- `client/src/algorithms/lcs.ts` - LCS algorithm implementation

### Backend Architecture (`server/`)

The backend uses Express.js with TypeScript:

- **Server Setup**: Express server with middleware for JSON parsing and logging
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Database Integration**: Drizzle ORM configured for PostgreSQL
- **Development Tools**: Vite integration for development mode

Key backend files:
- `server/index.ts` - Main server entry point
- `server/routes.ts` - API route definitions (currently minimal)
- `server/storage.ts` - Storage abstraction layer
- `server/vite.ts` - Vite development server integration

### Database Schema (`shared/`)

- **User Management**: Basic user table with username/password authentication
- **Schema Validation**: Zod schemas for type safety
- **ORM**: Drizzle ORM for type-safe database operations

## Data Flow

1. **Algorithm Execution**: LCS algorithm runs entirely on the frontend for real-time visualization
2. **Step Management**: Algorithm generates step-by-step execution data stored in React state
3. **Visualization Updates**: Grid and control panel components react to step changes
4. **Auto-play**: Timer-based automatic progression through algorithm steps
5. **User Interaction**: Control panel allows manual step control and parameter adjustment

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework with hooks and context
- **Express.js**: Backend web server framework
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components via shadcn/ui
- **Lucide React**: Icon library
- **Font Awesome**: Additional icons (via CDN)

### Database and Storage
- **Drizzle ORM**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL driver
- **connect-pg-simple**: Session store (configured but not used)

### Development Tools
- **TSX**: TypeScript execution for development
- **ESBuild**: Fast bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Build Process**: Vite builds the frontend, ESBuild bundles the backend
- **Production Mode**: Serves static files from Express server
- **Development Mode**: Vite dev server with HMR integration
- **Database**: PostgreSQL module configured in Replit environment
- **Port Configuration**: Server runs on port 5000, exposed on port 80

### Environment Setup
- Node.js 20 runtime
- PostgreSQL 16 database
- Web deployment target with autoscale
- Environment variables for database connection

### Scripts
- `npm run dev`: Development mode with hot reloading
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Database schema deployment

## Changelog

- June 25, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.