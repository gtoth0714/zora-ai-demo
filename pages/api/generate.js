import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  // Ellenőrizd, hogy a szükséges környezeti változók megvannak-e
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  const modelVersion = process.env.MODEL_VERSION;

  if (!replicateToken || !modelVersion) {
    console.error("Missing environment variables: REPLICATE_API_TOKEN or MODEL_VERSION");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const imageUrls = [];

    for (let i = 0; i < 3; i++) {
      const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${replicateToken}`,
        },
        body: JSON.stringify({
          version: modelVersion,
          input: { prompt },
        }),
      });

      const prediction = await createResponse.json();

      // ✅ Új: Log a hibakereséshez
      console.log(`Prediction #${i + 1} response:`, prediction);

      if (!createResponse.ok) {
        return res.status(createResponse.status).json({
          error: prediction.detail || "Failed to start prediction",
        });
      }

      if (!prediction.id) {
        return res.status(500).json({ error: "Missing prediction ID from Replicate" });
      }

      let outputUrl = "";
      const maxAttempts = 15;
      let attempts = 0;

      while (attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 2000));

        const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
          headers: {
            Authorization: `Token ${replicateToken}`,
          },
        });

        const statusData = await statusResponse.json();

        if (statusData.status === "succeeded") {
          outputUrl = Array.isArray(statusData.output) ? statusData.output[0] : statusData.output;
          break;
        } else if (statusData.status === "failed") {
          return res.status(500).json({ error: "Image generation failed" });
        }

        attempts++;
      }

      if (!outputUrl) {
        return res.status(500).json({ error: "Image generation timed out" });
      }

      imageUrls.push(outputUrl);
    }

    return res.status(200).json({ imageUrls });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
