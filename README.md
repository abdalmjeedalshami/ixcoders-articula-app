# 🌐 Multilingual Blog Platform (React + Bootstrap)

A responsive **React.js application** with multilingual support (Arabic & English), featuring user authentication, article management, and a modern UI built with **React-Bootstrap** and **Swiper.js**.

## 🚀 Features

- **🔐 Authentication** – Login, logout, and user session handling.
- **🌍 Multilingual** – Arabic (RTL) & English (LTR) support using `i18next`.
- **📰 Blog System** – Create and manage articles with images.
- **📱 Responsive Design** – Optimized for desktop & mobile.
- **📑 Profile Management** – User account page with settings.
- **🎨 UI Components**
  - Offcanvas navigation menu with RTL/LTR support.
  - Swiper carousel for browsing writers or content.
  - Dropdown menu with localized alignment.
- **⚡ Smooth UX** – Prevents overflow in menus, dynamic direction switching, and localized navigation.

---

## 🛠️ Tech Stack

- **Frontend:** [React.js](https://reactjs.org/)
- **UI Framework:** [React-Bootstrap](https://react-bootstrap.github.io/)
- **i18n:** [react-i18next](https://react.i18next.com/)
- **Carousel:** [Swiper.js](https://swiperjs.com/react)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Project Structure

```
src/
 ├── providers/        # React context & cubits (Auth, Main, etc.)
 ├── screens/          # Pages (Account, Articles, Profile, etc.)
 ├── components/       # Reusable UI components
 │    ├── cards/       # Cards (e.g., WriterCard)
 │    ├── layout/      # Navbar, Offcanvas, Dropdown
 │    └── swiper/      # Swiper carousel wrapper
 ├── services/         # API calls & helpers
 ├── utils/            # Utility functions
 ├── l10n/             # Language JSON files (ar, en)
 ├── App.js            # Main app entry
 └── index.js          # React entry point
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/multilingual-blog.git
   cd multilingual-blog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🌐 i18n (Language Switching)

- App supports **Arabic (RTL)** and **English (LTR)**.
- Swiper, Offcanvas, and Dropdown components dynamically adapt direction.
- To add new languages, update `src/l10n/` and configure `i18next`.

---

## 📸 Screenshots

| English (LTR)                          | Arabic (RTL)                          |
| -------------------------------------- | ------------------------------------- |
| ![English UI](docs/screenshots/en.png) | ![Arabic UI](docs/screenshots/ar.png) |

---

## ✅ To-Do / Future Enhancements

- 🔎 Add search & filtering for articles.
- 🌓 Dark mode support.
- 🗄️ Backend integration for persistent authentication.
- 📊 Dashboard with analytics for writers.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/awesome-feature`)
3. Commit changes (`git commit -m "Add awesome feature"`)
4. Push the branch (`git push origin feature/awesome-feature`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

✨ Built with love using **React & Bootstrap**
