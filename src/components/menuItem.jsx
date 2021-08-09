import React, { Component } from "react";

class MenuItem extends Component {
  state = {};
  render() {
    const { name, price, _id } = this.props.item;
    const { count } = this.props;
    return (
      <div className="w-100">
        <div>{name}</div>
        <div>Price: {price} €</div>

        {count === 0 && (
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => this.props.onAddToBasket(_id)}
          >
            Add to basket <i className="fa fa-cart-plus"></i>
          </button>
        )}
        {count !== 0 && (
          <React.Fragment>
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => this.props.onRemoveFromBasket(_id)}
            >
              -
            </button>
            {count}
            <button
              type="button"
              className="btn btn-success ms-2"
              onClick={() => this.props.onAddToBasket(_id)}
            >
              +
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MenuItem;
