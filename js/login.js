const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    loginMessage.textContent = "";
    loginMessage.className = "message";

    loginButton.disabled = true;
    loginButton.textContent = "Signing In...";

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        loginMessage.textContent = error.message;
        loginMessage.classList.add("error");

        loginButton.disabled = false;
        loginButton.textContent = "Sign In";
        return;
    }

    window.location.href = "dashboard.html";
});
