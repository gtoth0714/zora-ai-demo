import { useState } from "react";
import { Zora } from "@zoralabs/zdk";
import { ethers } from "ethers";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [sentiment, setSentiment] = useState("");
  const [sentimentLoading, setSentimentLoading] = useState(false);

  async function generateImage(e) {
    e.preventDefault();
    setLoading(true);
    setImageUrls([]);
    setSelectedImage("");
    setSentiment("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (res.ok) {
      setImageUrls(data.imageUrls);
    } else {
      alert(data.error || "Error generating images");
    }
    setLoading(false);

    getSentiment(prompt);
  }

  async function getSentiment(text) {
    setSentimentLoading(true);
    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (res.ok) {
        setSentiment(data.sentiment || "Unknown");
      } else {
        setSentiment("Error fetching sentiment");
      }
    } catch {
      setSentiment("Error fetching sentiment");
    }
    setSentimentLoading(false);
  }

  async function mintCoin() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    if (!selectedImage) {
      alert("Please select an image to mint.");
      return;
    }

    setMinting(true);

    try {
      // Csatlakozás a wallethez
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // ✅ Hálózat ellenőrzés (Base Sepolia - chainId: 84532)
      const { chainId } = await provider.getNetwork();
      if (chainId !== 84532) {
        alert("Please switch to the Base Sepolia network in MetaMask.");
        setMinting(false);
        return;
      }

      const zora = new Zora({ signer });

      const metadata = {
        name: "AI Generated Image",
        description: "This coin is minted from an AI-generated image.",
        image: selectedImage,
      };

      const tx = await zora.coins.mint({
        to: await signer.getAddress(),
        metadata,
      });

      await tx.wait();
      alert("Coin minted successfully!");
    } catch (e) {
      console.error(e);
      alert("Minting failed.");
    }

    setMinting(false);
  }

  return (
    <main>
      <section className="container">
        <h1>Zora AI Image Minting Demo</h1>
        <form onSubmit={generateImage}>
          <input
            type="text"
            placeholder="Enter prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Images"}
          </button>
        </form>

        {sentimentLoading && <p>Analyzing sentiment...</p>}
        {sentiment && !sentimentLoading && <p>Sentiment: {sentiment}</p>}

        {imageUrls.length > 0 && (
          <div className="image-grid">
            {imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Generated ${idx}`}
                onClick={() => setSelectedImage(url)}
                className={selectedImage === url ? "selected" : ""}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="image-container">
            <h3>Selected image to mint:</h3>
            <img src={selectedImage} alt="Selected to mint" />
            <button onClick={mintCoin} disabled={minting}>
              {minting ? "Minting..." : "Mint as Zora Coin"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
