export default async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { sport, location = "Santa Barbara, CA" } = await req.json();

    if (!sport) {
      return new Response(
        JSON.stringify({ error: "Sport parameter required" }),
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn("GOOGLE_API_KEY not set, returning empty results");
      return new Response(
        JSON.stringify({
          success: true,
          sport,
          location,
          count: 0,
          organizations: [],
          message: "API key not configured"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Dynamically import to avoid issues if package isn't available
    let GoogleGenerativeAI;
    try {
      const module = await import("@google/generative-ai");
      GoogleGenerativeAI = module.GoogleGenerativeAI;
    } catch (e) {
      console.error("Failed to import GoogleGenerativeAI:", e);
      return new Response(
        JSON.stringify({
          success: true,
          sport,
          location,
          count: 0,
          organizations: [],
          message: "Search module not available"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Search for youth ${sport} programs and organizations near ${location}. 
              
              Find the top 8 results and for each one provide:
              - Name (of program/organization)
              - Type (league, club, academy, team, etc)
              - Location (city or address if available)
              - Brief description (1-2 sentences)
              - Contact info if available (phone, website)
              
              Format ONLY as JSON array. No markdown, no code blocks. Just the raw array.
              Each object should have: { "name": "string", "type": "string", "location": "string", "description": "string", "phone": "string or null", "website": "string or null" }
              
              If you can't find information about a field, use null.`,
            },
          ],
        },
      ],
      tools: [
        {
          googleSearch: {},
        },
      ],
    });

    // Extract text from response
    let responseText = "";
    if (result.response.candidates?.[0]?.content?.parts) {
      for (const part of result.response.candidates[0].content.parts) {
        if (part.text) {
          responseText += part.text;
        }
      }
    }

    // Parse JSON from response - be lenient with parsing
    let organizations = [];
    try {
      // Extract JSON array from response (might be wrapped in markdown)
      let jsonStr = responseText;
      
      // Try to find JSON array
      const jsonMatch = jsonStr.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      
      // Remove markdown code block wrappers if present
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        organizations = parsed.slice(0, 8); // Limit to 8 results
      }
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.error("Response text:", responseText);
    }

    return new Response(
      JSON.stringify({
        success: true,
        sport,
        location,
        count: organizations.length,
        organizations,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Search error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "Search failed",
        count: 0,
        organizations: [],
      }),
      {
        status: 200, // Return 200 with empty results instead of 500
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
