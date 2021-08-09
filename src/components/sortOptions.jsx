import React, { Component } from "react";

class SortOptions extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-2">{this.renderSortSelect()}</div>
          <div className="col-2">{this.renderProductNumberSelect()}</div>
          <div className="col">{this.renderVeganCheck()}</div>
        </div>
      </div>
    );
  }
  renderVeganCheck() {
    return (
      <div className="form-check mt-4">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          onChange={this.props.onVeganSort}
        />
        <label className="form-check-label">Vegan only</label>
      </div>
    );
  }
  renderSortSelect() {
    return (
      <React.Fragment>
        Sort by:
        <select
          className="form-select"
          aria-label="Sort by"
          onChange={this.props.onSort}
        >
          <option value="default">Default</option>
          <option value="AZ">Alphabetical A -&gt; Z</option>
          <option value="ZA">Alphabetical Z -&gt; A</option>
          <option value="lowHigh">Price Low -&gt; High</option>
          <option value="highLow">Price High -&gt; Low</option>
        </select>
      </React.Fragment>
    );
  }

  renderProductNumberSelect() {
    return (
      <React.Fragment>
        Products per page:
        <select
          className="form-select"
          aria-label="Products per page"
          onChange={this.props.onProductsPerPageChange}
        >
          <option value="9PerPage">9</option>
          <option value="12PerPage">12</option>
          <option value="15PerPage">15</option>
          <option value="allPerPage">All</option>
        </select>
      </React.Fragment>
    );
  }
}

export default SortOptions;
