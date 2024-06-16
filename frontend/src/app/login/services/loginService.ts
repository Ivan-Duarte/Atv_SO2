export async function login(email: string, password: string) {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_email: email, user_password: password }),
    });
  
    const data = await response.json();
    return {
      ok: response.ok,
      message: data.message,
    };
  }
  