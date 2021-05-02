document.querySelector("button#register")
    .addEventListener("click", () => {
        window.location.href = "register.html";
    });

document.querySelector("button#login")
    .addEventListener("click", () => {
        if (validate(false)) {
            login(usernameInp.value);
            window.location.href = "loggedin.html";
        }
    });