document.getElementById("summarizeBtn").addEventListener("click", () => {
    const text = document.getElementById("inputText").value;
    
    chrome.runtime.sendMessage({ action: "summarize", text }, (response) => {
        document.getElementById("summary").innerText = response.summary || "Error generating summary.";
    });
});
