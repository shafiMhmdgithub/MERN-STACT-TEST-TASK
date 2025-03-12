const decodeToken = (token) => {
    if (!token) return null;
  
    // Split the JWT into its parts
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
    try {
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload); // Parse payload into JSON
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };