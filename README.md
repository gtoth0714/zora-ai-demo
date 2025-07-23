Product Name:
Zora AI Image Minting Demo

Describe the product in less than 100 words:

This web app integrates the Zora Coins Protocol SDK with AI-generated images. Users input a text prompt to generate images via the Replicate API, then mint those images as unique Zora Coins on Ethereum using MetaMask. The app serves as a simple demo showcasing AI and blockchain minting integration.

What it does:

- Takes user text input and generates three AI images
- Displays the images in a preview layout
- Allows the user to select one image
- Mints the selected image as a Zora Coin on Ethereum testnet
- Connects to MetaMask wallet for blockchain interaction

The problem it solves:

Demonstrates a working integration of AI-generated content with blockchain minting using the Zora Coins SDK, providing a base for future NFT and digital asset projects.

Getting Started:

Prerequisites:
- Node.js (v16 or later recommended)
- MetaMask browser extension
- Replicate API token (for AI image generation)
- Ethereum wallet with some testnet ETH (for minting)
Installatin:
- Clone the repository
- Install dependencies
- Create environment variables file .env with the following content:
REPLICATE_API_TOKEN=your_toke_here
MODEL_VERSION=replicate_model_version_here
Running the App:
Start the development server: npm run dev

Challenges I ran into:

- Handling the asynchronous polling of the Replicate API for image generation
- Running multiple predictions in parallel and synchronizing responses
- Managing API tokens securely without exposing them publicly
- Integrating the Zora Coins SDK with wallet connection and minting logic
- Styling and UX polishing within a limited timeframe
- Managing user image selection and clean minting flow

Technologies I used:

- React (Next.js) for frontend
- Node.js API routes for backend calls
- Zora Coins SDK for minting tokens
- ethers.js for Ethereum wallet interactions
- Replicate API for AI image generation
- MetaMask for wallet connection

How we built it:

We set up a Next.js app with React hooks for state management. The backend API routes handle requests to the Replicate API, including polling for prediction completion. In this updated version, we generate three separate images based on the user's prompt. Once images are returned, the user can click to select one, which is then minted using the Zora Coins SDK. We styled the app with responsive, minimal CSS for clarity and usability.

What we learned:

- How to integrate an AI model API with a blockchain minting protocol
- Handling asynchronous API workflows and user feedback in the UI
- Managing wallet connections and transactions in a web app
- Best practices for environment variables and API token security in Next.js
- Creating dynamic, user-driven image selection flows before minting

What's next for:

- Implementing user authentication and better token management
- Adding more AI features like text sentiment analysis or ticker suggestions
- Improving UI/UX and mobile responsiveness
- Deploying the app to a live environment with persistent storage and error handling