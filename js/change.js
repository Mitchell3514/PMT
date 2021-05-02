const username = getLoggedIn();
if (username) {
    usernameInp.value = username;
    usernameInp.disabled = true;
}


document.querySelector("button#change")
    .addEventListener("click", () => {
        if (validate(false)) {
            editLogin(usernameInp.value || getLoggedIn(), newPasswordInp.value);
            window.location.href = "login.html";
        }
    });