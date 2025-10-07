# Overview

This is a full-stack chat application built with React on the frontend and Express.js on the backend. The application provides a conversational AI interface that allows users to chat with GPT-5, featuring a modern UI with real-time messaging, typing indicators, and message persistence. The app uses a monorepo structure with shared TypeScript schemas and supports both development and production environments.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with endpoints for chat message retrieval and creation
- **Data Storage**: In-memory storage implementation with interface-based design for easy database migration
- **AI Integration**: OpenAI API integration using GPT-5 model for chat responses
- **Development Setup**: Hot reload with Vite middleware in development mode

## Database Design
- **Current**: In-memory storage using Maps for rapid prototyping
- **Schema**: Drizzle ORM with PostgreSQL schema definitions ready for production deployment
- **Tables**: Users table for authentication and messages table for chat history with session-based organization
- **Migration Ready**: Drizzle configuration prepared for PostgreSQL with Neon Database integration

## Authentication & Security
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not actively used with current in-memory setup)
- **Input Validation**: Zod schemas for runtime type checking and API request validation
- **Error Handling**: Centralized error middleware with proper status codes and error messages

## Build & Deployment
- **Development**: Concurrent frontend (Vite) and backend (tsx) with hot reload
- **Production**: Static frontend build served by Express with API routes
- **Bundle**: ESBuild for server-side bundling with external package handling
- **Environment**: NODE_ENV-based configuration for development/production modes

# External Dependencies

## Core Services
- **OpenAI API**: GPT-5 integration for AI chat responses with configurable API key
- **Neon Database**: PostgreSQL serverless database (configured via DATABASE_URL environment variable)

## UI & Styling
- **Radix UI**: Comprehensive primitive components for accessible UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for modern typography

## Development Tools
- **Replit Integration**: Development banner and error modal for Replit environment
- **Cartographer**: Replit-specific development tooling for enhanced debugging
- **TypeScript**: Full type safety across frontend, backend, and shared code

## Build & Bundling
- **Vite**: Frontend development server and build tool with React plugin
- **ESBuild**: Fast server-side JavaScript bundling for production
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## Data & Validation
- **Drizzle ORM**: Type-safe database queries and schema management
- **Zod**: Runtime type validation and schema parsing
- **TanStack Query**: Server state management with caching and background updates