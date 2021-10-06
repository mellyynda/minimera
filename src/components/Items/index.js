import React, { Component } from 'react';
import {
  AuthUserContext,
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';

class ItemsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      loading: false,
      items: [],
    };
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onCreateItem = (event, authUser) => {

    this.props.firebase.items().push({
      title: this.state.title,
      description: this.state.description,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ title: '', description: '' });

    event.preventDefault();
  };

  onRemoveItem = uid => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.props.firebase.item(uid).remove();
    }
  };

  onEditItem = (item, title, description) => {
    const { uid, ...itemSnapshot } = item;

    this.props.firebase.item(item.uid).set({
      ...itemSnapshot,
      title,
      description,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  componentDidMount() {
    // console.log(jobs);
    this.setState({ loading: true });

    this.props.firebase.items().on('value', snapshot => {

      const itemObject = snapshot.val();

      if (itemObject) {

        const itemList = Object.keys(itemObject).map(key => ({
          ...itemObject[key],
          uid: key,
        }));

        this.setState({
          items: itemList,
          loading: false,
        });
      } else {
        this.setState({ items: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  render() {
    const { title, description, items, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {items ? (
              <ItemList
                authUser={authUser}
                items={items}
                onEditItem={this.onEditItem}
                onRemoveItem={this.onRemoveItem}
              />
            ) : (
              <div>There are no items ...</div>
            )}

            <form onSubmit={event => this.onCreateItem(event, authUser)}>
              <input
                type="title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <input
                type="description"
                value={description}
                onChange={this.onChangeDescription}
              />
              <button type="submit">Send</button>
            </form>

          </div>
        )}
      </AuthUserContext.Consumer>
    );

  }
}

const ItemList = ({ authUser, items, onRemoveItem, onEditItem }) => (
  <ul>
    {items.map(item => (
      <Item
        authUser={authUser}
        key={item.uid}
        item={item}
        onRemoveItem={onRemoveItem}
        onEditItem={onEditItem}
      />
    ))}
  </ul>
);

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editTitle: this.props.item.title,
      editDescription: this.props.item.description,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title,
      editDescription: this.props.item.description,
    }));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditDescription = event => {
    this.setState({ editDescription: event.target.value });
  };

  onSaveEdit = () => {
    this.props.onEditItem(this.props.item, this.state.editTitle, this.state.editDescription);
    this.setState({ editMode: false });
  };

  render() {
    const { authUser, item, onRemoveItem } = this.props;
    const { editMode, editTitle, editDescription } = this.state;

    return (
      <li>
        {editMode ? (
          <div>
            <input
              type="title"
              value={editTitle}
              onChange={this.onChangeEditTitle}
            />
            <input
              type="description"
              value={editDescription}
              onChange={this.onChangeEditDescription}
            />
          </div>
        ) : (
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {item.editedAt && <span>(Edited)</span>}
          </div>
        )}

        {authUser.uid === item.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEdit}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>

            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveItem(item.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}

      </li>
    );
  }
}

const Items = withFirebase(ItemsBase);

export default Items;