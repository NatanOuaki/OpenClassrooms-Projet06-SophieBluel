const login = () => {
  const btnLogin = document.querySelector("#btnLogin");

  btnLogin.addEventListener("click", async (e) => {
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const login_error_message = document.querySelector(".login_error_message");

    e.preventDefault();

    await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
    })
      .then((res) => res.json())
      .then((res_json) => {
        if (res_json.token) {
          sessionStorage.setItem("Sophie_Bluel_Architecte_JWT", res_json.token);
          window.location.href = "./index.html";
        } else {
          login_error_message.innerHTML =
            "Erreur dans l’identifiant ou le mot de passe.";
        }
      });
  });
};

login();
