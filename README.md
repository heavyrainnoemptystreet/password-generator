# Password Generator

A secure password generator with authentication and password history tracking

## Features

- 🔐 Generate secure passwords with customizable options
- 🎛️ Adjust password length (4-32 characters)
- 🔢 Include uppercase letters, numbers, and symbols
- 💪 Password strength indicator
- 📜 Password history (last 10 passwords)
- 👤 User authentication with Supabase
- 📋 Dashboard for managing saved passwords
- 🎨 Modern dark UI with smooth animations

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Backend**: Supabase (Auth)
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/heavyrainnoemptystreet/password-generator.git
cd password-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your Supabase credentials in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## Usage

1. Open the application
2. Register a new account or login
3. Configure password options (length, character types)
4. Click "Generate" to create a password
5. Copy the password to clipboard
6. View password history in the dropdown
7. Access the dashboard to manage saved passwords

## Security Notes

- Passwords are generated using cryptographically secure random values
- Password history is stored locally in your browser
- Authentication is handled by Supabase
- No passwords are stored on servers in plain text

## Live Demo

https://password-generator-nine-pearl.vercel.app/

## License

MIT