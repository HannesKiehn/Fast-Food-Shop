import React, { Component } from "react";

class OrderPage extends Component {
  state = { confirmOrder: false };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <button
            className="btn btn-danger"
            onClick={this.props.onReturnToBasket}
          >
            Back to shopping basket
          </button>
          <div className="row">
            <div className="col">{this.renderForm()}</div>
            <div className="col ms-5">{this.renderOrderDetails()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderForm() {
    return (
      <div className="w-100">
        <form className="form-inline">
          <div className="row">
            <div className="col">
              <label htmlFor="firstNameInput">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstNameInput"
              ></input>
            </div>
            <div className="col">
              <label htmlFor="lastNameInput">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
              ></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="streetInput">Address</label>
            <input
              type="text"
              className="form-control"
              id="streetInput"
              placeholder="Street name, house number"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="postcodeInput">Postcode</label>
            <input
              type="text"
              className="form-control"
              id="postcodeInput"
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="phoneInput">Phone</label>
            <input type="text" className="form-control" id="phoneInput"></input>
          </div>
        </form>
      </div>
    );
  }
  renderRow(item) {
    return (
      <tr key={item._id}>
        <th className="col">
          {this.getName(item._id)} (x {item.count})
        </th>
        <th className="col">
          {this.formatPriceWithCurrency(this.getPrice(item._id) * item.count)}
        </th>
      </tr>
    );
  }
  renderOrderDetails() {
    return (
      <React.Fragment>
        <table className="table w-75">
          <thead>
            <tr>
              <th className="col">Product</th>
              <th className="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>{this.props.basket.map((item) => this.renderRow(item))}</tbody>
          <tfoot>
            <tr>
              <th className="col">Total</th>
              <th className="col">
                {this.formatPriceWithCurrency(this.getTotalPrice())}
              </th>
            </tr>
          </tfoot>
        </table>
        <div className="mx-auto w-50">
          <button onClick={this.handleOrder} className="btn btn-primary">
            Confirm Order (End of Demo)
          </button>
        </div>
        <span className={this.state.confirmOrder ? "visible" : "invisible"}>
          Thank you for testing this demo!
        </span>
      </React.Fragment>
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
  handleOrder = () => {
    this.setState({ confirmOrder: true });
  };
}

export default OrderPage;
