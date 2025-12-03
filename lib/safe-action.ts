import { createSafeActionClient } from "next-safe-action";

// Base safe action client with error handling
export const safeAction = createSafeActionClient({
  handleServerError(e) {
    // Log error for debugging
    console.error("Action error:", e);

    // Return safe error message to client
    if (e instanceof Error) {
      return e.message;
    }

    return "An unexpected error occurred";
  },
 
});

// Authenticated action client (add authentication logic as needed)
export const authAction = safeAction.use(async ({ next }) => {
  // Example: Add authentication check here
  // const session = await getSession();
  // if (!session) {
  //   throw new Error("Unauthorized");
  // }

  // Pass user data to action context
  return next({
    ctx: {
      // user: session.user,
    },
  });
});

export type SafeAction = typeof safeAction;
export type AuthAction = typeof authAction;
