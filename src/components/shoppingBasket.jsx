import React, { Component } from "react";

class ShoppingBasket extends Component {
  render() {
    const { basket } = this.props;
    if (basket.length === 0) {
      return (
        <div className="container mt-5">
          <span className="m-2">Your shopping basket is empty</span>
          <br />
          <button
            className="btn btn-success m-2"
            onClick={this.props.onLeaveBasket}
          >
            Back to food selection
          </button>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="container m-5" style={{ width: "60%" }}>
          {basket.map((item) => this.renderBasketRow(item))}
          <div
            className="row border"
            style={{
              fontWeight: "bold",
            }}
          >
            <div className="col col-lg-3">Total</div>
            <div className="col col-sm"></div>
            <div
              className="col col-sm"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {this.getTotalCount()}
            </div>
            <div className="col col-sm"></div>
            <div className="col col-lg-3">
              {this.formatPriceWithCurrency(this.getTotalPrice())}
            </div>
            <div className="col col-lg-3"></div>
          </div>
          <div className="row">
            <div className="col col-lg-3"></div>
            <div className="col col-sm-3"></div>
            <div className="col col-lg-3">
              <button
                onClick={this.props.onOrder}
                className="btn btn-primary mt-3"
              >
                Checkout
              </button>
            </div>
            <div className="col col-lg-3"></div>
          </div>
        </div>
      </div>
    );
  }
  renderBasketRow(item) {
    const center = { display: "flex", justifyContent: "center" };
    return (
      <div key={item._id} className="row border">
        <div className="col col-lg-3">{this.getName(item._id)}</div>
        <div className="col col-sm" style={center}>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.onRemoveFromBasket(item._id)}
          >
            -
          </button>
        </div>
        <div
          className="col col-sm"
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {item.count}
        </div>
        <div className="col col-sm" style={center}>
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={() => this.props.onAddToBasket(item._id)}
          >
            +
          </button>
        </div>
        <div className="col col-lg-3">
          {this.formatPriceWithCurrency(this.getPrice(item._id) * item.count)} (
          {this.formatPrice(this.getPrice(item._id))} each)
        </div>
        <div className="col col-lg-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.onDeleteProduct(item._id)}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
  getName(_id) {
    const { menu } = this.props;
    const index = menu.findIndex((item) => item._id === _id);
    return menu[index].name;
  }
  getPrice(_id) {
    const { menu } = this.props;
    const index = menu.findIndex((item) => item._id === _id);
    return menu[index].price;
  }
  formatPrice(price) {
    return (Math.round(price * 100) / 100).toFixed(2);
  }
  formatPriceWithCurrency(price) {
    return (Math.round(price * 100) / 100).toFixed(2) + " €";
  }
  getTotalPrice() {
    const { basket } = this.props;
    let price = 0;
    for (let i = 0; i < basket.length; i++) {
      price += this.getPrice(basket[i]._id) * basket[i].count;
    }
    return price;
  }
  getTotalCount() {
    const { basket } = this.props;
    let count = 0;
    for (let i = 0; i < basket.length; i++) {
      count += basket[i].count;
    }
    return count;
  }
}
export default ShoppingBasket;
