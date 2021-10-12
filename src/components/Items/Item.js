import { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'

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
      <Box sx={{ width: '48%', marginBottom: '13px' }}>
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
          <Box>
            <Card variant="outlined" sx={{ height: 180, width: '100%', overflow: 'hidden', position: 'relative', background: '#E7F3F3' }} >
              <CardContent>
                <Typography variant="h5" component="div">{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardActions sx={{ position: 'absolute', bottom: '0', left: '0', background: '#E7F3F3', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small">Läs mer</Button>
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

        {authUser.uid === item.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEdit}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : null}


          </span>
        )}

      </Box>
    );
  }
}

export default Item;