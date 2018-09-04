/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';


export default class ShoppingListItem extends Component {
    constructor(props) {
      super(props);
    }

    handleRemove(val) {
      const { handleRemove } = this.props;
      handleRemove(val);
    }
    handleRemoveBasket(val) {
        const { handleRemoveBasket } = this.props;
        handleRemoveBasket(val);
    }
    handleQuantity(modle, element) {
      const { handleQuantity } = this.props;
      handleQuantity(modle, element);
    }

    handleMovebasket(item) {
      const { handleMovebasket} = this.props;
      handleMovebasket(item);
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col s6">
              {this.props.items.map((v, i) => (
                <div className="chip" key={i} >
                  <span onClick={this.handleMovebasket.bind(this, v)}>{v}</span>
                  <i className="close material-icons" onClick={this.handleRemove.bind(this, v)}>close</i>
                </div>
              ))}
            </div>
            <div className="col s6">
              <div className="collection">
                {this.props.basket.map((v, i) => (
                  <a href="#!" className="collection-item" key={i}>
                    <i className="basket__remove close material-icons" onClick={this.handleRemoveBasket.bind(this, v)}>close</i>
                    {v.el}
                    <span className="badge">
                      <span onClick={this.handleQuantity.bind(this, '+', v.el)}>+</span>
                      <span className="quantity">{v.quantity}</span>
                      <span onClick={this.handleQuantity.bind(this, '-', v.el)}>-</span>
                    </span>
                    <em className="name">{v.name}</em>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
