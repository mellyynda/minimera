import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ItemPage from './ItemPage';
import b from '../../assets/cards/Borrhammare.jpg';
import bs from '../../assets/cards/BorrhammareS.jpg';
import h from '../../assets/cards/Hund.jpg';
import hs from '../../assets/cards/HundS.jpg';
import l from '../../assets/cards/Lövblåsare.jpg';
import ls from '../../assets/cards/LövblåsareS.jpg';
import bi from '../../assets/cards/Bil.jpg';
import bis from '../../assets/cards/BilS.jpg';
import cy from '../../assets/cards/Cykel.jpg';
import cys from '../../assets/cards/CykelS.jpg';
import at from '../../assets/cards/Atefallshus.jpg';
import ats from '../../assets/cards/AtefallshusS.jpg';
import az from '../../assets/cards/abcd.jpg';
import azs from '../../assets/cards/abcdS.jpg';
import mt from '../../assets/cards/motorsåg.jpg';
import mts from '../../assets/cards/motorsågS.jpg';
import gt from '../../assets/cards/Gitarr.jpg';
import gts from '../../assets/cards/GitarrS.jpg';
import ha from '../../assets/cards/häst.jpg';
import has from '../../assets/cards/hästS.jpg';
import jk from '../../assets/cards/jkkkkkkk.jpg';
import jks from '../../assets/cards/jkkkkkkkS.jpg';
import hw from '../../assets/cards/halloween.jpg';
import hws from '../../assets/cards/halloweenS.jpg';
import co from '../../assets/cards/Coin.jpg';
import cos from '../../assets/cards/CoinS.jpg';
import aa from '../../assets/cards/a.jpg';
import aas from '../../assets/cards/aS.jpg';
import bb from '../../assets/cards/zebra.jpg';
import bbs from '../../assets/cards/zebraS.jpg';
import lg from '../../assets/cards/rake.jpg';
import lgs from '../../assets/cards/rakeS.jpg';
import fb from '../../assets/cards/ball.jpg';
import fbs from '../../assets/cards/ballS.jpg';
import ugh from '../../assets/cards/ugh.jpg';
import ughs from '../../assets/cards/ughS.jpg';
import rb from '../../assets/cards/rb.jpg';
import rbs from '../../assets/cards/rbS.jpg';

const images = {
  'Borrhammare': [b, bs],
  'Hund': [h, hs],
  'Lövblåsare': [l, ls],
  'Bil': [bi, bis],
  'Cykel': [cy, cys],
  'Atefallshus': [at, ats],
  'abcd': [az, azs],
  'motorsåg': [mt, mts],
  'Gitarr': [gt, gts],
  'häst': [ha, has],
  'jkkkkkkk': [jk, jks],
  'Hallowen kostym': [hw, hws],
  'Guldpeng gratis': [co, cos],
  'a': [aa, aas],
  'b': [bb, bbs],
  'Löv och grässamlare': [lg, lgs],
  'Fitness boll': [fb, fbs],
  'Dresdsgdvsd': [ugh, ughs],
  'Robot dammsugare': [rb, rbs],
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editTitle: this.props.item.title,
      editDescription: this.props.item.description,
      editContact: this.props.item.contact,
      error: false,
      viewItem: false,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title,
      editDescription: this.props.item.description,
      editContact: this.props.item.contact,
      error: false,
    }));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditDescription = event => {
    this.setState({ editDescription: event.target.value });
  };

  onChangeEditContact = event => {
    this.setState({ editContact: event.target.value });
  };

  onSaveEdit = () => {
    if (!this.state.editTitle || !this.state.editDescription || !this.state.editContact) {
      this.setState({ error: true });
      return;
    };
    this.props.onEditItem(this.props.item, this.state.editTitle, this.state.editDescription, this.state.editContact);
    this.setState({ editMode: false });
  };

  handleClose = () => {
    if (window.confirm('Do you want to save your changes?')) {
      this.onSaveEdit();
    } else this.onToggleEditMode();
  }

  toggleItemView = () => {
    this.setState(prevState => ({ viewItem: !prevState.viewItem }));
  }

  render() {
    const { authUser, item, onRemoveItem } = this.props;
    const { editMode, editTitle, editDescription, editContact, error, viewItem } = this.state;

    return (
      <Box sx={{ flex: { xs: '0 1 100%', sm: '0 1 49%', md: '0 1 32%' }, marginBottom: '13px' }}>
        {editMode ? (

          <Dialog onClose={this.handleClose} open={editMode}>
            <DialogContent>
              <Box
                sx={{
                  '& .MuiTextField-root': { width: '100%' },
                }}>
                <TextField
                  error={error}
                  label="Vad vill du låna ut?"
                  variant="outlined"
                  helperText={error ? 'Du måste kompletera alla fälten' : "Skriv gärna vad den är och vilken märke/model.Ex: Borrhammare (Bosch UNEO MAXX)."}
                  type="title"
                  value={editTitle}
                  onChange={this.onChangeEditTitle}
                />
                <TextField
                  error={error}
                  helperText={error ? 'Du måste kompletera alla fälten' : ''}
                  label="Detaljer"
                  variant="outlined"
                  multiline
                  rows={10}
                  type="description"
                  value={editDescription}
                  onChange={this.onChangeEditDescription}
                  style={{ marginTop: '15px' }}
                />

                <TextField
                  error={error}
                  label="Kontakt detaljer"
                  variant="outlined"
                  helperText={error ? 'Du måste kompletera alla fälten' : "Ex: telefonnummer eller mejl adress"}
                  type="contact"
                  value={editContact}
                  onChange={this.onChangeEditContact}
                  style={{ marginTop: '15px' }}
                />
              </Box>
            </DialogContent>

            {authUser.uid === item.userId && (
              <DialogActions>
                <Button onClick={this.onSaveEdit}>Save</Button >
                <Button onClick={this.onToggleEditMode}>Reset</Button >
              </DialogActions>
            )}
          </Dialog>
        ) : (
          <Box>
            <Card variant="outlined" sx={{ height: 280, width: '100%', overflow: 'hidden', position: 'relative', background: '#E7F3F3', boxShadow: '2px 4px 4px rgb(0 0 0 / 0.15)' }} >
              {images[item.title] &&
                <CardMedia
                  component="img"
                  height="165"
                  image={images[item.title][1]}
                  alt={item.title}
                />}
              <CardContent>
                <Typography variant="subtitle1" component="div" style={{ color: 'var(--text-color)', fontWeight: '500' }}>{item.title}</Typography>
                <Typography variant="body2" style={{ color: 'var(--text-color)' }}>{item.description}</Typography>
              </CardContent>
              <CardActions sx={{ position: 'absolute', bottom: '0', left: '0', background: '#E7F3F3', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={this.toggleItemView}
                >
                  Läs mer
                </Button>
                {authUser.uid === item.userId && (
                  <span>
                    <EditOutlined fontSize="small" onClick={this.onToggleEditMode} style={{ marginRight: '6px', color: 'rgba(0, 0, 0, 0.6)' }} />
                    <DeleteOutlined fontSize="small" onClick={() => onRemoveItem(item.uid)} style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                  </span>
                )}
              </CardActions>
            </Card>
          </Box>
        )}

        {viewItem ? <ItemPage viewItem={viewItem} toggleItemView={this.toggleItemView} item={item} image={images[item.title][0]} /> : null}
      </Box>
    );
  }
}

export default Item;