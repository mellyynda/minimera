import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
color: inherit;
text-decoration: none;
cursor: pointer;
&:visited{
  color: inherit;
}
`

export default StyledLink