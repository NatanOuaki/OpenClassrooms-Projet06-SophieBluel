function checkLoginCouple() {
    var emailValue = document.getElementById("loginEmail");
    var passwordValue = document.getElementById("loginPassword");
    var login = document.getElementById("login");
    const couple = {
        email: emailValue.value,
        password:passwordValue.value
    }


    let url = `http://localhost:5678/api/users/login`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(couple)
    };


    fetch(url, options)
        .then((response) => {
            if(response.status != 200)
                throw new Error();
            else
                return response.json();
        })
        .then((data) => {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("connected", true);
            window.location.href = "./index.html";      
        }).catch(function () {
            const error = document.createElement("div");
            error.classList.add("credentialsError");
            error.innerHTML = "<span>Identifiant ou mot de passe incorrect</span>";
            login.appendChild(error);      
        });
}
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", checkLoginCouple);
