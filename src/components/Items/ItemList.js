
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Item from './Item.js';

const CardContainer = styled.div`
display: flex;
`;

const ItemList = ({ authUser, items, onRemoveItem, onEditItem }) => {

  const height = window.innerHeight - 180;

  return (
    <Container maxWidth="sm"
      sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxHeight: height + 'px', overflow: 'auto' }}>
      {items.map(item => (
        <Item
          authUser={authUser}
          key={item.uid}
          item={item}
          onRemoveItem={onRemoveItem}
          onEditItem={onEditItem}
        />
      ))}
    </Container>
  )
};

export default ItemList;