import hash from "object-hash";
const menuData = [
  {
    name: "Salami Pizza",
    price: 10.99,
    category: "Pizza",
  },
  {
    name: "Pineapple Pizza",
    price: 12.99,
    category: "Pizza",
  },
  {
    name: "Pizza Margherita",
    price: 7.99,
    category: "Pizza",
    vegan: true,
  },
  {
    name: "Mushroom Pizza",
    price: 8.49,
    category: "Pizza",
  },
  {
    name: "Spinach Pizza",
    price: 8.49,
    category: "Pizza",
  },
  {
    name: "Cheeseburger",
    price: 4.2,
    category: "Burger",
  },
  {
    name: "Banana split",
    price: 3.49,
    category: "Desert",
  },
  {
    name: "Strawberry cake",
    price: 2.99,
    category: "Desert",
  },
  {
    name: "Chocolate cake",
    price: 2.99,
    category: "Desert",
  },
  {
    name: "Macarons",
    price: 1.99,
    category: "Desert",
    vegan: true,
  },

  {
    name: "Chickenburger",
    price: 4.7,
    category: "Burger",
  },
  {
    name: "Hamburger",
    price: 3.99,
    category: "Burger",
  },
  {
    name: "Tuna Pizza",
    price: 8.49,
    category: "Pizza",
  },
  {
    name: "Ham Pizza",
    price: 9.49,
    category: "Pizza",
  },
  {
    name: "Calzone",
    price: 9.49,
    category: "Pizza",
  },
  {
    name: "Shrimp Pizza",
    price: 9.49,
    category: "Pizza",
  },
  {
    name: "Broccoli Pizza",
    price: 9.49,
    category: "Pizza",
    vegan: true,
  },
  {
    name: "Bacon Burger",
    price: 4.99,
    category: "Burger",
  },
  {
    name: "Tofu Burger",
    price: 5.5,
    category: "Burger",
    vegan: true,
  },
  {
    name: "Cola",
    price: 1.5,
    category: "Drinks",
    vegan: true,
  },
  {
    name: "Water",
    price: 0.8,
    category: "Drinks",
    vegan: true,
  },
  {
    name: "Beer",
    price: 1.8,
    category: "Drinks",
    vegan: true,
    alcoholic: true,
  },
  {
    name: "Ice Tea",
    price: 1.5,
    category: "Drinks",
    vegan: true,
  },
  {
    name: "Lemonade",
    price: 1.5,
    category: "Drinks",
    vegan: true,
    alcoholic: true,
  },
  {
    name: "Cheese Sticks",
    price: 2.3,
    category: "Fingerfood",
  },
  {
    name: "Onion Rings",
    price: 2.8,
    category: "Fingerfood",
    vegan: true,
  },
  {
    name: "Apple Juice",
    price: 1.5,
    category: "Drinks",
    vegan: true,
    alcoholic: true,
  },
  {
    name: "Salad",
    price: 2.0,
    category: "Salad",
    vegan: true,
  },
  {
    name: "Chicken Salad",
    price: 2.5,
    category: "Salad",
  },
  {
    name: "Feta Salad",
    price: 2.5,
    category: "Salad",
  },
  {
    name: "French Fries",
    price: 2.5,
    category: "Fingerfood",
    vegan: true,
  },
  {
    name: "Sweet Potatoe Fries",
    price: 3.5,
    category: "Fingerfood",
    vegan: true,
  },
  {
    name: "Chicken Wings",
    price: 3.5,
    category: "Fingerfood",
  },
  {
    name: "Chili Cheese Nuggets",
    price: 3.0,
    category: "Fingerfood",
  },
];

function getPreprocessedMenu() {
  let newMenu = [];
  for (let i = 0; i < menuData.length; i++) {
    const oldMenuItem = menuData[i];
    let vegan = oldMenuItem.vegan ? true : false;
    const {
      name: oldname,
      price: oldprice,
      category: categoryName,
    } = oldMenuItem;
    const newMenuItem = {
      _id: hash(oldname),
      name: oldname,
      price: oldprice,
      category: { _id: hash(categoryName), name: categoryName },
      vegan: vegan,
    };
    newMenu.push(newMenuItem);
  }

  return newMenu;
}
export function getMenu() {
  return getPreprocessedMenu();
}
