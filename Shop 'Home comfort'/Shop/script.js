const items = [
    {
      title: "Блендер погружной",
      description: "Погружной блендер 3 в 1!",
      tags: ["kitchen"],
      price: 7000,
      img: "./img/1.jpeg",
      rating: 5.0,
    },
    {
      title: "Блендер",
      description: "Отлично подойдет для приготовления смузи!",
      tags: ["kitchen"],
      price: 5500,
      img: "./img/2.jpeg",
      rating: 4.6,
    },
    {
      title: "Встраиваемая посудомоечная машина",
      description: "Сделает вечер лучше взяв на себя грязную работу!",
      tags: ["kitchen"],
      price: 60000,
      img: "./img/3.jpeg",
      rating: 4.6,
    },
    {
      title: "Встраиваемый духовой шкаф",
      description: "Духовой шкаф подойдет как для приготовления пышной сладкой выпечки, так и для сочного мяса",
      tags: ["kitchen"],
      price: 90000,
      img: "./img/4.jpeg",
      rating: 5.0,
    },
    {
      title: "Встраиваемый духовой шкаф",
      description: "Стильный духовой шкаф, подойдет под любой интерьер!",
      tags: ["kitchen"],
      price: 55000,
      img: "./img/5.jpeg",
      rating: 4.7,
    },
    {
      title: "Микроволновая печь",
      description: "Микроволновая печь соло",
      tags: ["kitchen"],
      price: 5000,
      img: "./img/6.jpeg",
      rating: 3.5,
    },
    {
      title: "Микроволновая печь Samsung",
      description: "Стиль, надежность и простота в использовании!",
      tags: ["kitchen"],
      price: 15000,
      img: "./img/7.jpeg",
      rating: 3.9,
    },
    {
      title: "Настольная посудомоечная машина",
      description: "Подойдет для небольшого объема посуды",
      tags: ["kitchen"],
      price: 30000,
      img: "./img/8.jpeg",
      rating: 3.6,
    },
    {
      title: "Стиральная машина",
      description: "Компактиная стиральная машина с большой вместительностью",
      tags: ["bathroom"],
      price: 40000,
      img: "./img/9.jpeg",
      rating: 4.8,
    },
    {
      title: "Стиральная машина",
      description: "Стильная стиральная машина с режимом сушки и тишиной в работе",
      tags: ["bathroom"],
      price: 80000,
      img: "./img/10.jpeg",
      rating: 5.0,
    },
    {
      title: "Тостер",
      description: "Для хрустящей корочки!",
      tags: ["kitchen"],
      price: 4700,
      img: "./img/11.jpeg",
      rating: 3.7,
    },
    {
      title: "Электрическая соковыжималка",
      description: "Электрическая соковыжималка поможет начать утро со свежевыжатого сока без лишних усилий и сократит ваше время на сборы!",
      tags: ["kitchen"],
      price: 35000,
      img: "./img/12.jpeg",
      rating: 4.8,
    },
  ];
  
  let currentState = [...items];

  const itemsContainer = document.querySelector("#shop-items");

  const itemTemplate = document.querySelector("#item-template");

  const nothingFound = document.querySelector("#nothing-found");
  
  function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
      itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
      nothingFound.textContent = "Ничего не найдено";
    }
  }
  
  function sortByAlphabet(a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  }

  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
  function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;
  
    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");
  
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    });
  
    return item;
  }
  
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-btn");
  
  function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
  
    currentState = items.filter((el) =>
      el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
  }
  
  searchButton.addEventListener("click", applySearch);

  searchInput.addEventListener("search", applySearch);
  
  const sortControl = document.querySelector("#sort");
  sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
   
    switch (selectedOption) {
      case "expensive": {
        currentState.sort((a, b) => b.price - a.price);
        break;
      }
      case "cheap": {
        currentState.sort((a, b) => a.price - b.price);
        break;
      }
      case "rating": {
        currentState.sort((a, b) => b.rating - a.rating);
        break;
      }
      case "alphabet": {
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      }
    }
    renderItems(currentState);
  });
  