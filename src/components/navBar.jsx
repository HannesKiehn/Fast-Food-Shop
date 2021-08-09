import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const { items, textProperty, valueProperty } = this.props;
    if (items.length === 0) {
      return null;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="ms-5"></li>
            {items.slice(0, items.length - 1).map((item) => (
              <li className="nav-item ms-3" key={item[valueProperty]}>
                <div
                  className={
                    this.props.activeCategory === item
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => this.props.onCategoryChange(item)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {item[textProperty]}
                </div>
              </li>
            ))}
            {this.renderShoppingBasket()}
          </ul>
        </div>
      </nav>
    );
  }
  renderShoppingBasket() {
    const { items, textProperty } = this.props;
    const basket = items[items.length - 1];
    return (
      <li className="nav-item">
        <div
          className={
            this.props.activeCategory === basket
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() => this.props.onCategoryChange(basket)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <i className="fa fa-cart-plus me-2"></i>
          {basket[textProperty]}
          <span className="badge rounded-pill bg-primary ms-1">
            {this.props.itemsInBasket}
          </span>
        </div>
      </li>
    );
  }
}
NavBar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default NavBar;
