// Authentication System for Bäderbook
// Simple authentication using localStorage

// Demo users (in production, this would be handled by a backend)
const DEMO_USERS = [
    {
        email: 'demo@baederbook.de',
        password: 'demo123',
        name: 'Demo Benutzer'
    },
    {
        email: 'admin@baederbook.de',
        password: 'admin123',
        name: 'Administrator'
    }
];

// Check if user is authenticated
function isAuthenticated() {
    const session = localStorage.getItem('baederbook_session');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        // Check if session is still valid (24 hours)
        const now = new Date().getTime();
        if (now > sessionData.expires) {
            localStorage.removeItem('baederbook_session');
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

// Get current user
function getCurrentUser() {
    const session = localStorage.getItem('baederbook_session');
    if (!session) return null;
    
    try {
        const sessionData = JSON.parse(session);
        return sessionData.user;
    } catch (e) {
        return null;
    }
}

// Login function
function login(email, password) {
    // Find user
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return {
            success: false,
            message: 'E-Mail-Adresse oder Passwort ist falsch.'
        };
    }
    
    // Create session (valid for 24 hours)
    const expires = new Date().getTime() + (24 * 60 * 60 * 1000);
    const sessionData = {
        user: {
            email: user.email,
            name: user.name
        },
        expires: expires,
        loginTime: new Date().getTime()
    };
    
    localStorage.setItem('baederbook_session', JSON.stringify(sessionData));
    
    return {
        success: true,
        user: sessionData.user
    };
}

// Logout function
function logout() {
    localStorage.removeItem('baederbook_session');
}

// Protect page - redirect to login if not authenticated
function protectPage() {
    if (!isAuthenticated()) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'login.html' && currentPage !== 'index.html') {
            window.location.href = 'login.html';
        }
    }
}

// Initialize login form if on login page
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Show loading state
            loginBtn.disabled = true;
            loginBtn.textContent = 'Wird angemeldet...';
            errorMessage.classList.remove('show');
            
            // Simulate API call delay
            setTimeout(() => {
                const result = login(email, password);
                
                if (result.success) {
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // Show error
                    errorMessage.textContent = result.message;
                    errorMessage.classList.add('show');
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Anmelden';
                }
            }, 500);
        });
    }
    
    // Check authentication on protected pages
    protectPage();
});

// Auto-logout on session expiry
setInterval(function() {
    if (!isAuthenticated()) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'dashboard.html') {
            window.location.href = 'login.html';
        }
    }
}, 60000); // Check every minute

