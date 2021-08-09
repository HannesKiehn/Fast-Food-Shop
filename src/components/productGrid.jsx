import React, { Component } from "react";
import _ from "lodash";
import MenuItem from "./menuItem";
class ProductGrid extends Component {
  state = {};
  render() {
    let menu = this.props.menu;
    return <div className="mt-3">{this.renderMenuGrid(menu)}</div>;
  }

  renderMenuGrid(menu) {
    const menuRows = this.getMenuRows(menu);
    return (
      <div className="container">
        {menuRows.map((row) => (
          <div className="row" key={row._id}>
            {this.renderMenuRow(row.content)}{" "}
          </div>
        ))}
      </div>
    );
  }

  renderMenuRow(rowItems) {
    const emptyColumns = rowItems.length - this.props.menuItemsPerRow;
    return (
      <React.Fragment>
        {rowItems.map((item) => (
          <div className="col" key={item._id}>
            {
              <MenuItem
                item={item}
                count={this.getCount(item._id)}
                onAddToBasket={this.props.onAddToBasket}
                onRemoveFromBasket={this.props.onRemoveFromBasket}
              />
            }
          </div>
        ))}
        {_.range(emptyColumns).map((num) => (
          <div className="col" key={num}></div>
        ))}
      </React.Fragment>
    );
  }

  getMenuRows(menu) {
    const { menuItemsPerRow, rowsPerPage, page } = this.props;
    let numberOfRows = Math.ceil(menu.length / menuItemsPerRow);
    if (numberOfRows > rowsPerPage) {
      numberOfRows = rowsPerPage;
    }
    const startIndex = (page - 1) * rowsPerPage;
    const stopIndex = page * rowsPerPage;
    const rowNumbers = _.range(startIndex, stopIndex);
    return rowNumbers.map((rowNumber) => {
      return {
        _id: rowNumber,
        content: menu.slice(
          rowNumber * menuItemsPerRow,
          (rowNumber + 1) * menuItemsPerRow
        ),
      };
    });
  }

  getCount(id) {
    const { shoppingBasket } = this.props;
    let itm = shoppingBasket.filter((item) => item._id === id);
    if (itm.length === 0) {
      return 0;
    }
    return itm[0].count;
  }
}

export default ProductGrid;
