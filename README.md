# Vincent — Modern Login Webpage

A beautiful, fully responsive login webpage built with **Flask**, **HTML**, **CSS**, and **JavaScript**. Features a modern design with authentication, session management, and an interactive dashboard.

## ✨ Features

### Frontend
- ✅ **Modern, responsive design** — Works seamlessly on mobile, tablet, and desktop
- ✅ **Clean UI with mint-to-indigo gradient theme** — Soft shadows, glass-morphism effects
- ✅ **Smooth animations** — Entrance animations, hover effects, smooth scrolling
- ✅ **Login modal** — Beautiful popup for user authentication
- ✅ **Form validation** — Client-side email and password validation
- ✅ **Navigation bar** — Links to Home, About, Features, and Login
- ✅ **Feature cards** — 4 key features showcased with icons and descriptions
- ✅ **Hero section** — Catchy title, subtitle, and call-to-action buttons

### Backend
- ✅ **Flask-based server** — Lightweight and easy to extend
- ✅ **Session management** — Secure user sessions with Flask sessions
- ✅ **API endpoint** — `/api/login` for authentication (accepts JSON)
- ✅ **Protected routes** — Dashboard requires active session
- ✅ **Logout functionality** — Clear sessions and redirect
- ✅ **Demo credentials** — Pre-configured for testing

### Dashboard
- ✅ **User profile card** — Displays logged-in user's email
- ✅ **Stats grid** — Activity metrics, security score, last login, session timer
- ✅ **Quick settings** — Notifications, password change, privacy, devices
- ✅ **Live clock** — Current date and time display
- ✅ **Session timer** — Real-time session duration tracking
- ✅ **Interactive buttons** — Settings with notification feedback
- ✅ **Staggered animations** — Smooth entrance for dashboard elements

## 🚀 Getting Started

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Donny079/Login-awebpage.git
cd Login-awebpage
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Run the Flask app:**
```bash
python login.py
```

4. **Open your browser:**
```
http://127.0.0.1:5000/
```

## 📝 Demo Credentials

Use these credentials to test the login:

- **Email:** `test@example.com`
- **Password:** `1234`

## 📁 Project Structure

```
Login-awebpage/
├── login.py                 # Main Flask application
├── app.py                   # Alternative quiz app
├── requirements.txt         # Python dependencies
├── templates/
│   ├── index.html          # Landing page with login modal
│   └── dashboard.html      # User dashboard (protected)
├── static/
│   ├── css/
│   │   ├── styles.css      # Main stylesheet (theme, layout)
│   │   └── dashboard.css   # Dashboard-specific styles
│   └── js/
│       ├── app.js          # Login form handling & animations
│       └── dashboard.js    # Dashboard interactivity
└── README.md               # This file
```

## 🎨 Design & Styling

- **Font:** Poppins (imported from Google Fonts)
- **Color Scheme:** Mint/Teal → Indigo gradient
- **Key Colors:**
  - Primary: `#34d399` (mint/teal)
  - Accent: `#6366f1` (indigo)
  - Background: Layered gradients with soft shapes
- **Responsive Breakpoints:**
  - Desktop: Full grid layouts
  - Tablet: 2-column grids
  - Mobile: Single column, stacked layouts

## 🔐 Authentication Flow

1. **User visits homepage** → Sees landing page with login button
2. **Click "Get Started" or "Login"** → Login modal opens
3. **Enter credentials** → Client-side validation
4. **Submit form** → POST request to `/api/login`
5. **Server validates** → Credentials checked against demo data
6. **Success** → Session created, redirect to `/dashboard`
7. **Dashboard** → User sees personalized profile and stats
8. **Sign out** → Session cleared, redirect to homepage

## 🛠️ API Endpoints

### POST `/api/login`
Authenticate user with email and password.

**Request:**
```json
{
  "email": "test@example.com",
  "password": "1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### GET `/`
Landing page with login modal.

### GET `/dashboard`
User dashboard (requires active session).

### GET `/logout`
Clear session and redirect to homepage.

## 📱 Responsive Design

The webpage is fully responsive with breakpoints:

- **Desktop (900px+):** Full layout, 4-column feature grid
- **Tablet (600px-900px):** 2-column grid, optimized nav
- **Mobile (<600px):** 1-column layout, hamburger nav toggle, mobile-friendly inputs

## ⚙️ Configuration

### Change Demo Credentials

Edit `login.py`:
```python
DEMO_EMAIL = "your_email@example.com"
DEMO_PASSWORD = "your_password"
```

### Change Secret Key (Production)

Set environment variable:
```bash
export FLASK_SECRET="your-secure-secret-key"
```

Or edit `login.py`:
```python
app.secret_key = "your-secure-secret-key"
```

### Change Color Theme

Edit `static/css/styles.css` variables:
```css
:root {
  --primary: #your-color;
  --accent: linear-gradient(135deg, #color1, #color2);
  /* ... other variables */
}
```

## 🚀 Deployment

### Deploy to Heroku

1. Create `Procfile`:
```
web: gunicorn login:app
```

2. Add to `requirements.txt`:
```
gunicorn
```

3. Deploy:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to PythonAnywhere

1. Upload files to PythonAnywhere
2. Set up a web app pointing to `login.py`
3. Configure WSGI file
4. Visit your app URL

## 🔒 Security Notes

⚠️ **This is a demo application.** For production:

- ✅ Use strong secret keys
- ✅ Hash passwords with bcrypt or argon2
- ✅ Use HTTPS/SSL certificates
- ✅ Set `SESSION_COOKIE_SECURE = True`
- ✅ Implement CSRF protection
- ✅ Use a real database (PostgreSQL, MongoDB, etc.)
- ✅ Add rate limiting to prevent brute force
- ✅ Validate all user inputs server-side

## 🐛 Troubleshooting

### "Cannot find module 'flask'"
```bash
pip install -r requirements.txt
```

### "Address already in use"
Change the port in `login.py`:
```python
app.run(debug=True, port=5001)
```

### Login modal not appearing
Check browser console (F12) for JavaScript errors. Ensure `app.js` is loaded correctly.

### Dashboard shows blank email
Ensure session is set properly. Check browser cookies are enabled.

## 📚 Technologies Used

- **Backend:** Flask (Python web framework)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** CSS Grid, Flexbox, CSS Variables, Gradients
- **Fonts:** Poppins (Google Fonts)
- **Animations:** CSS Transitions, Keyframe animations, IntersectionObserver API

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **Donny079**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For issues or questions, please open an issue on GitHub:
https://github.com/Donny079/Login-awebpage/issues

---

**Enjoy your modern login webpage! 🚀**
