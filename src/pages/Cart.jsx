import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decreaseQty,
  deleteProduct
} from '../app/features/cart/cartSlice'
import axios from 'axios'
import { Box, Button, Grid, Modal, Paper, TextField } from '@mui/material'
import { DarkModeContext } from '../contexte'
import Appbar from './../components/Appbar'
import { experimentalStyled as styled } from '@mui/material/styles'
import emailjs from 'emailjs-com'
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
const EmailForm = (props) => {

  const commandDetails = props.command.cartList.map(elem=> JSON.stringify(elem))
 
  const sendEmail = e => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_o8vw7fj',
        'template_wt3eocw',
        e.target,
        'dk4V24UG4Io-DcCQK'
      )
      .then(
        result => {
          console.log( e.target)
        },
        error => {
          console.log(error.text)
        }
      )

    e.target.reset()
  }
  return (
    <form onSubmit={sendEmail}>
      <Box sx={style}>
        <TextField
          sx={{ margin: '2%' }}
          fullWidth
          name='to'
          label='Email'
          id='fullWidth'
        />
        <TextField
          sx={{ margin: '2%' }}
          fullWidth
          name='name'
          label='Name'
          id='fullWidth'
        />
        <TextField
          sx={{ margin: '2%' }}
          fullWidth
          name='subject'
          label='subject'
          id='fullWidth'
        />
        <TextField
          sx={{ margin: '2%' }}
          name='message'
          fullWidth
          
          id='outlined-multiline-flexible'
          label='Message'
          multiline
          maxRows={50}
        />

        <Button
          type='submit'
          sx={{ marginLeft: '25%', backgroundColor: '#0f3460' }}
          variant='contained'
          endIcon={<CreditScoreIcon />}
        >
          Confirmer
        </Button>
      </Box>
    </form>
  )
}
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
    const command = {
      user: user.user._id,
      products: cartList,
      prixTotale: totalPrice
    }
    console.log(cartList)

    try {
      if (user) {
        await axios.post(
          'https://backend-e-commerce-9fdb.onrender.com/command',
          command
        )
        alert('cammande passée !')
      } else {
        setMessage('Connectez-vous pour commander.')
      }
    } catch (error) {
      console.error('Error while submitting command:', error)
      setMessage('Une erreur est survenue !')
    }
  }

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
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={8} sm={8} md={12}>
              <Item>
                {cartList.length === 0 && (
                  <h1 className='no-items product'>Le panier est vide</h1>
                )}
                {cartList.map(item => (
                  <div key={item.id} className='cart-list'>
                    <Row>
                      <Col className='image-holder' sm={4} md={3}>
                        <img
                          src={`https://backend-e-commerce-9fdb.onrender.com/uploads/${item.imgUrl}`}
                          alt=''
                        />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className='cart-content justify-content-center'>
                          <Col xs={12} sm={9} className='cart-details'>
                            <h3>{item.productName}</h3>
                            <h4>
                              {item.price}.00 DT * {item.qty}{' '}
                              <span>{item.price * item.qty}.00 DT</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className='cartControl'>
                            <button
                              className='incCart'
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <i className='fa-solid fa-plus'></i>
                            </button>
                            <button
                              className='desCart'
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className='fa-solid fa-minus'></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button
                        className='delete'
                        onClick={() => dispatch(deleteProduct(item))}
                      >
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
                  color='info'
                  variant='contained'
                  onClick={handleOpen}
                  style={{ marginLeft: '50px' }}
                >
                  Commander
                </Button>
                {message && <span>{message}</span>}
              </Item>
            </Grid>
          </Grid>
        </Container>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <EmailForm  command={{user,cartList,totalPrice}} />
        </Modal>
      </section>
    </>
  )
}

export default Cart
