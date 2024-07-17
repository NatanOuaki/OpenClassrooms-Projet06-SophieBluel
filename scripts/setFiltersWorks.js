const setFiltersWorks = () => {
  const gallery = document.querySelector(".gallery");
  const filter_container = document.querySelector(".filters_container");

  let arrayOfCategory = new Set();

  arrayOfCategory.add("Tous");

  array_All_Works.forEach((work) => arrayOfCategory.add(work.category.name));

  arrayOfCategory.forEach((category) => {
    const btnFilter = document.createElement("input");
    btnFilter.setAttribute("type", "submit");
    btnFilter.setAttribute("value", category);

    if (category === "Tous") btnFilter.classList.add("BtnFilterActive");
    filter_container.appendChild(btnFilter);
  });


  const filterBtns = document.querySelectorAll(
    "#portfolio input[type='submit']"
  );

  filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      filterBtns.forEach((btnClass) =>
        btnClass.classList.remove("BtnFilterActive")
      );
      filterBtn.classList.add("BtnFilterActive");

      gallery.innerHTML = array_All_Works
        .map((card_work) =>
          filterBtn.value === card_work.category.name ||
          filterBtn.value === "Tous"
            ? `
            <figure>
                    <img
                      src="${card_work.imageUrl}"
                      alt="${card_work.title}"
                    />
                    <figcaption>${card_work.title}</figcaption>
            </figure>
            `
            : ""
        )
        .join("");
    });
  });
};
