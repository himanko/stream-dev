# 🌊 stream-dev: Frontend Architecture & Client

<div align="center">
  
  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
  ![Coverage](https://img.shields.io/badge/coverage-85%25-green)
  ![License](https://img.shields.io/badge/license-MIT-blue)
  <br/>
  ![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
  ![Tailwind](https://img.shields.io/badge/Tailwind_v4-38B2AC?logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)

  <p align="center">
    <strong>The high-performance, responsive presentation layer for the stream-dev Learning Management System.</strong>
  </p>
</div>

---

## 📑 Table of Contents

1. [System Architecture](#-system-architecture)
2. [Video Streaming Integration](#-video-streaming-integration)
3. [Security Posture](#-security-posture)
4. [Directory Structure](#-directory-structure)
5. [Local Development](#-local-development)
6. [Testing & CI/CD](#-testing--cicd)
7. [Deployment](#-containerization--deployment)

---

## 🏗️ System Architecture

Our frontend is designed to handle high-throughput video data while maintaining a butter-smooth 60fps user interface, optimized for Core Web Vitals.

### State Management Strategy

We strictly isolate UI state from Server state to prevent re-render bottlenecks:

- **Server State (Async Data):** Managed via [TanStack Query (React Query)](https://tanstack.com/query/v5). Handles caching, background refetching, and synchronization of user progress with the Spring Boot API.
- **Client State (UI Data):** Handled via native React Context and custom hooks. Used exclusively for ephemeral states (active tabs, modal visibility, dark mode).

### Component & Styling Architecture

UI components are built using [Shadcn UI](https://ui.shadcn.com/) atop [Radix Primitives](https://www.radix-ui.com/), ensuring absolute WAI-ARIA compliance.

- **Zero-Runtime CSS:** Styled exclusively with **Tailwind CSS v4** utility classes for minimal CSS payload.
- **Theming:** Leverages `@custom-variant` directives for a flawless, flicker-free Light/Dark mode.

---

## 🎥 Video Streaming Integration

The core of this application is the Video Player Dashboard. It does not load static `.mp4` files. Instead, it interfaces directly with our C++ video engine.

- **Protocol:** Uses **HLS (HTTP Live Streaming)** via `hls.js`.
- **Adaptive Bitrate Streaming (ABR):** The client dynamically requests specific manifest chunks (1080p, 720p, 480p) based on the user's real-time network bandwidth.
- **Telemetry:** Playback progress beacons are fired to the backend every 30 seconds to track student completion rates securely.

---

## 🛡️ Security Posture

As a platform handling premium course delivery and payment integrations, security is engineered into the client:

- **Authentication:** Relies on secure, `HttpOnly` cookies set by the backend. The frontend never stores JWTs in `localStorage` to prevent XSS exfiltration.
- **Sanitization:** React's native DOM escaping prevents cross-site scripting (XSS) in user-generated content (e.g., student bios, comments).
- **Payment Vaulting:** Uses Stripe Elements to tokenize credit cards directly to the processor, ensuring PCI compliance.

---

## 📁 Directory Structure

```text
frontend/
├── public/                 # Static, uncompiled assets (favicons, manifests)
├── src/
│   ├── assets/             # Bundled assets (images, fonts)
│   ├── components/         # Shared UI architecture
│   │   ├── commons/        # Global components (Navbar, Footers)
│   │   ├── player/         # Video player logic and UI wrappers
│   │   └── ui/             # Shadcn primitive components (Buttons, Cards)
│   ├── hooks/              # Custom React hooks (e.g., useAuth, useHLS)
│   ├── lib/                # Utility functions (tailwind merge, formatters)
│   ├── pages/              # Route-level components (Profile, Dashboard, Auth)
│   ├── router/             # Centralized React Router configuration
│   ├── services/           # API client definitions (Axios/Fetch wrappers)
│   └── types/              # Global TypeScript interfaces
├── .env.example            # Environment variable schema
├── package.json            # Dependency manifest and npm scripts
└── vite.config.ts          # Build pipeline and dev server configuration
```
