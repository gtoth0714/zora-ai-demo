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

Note: This project uses the Zora Coins SDK to mint tokens on the Base Sepolia Ethereum testnet (chainId: 84532). It requires MetaMask (or another Ethereum-compatible wallet) to connect, sign transactions, and interact with the blockchain.

The problem it solves:

Demonstrates a working integration of AI-generated content and sentiment analysis with blockchain minting using the Zora Coins SDK. This could serve as a foundation for future NFT, tokenized emotion, or AI-driven asset platforms.

Getting Started:

Prerequisites:
- Node.js (v16 or later recommended)
- MetaMask browser extension
- Replicate API token (for AI image generation)
- Ethereum wallet with some testnet ETH on Base Sepolina (for minting)

Add Base Sepolia network to MetaMask:
- Open MetaMask
- Go to "Networks" → "Add Network"
- Enter the following details:

Network Name: Base Sepolia
RPC URL: https://rpc.base-sepolia.org
Chain ID: 84532
Currency Symbol: ETH
Block Explorer URL: https://base-sepolia.blockscout.com/
- Save the network

Get testnet ETH for Base Sepolia
- You need some test ETH to pay gas fees for minting.
- Use a Base Sepolia faucet if available (check official Base or community channels).
- Alternatively, get test ETH from someone who already has some on Base Sepolia.

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

Mock Mode (for demo purposes - just demonstration):
This project includes a mock version of the image generation and sentiment analysis APIs, allowing it to be demonstrated without a paid Replicate account.
- These mock routes return predefined image URLs and a sample sentiment.
- Useful for screencasts or showcasing the UI/UX flow.
- To switch to mock mode, temporarily replace:
/pages/api/generate.js → generate.mock.js
/pages/api/sentiment.js → sentiment.mock.js
For full functionality, set up the required environment variables and use the original files.

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
- Handling wallet connections and chain validation

What's next for:

- Implementing user authentication and better token management
- Adding more AI features like text sentiment analysis or ticker suggestions
- Improving UI/UX and mobile responsiveness
- Deploying the app to a live environment with persistent storage and error handling