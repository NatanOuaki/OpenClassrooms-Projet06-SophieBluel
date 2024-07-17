const getAllWorks = async () => {
  const gallery = document.querySelector(".gallery");

  await fetch("http://localhost:5678/api/works")
    .then((res) => {
      return res.json();
    })
    .then((res_json) => (array_All_Works = res_json));
  gallery.innerHTML = array_All_Works
    .map(
      (card_work) =>
        `
          <figure>
                  <img
                    src="${card_work.imageUrl}"
                    alt="${card_work.title}"
                  />
                  <figcaption>${card_work.title}</figcaption>
          </figure>
        `
    )
    .join("");
};
