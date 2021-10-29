
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Item from './Item.js';

const CardContainer = styled.div`
display: flex;
`;

const ItemList = ({ authUser, items, onRemoveItem, onEditItem, own }) => {

  const height = window.innerHeight - 180;

  return (
    <Container
      sx={{ maxWidth: { md: '850px' }, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {items.map(item => {
        if (own && authUser.uid === item.userId) {
          return (<Item
            authUser={authUser}
            key={item.uid}
            item={item}
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
          />)
        } else if (!own && authUser.uid != item.userId) {
          return (
            <Item
              authUser={authUser}
              key={item.uid}
              item={item}
              onRemoveItem={onRemoveItem}
              onEditItem={onEditItem}
            />
          )
        }
      })}
    </Container>
  )
};

export default ItemList;