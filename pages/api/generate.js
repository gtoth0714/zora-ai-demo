import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
      },
      body: JSON.stringify({
        version: process.env.MODEL_VERSION,
        input: { prompt }
      })
    });

    const prediction = await createResponse.json();
    console.log("Prediction create response:", prediction)

    if (!prediction.id) {
      return res.status(500).json({ error: "Failed to start prediction" });
    }

    let outputUrl = "";
    const maxAttempts = 15;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));

      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
        }
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

    if (attempts === maxAttempts) {
      return res.status(500).json({ error: "Image generation timed out" });
    }

    res.status(200).json({ imageUrl: outputUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
