// content.js

// Function to create and display a split screen with the summary
function createSplitScreen(summaryText) {
    // Create the summary container element
    const summaryContainer = document.createElement('div');
    summaryContainer.id = 'summaryContainer';
    summaryContainer.style.position = 'fixed';
    summaryContainer.style.top = '0';
    summaryContainer.style.right = '0';
    summaryContainer.style.width = '50%';  // Adjust the width as per your preference
    summaryContainer.style.height = '100vh';
    summaryContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    summaryContainer.style.color = 'white';
    summaryContainer.style.padding = '20px';
    summaryContainer.style.overflowY = 'scroll';
    summaryContainer.style.zIndex = '9999';
    summaryContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
      summaryContainer.remove();  // Remove the summary container when close is clicked
    });
  
    summaryContainer.appendChild(closeButton);
  
    // Add the summary text to the container
    const summaryContent = document.createElement('div');
    summaryContent.textContent = summaryText;
    summaryContainer.appendChild(summaryContent);
  
    // Append the summary container to the body of the webpage
    document.body.appendChild(summaryContainer);
  }
  
  // Find the first <article> tag in the page
  const articleElement = document.querySelector('article');
  
  // If an <article> tag is found
  if (articleElement) {
    const articleText = articleElement.innerText.trim();  // Get the inner text of the article
    
    if (articleText.length > 0) {
      console.log("Article Text: ", articleText);  // Log the article text to check
  
      // Send the article text to the background.js script for summarization
      chrome.runtime.sendMessage(
        { action: 'summarize', text: articleText },
        (response) => {
          console.log("Summary received from background:", response.summary);
          if (response.summary) {
            createSplitScreen(response.summary);  // Display the summary in split-screen
          } else {
            alert("No summary available.");
          }
        }
      );
    } else {
      console.log('Article text is empty or not available.');
      alert("Article content is empty or not available.");
    }
  } else {
    console.log('No <article> tag found on this page.');
    alert("No article found on this page.");
  }
  