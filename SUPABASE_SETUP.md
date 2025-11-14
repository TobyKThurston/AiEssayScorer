# Supabase Authentication Setup

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select an existing one
3. Go to Settings > API
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Features Implemented

- ✅ Login/Signup page at `/auth/login`
- ✅ Login/Logout buttons in all Navigation components
- ✅ Auth context provider for global auth state
- ✅ Session management with middleware
- ✅ Protected routes support (ready to implement)

## Usage

1. Users can click "Login" in the navigation to go to `/auth/login`
2. Users can sign up with email/password
3. Users can sign in with email/password
4. Logged-in users will see "Logout" button instead of "Login"
5. Logout redirects to homepage and clears session

## Next Steps

To protect routes, you can use the `useAuth` hook:

```tsx
import { useAuth } from "@/contexts/AuthContext";

function ProtectedComponent() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;
  
  return <div>Protected content</div>;
}
```

