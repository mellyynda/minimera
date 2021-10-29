import styled from 'styled-components';

const MainWrapper = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
padding-bottom:${props => props.authUser ? '70px' : '0'};
@media (min-width: 768px){
  padding-top:${props => props.authUser ? '70px' : 'auto'};
}
`

export default MainWrapper