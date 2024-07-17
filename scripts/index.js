let array_All_Works = [];
let array_All_Category = [];


const initDisplay = async () => {

  await getAllWorks();
  await getAllCategory();
  setFiltersWorks();
  modal_create_delete();
};

initDisplay();
