import http from "@/lib/http";

// Function to get SSR token when in server environment
const getSSRToken = async () => {
  // Only try to get cookies if we're in a server environment
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get("token")?.value;
    } catch (error) {
      console.log("pizza error", error);
      // If we can't access cookies (not in a server component), return null
      return null;
    }
  }
  return null;
};

export const requestHandler = async (method, url, formData, ssrToken = null) => {
  try {
    const config = {
      method: method.toLowerCase(),
      url: url
    };

    // Add data for POST, PUT, PATCH methods
    if (formData && ['post', 'put', 'patch'].includes(method.toLowerCase())) {
      config.data = formData;
    }

    // If no SSR token provided, try to get it automatically
    if (!ssrToken && typeof window === 'undefined') {
      ssrToken = await getSSRToken();
    }

    // Add SSR token if available
    if (ssrToken) {
      config.ssrToken = ssrToken;
    }

    const response = await http(config);
    return response?.data;
  } catch (error) {
    throw error?.response?.data;
  }
};