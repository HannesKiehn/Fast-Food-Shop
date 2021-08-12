import React, { Component } from "react";
import NavBar from "./components/navBar";
import { getMenu } from "./data/menu";
import hash from "object-hash";
import Pagination from "./components/pagination";
import ShoppingBasket from "./components/shoppingBasket";
import OrderPage from "./components/orderPage";
import SortOptions from "./components/sortOptions";
import ProductGrid from "./components/productGrid";

class App extends Component {
  state = {
    menu: [],
    shoppingBasket: [],
    menuItemsPerRow: 3,
    rowsPerPage: 3,
    page: 1,
    navigationBarItems: [],
    showFoodSelectPage: true,
    showShoppingBasket: false,
    showOrderPage: false,
    shoppingBasketNavigationItem: {
      _id: hash("Shopping Basket"),
      name: "Shopping Basket",
    },
    completeMenuNavigationItem: {
      _id: hash("All"),
      name: "All",
    },
    currentCategory: null,
    sortBy: {
      default: true,
      AZ: false,
      ZA: false,
      lowHigh: false,
      highLow: false,
      vegan: false,
    },
  };

  render() {
    let menu = this.getFilteredMenu();
    menu = this.sortMenu(menu);
    const {
      showShoppingBasket,
      showFoodSelectPage,
      showOrderPage,
      menuItemsPerRow,
      rowsPerPage,
      page,
      shoppingBasket,
    } = this.state;
    return (
      <React.Fragment>
        <NavBar
          items={this.state.navigationBarItems}
          onCategoryChange={this.handleCategoryChange}
          activeCategory={this.state.currentCategory}
          itemsInBasket={this.state.shoppingBasket.length}
        />
        {showFoodSelectPage && (
          <div>
            <SortOptions
              onSort={this.handleSorting}
              onVeganSort={this.handleVeganSort}
              onProductsPerPageChange={this.handleProductsPerPageChange}
            />
            <ProductGrid
              menu={menu}
              menuItemsPerRow={menuItemsPerRow}
              rowsPerPage={rowsPerPage}
              page={page}
              onAddToBasket={this.handleAddOneToBasket}
              onRemoveFromBasket={this.handleRemoveOneFromBasket}
              shoppingBasket={shoppingBasket}
            />
            <div className="container mt-3">
              <Pagination
                itemsCount={menu.length}
                pageSize={this.state.menuItemsPerRow * this.state.rowsPerPage}
                currentPage={this.state.page}
                onPageChange={this.handleMenuPageChange}
              />
            </div>
          </div>
        )}
        {showShoppingBasket && (
          <React.Fragment>
            <ShoppingBasket
              menu={this.state.menu}
              basket={this.state.shoppingBasket}
              onAddToBasket={this.handleAddOneToBasket}
              onRemoveFromBasket={this.handleRemoveOneFromBasket}
              onDeleteProduct={this.handleDeleteProduct}
              onLeaveBasket={this.handleLeaveBasket}
              onOrder={this.handleOrder}
            />
            {this.state.shoppingBasket.length > 0 && (
              <div className="mx-auto w-50"></div>
            )}
          </React.Fragment>
        )}
        {showOrderPage && (
          <OrderPage
            menu={this.state.menu}
            basket={this.state.shoppingBasket}
            onReturnToBasket={this.handleReturnToBasket}
          ></OrderPage>
        )}
      </React.Fragment>
    );
  }

  getFilteredMenu() {
    let menu = [...this.state.menu];
    if (menu.length === 0) {
      return menu;
    }
    if (this.state.sortBy.vegan) {
      menu = this.state.menu.filter((item) => item.vegan);
    }
    if (
      this.state.currentCategory._id !==
      this.state.completeMenuNavigationItem._id
    ) {
      menu = menu.filter(
        (item) => this.state.currentCategory._id === item.category._id
      );
    }

    return menu;
  }

  sortMenu(menu) {
    const { sortBy } = this.state;
    if (sortBy.AZ) {
      menu = menu.sort(this.compareName);
    }
    if (sortBy.ZA) {
      menu = menu.sort(this.compareName);
      menu = menu.reverse();
    }
    if (sortBy.lowHigh) {
      menu = menu.sort(this.comparePrice);
    }
    if (sortBy.highLow) {
      menu = menu.sort(this.comparePrice);
      menu = menu.reverse();
    }
    return menu;
  }

  compareName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  comparePrice(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }

  getNavigationBarItems(menu) {
    let set = new Set();
    let items = [];
    for (let i = 0; i < menu.length; i++) {
      if (!set.has(menu[i].category._id)) {
        set.add(menu[i].category._id);
        items.push(menu[i].category);
      }
    }
    items = [
      this.state.completeMenuNavigationItem,
      ...items,
      this.state.shoppingBasketNavigationItem,
    ];
    return items;
  }

  componentDidMount() {
    const newMenu = getMenu();
    this.setState({
      menu: newMenu,
      navigationBarItems: this.getNavigationBarItems(newMenu),
      currentCategory: this.state.completeMenuNavigationItem,
    });
  }

  handleMenuPageChange = (pageNumber) => {
    this.setState({ page: pageNumber });
  };

  handleCategoryChange = (category) => {
    let showShoppingBasket = false;
    let showFoodSelectPage = true;
    let showOrderPage = false;
    if (category._id === this.state.shoppingBasketNavigationItem._id) {
      showShoppingBasket = true;
      showFoodSelectPage = false;
    }
    let { page, currentCategory } = this.state;
    if (currentCategory._id !== category._id) {
      page = 1;
    }
    this.setState({
      showShoppingBasket,
      showFoodSelectPage,
      showOrderPage,
      currentCategory: category,
      page,
    });
  };

  handleAddOneToBasket = (_id) => {
    const { shoppingBasket } = this.state;
    let newShoppingBasket = [...shoppingBasket];
    if (!this.isInShoppingBasket(_id)) {
      newShoppingBasket.push({ _id: _id, count: 1 });
    } else {
      const index = shoppingBasket.findIndex((item) => item._id === _id);
      newShoppingBasket[index].count++;
    }
    this.setState({ shoppingBasket: newShoppingBasket });
  };

  handleRemoveOneFromBasket = (_id) => {
    const { shoppingBasket } = this.state;
    if (!this.isInShoppingBasket(_id)) {
      return;
    }
    const index = shoppingBasket.findIndex((item) => item._id === _id);
    if (shoppingBasket[index].count === 1) {
      this.handleDeleteProduct(_id);
    } else {
      shoppingBasket[index].count--;
      this.setState({ shoppingBasket });
    }
  };

  handleOrder = () => {
    this.setState({
      showFoodSelectPage: false,
      showShoppingBasket: false,
      showOrderPage: true,
    });
  };

  isInShoppingBasket(_id) {
    const { shoppingBasket } = this.state;
    const item = shoppingBasket.filter((item) => item._id === _id);
    return item.length === 1;
  }

  handleDeleteProduct = (_id) => {
    let { shoppingBasket } = this.state;
    shoppingBasket = shoppingBasket.filter((item) => item._id !== _id);
    this.setState({ shoppingBasket });
  };

  handleReturnToBasket = () => {
    this.handleCategoryChange(this.state.shoppingBasketNavigationItem);
  };

  handleLeaveBasket = () => {
    this.handleCategoryChange(this.state.completeMenuNavigationItem);
  };

  handleSorting = (event) => {
    const value = event.target.value;
    const vegan = this.state.sortBy.vegan;
    let sortBy = {
      default: false,
      AZ: false,
      ZA: false,
      lowHigh: false,
      highLow: false,
      vegan,
    };
    sortBy[value] = true;
    if (value === "default") {
      sortBy.default = true;
    }
    this.setState({ sortBy });
  };

  handleVeganSort = (event) => {
    this.setState({ page: 1 });
    let sortBy = this.state.sortBy;
    sortBy.vegan = event.target.checked;
    this.setState({ sortBy });
  };

  handleProductsPerPageChange = (event) => {
    const value = event.target.value;
    this.setState({ page: 1 });
    if (value === "9PerPage") {
      this.setState({ rowsPerPage: 3 });
    }
    if (value === "12PerPage") {
      this.setState({ rowsPerPage: 4 });
    }
    if (value === "15PerPage") {
      this.setState({ rowsPerPage: 5 });
    }
    if (value === "allPerPage") {
      const rows = Math.ceil(
        this.state.menu.length / this.state.menuItemsPerRow
      );
      this.setState({ rowsPerPage: rows });
    }
  };
}

export default App;
