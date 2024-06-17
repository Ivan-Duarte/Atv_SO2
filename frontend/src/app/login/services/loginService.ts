export async function login(user_email: string, user_password: string){
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_email, user_password }),
    });
  
    if (response.ok) {
      return response;
    } else {
      throw new Error('Falha ao logar');
    }
}