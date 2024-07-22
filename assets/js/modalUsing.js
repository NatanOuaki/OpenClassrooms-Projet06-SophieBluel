document.querySelector('.openModal').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModal2').addEventListener('click', closeSecondModal);
document.getElementById('returnToModal1').addEventListener('click', returnToModal1);
document.querySelector('.addPhoto').addEventListener('click', openSecondModal);
document.querySelector('.sendNewWorks').addEventListener('click', sendNewWorks);


let modal = document.getElementById("modal1");
let modal2 = document.getElementById("modal2");
let modalIsHidden = true;
let secondModalIsHidden = true;



function openModal(e){
    e.preventDefault();
    if(modalIsHidden){
        modal.style.display = null;
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', true);
        showImgProjects();
        modalIsHidden = false;
    }
}

function closeModal(e){
    e.preventDefault();
    if(!modalIsHidden){
        modal.style.display = "none";
        modal.removeAttribute('aria-modal');
        modal.setAttribute('aria-hidden', true);
        modalIsHidden = true;
    }
}

window.addEventListener('keydown', function(e){
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e);
    }
})


let worksContainer = document.querySelector(".worksContainer");

function showImgProjects() {
    let url = `http://localhost:5678/api/works`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let img = "";
            for (let i = 0; i < data.length; i++) {
                img += `<figure data-id="${data[i].id}">
                            <img src="${data[i].imageUrl}" alt="${data[i].title}"/>
                            <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
                        </figure>`;
            }
            worksContainer.innerHTML = img;

            let deleteIcons = document.querySelectorAll(".delete");
            deleteIcons.forEach(icon => {
                icon.addEventListener("click", deleteItem);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function deleteItem(event) {
    let figure = event.target.closest("figure");
    let id = figure.getAttribute("data-id");

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
    .then(async (res) => {
        if (res.ok) {
            await showImgProjects();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}


function openSecondModal(e){
    e.preventDefault();
    if(secondModalIsHidden && !modalIsHidden){
        modal.style.display = "none";
        modal2.style.display = null;
        modal.removeAttribute('aria-modal');
        modal.setAttribute('aria-hidden', true);
        modal2.removeAttribute('aria-hidden');
        modal2.setAttribute('aria-modal', true);
        showCategoriesInSelector();
        modalIsHidden = true;
        secondModalIsHidden = false;
    }
}

function closeSecondModal(){
    if(!secondModalIsHidden && modalIsHidden){
        modal2.style.display = "none";
        modal.style.display = "none";
        modal2.removeAttribute('aria-modal');
        modal2.setAttribute('aria-hidden', true);
        modal.removeAttribute('aria-modal');
        modal.setAttribute('aria-hidden', true);
        modalIsHidden = true;
        secondModalIsHidden = true;
    }
}

function returnToModal1(){
    if(!secondModalIsHidden && modalIsHidden){
        modal2.style.display = "none";
        modal.style.display = null;
        modal2.removeAttribute('aria-modal');
        modal2.setAttribute('aria-hidden', true);
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', true);
        modalIsHidden = false;
        secondModalIsHidden = true;
    }
}

let imageInput = document.querySelector("#imageInput");
let imageZone = document.querySelector(".imageZone");
let titleInput = document.querySelector("#titleInput");
let categorySelector = document.getElementById('categorySelector');


function showCategoriesInSelector() {
    let url = `http://localhost:5678/api/categories`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var category = `<option value=""></option>`;
            for (var i = 0; i < data.length; i++) {
                category += `<option value="${data[i].name}">${data[i].name}</option>`;
            }        
            categorySelector.innerHTML = category;
    }).catch(function (error) {
        console.log(error);
    });
}

const displayImg = () => {
    const uploadZoneDetails = document.querySelector(".uploadZoneDetails");
    const imagePreview = document.querySelector(".imagePreview");
    if (imageInput.files.length > 0) {
        uploadZoneDetails.style.display = "none";
        imagePreview.src = URL.createObjectURL(imageInput.files[0]);
        imagePreview.style.display = null;
    } else {
        uploadZoneDetails.style.display = null;
        imagePreview.style.display = "none";
    }
};

imageInput.addEventListener("change", displayImg);

function checkImage(){
    let imageError = document.querySelector(".imageError");
    if (imageInput.files.length > 0) {
        imageError.textContent = "";
        return true;
    } else {
        imageError.textContent = "Image obligatoire";
        imageInput.addEventListener("input", () => displayImg());
        imageInput.addEventListener("input", () => checkImage());
    }
}

function checkTitle(){
    let titleError = document.querySelector(".titleError");
    if (titleInput.value.length > 0) {
        titleError.textContent = "";
        return true;
    } else {
        titleError.textContent = "Titre obligatoire";
        titleInput.addEventListener("input", () => checkTitle());
    }
}

function checkCategory(){
    let categoryError = document.querySelector(".categoryError");
    if (categorySelector.value === "") {
        categoryError.textContent = "Catégorie obligatoire";
        categorySelector.addEventListener("input", () => checkCategory());
    } else {
        categoryError.textContent = "";
        return true;
    }
}


function sendNewWorks(){
    if(checkImage() && checkTitle() && checkCategory()){
        const bodyData = new FormData();
        bodyData.append("image", imageInput.files[0]);
        bodyData.append("title", titleInput.value);
        bodyData.append("category", categorySelector.value);
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: bodyData,
        }).then(async (res) => {
            if (res.ok) {
                await showImgProjects();
                const messageSuccess = document.querySelector(".messageSuccess");
                messageSuccess.textContent = "Projet ajouté avec succès";
                document.getElementById("form-create").reset();
                displayImage();
            }
        });
    }
}
