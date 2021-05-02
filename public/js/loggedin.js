const username = window.localStorage.getItem("c");
const usernameText = document.querySelector("h1#username");

if (username) {
    usernameText.innerHTML = username;
} else {
    window.location.href = "login.html";
}

document.querySelector("button#logout")
    .addEventListener("click", () => {
        window.localStorage.removeItem("c");
        window.location.href = "login.html";
    });