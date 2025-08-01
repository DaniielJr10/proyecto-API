const API = 'http://localhost:3000/api/login';

async function login(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (!res.ok) throw new Error('Credenciales incorrectas');
        
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        location.href = 'menu.html';
        
    } catch (error) {
        errorMsg.style.display = 'block';
    }
}
