// lib/useSupabaseClient.ts
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';

const useSupabaseClient = () => {
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const { getToken } = useAuth();

  const initializeSupabaseClient = async () => {
    if (getToken) {
      try {
        const supabaseToken = await getToken({ template: "supabase" });
        const client = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLIC_KEY!,
          {
            global: {
              headers: { Authorization: `Bearer ${supabaseToken}` }
            }
          }
        );
        setSupabaseClient(client);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    }
  };

  useEffect(() => {
    initializeSupabaseClient();
  }, [getToken]);

  return { supabaseClient, initializeSupabaseClient }; // Return the client and the initializer
};

export default useSupabaseClient;