# WebRTC Project

A modern web application built with React and Vite, implementing WebRTC functionality for real-time screen sharing and peer-to-peer communication.

## Features

- Real-time screen sharing
- Peer-to-peer video communication
- WebRTC connection management
- ICE candidate handling
- Signaling state monitoring
- Connection state tracking

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **UI Framework**: Ant Design 5
- **Code Quality**: ESLint 9
- **WebRTC**: Native WebRTC API

## Project Structure

```
webrtc/
├── src/
│   ├── App.jsx        # Main application component with tab navigation
│   ├── Host.jsx       # Host component for screen sharing
│   ├── Guest.jsx      # Guest component for receiving shared screen
│   └── main.jsx       # Application entry point
├── public/            # Static assets
├── node_modules/      # Dependencies
├── vite.config.js     # Vite configuration
└── package.json       # Project configuration
```

## Components

### App.jsx

The main application component that provides tab navigation between Host and Guest interfaces.

### Host.jsx

The host component that enables:

- Screen sharing
- Peer connection creation
- Offer creation
- Remote description handling
- ICE candidate management

### Guest.jsx

The guest component that enables:

- Receiving shared screen
- Answer creation
- Remote description handling
- ICE candidate management

## Getting Started

### Prerequisites

- Node.js (latest version recommended)
- Yarn package manager
- Modern web browser with WebRTC support

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd webrtc
```

2. Install dependencies

```bash
yarn install
```

### Development

Start the development server:

```bash
yarn dev
```

### Building

Build for production:

```bash
yarn build
```

### Preview

Preview production build:

```bash
yarn preview
```

### Code Quality

Run ESLint:

```bash
yarn lint
```

## Usage

1. Open the application in two different browser windows
2. In the first window, select the "Host" tab
3. Click "Create Peer Connection"
4. Click "Share Screen" and select the screen/window to share
5. Click "Create Offer" and copy the offer
6. In the second window, select the "Guest" tab
7. Paste the offer in the "Set Remote Description" field
8. Follow the prompts to complete the connection
