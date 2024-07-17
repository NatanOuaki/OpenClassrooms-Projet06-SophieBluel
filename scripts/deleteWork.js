const deleteWork = async (all_works_thumbnails) => {
  all_works_thumbnails.forEach((works_removable) => {
    works_removable.addEventListener("click", async () => {
      await fetch(
        `http://localhost:5678/api/works/${works_removable.dataset.id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem(
              "Sophie_Bluel_Architecte_JWT"
            )}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          await getAllWorks();
          display_delete_thumbnails();
        }
      });
    });
  });
};

const display_delete_thumbnails = () => {
  const delete_works_container_thumbnails = document.querySelector(
    ".delete-works-thumbnails-container"
  );
  delete_works_container_thumbnails.innerHTML = array_All_Works
    .map(
      (thumbnails_work) =>
        `
            <figure class="thumbnails-removable" data-id="${thumbnails_work.id}">
                <img
                    src="${thumbnails_work.imageUrl}"
                    alt="${thumbnails_work.title}"
                    />
                <div class="icon_delete">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </figure>
          `
    )
    .join("");

  const all_works_thumbnails = document.querySelectorAll(
    ".thumbnails-removable"
  );
  deleteWork(all_works_thumbnails);
};
