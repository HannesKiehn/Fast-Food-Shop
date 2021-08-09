import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
class Pagination extends Component {
  state = {};

  render() {
    const numPages = Math.ceil(this.props.itemsCount / this.props.pageSize);
    if (numPages < 2) {
      return null;
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ cursor: "pointer" }}>
          {this.renderPreviousButton()} {this.renderPageNumbers()}{" "}
          {this.renderNextButton()}
        </ul>
      </nav>
    );
  }
  renderPageNumbers() {
    const numPages = Math.ceil(this.props.itemsCount / this.props.pageSize);
    const { currentPage } = this.props;
    const pageNumbers = _.range(1, numPages + 1);
    return pageNumbers.map((num) => (
      <li
        className={num === currentPage ? "page-item active" : "page-item"}
        key={num}
      >
        <span
          className="page-link"
          href="#"
          onClick={() => this.props.onPageChange(num)}
        >
          {num}
        </span>
      </li>
    ));
  }
  renderPreviousButton() {
    const { currentPage } = this.props;
    const disabled = currentPage === 1;
    const cursor = disabled ? "default" : "pointer";

    return (
      <li
        className={disabled ? "page-item disabled" : "page-item"}
        style={{ cursor: cursor }}
      >
        <span
          className="page-link"
          onClick={() => this.props.onPageChange(currentPage - 1)}
          style={{ userSelect: "none" }}
        >
          Previous
        </span>
      </li>
    );
  }
  renderNextButton() {
    const { currentPage } = this.props;
    const numPages = Math.ceil(this.props.itemsCount / this.props.pageSize);
    const disabled = currentPage === numPages;
    const cursor = disabled ? "default" : "pointer";
    return (
      <li
        className={disabled ? "page-item disabled" : "page-item"}
        style={{ cursor: cursor }}
      >
        <span
          className="page-link"
          onClick={() => this.props.onPageChange(currentPage + 1)}
          style={{ userSelect: "none" }}
        >
          Next
        </span>
      </li>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
