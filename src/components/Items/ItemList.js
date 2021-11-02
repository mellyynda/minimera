import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import Item from './Item.js';

const SearchContainer = styled.div`
// position: absolute;
// top: -76px;
// left: 120px;
// background: #efefef;
display: flex;
align-items: flex-end;
justify-content: center;
flex-basis: 100%;
margin-bottom: 15px; 
`;

const ItemList = ({ authUser, items, onRemoveItem, onEditItem, own }) => {
  const [itemsData, setItemsData] = useState(items);
  const [filteredItems, setFilteredItems] = useState(itemsData);

  const handleChange = e => {
    const val = e.target.value.toLowerCase();
    const results = items.filter(item => item.title.toLowerCase().includes(val) || item.description.toLowerCase().includes(val));
    setFilteredItems(results);
  }

  return (
    <Container
      sx={{ maxWidth: { md: '850px' }, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', position: 'relative' }}>
      <SearchContainer>
        <SearchIcon color='var(--text-color)' />
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          sx={{ color: 'inherit', display: 'block', width: '100%', '&>*': { width: '100%' } }}
          onChange={e => handleChange(e)}
        />
      </SearchContainer>

      {filteredItems.length > 0 && filteredItems.map(item => {
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