# 🌐 WebMCP Demo

**WebMCP** bridges the gap between AI agents and the browser. Instead of agents "guessing" where to click or struggling with screen recordings, WebMCP allows agents to interact directly with web applications through structured, reliable tools.

---

## 🧐 The Core Problem
Right now, AI agents can talk to backend services (weather APIs, calendars, etc.), but the web app you actually have open in your browser? The agent is essentially **blind** to it. 

To "see" it, agents currently have to awkwardly take screenshots and click around like a robot trying to use a touchscreen with oven mitts. **WebMCP** is the answer to: *"What if your browser's AI could actually operate the website you're looking at—reliably, not by guessing?"*

---

## 🚀 Quick Start

Follow these steps to get the demo running locally:

1. **Download all files** from this repository.
2. **Open your Terminal** (or Command Prompt) and navigate to the download folder:
   ```bash
   cd path/to/your/downloaded-folder
   ```
3. **Run the server**
   ```bash
   node server.js
   ```
4. **Open the App** Go to http://localhost:3000 in your browser (Chrome, Firefox, or Edge preferred)
5. **Configure** Pick Anthropic or OpenAI, paste your API key, and you're ready to go!

---

## ✈️ Scenario: The Travel Booking Test

Imagine you tell your AI: 
> *"I want to fly from Kochi to Dubai in late March, under ₹15,000, window seat, morning departure. Just find the best option and hold it—I'll confirm."*

### ❌ Without WebMCP
The agent screenshots 47 search result pages, tries to OCR the text, fumbles through the booking form, and probably crashes when it hits a complex seat selection dropdown. It’s slow, expensive in tokens, and prone to "hallucinating" button locations.

### ✅ With WebMCP
The website exposes native tools like `searchFlights()`, `filterResults()`, and `holdBooking()`. The agent executes the entire workflow in seconds with **100% accuracy**. 

**The Result:**
You get a simple, proactive prompt:
> "I've found the perfect flight and put it on hold for you. Ready to confirm?" 

You press **one button**, and you're done.

---

## 🛠 Features

* **Native Interaction:** No more flaky "click by coordinate" logic or fragile CSS selectors.
* **Low Latency:** Direct communication between the model and the DOM ensures near-instant responses.
* **Privacy Minded:** You maintain full control. The agent only sees the tools and data you explicitly expose.

---

## 🛡 Security Note

**This is a demo.** * **Do not** hardcode your API keys into the source files. 
* Always use the provided UI to input keys. 
* Keys are handled locally within your browser session and are not stored on any external server.
