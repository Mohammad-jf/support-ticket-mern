import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { getNotes, reset as notesReset, createNote } from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'


const customStyle = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        position: 'relative'
    }
}


Modal.setAppElement('#root');


const Ticket = () => {
    const { isError, isLoading, isSuccess, message, ticket } = useSelector((state) => state.tickets)
    const { isLoading: notesIsLoading, notes } = useSelector((state) => state.notes)
    const [noteText, setNoteText] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
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


    const openModal = () => {
        setModalIsOpen(true)
    }


    const closeModal = () => {
        setModalIsOpen(false)
    }

    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId: ticket._id }));
        setNoteText('');
        closeModal();
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

            {ticket.status !== 'closed' && (
                <button className='btn' onClick={openModal}><FaPlus /> Add Note </button>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyle}
                contentLabel='Add Note' >
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>X</button>

                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText"
                            id="noteText"
                            className='from-controll'
                            placeholder='Note Text'
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}></textarea>
                    </div>

                    <div className="form-group">
                        <button className='btn' type='submit'> Submit </button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => <NoteItem key={note._id} note={note} />)}


            {ticket.status !== 'closed' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close ticket</button>
            )}
        </div>
    )
}

export default Ticket