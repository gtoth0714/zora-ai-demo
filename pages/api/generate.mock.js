export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }
  
    // Itt 3 darab mock kép URL-t adunk vissza, akár placeholder.com-ról vagy saját statikus képekből is
    const imageUrls = [
      "https://plus.unsplash.com/premium_photo-1711255562009-3f7822dead41?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1711255562146-0acdc7d5c659?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1711255561796-15d0636946f6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
  
    // Simuláljuk a várakozást, hogy legyen "real feel"
    await new Promise((r) => setTimeout(r, 1000));
  
    return res.status(200).json({ imageUrls });
  }
  