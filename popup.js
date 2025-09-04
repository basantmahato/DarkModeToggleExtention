const toggleDarkMode = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const existing = document.getElementById('dark-mode-toggle-style');
      if (existing) {
        existing.remove(); // Turn OFF dark mode
      } else {
        const style = document.createElement('style');
        style.id = 'dark-mode-toggle-style';
        style.textContent = `
          html, body {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
          }
          * {
            background-color: transparent !important;
            color: #e0e0e0 !important;
            border-color: #555 !important;
          }
        `;
        document.head.appendChild(style); // Turn ON dark mode
      }
    }
  });
};

document.getElementById("toggleBtn").addEventListener("click", toggleDarkMode);