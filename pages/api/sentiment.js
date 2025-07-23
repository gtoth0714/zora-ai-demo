import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  const replicateToken = process.env.REPLICATE_API_TOKEN;
  const sentimentModelVersion = process.env.SENTIMENT_MODEL_VERSION;

  if (!replicateToken || !sentimentModelVersion) {
    console.error("Missing environment variables: REPLICATE_API_TOKEN or SENTIMENT_MODEL_VERSION");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${replicateToken}`,
      },
      body: JSON.stringify({
        version: sentimentModelVersion,
        input: { text },
      }),
    });

    const prediction = await createResponse.json();

    if (!createResponse.ok) {
      return res.status(createResponse.status).json({
        error: prediction.detail || "Failed to start prediction",
      });
    }

    if (!prediction.id) {
      return res.status(500).json({ error: "Missing prediction ID from Replicate" });
    }

    let sentimentResult = "";
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
        sentimentResult = statusData.output;
        break;
      } else if (statusData.status === "failed") {
        return res.status(500).json({ error: "Sentiment analysis failed" });
      }

      attempts++;
    }

    if (!sentimentResult) {
      return res.status(500).json({ error: "Sentiment analysis timed out" });
    }

    return res.status(200).json({ sentiment: sentimentResult });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
