export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }
  
    // Egyszerű logika mockhoz (kulcsszó alapján)
    let sentiment = "neutral";
    const lowerText = text.toLowerCase();
  
    if (lowerText.includes("love") || lowerText.includes("great") || lowerText.includes("happy")) {
      sentiment = "positive";
    } else if (lowerText.includes("hate") || lowerText.includes("bad") || lowerText.includes("angry")) {
      sentiment = "negative";
    }
  
    // Simulált válaszidő, hogy "valódibbnak" tűnjön
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return res.status(200).json({ sentiment });
  }
  