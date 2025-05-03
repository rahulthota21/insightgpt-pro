# 🧠 InsightGPT Pro

> A sleek, glassmorphic full-stack AI interface built with modern design systems and powerful dev tools — ready for integration with LLMs like Groq or OpenAI.

---

## ✨ Features

- 💎 **Stunning Glassmorphism UI** with responsive layout
- 🌙 **Dark Mode First** using Tailwind CSS with custom HSL tokens
- 🧱 **Reusable Components** via `shadcn/ui` + `Radix UI`
- 🔥 **Smooth Animations** using Framer Motion
- 🧾 **Form Validation** powered by React Hook Form + Zod
- 📁 **Drag & Drop Uploads** with visual feedback
- 🔔 **Toast Notifications** using Sonner
- 🧪 **Mock Chat Interface** ready for AI API integration
- 🛡️ **Type-Safe Setup** with TypeScript and Vite

---

## 🛠️ Tech Stack

| Layer        | Tools & Frameworks                              |
|--------------|--------------------------------------------------|
| Frontend     | React, TypeScript, Vite                         |
| Styling      | Tailwind CSS 3 + Custom HSL Color Tokens        |
| UI Components| shadcn/ui, Radix UI, class-variance-authority   |
| Animations   | Framer Motion                                   |
| Forms        | React Hook Form + Zod                           |
| Toasts       | Sonner                                          |
| Icons        | Lucide                                          |

---

## 🚧 Backend & API Status

✅ UI and frontend logic are fully implemented  
⚠️ **Currently using mock data** for chat, file upload, and project interactions  
🧠 Integration with **Groq or OpenAI** coming soon (LLM responses, embeddings)  
📦 Supabase backend planned for storing projects, chat history, and more

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/insight-gpt-pro.git
cd insight-gpt-pro

# 2. Install dependencies
bun install    # or npm install / yarn install

# 3. Start dev server
bun run dev    # or npm run dev / yarn dev
```

🔗 App will be running at: http://localhost:5173

---

## 📁 Folder Structure (Key Parts)

```
src/
├── components/       # Reusable UI components (shadcn-style)
├── integrations/     # API clients (e.g., Supabase placeholder)
├── pages/            # Main views (dashboard, upload, result)
├── hooks/            # Custom React hooks
├── styles/           # Tailwind config + base styles
tailwind.config.ts    # Design tokens, color themes
vite.config.ts        # Vite config and aliases
```

---

## 🧭 Roadmap

- [x] Premium Glass UI with animated transitions
- [x] Q&A mock interface for AI interactions
- [ ] ⚡ Integrate Groq/OpenAI LLM backend
- [ ] 🧠 Embed Supabase DB for project storage
- [ ] 📄 Add export/download/share functionality
- [ ] 🛡️ Add secure API proxy layer

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Groq](https://groq.com/)
- [Framer Motion](https://www.framer.com/motion/)
