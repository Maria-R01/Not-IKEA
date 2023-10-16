import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useModal } from '../../context/Modal';
import { clearCartThunk } from '../../store/shoppingCart';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Checkout.css'



const Checkout = () => {
    const history = useHistory();
	const { closeModal } = useModal()
    const dispatch = useDispatch();


    const handleCheckout = async () => {
        setTimeout(() => {
            dispatch(clearCartThunk());
            (history.push('/home'))
            return closeModal()
        }, 3000); 
    };

    useEffect(() => {
        handleCheckout();
    }, [])

    return (
        <>
            <div className='checkout-modal'>
                <h2>Thank you for your purchase!</h2>
                <p>Your order is being processed.</p>
            </div>
        </>
    )

}

export default Checkout;