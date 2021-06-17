import React, { Component } from "react";
import ItemDataService from "../services/Item.Service";
import { Link } from "react-router-dom";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then((response) => {
        this.setState({
          items: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1,
    });
  }

  setActiveItem(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index,
    });
  }

  removeAllItems() {
    ItemDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    ItemDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          items: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, items, currentItem, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Items List</h4>
          <ul className="list-group">
            {items &&
              items.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  {item.title}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllItems}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Item</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentItem.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentItem.description}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentItem.address}
              </div>
              <div>
                <label>
                  <strong>Condition:</strong>
                </label>{" "}
                {currentItem.condition}
              </div>
              <div>
                <label>
                  <strong>Url:</strong>
                </label>{" "}
                {currentItem.url}
              </div>
              <div>
                <label>
                  <strong>Dimensions:</strong>
                </label>{" "}
                {currentItem.dimensions}
              </div>
              <div>
                <label>
                  <strong>Weight:</strong>
                </label>{" "}
                {currentItem.weight}
              </div>
              <div>
                <label>
                  <strong>Images:</strong>
                </label>{" "}
                {currentItem.images}
              </div>
              <Link to={"/items/" + currentItem.itemId}>
                <button className="edit btn btn-outline-primary">
                  Edit
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Item...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
