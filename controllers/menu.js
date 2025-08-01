
window.addEventListener('DOMContentLoaded', () => {
    // Redirige si no hay token
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    }
    
    // Prevenir navegación hacia atrás
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function(event) {
        history.pushState(null, document.title, location.href);
    });
});

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}

