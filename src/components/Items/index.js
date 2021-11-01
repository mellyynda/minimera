import React, { Component } from 'react';

import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
      contact: '',
      loading: false,
      items: [],
      errorT: false,
      errorD: false,
      errorC: false,
    };
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
    this.setState({ errorT: false });
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
    this.setState({ errorD: false });
  };

  onChangeContact = event => {
    this.setState({ contact: event.target.value });
    this.setState({ errorC: false });
  };

  onCreateItem = (event, authUser) => {

    this.props.firebase.items().push({
      title: this.state.title,
      description: this.state.description,
      contact: this.state.contact,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ title: '', description: '', contact: '', errorT: false, errorD: false, errorC: false });

    event.preventDefault();
  };

  onRemoveItem = uid => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      this.props.firebase.item(uid).remove();
    }
  };

  onEditItem = (item, title, description, contact) => {
    const { uid, ...itemSnapshot } = item;

    this.props.firebase.item(item.uid).set({
      ...itemSnapshot,
      title,
      description,
      contact,
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
    const { title, description, contact, items, loading, errorT, errorD, errorC } = this.state;
    const { openForm, setOpenForm, own } = this.props;

    const handleClose = () => {
      setOpenForm(false);
      this.setState({ errorT: false, errorD: false, errorC: false });
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
                own={own}
              />
            ) : (
              <div>There are no items ...</div>
            )}

            <Dialog onClose={handleClose} open={openForm}>
              <MainHeading>Ny anons</MainHeading>
              <DialogContent position='relative'>
                <IconButton
                  edge={false}
                  aria-label="close"
                  onClick={handleClose}
                  sx={{ position: 'absolute', top: '5px', right: '5px' }}
                >
                  <CloseIcon />
                </IconButton>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={event => {
                    event.preventDefault();
                    if (!title) {
                      this.setState({ errorT: true });
                      return;
                    };
                    if (!description) {
                      this.setState({ errorD: true });
                      return;
                    };
                    if (!contact) {
                      this.setState({ errorC: true });
                      return;
                    };
                    handleClose();
                    this.onCreateItem(event, authUser);
                  }}>
                  <TextField
                    error={errorT}
                    label="Vad vill du låna ut?"
                    variant="outlined"
                    helperText={errorT ? 'Du måste kompletera alla fälten' : "Ge en kort klart namn"}
                    type="title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                  <TextField
                    error={errorD}
                    helperText={errorD ? 'Du måste kompletera alla fälten' : 'Skriv gärna vilken märke/model.Ex: Borrhammare (Bosch UNEO MAXX).'}
                    label="Detaljer"
                    variant="outlined"
                    multiline
                    rows={10}
                    type="description"
                    value={description}
                    onChange={this.onChangeDescription}
                    style={{ marginTop: '15px' }}
                  />
                  <TextField
                    error={errorC}
                    helperText={errorC ? 'Du måste kompletera alla fälten' : 'Hur vill du vara kontaktat? Ex: telefonnummer eller mejl adress'}
                    label="Kontakt detaljer"
                    variant="outlined"
                    type="contact"
                    value={contact}
                    onChange={this.onChangeContact}
                    style={{ marginTop: '15px' }}
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