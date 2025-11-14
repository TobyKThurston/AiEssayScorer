# Setup Instructions

## What Has Been Implemented

### 1. Route Protection ✅
- All routes except the home page (`/`) now require authentication
- Users are redirected to `/auth/login` if not authenticated
- After login, users are redirected back to their original destination

### 2. Token System ✅
- Users receive 1 free token when they first sign up
- Tokens are stored in Supabase `user_tokens` table
- Token count is displayed on the upload page
- One token is deducted when an essay is rated

### 3. Essay Rating with OpenAI ✅
- Essay rating API endpoint at `/api/rate-essay`
- Uses OpenAI GPT-4 to analyze essays
- Returns comprehensive feedback including:
  - Overall score (out of 10)
  - Strengths
  - Areas for improvement
  - Content feedback
  - Structure feedback
  - Style feedback
  - Final recommendation

### 4. Upload Page Integration ✅
- Three-step flow: Upload → Questions → Results
- Token validation before rating
- Real-time token display
- Error handling for API failures
- Results display with all feedback sections

## Required Setup

### 1. Supabase Database Setup

Run the SQL script in your Supabase SQL Editor:

```sql
-- See supabase-schema.sql file
```

This creates:
- `user_tokens` table
- Row Level Security policies
- Automatic token initialization for new users

### 2. Environment Variables

Add to your `.env.local` (and Vercel environment variables):

```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://getivyadmit.com

# New - Required for OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

The `openai` package has been added to `package.json`.

## How It Works

1. **User Registration**: When a user signs in with Google for the first time, they automatically receive 1 token in the `user_tokens` table.

2. **Essay Upload**: User pastes their essay text (minimum 50 words).

3. **Questions Step**: User answers questions about essay type and target schools (these are collected but not used in rating - rating is based only on essay text as requested).

4. **Rating Process**: 
   - System checks if user has at least 1 token
   - Calls OpenAI API with the essay text
   - OpenAI analyzes and returns structured feedback
   - One token is deducted from user's account
   - Results are displayed

5. **Results Display**: Shows:
   - Overall score
   - Score breakdown (Content, Structure, Style)
   - Strengths list
   - Areas for improvement
   - Detailed feedback sections
   - Final recommendation

## API Endpoints

### `GET /api/tokens`
Returns the current user's token count.

### `POST /api/rate-essay`
Rates an essay using OpenAI.

**Request Body:**
```json
{
  "essay": "Essay text here..."
}
```

**Response:**
```json
{
  "rating": {
    "score": 8,
    "strengths": ["...", "..."],
    "improvements": ["...", "..."],
    "contentFeedback": "...",
    "structureFeedback": "...",
    "styleFeedback": "...",
    "recommendation": "..."
  }
}
```

## Notes

- The rating is based **only on the essay text** (first text blob) as requested
- Questions are collected but not sent to OpenAI
- Users need at least 1 token to rate an essay
- Token count is checked both client-side and server-side
- All routes except `/` require authentication

