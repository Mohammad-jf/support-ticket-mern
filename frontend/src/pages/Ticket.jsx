import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'





const Ticket = () => {
    const { isError, isLoading, isSuccess, message, ticket } = useSelector((state) => state.tickets)
    const { isLoading: notesIsLoading, notes } = useSelector((state) => state.notes)
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(id));
        dispatch(getNotes(id));

        return () => isSuccess && dispatch(reset(), notesReset());
    }, [isSuccess, isError, message, dispatch, id])


    const onTicketClose = () => {
        dispatch(closeTicket(id));
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>SomeThing went wrong</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url='/tickets' />
                <h2>
                    Ticket Id : {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>

                <h3>Date Submitted : {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product : {ticket.product}</h3>
                <hr />

                <div className="ticket-desc">
                    <h3>Description of Issue </h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {notes.map((note) => <NoteItem key={note._id} note={note} />)}


            {ticket.status !== 'closed' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close ticket</button>
            )}
        </div>
    )
}

export default Ticket