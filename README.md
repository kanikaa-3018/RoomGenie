# 🏠 RoomGenie – Voice-Powered AI Roommate Recommender

RoomGenie is the **world’s first intelligent voice-based roommate recommender** powered by Omnidimensions AI. From understanding your personality through a real-time voice conversation to assigning rooms using vector compatibility, RoomGenie revolutionizes the way students and professionals find their perfect co-living partner.

Forget boring forms — let AI **listen, analyze, match, and assign roommates** with empathy, precision, and memory.

---

## 📂 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🔁 Flow & Architecture](#-flow--architecture)
- [📷 Screenshots](#-screenshots)
- [🎥 Demo Videos](#-demo-videos)
- [📈 Future Improvements](#-future-improvements)
- [📌 How to Run Locally](#-how-to-run-locally)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

### 🌟 Key Highlights:

- 🎙️ **Voice-first onboarding experience (Hindi + English)**  
  Users are onboarded via an **interactive multilingual voice conversation**, where the AI assistant asks personalized questions based on the user’s profile. Supports both **Hindi and English**, making it inclusive and easy to use.

- 💬 **Chat-based AI fallback for non-logged-in users**  
  Visitors who are not logged in are still greeted by a **chat-based version** of the Omnidimensions assistant — offering a preview of the platform's intelligence and functionality.

- 🧠 **AI that understands mood, sentiment, tone — and remembers you**  
  The AI analyzes users' **emotions, tone, and confidence** to tailor the experience. It also **remembers context**, allowing it to pick up where it left off in future sessions, like a real conversation.

- 📧 **Automated email reminders for incomplete onboarding**  
  If a user doesn’t complete the 5-question survey, the system sends **friendly reminder emails** encouraging them to complete it — boosting engagement and match quality.

- 🧮 **5D personality vector + Euclidean compatibility algorithm**  
  Users are embedded into a **5-dimensional behavioral vector** based on their voice survey responses. RoomGenie uses **Euclidean Distance** to find highly compatible roommates by comparing personality vectors.

- 💑 **Top roommate matches with rich compatibility insights**  
  Displays the **Top 5 or 10 most compatible users** based on shared interests, emotional alignment, and survey responses — complete with compatibility scores and personality tags.

- ✨ **Admin dashboard with AI alerts, complaint management, and smart room allocation**  
  The admin panel allows viewing user match logs, handling complaints, and assigning rooms. It also includes **AI-powered alerts** for mismatches or user conflicts detected via sentiment trends.

- 🚀 **Built on Omnidimensions AI SDK**  
  RoomGenie leverages the powerful **Omnidimensions conversational AI engine**, enabling real-time multilingual voice + chat interactions, emotional intelligence, and persistent memory — the same engine used in next-gen AI assistants.

---

---

## 🛠️ Tech Stack

| Layer           | Technology                                   |
|----------------|-----------------------------------------------|
| Frontend       | React.js, Tailwind CSS, Framer Motion         |
| Backend        | Node.js, Express.js, MongoDB, Mongoose        |
| AI Assistant   | Omnidimensions (Voice + Chat AI SDK)          |
| Authentication | JWT, bcrypt.js                                |
| Matching Algo  | Euclidean Distance-based Vector Comparison    |
| Email Services | Nodemailer, SendGrid                          |
| Hosting        | Vercel (Frontend), Render/AWS (Backend)       |

---

## 🔁 Flow & Architecture

```mermaid
graph TD
A[User Registers via Form] --> B[Profile Stored]
B --> C[Login Triggers Voice AI]
C --> D[5 Personalized Questions Asked]
D --> E[User Assigned 5D Vector]
E --> F[Compatibility Calculated via Euclidean Distance]
F --> G[Top 5/10 Matches Displayed]
G --> H[Shortlist or Chat with Matches]
H --> I[Admin Views Dashboard]
I --> J[Admin Assigns Rooms or Handles Complaints]
````

---

## 📷 Screenshots

<div align="center" style="margin: 20px auto; max-width: 1200px; padding: 20px;"> <table style="border-spacing: 20px;"> <tr> <td align="center"> <strong>✅ User Onboarding Form</strong><br /> <img src="https://github.com/user-attachments/assets/9eef504e-319d-4146-b9b7-aa8441a425dd" width="300" /> </td> <td align="center"> <strong>✅ Voice AI Survey in Action</strong><br /> <img src="https://github.com/user-attachments/assets/ba864215-ffd8-463d-8fab-5185de952c7c" width="300" /> </td> <td align="center"> <strong>✅ Matchmaking Results Page</strong><br /> <img src="https://github.com/user-attachments/assets/8e87d60a-e7f7-43ee-b7d6-e2336bb2dfd6" width="300" /> </td> </tr> <tr> <td align="center"> <strong>✅ Chat Interface</strong><br /> <img src="https://github.com/user-attachments/assets/c621703b-79cc-4def-8fd2-15d4546d12db" width="300" /> </td> <td align="center"> <strong>✅ Admin Dashboard & Room Assignment</strong><br /> <img src="https://github.com/user-attachments/assets/f73238c8-e51f-444d-8fff-8b4d08d7de65" width="300" /> </td> <td align="center"> <strong>✅ Compatibility Calculator Backend</strong><br /> <img src="https://github.com/user-attachments/assets/9162a27f-e8d3-428b-a295-1dc965042e12" width="300" /> </td> </tr> </table> </div>


---

## 🎥 Demo Videos

* [🎙️ Voice AI Survey Experience](https://your-demo-link.com)
* [📊 Matching Engine Flow](https://your-demo-link.com)
* [👩‍💼 Admin Room Allocation Panel](https://your-demo-link.com)

> *(Replace links with YouTube/Vimeo or Loom demos)*

---

## 📈 Future Improvements

* 🔄 Real-time WebSocket chat engine.
* 🧠 GPT-4 or Claude-based deeper psychological profiling.
* 🌏 City-wise roommate filtering + rental budget preferences.
* 📱 Launch of mobile app (React Native/Flutter).
* 🤝 AI-generated conversation starters between matched users.
* 🏠 PG/Flat/Hostel property recommendations via integration with rental platforms.
* ⚠️ Room conflict resolution assistant powered by NLP mood analysis.

---

## 📌 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/kanikaa-3018/RoomGenie.git
cd RoomGenie

# 2. Install dependencies
cd server
npm install
cd ../client
npm install

# 3. Add environment variables
# Create .env files in /server and /client folders

# 4. Start servers
cd server
npm run dev

cd ../client
npm start
```

Ensure MongoDB is running or use a cloud URI in `.env`.

---

## 🤝 Contributing

We welcome contributors to enhance RoomGenie.

```bash
# Fork → Clone → Create Branch → Commit → Push → PR
```

Open for ideas in AI/UX, personalization, ML-based clustering, etc.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Built with 💜 by

**Kanika Singhal**
🚀 AI/Full Stack Developer | Product Thinker | Dreamer
[GitHub](https://github.com/kanikaa-3018) • [LinkedIn](https://linkedin.com/in/kanika-singhal)

**Disha Kwatra**
🚀 Full Stack Developer | AI/ML Enthusiast
[GitHub](https://github.com/xaemonn) • [LinkedIn](https://linkedin.com/in/disha-kwatra-10903p)

> “AI can understand humans — not just what we say, but how we feel. That’s the future RoomGenie brings to finding roommates.”

---


