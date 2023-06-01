import styled from 'styled-components'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Add from '@mui/icons-material/AddCircleOutlined';
import Remove from '@mui/icons-material/RemoveCircleOutlined';
import { mobile } from '../constants/responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProduct, removeProduct, clearCart } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const KEY = process.env.REACT_APP_KEY;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const RoundButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid teal;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {


  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };
console.log(cart);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        dispatch(clearCart());
        navigate('/success');
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.totalPrice, dispatch, navigate]);


  const clearHandle = () => {
    dispatch(clearCart());
  };


  const handleQuantity = (type, product) => {
    if (type === 'dec') {
      product.quantity > 1 &&
        dispatch(
          updateProduct({
            ...product,
            quantity: product.quantity - 1,
          })
        );
    }
    if (type === 'inc') {
      dispatch(
        updateProduct({
          ...product,
          quantity: product.quantity + 1,
        })
      );
    }
  };

  const handleDelete = (id) => {
    const product = cart.products.find((item) => item._id === id);
    dispatch(removeProduct(product));
  };

const cartTotal = cart.products.reduce((amount, item) => item.price * item.quantity + amount, 0);


  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton onClick={clearHandle}>CLEAR CART</TopButton>
                <Link to="/">
                <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
            </Top>
            <Bottom>
                <Info>
                    { cart.products.map(product=>(<Product key={cart.product}>
                        <ProductDetail>
                            <Image src={product.img} />
                            <Details>
                                <ProductName><b>Product:</b> {product.title} </ProductName>
                                <ProductId><b>ID:</b> {product._id} </ProductId>
                               <ProductColor color={product.color}/>
                                <ProductSize><b>Size:</b> {product.size} </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <RoundButton onClick={() => handleDelete(product._id)}>Remove</RoundButton>
                            <ProductAmountContainer>
                                <Add onClick={() => handleQuantity("inc",product)}/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Remove onClick={() => handleQuantity("dec",product)} />
                            </ProductAmountContainer>
                            <ProductPrice>{product.price * product.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
                    ))}
                    <Hr />
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>{cartTotal}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>{cartTotal}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
                        name='React Ecommerce'
                        image='https://avatars.githubusercontent.com/u/8186664?v=3'
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cartTotal}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey={KEY}
                        >
                        <Button>CHECKOUT NOW</Button>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart
