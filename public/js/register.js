document.querySelector("button#login")
    .addEventListener("click", () => {
        window.location.href = "login.html";
    });

document.querySelector("button#register")
    .addEventListener("click", () => {
        if (validate(true)) {
            addLogin(usernameInp.value, newPasswordInp.value);
            window.location.href = "login.html";
        }
    });
    