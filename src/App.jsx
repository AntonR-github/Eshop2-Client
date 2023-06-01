import Home from "./pages/Home"
import ProductsList from "./pages/ProductsList"
import Product from "./pages/Product"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Success from './pages/Success';
import { useSelector } from "react-redux"


const App = () => {

  const user = useSelector(state => state.user?.currentUser)
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products/:category' element={<ProductsList />} />
        <Route exact path='/product/:id' element={<Product />} />
        <Route exact path='/register' element={user ? <Home /> : <Register />} />
        <Route exact path='/login' element={user ? <Home /> : <Login />}/>
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/success' element={<Success />} />
        </Routes>
      </Router>
  )
}

export default App

