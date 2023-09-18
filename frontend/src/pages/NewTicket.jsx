import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './../components/Spinner';
import BackButton from './../components/BackButton';
import TicketItem from '../components/TicketItem';


const NewTicket = () => {
    // global state
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets);

    // local state
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets')
        }

        dispatch(reset());
    }, [isError, isSuccess, dispatch, message, navigate])


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({ product, description }));
    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <section className='heading'>
                <h1>Create New Ticket</h1>
                <p>Please Fillout The From Below</p>
            </section>


            <section className='form'>
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className="form-controll"
                        value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="Email"
                        className="form-controll"
                        value={email} disabled />
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            onChange={(e) => setProduct(e.target.value)}
                            value={product}>
                            <option value="iPhone">iPhone</option>
                            <option value="iMac">iMac</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">description of The Issue</label>
                        <textarea
                            className='form-controll'
                            placeholder='description'
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                    </div>

                    <div className="form-group">
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket