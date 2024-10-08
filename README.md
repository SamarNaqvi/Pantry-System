# Pantry System

An inventory management system built using Next.js and Firebase.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Pantry System is a web application designed to help you manage your pantry inventory efficiently. With real-time updates and an intuitive interface, you can easily track your items, quantities, and expiration dates.

## Features
- Real-time inventory management
- Add, edit, and delete pantry items
- Track item quantities and expiration dates
- AI ChatBot that acts as customer support.

## Technologies Used
- **Frontend:** Next.js, React.js, Tailwind CSS
- **Backend:** Firebase (Firestore)
- **AI:** GroqCloud api + Next.js Routing

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone git@github.com:SamarNaqvi/Pantry-System.git
    cd Pantry-System
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up Firebase:
    - Create a Firebase project.
    - Add your Firebase configuration to `firebase.js`.

4. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```


5. Open [vercel-deployment-link](https://ai-pantry-system.vercel.app/ask-ai) to view it in the browser.

## Usage
1. **Add new items** to your pantry with details like name, quantity, and expiration date.
2. **Edit or delete items** as needed to keep your inventory up-to-date.
3. **Monitor your pantry using search** to ensure you never run out of essential items.
4. **Ask AI** AI-based chatbot for customer support.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
