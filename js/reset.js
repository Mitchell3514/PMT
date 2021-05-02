const usernameDiv = document.querySelector("div#username");
const passwordDiv = document.querySelector("div#password");

passwordDiv.classList.add("is-hidden");
newPasswordInp.disabled = true;

document.querySelector("button#reset")
    .addEventListener("click", () => {
        if (validate(false)) {
            if (usernameInp.value && newPasswordInp.value) {
                editLogin(usernameInp.value, newPasswordInp.value);            
                window.location.href = "login.html";
            } else {
                usernameInp.disabled = true;
                usernameDiv.classList.add("is-hidden");
                passwordDiv.classList.remove("is-hidden");
                newPasswordInp.disabled = false;
            }
        }
    });

