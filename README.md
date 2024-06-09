
# README

## Red Velvet Event App

The Red Velvet Event App is a React Native application designed to showcase and manage events. The app allows users to view a list of events, see event details, and RSVP for events. This README provides an overview of the application's structure, setup instructions, and usage.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display a list of events with details like host, event name, date, time, and location.
- Show event details in a modal with additional information and an RSVP button.
- Load custom fonts using `expo-font`.
- Implement smooth animations and transitions with `expo-blur` and `expo-linear-gradient`.
- Sort and display events in chronological order.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Expo CLI installed globally (`npm install -g expo-cli`).

### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/red-velvet-event-app.git
   cd red-velvet-event-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the application**:
   ```sh
   expo start
   ```

## Usage

1. **Running on a simulator or real device**:
   - For iOS: Press `i` in the terminal to open the app in the iOS simulator.
   - For Android: Press `a` in the terminal to open the app in the Android emulator.
   - On a real device: Scan the QR code displayed in the terminal using the Expo Go app.

2. **Navigating the app**:
   - The main screen displays a list of upcoming events.
   - Tap on an event to view its details in a modal.
   - In the event details modal, you can see more information and RSVP by pressing the corresponding button.

## File Structure

```
red-velvet-event-app
├── assets
│   ├── fonts
│   │   ├── Montserrat-Bold.ttf
│   │   ├── Montserrat-Medium.ttf
│   │   └── Montserrat-MediumItalic.ttf
│   └── images
│       └── token.png
├── components
│   └── EventDetails.js
├── App.js
├── package.json
└── README.md
```

### Components

- **App.js**: The main entry point of the application. It loads fonts, fetches and displays events, and handles navigation to the event details modal.
- **EventDetails.js**: A component that renders the details of a selected event in a modal view.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React Native**: A framework for building native apps using React.
- **Expo**: A framework and platform for universal React applications.
- **expo-font**: A package for loading custom fonts.
- **expo-blur**: A package for creating blur effects.
- **expo-linear-gradient**: A package for creating linear gradients.
- **moment**: A JavaScript library for parsing, validating, manipulating, and formatting dates.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
