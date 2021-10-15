import { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editTitle: this.props.item.title,
      editDescription: this.props.item.description,
      error: false,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.item.title,
      editDescription: this.props.item.description,
      error: false,
    }));
  };

  onChangeEditTitle = event => {
    this.setState({ editTitle: event.target.value });
  };

  onChangeEditDescription = event => {
    this.setState({ editDescription: event.target.value });
  };

  onSaveEdit = () => {
    if (!this.state.editTitle || !this.state.editDescription) {
      this.setState({ error: true });
      return;
    };
    this.props.onEditItem(this.props.item, this.state.editTitle, this.state.editDescription);
    this.setState({ editMode: false });
  };

  handleClose = () => {
    if (window.confirm('Do you want to save yout changes?')) {
      this.onSaveEdit();
    } else this.onToggleEditMode();
  }

  render() {
    const { authUser, item, onRemoveItem } = this.props;
    const { editMode, editTitle, editDescription, error } = this.state;

    return (
      <Box sx={{ width: '48%', marginBottom: '13px' }}>
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
                  maxRows={40}
                  type="description"
                  value={editDescription}
                  onChange={this.onChangeEditDescription}
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
            <Card variant="outlined" sx={{ height: 180, width: '100%', overflow: 'hidden', position: 'relative', background: '#E7F3F3' }} >
              <CardContent>
                <Typography variant="h5" component="div">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardActions sx={{ position: 'absolute', bottom: '0', left: '0', background: '#E7F3F3', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" >Läs mer</Button>
                {authUser.uid === item.userId && (
                  <span>
                    <EditOutlined fontSize="small" onClick={this.onToggleEditMode} style={{ marginRight: '6px' }} />
                    <DeleteOutlined fontSize="small" onClick={() => onRemoveItem(item.uid)} />
                  </span>
                )}
              </CardActions>
            </Card>
          </Box>
        )}

      </Box>
    );
  }
}

export default Item;