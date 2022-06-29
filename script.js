const input = document.querySelector("[data-input]");
const inputButton = document.querySelector("[data-input-button]");
const listTemplate = document.querySelector("[data-list-template]");
const listWrapper = document.querySelector("[data-list-wrapper]");
const itemCount = document.querySelector("[data-item-count]");
const themeSwitcher = document.querySelector("[data-theme-switcher]");
const bodyWrapper = document.querySelector("[data-wrapper]");
const statusActive = document.querySelector("[status-active]");
const statusAll = document.querySelector("[status-all]");
const statusCompleted = document.querySelector("[status-completed]");
let itemNumber = 0;

themeSwitcher.addEventListener("click", () => {
  bodyWrapper.classList.toggle("dark-theme");
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !input.value == "") {
    createListTemplate();
    input.value = "";
    itemNumber++;
    itemCount.innerText = itemNumber;
  }
});

inputButton.addEventListener("click", () => {
  if (!input.value == "") {
    inputButton.classList.add("check-active");
    createListTemplate();
    itemNumber++;
    itemCount.innerText = itemNumber;
    setTimeout(() => {
      inputButton.classList.remove("check-active");
    }, 80);
    input.value = "";
  }
});

function createListTemplate() {
  const newList = listTemplate.content.cloneNode(true);
  const listContent = newList.querySelector("[data-list]");
  const listInput = listContent.querySelector("[data-list-input]");
  listInput.innerText = input.value;
  listWrapper.appendChild(listContent);
  const deleteButton = listContent.querySelector("[data-delete]");
  deleteButton.addEventListener("click", () => {
    listContent.remove();
    if (!listContent.classList.contains("list-active")) {
      itemNumber--;
    } else {
      return;
    }
    itemCount.innerText = itemNumber;
  });
  const checkButton = listContent.querySelector("[data-check-button]");
  checkButton.addEventListener("click", () => {
    listContent.classList.add("list-active");
    itemNumber--;
    itemCount.innerText = itemNumber;
  });

  statusActive.addEventListener("click", () => {
    statusAll.classList.remove("status-active");
    statusCompleted.classList.remove("status-active");

    if (
      !statusAll.classList.contains("status-active") &&
      !statusCompleted.classList.contains("status-active")
    ) {
      statusActive.classList.add("status-active");
    } else {
      statusActive.classList.remove("status-active");
    }

    if (listContent.classList.contains("list-active")) {
      listContent.style.display = "none";
    } else {
      listContent.style.display = "flex";
    }
  });

  statusCompleted.addEventListener("click", () => {
    statusAll.classList.remove("status-active");
    statusActive.classList.remove("status-active");
    if (
      !statusAll.classList.contains("status-active") &&
      !statusActive.classList.contains("status-active")
    ) {
      statusCompleted.classList.add("status-active");
    } else {
      statusCompleted.classList.remove("status-active");
    }
    if (!listContent.classList.contains("list-active")) {
      listContent.style.display = "none";
    } else {
      listContent.style.display = "flex";
    }
  });

  statusAll.addEventListener("click", () => {
    statusActive.classList.remove("status-active");
    statusCompleted.classList.remove("status-active");
    if (
      !statusActive.classList.contains("status-active") &&
      !statusCompleted.classList.contains("status-active")
    ) {
      statusAll.classList.add("status-active");
    } else {
      statusAll.classList.remove("status-active");
    }

    listContent.style.display = "flex";
  });

  const clearCompleted = document.querySelector("[data-clear-completed]");
  clearCompleted.addEventListener("click", () => {
    if (listContent.classList.contains("list-active")) {
      listContent.remove();
    }
  });
}
