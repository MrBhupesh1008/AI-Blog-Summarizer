const API_KEY = "Paste your API Key"; 
//also change post method

async function summarizeText(text) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-4o", // Free model
                messages: [{ role: "user", content: `Summarize this in very short: ${text}` }],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        console.log("Full API Response:", data);

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return "No summary available.";
        }
    } catch (error) {
        console.error("Error fetching summary:", error);
        return "Error generating summary.";
    }
}

// ✅ Ensure background.js is listening for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
        summarizeText(request.text).then(summary => sendResponse({ summary }));
        return true; // Required for async response
    }
});
