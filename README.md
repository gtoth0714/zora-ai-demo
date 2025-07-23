Product Name:
Zora AI Image Minting Demo

Describe the product in less than 100 words:

This web app integrates the Zora Coins Protocol SDK with AI-generated images and sentiment analysis. Users input a text prompt to generate images via the Replicate API, analyze the emotional tone (sentiment) of their prompt, and mint the resulting content as unique Zora Coins on Ethereum using MetaMask. It serves as a lightweight demo showcasing how AI and blockchain can work together.

What it does:

- Takes user text input  
- Generates three AI images based on the prompt (via Replicate API)  
- Analyzes the sentiment of the text input (positive, neutral, or negative)  
- Displays the sentiment result in the UI  
- Displays the generated images in a grid  
- Allows the user to select one image  
- Mints the selected image as a Zora Coin on the Ethereum testnet  
- Connects to a MetaMask wallet for blockchain interaction

The problem it solves:

Demonstrates a working integration of AI-generated content and sentiment analysis with blockchain minting using the Zora Coins SDK. This could serve as a foundation for future NFT, tokenized emotion, or AI-driven asset platforms.

Getting Started:

Prerequisites:
- Node.js (v16 or later recommended)
- MetaMask browser extension
- Replicate API token (for AI image generation)
- Ethereum wallet with some testnet ETH (for minting)
Installatin:
- Clone the repository
- Install dependencies with 'npm install'
next, react, ethers, @zoralabs/zdk, node-fetch, dotenv
- Create environment variables file .env with the following content:
REPLICATE_API_TOKEN=your_toke_here
MODEL_VERSION=replicate_model_version_here
SENTIMENT_MODEL_VERSION=sentiment_model_version_here
Running the App:
Start the development server: npm run dev

Challenges I ran into:

- Handling asynchronous polling of the Replicate API for both image and sentiment tasks
- Running multiple image predictions and a parallel sentiment request efficiently
- Managing API tokens securely without exposing them publicly
- Integrating the Zora Coins SDK with wallet connection and minting logic
- Keeping the frontend UX clean and responsive despite added complexity
- Synchronizing sentiment feedback with image generation results

Technologies I used:

- React (Next.js) for frontend
- Node.js API routes for backend calls
- Zora Coins SDK for minting tokens
- ethers.js for Ethereum wallet interactions
- Replicate API for AI image generation
- MetaMask for wallet connection

How we built it:

We built a Next.js app with React hooks for state and async logic. The backend handles two core API calls: one for image generation (creating and polling multiple predictions) and one for sentiment analysis using a separate Replicate model. The frontend displays sentiment results and generated images. The user can then select one image and mint it as a Zora Coin using MetaMask.

What we learned:

- How to combine different AI capabilities (image + sentiment) in one UX
- Handling asynchronous API workflows in parallel
- Managing wallet connections and transactions in a web app
- Best practices for environment variables and API token security in Next.js
- Creating dynamic, user-driven image selection flows before minting

What's next for:

- Implementing user authentication and better token management
- Adding more AI features like text sentiment analysis or ticker suggestions
- Improving UI/UX and mobile responsiveness
- Deploying the app to a live environment with persistent storage and error handling