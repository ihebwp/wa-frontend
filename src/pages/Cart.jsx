import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decreaseQty,
  deleteProduct,
  clearCart // ✅ Ajout de l'importation de clearCart
} from '../app/features/cart/cartSlice'
import axios from 'axios'
import { Box, Button, Grid, Modal, Paper, TextField } from '@mui/material'
import { DarkModeContext } from '../contexte'
import Appbar from './../components/Appbar'
import { experimentalStyled as styled } from '@mui/material/styles'
import CreditScoreIcon from '@mui/icons-material/CreditScore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const Cart = () => {
  const { cartList } = useSelector(state => state.cart)
  const [message, setMessage] = useState('')
  const [darkMode, setDarkMode] = useContext(DarkModeContext)
  const dispatch = useDispatch()

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { user } = useSelector(state => state.auth)

  const handleCommand = async () => {
    console.log("Commande clicked"); // Vérification si la fonction est appelée
  
    if (!user || !user.user || !user.user._id) {
      setMessage('Connectez-vous pour commander.');
      return;
    }
  
    if (!cartList || cartList.length === 0) {
      setMessage('Votre panier est vide !');
      return;
    }
  
    const command = {
      user: user.user._id, // ✅ Vérifié
      products: cartList.map(item => {
        if (!item || !item._id) {
          console.error("Erreur: Un produit dans le panier n'a pas d'_id", item);
          setMessage('Un produit invalide est dans votre panier.');
          return null;
        }
        return { product: item._id, qty: item.qty };
      }).filter(item => item !== null), // Supprime les produits invalides
      prixTotale: totalPrice
    };
  
    try {
      const response = await axios.post('http://localhost:4000/command', command);
      if (response.status === 201) {
        alert('Commande passée avec succès !');
        dispatch(clearCart());
        setMessage('Votre commande a été enregistrée.');
      } else {
        setMessage('Une erreur est survenue lors de la commande.');
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      setMessage('Une erreur est survenue lors de la commande.');
    }
  };
  
  

  // const handleCommand = async () => {
  //   const command = {
  //     user: user?.user._id,
  //     products: cartList.map(item => ({
  //       product: item._id,  // Send only the product ID
  //       qty: item.qty
  //     })),
  //     prixTotale: totalPrice
  //   };

  //   try {
  //     if (user) {
  //       await axios.post('http://localhost:4000/command', command);
  //       alert('Commande passée !');
  //       dispatch(clearCart()); // Optionally clear the cart after successful order
  //     } else {
  //       setMessage('Connectez-vous pour commander.');
  //     }
  //   } catch (error) {
  //     console.error('Error while submitting command:', error);
  //     setMessage('Une erreur est survenue !');
  //   }
  // };

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Appbar />

      <section
        style={{
          color: darkMode ? '#000' : '#fff',
          backgroundColor: darkMode ? '#fff' : '#000'
        }}
        className='cart-items'
      >
        <Container>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={8} sm={8} md={12}>
              <Item>
                {cartList.length === 0 && <h1 className='no-items product'>Le panier est vide</h1>}
                {cartList.map(item => (
                  <div key={item._id} className='cart-list'>
                    <Row>
                      <Col className='image-holder' sm={4} md={3}>
                        <img src={`http://localhost:4000/uploads/${item.imgUrl}`} alt='' />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className='cart-content justify-content-center'>
                          <Col xs={12} sm={9} className='cart-details'>
                            <h3>{item.productName}</h3>
                            <h4>{item.price}.00 DT * {item.qty} <span>{item.price * item.qty}.00 DT</span></h4>
                          </Col>
                          <Col xs={12} sm={3} className='cartControl'>
                            <button className='incCart' onClick={() => dispatch(addToCart({ product: item, num: 1 }))}>
                              <i className='fa-solid fa-plus'></i>
                            </button>
                            <button className='desCart' onClick={() => dispatch(decreaseQty(item))}>
                              <i className='fa-solid fa-minus'></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button className='delete' onClick={() => dispatch(deleteProduct(item))}>
                        <ion-icon name='close'></ion-icon>
                      </button>
                    </Row>
                  </div>
                ))}
              </Item>

              <Item>
                <div className='cart-total'>
                  <h2>Résumé du panier</h2>
                  <div className='d-flex'>
                    <h4>Total :</h4>
                    <h3>{totalPrice}.00 DT</h3>
                  </div>
                </div>
                <Button
  color="info"
  variant="contained"
  onClick={() => {
    handleCommand(); // Call handleCommand to place the order
    handleOpen(); // Open the modal
  }}
  style={{ marginLeft: '50px' }}
>
                  Commander
                </Button>
                <Button color='secondary' variant='contained' onClick={() => dispatch(clearCart())} style={{ marginLeft: '20px' }}>
                  Vider le panier
                </Button>
                {message && <span>{message}</span>}
              </Item>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  )
}

export default Cart
