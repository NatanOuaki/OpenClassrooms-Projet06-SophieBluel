stateConnection();

function showAllProjects() {
    let url = `http://localhost:5678/api/works`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var figures = "";
            var insertGallery = document.getElementById("insertGallery");
            for (var i = 0; i < data.length; i++) {
                figures += `<figure>
                                <img src="${data[i].imageUrl}" alt="${data[i].title}">
                                <figcaption>${data[i].title}</figcaption>
                            </figure>`;
            }        
            insertGallery.innerHTML = figures;
    }).catch(function (error) {
        console.log(error);
    });
}


function showProjectsWithID(categoryID) {
    let url = `http://localhost:5678/api/works`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var figures = "";
            var insertGallery = document.getElementById("insertGallery");
            for (var i = 0; i < data.length; i++) {
                if(data[i].categoryId === categoryID){
                    figures += `<figure>
                                    <img src="${data[i].imageUrl}" alt="${data[i].title}">
                                    <figcaption>${data[i].title}</figcaption>
                                </figure>`;
                }
            }        
            insertGallery.innerHTML = figures;
    }).catch(function (error) {
        console.log(error);
    });
}


function showAllCategories() {
    let url = `http://localhost:5678/api/categories`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var insertFilters = document.getElementById("insertFilters");
            var filters = `<button class='filters activated' onclick="handleCategoryClick(null)"> Tous </button>`;

            for (var i = 0; i < data.length; i++) {
                filters += `<button class='filters' onclick="handleCategoryClick(${data[i].id})"> ${data[i].name} </button>`;
            }        
            insertFilters.innerHTML = filters;
    }).catch(function (error) {
        console.log(error);
    });
}


function handleCategoryClick(categoryID) {
    var buttons = document.querySelectorAll('.filters');
    buttons.forEach(button => button.classList.remove('activated'));

    if (categoryID === null) {
        showAllProjects();
        buttons[0].classList.add('activated'); 
    } else {
        showProjectsWithID(categoryID);
        document.querySelector(`button[onclick="handleCategoryClick(${categoryID})"]`).classList.add('activated');
    }
}


function stateConnection(){
    var connected = sessionStorage.getItem("connected");
    var navLoginLogout = document.getElementById("loginLogout");
    var onceLoggedIn = document.querySelectorAll(".onceLoggedIn");
    console.log(connected);
    if (connected){
        navLoginLogout.innerHTML = `<a href="javascript:logout()" id="logout">logout</a>`;
        onceLoggedIn.forEach(function(elem) {
            elem.style.display = "";
        });
        showAllProjects();
    }
    else{
        navLoginLogout.innerHTML = `<a href="login.html">login</a>`;
        showAllProjects();
        showAllCategories();
    }
}

function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("connected");
    window.location.href = "./index.html"; 
}
