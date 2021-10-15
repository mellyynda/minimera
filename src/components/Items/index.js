import React, { Component } from 'react';

import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

import { MainButton } from '../Styled'

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList.js';
import { MainHeading } from '../Styled';

class ItemsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      loading: false,
      items: [],
      error: false,
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

    this.setState({ title: '', description: '', error: false });

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
    const { title, description, items, loading, error } = this.state;
    const { openForm, setOpenForm } = this.props;

    const handleClose = () => {
      setOpenForm(false);
      this.setState({ error: false });
    };

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

            <Dialog onClose={handleClose} open={openForm}>
              <MainHeading>Ny anons</MainHeading>
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={event => {
                    event.preventDefault();
                    if (!title || !description) {
                      this.setState({ error: true });
                      return;
                    };
                    handleClose();
                    this.onCreateItem(event, authUser);
                  }}>
                  <TextField
                    error={error}
                    label="Vad vill du låna ut?"
                    variant="outlined"
                    helperText={error ? 'Du måste kompletera alla fälten' : "Skriv gärna vad den är och vilken märke/model.Ex: Borrhammare (Bosch UNEO MAXX)."}
                    type="title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                  <TextField
                    error={error}
                    helperText={error ? 'Du måste kompletera alla fälten' : ''}
                    label="Detaljer"
                    variant="outlined"
                    multiline
                    rows={10}
                    maxRows={40}
                    type="description"
                    value={description}
                    onChange={this.onChangeDescription}
                  />
                  <MainButton type="submit" style={{ marginTop: "15px" }}>Send</MainButton>
                </Box>
              </DialogContent>
            </Dialog>

          </div>
        )}
      </AuthUserContext.Consumer>
    );

  }
}

const Items = withFirebase(ItemsBase);

export default Items;