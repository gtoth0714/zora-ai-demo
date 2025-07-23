import { useState } from "react";
import { Zora } from "@zoralabs/zdk";
import { ethers } from "ethers";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);

  async function generateImage(e) {
    e.preventDefault();
    setLoading(true);
    setImageUrls([]);
    setSelectedImage("");

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
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

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

        {imageUrls.length > 0 && (
          <div className="image-grid">
            {imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Generated ${idx}`}
                onClick={() => setSelectedImage(url)}
                className={selectedImage === url ? "selected" : ""}
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
