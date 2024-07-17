const modal_create_delete = () => {

  const update_projects = document.querySelector(".update_projects");
  const backdropFilter = document.querySelector(".backdropFilter");
  const modal_create_delete_works = document.querySelector(
    ".modal-create-delete-works"
  );

  const cross_modal = document.querySelector(".cross-modal");
  const modal_arrow_left = document.querySelector(".arrow-left-modal");
  const btn_add_works = document.querySelector(".btn-add-works");


  const modal_body_delete = document.querySelector(
    ".modal-create-delete-works__body-delete"
  );
  const modal_body_create = document.querySelector(
    ".modal-create-delete-works__body-create"
  );


  update_projects.addEventListener("click", () => {
    backdropFilter.classList.remove("hidden");
    modal_create_delete_works.classList.remove("hidden");
  });
  backdropFilter.addEventListener("click", () => {
    backdropFilter.classList.add("hidden");
    modal_create_delete_works.classList.add("hidden");
  });
  cross_modal.addEventListener("click", () => {
    backdropFilter.classList.add("hidden");
    modal_create_delete_works.classList.add("hidden");
  });


  btn_add_works.addEventListener("click", () => {
    modal_body_delete.classList.add("hidden");
    modal_body_create.classList.remove("hidden");
    modal_arrow_left.classList.remove("hidden");
  });


  modal_arrow_left.addEventListener("click", () => {
    display_delete_thumbnails();
    modal_body_delete.classList.remove("hidden");
    modal_body_create.classList.add("hidden");
    modal_arrow_left.classList.add("hidden");
  });


  display_delete_thumbnails();


  createWork();
};
