const createWork = () => {
  const inputImg = document.querySelector("#input-img");
  const dropZoneImg = document.querySelector(".drop-zone-img");
  const inputTitle = document.querySelector("#input-title");
  const inputCategory = document.querySelector("#category-select");

  const showImg = () => {
    const dropZoneContent = document.querySelector(".drop-zone-content");
    const thumbnailInputImg = document.querySelector(".thumbnailInputImg");
    if (inputImg.files.length > 0) {
      const imgSrc = URL.createObjectURL(inputImg.files[0]);
      dropZoneContent.classList.add("hidden");
      thumbnailInputImg.classList.remove("hidden");
      thumbnailInputImg.src = imgSrc;
    } else {
      dropZoneContent.classList.remove("hidden");
      thumbnailInputImg.classList.add("hidden");
    }
  };

  inputImg.addEventListener("change", showImg);
  dropZoneImg.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dropZoneImg.addEventListener("drop", (e) => {
    e.preventDefault();
    inputImg.files = e.dataTransfer.files;
    showImg();
  });

  const isImg = () => {
    const ImgWarning = document.querySelector(".img-warning");
    if (inputImg.files.length > 0) {
      ImgWarning.textContent = "";
      return true;
    } else {
      ImgWarning.textContent = "Image obligatoire";
      inputImg.addEventListener("input", () => showImg());
      inputImg.addEventListener("input", () => isImg());
    }
  };

  const isTitle = () => {
    const TitleWarning = document.querySelector(".title-warning");
    if (inputTitle.value.length > 0) {
      TitleWarning.textContent = "";
      return true;
    } else {
      TitleWarning.textContent = "Titre obligatoire";
      inputTitle.addEventListener("input", () => isTitle());
    }
  };

  const setSelectCategory = () => {
    const categorySelect = document.querySelector("#category-select");
    array_All_Category.forEach((category) => {
      categorySelect.innerHTML += `
        <option value="${category.id}">${category.name}</option>
      `;
    });
  };
  setSelectCategory();

  const isCategory = () => {
    const categoryWarning = document.querySelector(".category-warning");
    if (inputCategory.value === "") {
      categoryWarning.textContent = "Catégorie obligatoire";
      inputCategory.addEventListener("input", () => isCategory());
    } else {
      categoryWarning.textContent = "";
      return true;
    }
  };

  const btnAddWorksValidate = document.querySelector(".btn-add-works-validate");
  btnAddWorksValidate.addEventListener("click", () => {
    if (isImg() && isTitle() && isCategory()) requestCreate();
  });

  const requestCreate = async () => {
    const bodyData = new FormData();
    bodyData.append("image", inputImg.files[0]);
    bodyData.append("title", inputTitle.value);
    bodyData.append("category", inputCategory.value);

    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem(
          "Sophie_Bluel_Architecte_JWT"
        )}`,
      },
      body: bodyData,
    }).then(async (res) => {
      if (res.ok) {
        await getAllWorks();

        const msgWorkSend = document.querySelector(".msg-work-send");
        msgWorkSend.textContent = "Projet ajouté avec succès";

        document.getElementById("form-create").reset();
        showImg();
      }
    });
  };
};
