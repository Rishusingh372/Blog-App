# TODO: Fix 400 Bad Request Error for Demo Blog IDs

## Completed Tasks
- [x] Added imports for demoBlogs and useAuth in Detail.jsx
- [x] Modified useEffect in Detail.jsx to handle demo blogs and authentication checks
- [x] Task completed: Demo blogs now load without authentication, real blogs require authentication

## Summary
The error was caused by the frontend trying to fetch demo blog IDs (like "demo2") from the backend API, which requires authentication. The backend returns a 400 Bad Request because the request lacks proper authentication for non-demo blogs.

The fix involves:
1. Checking if the blog ID starts with "demo" and serving it from the local demoBlogs array.
2. Only attempting API calls for authenticated users or non-demo IDs.
3. Providing a fallback to demo blogs if the user is not authenticated.

This ensures that demo blogs can be viewed without authentication, while real blogs require proper authentication.
