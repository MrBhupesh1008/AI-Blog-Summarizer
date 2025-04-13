const API_KEY = "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"; // Replace with your API key

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
