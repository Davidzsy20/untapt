import React, { Component } from 'react';
import Alert from './helper';
import './App.scss';
import ShoppingListItem from './ShoppintListItem';

const App = () => (
  <div className="App">
    <ShoppingList />
  </div>
);


// -----------------------------Here renders the shoppint list----------//

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: ['Spinach', 'A Veggie', 'Egg', 'Bacon', 'French Toast', 'Progy', 'Seabass'], basket: [{ name: 'Jeff', quantity: 1, el: 'Banana' }, { name: 'Jack', quantity: 1, el: 'Blue Cheese' }, { name: 'All', quantity: 1, el: 'Cereal' }, { name: 'Jack', quantity: 1, el: 'Pepper Jack' }], currUser: 'All' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.removeBasket = this.removeBasket.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeQuant = this.changeQuant.bind(this);
    this.moveBasket = this.moveBasket.bind(this);
  }

  // ---this function handles userinput and add name, quantity and item to state---//

  handleSubmit(e) {
    e.preventDefault();
    const item = e.target[0].value;
    const { items } = this.state;
    if (!items.includes(item)) {
      const { currUser } = this.state;
      const entry = { name: currUser, quantity: 1, el: item };
      this.setState(prevState => ({
        items: [...prevState.items, item],
        basket: [...prevState.basket, entry],
      }));
    } else {
      Alert('item already exists, add another one');
    }
  }

  //  --------------Clear all items from basket-----------------//

  handleDelete() {
    this.setState({ basket: [] });
  }
  //  ------------Change the current user in state-------------//

  handleChangeUser(user) {
    this.setState({ currUser: user });
  }
  //  ----------remove an item Tag------------------------------//

  remove(item) {
    this.setState(prevState => ({
      items: prevState.items.filter(c => c !== item),
    }));
  }

  //  ------------Remove item from Basket-------------------------//
  removeBasket(item) {
    const { basket } = this.state;
    const newBasket = basket.filter(c => c.el !== item.el);
    this.setState({ basket: newBasket });
  }
  //  -------move an item from item list to basket----------------//

  moveBasket(item) {
    const { basket } = this.state;
    const { currUser } = this.state;
    let inBag = false;
    for (let i = 0; i < basket.length; i += 1) {
      if (item === basket[i].el) {
        basket[i].quantity += 1;
        inBag = true;
      }
    }
    if (inBag === false) {
      basket.push({ name: currUser, quantity: 1, el: item });
    }
    this.setState({ basket });
  }
  //  ------------Change Quantities in Basket----------------------//

  changeQuant(model, element) {
    const { basket } = this.state;
    if (model === '+') {
      basket.map((val) => {
        const entry = val;
        if (entry.el === element) {
          entry.quantity += 1;
        }
        return entry;
      });
    } else {
      basket.map((val) => {
        const entry = val;
        if (entry.el === element) {
          entry.quantity -= 1;
        }
        return entry;
      });
    }
    this.setState({
      basket,
    });
  }

  render() {
    const { items, basket, currUser } = this.state;
    return (
      <div className="container">
        <div className="collection">
          <a href="#!" className={currUser === 'All' ? 'collection-item active' : 'collection-item'} onClick={() => this.handleChangeUser('All')}>All</a>
          <a href="#!" className={currUser === 'Jack' ? 'collection-item active' : 'collection-item'} onClick={() => this.handleChangeUser('Jack')}>Jack</a>
          <a href="#!" className={currUser === 'Mike' ? 'collection-item active' : 'collection-item'} onClick={() => this.handleChangeUser('Mike')}>Mike</a>
          <a href="#!" className={currUser === 'Sam' ? 'collection-item active' : 'collection-item'} onClick={() => this.handleChangeUser('Sam')}>Sam</a>
        </div>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s10">
              <input placeholder="Item" name="item" type="text" className="validate" required />
            </div>
            <div className="col s2 m1">
              <button className="btn waves-effect waves-light" type="submit" name="action">
Submit
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col s12">
            <button type="button" className="btn waves-effect red" onClick={this.handleDelete}>
Clear
            </button>
          </div>
        </div>
        <ShoppingListItem
          items={items}
          basket={basket}
          handleRemove={this.remove}
          handleRemoveBasket={this.removeBasket}
          handleQuantity={this.changeQuant}
          handleMovebasket={this.moveBasket}
        />
      </div>
    );
  }
}

export default App;
