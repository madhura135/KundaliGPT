# KundaliGPT
A web app that generates personalized Vedic Astrology and Kundali readings using OpenAI. Built with HTML, CSS, and pure asynchronous JavaScript.

1.AI-powered Kundali generator — collects name, date of birth, time of birth, and place of birth, and returns a personalized Vedic astrology reading.

2.Full-stack architecture — vanilla JS frontend + Node.js/Express backend, communicating over a REST API.

3.Secure by design — API keys are never exposed to the client; all LLM calls are proxied server-side through Express.

4.Powered by Hugging Face Inference Providers — uses the OpenAI-compatible chat completions endpoint (router.huggingface.co/v1/chat/completions).

5.Configurable model backend — currently using Qwen/Qwen2.5-7B-Instruct via the Featherless AI provider; easily swappable to other HF-hosted models.

6.Structured prompt engineering — backend dynamically builds a detailed prompt from user input, requesting a 3-section reading (Planetary Overview, Career & Relationships, Cosmic Tip).

7.Environment-based config — secrets managed via .env (gitignored), following standard 12-factor app practices.

8.Error handling — graceful try/catch/finally flow on both frontend and backend, with clear user-facing error states instead of raw crashes.

9.CORS-enabled API — backend explicitly configured to safely accept cross-origin requests from the frontend during local development.
