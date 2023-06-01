import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../constants/responsive";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { logoutUser } from "../redux/apiCalls";


const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
    `;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
    `;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    `;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
    `;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    `;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
    `;

const Center = styled.div`
    flex: 1;
    text-align: center;
    `;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
    `;    

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", flex: 2 })}
    `;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
    `;

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const logOut = () => {
    logoutUser(dispatch)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color:'gray', fontSize:16 }}/>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>EShop</Logo>
        </Center>
        <Right>
          <Link to={`/`}>
          <MenuItem>Home</MenuItem>
          </Link>
         { !user ? <Link to={`/register`}>
          <MenuItem>Register</MenuItem>
          </Link>: null }
          { !user ? <Link to={`/login`}> 
          <MenuItem>Login</MenuItem>
          </Link>: null }
          { user ? <Button onClick={() => logOut()}> 
          <MenuItem>Logout</MenuItem>
          </Button>: null }
          <MenuItem>
          <Link to={`/cart`}>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
