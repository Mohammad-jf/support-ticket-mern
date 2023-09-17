import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const NewTicket = () => {
    const { user } = useSelector((state) => state.auth);
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <>
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