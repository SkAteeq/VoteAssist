# CivicGuide AI
**AI-powered civic assistant for secure, structured, and accessible voter participation.**

## Overview
CivicGuide AI solves the problem of information fragmentation in the democratic process. Navigating voter registration, verifying eligibility, tracking election timelines, and locating polling booths often involves disparate, confusing, or inaccessible portals. CivicGuide AI unifies these processes into a centralized, conversational interface. The system delivers high civic impact by reducing friction in voter participation, ensuring precise location-aware guidance, and maintaining strict political neutrality to build trust.

## Key Features
- **Personalized Voter Guidance:** Contextualizes processes based on the user's state or region.
- **Rule-Based Eligibility Checker:** Uses deterministic logic to ensure absolute accuracy for voter criteria.
- **Guided Registration Workflow:** Breaks down the registration process into actionable, step-by-step instructions.
- **Election Timeline Tracking:** Provides verified dates for registration, nomination, polling, and results.
- **Polling Booth Discovery:** Integrates map services to locate booths and explain required documentation.
- **FAQ Assistant:** Handles common edge cases like missing names, ID issues, and correction requests.
- **Multilingual Support:** Delivers guidance in English, Hindi, and Kannada.
- **Voice-Friendly Architecture:** Formats outputs into short, structured responses optimized for screen readers and voice assistants.

## Demo / Screenshots
![CivicGuide AI Chat Interface](docs/assets/demo-interface.png)
![Polling Booth Discovery](docs/assets/demo-maps.png)
![Registration Workflow](docs/assets/demo-workflow.png)

## Architecture Overview
The system employs a multi-tiered architecture that separates deterministic business logic from generative contextualization to guarantee uncompromised accuracy and low latency.

```text
[ User Interface (React) ]
        |
        v
[ Input Sanitization & Intent Routing ]
        |
    +---+---+
    |       |---> [ Rule Engine: Eligibility & Static FAQs ]
    |       |
    |       +---> [ RAG/Cache Layer: Timelines & Laws ]
    |
    +---> [ AI Layer (Gemini): Summarization & Translation ]
            |
            v
[ Output Formatting & Accessibility Filter ]
            |
            v
[ User Interface ]
```

### Components
- **Frontend:** Client-side rendering for a fluid, mobile-first conversational UI.
- **Backend/Middleware:** Handles intent routing, input sanitization, and API orchestration.
- **AI Layer:** Restricted strictly to summarizing static rule outputs and executing translations.
- **Database:** Caches static election data, FAQs, and anonymized user session contexts.

## Tech Stack
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Python
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Hosting:** Firebase Hosting
- **AI:** Google Gemini
- **Cloud & APIs:** Google Maps Platform, Google Cloud Translation API

## Google Services Integration
- **Firebase Authentication:** Handles secure, zero-friction user login to persist session context without requiring full profiles.
- **Firestore:** Acts as the primary database for cached timelines, state-specific rules, and anonymized user preferences.
- **Firebase Hosting:** Delivers fast, secure, and globally distributed static asset hosting for the frontend application.
- **Google Maps Platform:** Powers the polling booth discovery module, enabling precise, interactive geolocation and routing.
- **Google Gemini:** Drives the natural language understanding, extracts intent, and formats rule-based data into conversational, accessible language.
- **Google Cloud Translation API:** Ensures real-time, accurate translation of civic processes to eliminate language barriers.

## Security Design
- **Input Sanitization:** Strips executable code and drops queries matching known prompt-injection patterns.
- **Neutrality Enforcement:** Hardcoded prompt instructions enforce strict guardrails preventing the AI from discussing candidates, advising on choices, or expressing political leanings.
- **Data Privacy Practices:** Operates entirely on an opt-in basis. Location data is held only during the active session. No persistent PII is stored without explicit consent.
- **Safe Output Handling:** All election dates and procedures are retrieved from a verified, static database rather than relying on LLM hallucination.

## Efficiency & Performance
- **Caching Strategy:** Frequently asked questions and static state election timelines are cached at the edge to reduce database reads and API latency.
- **Reduced LLM Calls:** Deterministic queries (e.g., "Am I eligible to vote?") bypass the LLM entirely, routing directly to the rule engine for instant response.
- **Rule-Based vs AI-Based Split:** AI is used strictly as a presentation layer (formatting and translation). Core logic handling remains strictly deterministic.

## Accessibility
- **Multi-Language Support:** Content is available in regional languages to support diverse demographics beyond English speakers.
- **Voice-Friendly Design:** System prompts instruct the AI to generate short sentences, avoiding complex jargon and long paragraphs, making it ideal for TTS (Text-to-Speech) software.
- **Mobile-First UI:** The interface is responsive and designed specifically for low-end mobile devices common in developing regions.
- **Inclusive UX Decisions:** High-contrast themes, large touch targets, and progressive disclosure of information prevent cognitive overload.

## Testing Strategy
- **Unit Testing:** Validates isolated functions like the eligibility calculator and the input sanitizer.
- **Integration Testing:** Ensures smooth handoffs between the backend router, Firestore cache, and Gemini API.
- **Sample Test Cases:**
  - *Input:* "Who should I vote for?" *Expected Output:* Fallback neutrality message.
  - *Input:* "Timeline for Karnataka elections." *Expected Output:* Structured timeline fetched from cache.
- **Edge Case Handling:** Systems safely handle missing location parameters by pausing the workflow to request clarification before proceeding.

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- Google Cloud Project with Gemini, Maps, and Translation APIs enabled.
- Firebase Project configured.

### Setup Instructions
1. Clone the repository.
```bash
git clone https://github.com/yourusername/civicguide-ai.git
cd civicguide-ai
```
2. Install frontend dependencies.
```bash
cd frontend
npm install
```
3. Install backend dependencies.
```bash
cd ../backend
pip install -r requirements.txt
```
4. Set up environment variables.
```bash
cp .env.example .env
```
5. Start the development servers.
```bash
# Terminal 1: Backend
python app.py

# Terminal 2: Frontend
npm run dev
```

### Environment Variables Example
```env
GEMINI_API_KEY=your_gemini_api_key
MAPS_API_KEY=your_google_maps_api_key
TRANSLATION_API_KEY=your_translation_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

## Usage Guide
### Example User Flows
- **Register Voter:** The user inputs their state. The system provides the definitive list of required documents, a link to the official Form 6, and a step-by-step submission guide.
- **Check Eligibility:** The user provides age and citizenship status. The deterministic engine returns a clear "Eligible" or "Not Eligible" status with the supporting legal reasoning.
- **Find Polling Booth:** The user inputs a PIN code. The system returns the nearest verified polling station along with a Google Maps navigation link.

## Folder Structure
```text
civicguide-ai/
|-- backend/
|   |-- api/
|   |-- core/
|       |-- rules_engine/
|       |-- llm_service/
|   |-- requirements.txt
|   |-- app.py
|-- frontend/
|   |-- src/
|       |-- components/
|       |-- hooks/
|       |-- services/
|   |-- package.json
|-- docs/
|-- README.md
```

## Future Enhancements
- **WhatsApp Integration:** Deploy the conversational bot directly to WhatsApp via the Meta Business API for broader reach.
- **Notifications:** Implement opt-in SMS/Email alerts for critical milestones like voter registration deadlines.
- **Offline Mode:** Cache basic rule sets and FAQs via Progressive Web App (PWA) service workers for access in low-connectivity zones.

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Ensure all tests pass.
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request.

## License
Distributed under the MIT License. See `LICENSE` for more information.
