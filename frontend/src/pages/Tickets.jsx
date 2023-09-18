import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice'
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';
import { toast } from 'react-toastify';
import TicketItem from '../components/TicketItem';


const Tickets = () => {
    const { isLoading, isError, isSuccess, message, tickets } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTickets());

        if (isError) {
            toast.error(message)
        }

        return () => isSuccess && dispatch(reset())
    }, [dispatch, isSuccess, message, isError])



    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />

            <h1>Tickets</h1>

            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>

                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticketData={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets