'use client'
import React, { useEffect } from 'react';
import { useAuth, useSession, useUser } from "@clerk/clerk-react";

const ClerkDebugComponent = () => {
  const { userId, sessionId, getToken } = useAuth();
  const { session, isSignedIn, isLoaded: isSessionLoaded } = useSession();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    const debugClerk = async () => {
      console.log("Auth state:", {
        userId,
        sessionId,
        isSignedIn
      });

      console.log("Session state:", {
        session,
        isSessionLoaded
      });

      console.log("User state:", {
        user,
        isUserLoaded
      });

      if (getToken) {
        try {
          const token = await getToken({ template: "supabase" });
          console.log("Token:", token ? "Token received" : "No token");
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    };

    debugClerk();
  }, [userId, sessionId, session, isSignedIn, isSessionLoaded, user, isUserLoaded, getToken]);

  return (
    <div>
      <h2>Clerk Debug Information</h2>
      <p>User ID: {userId || 'Not available'}</p>
      <p>Session ID: {sessionId || 'Not available'}</p>
      <p>Is Signed In: {isSignedIn ? 'Yes' : 'No'}</p>
      <p>Session Loaded: {isSessionLoaded ? 'Yes' : 'No'}</p>
      <p>User Loaded: {isUserLoaded ? 'Yes' : 'No'}</p>
      <p>Session: {session ? 'Available' : 'Null'}</p>
      <p>User: {user ? 'Available' : 'Null'}</p>
    </div>
  );
};

export default ClerkDebugComponent;