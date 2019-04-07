import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import JogsList from '../../jogs-list';
import icon from './add.svg';

const AddJogButton = styled.div`
    position: fixed;
    right: 1rem;
    bottom: 1rem;
`;

const JogsPage = () => {
    const [ isAddFormEnabled, changeAddFormStatus ] = useState(false);
    const [ isEditFormEnabled, changeEditFormStatus ] = useState(false);

    return (
        <>
            <JogsList isVisible={!isAddFormEnabled} />
            <Modal isOpen={isAddFormEnabled} onRequestClose={() => changeAddFormStatus(false)}>
                <div>
                    Hello
                </div>
            </Modal>
            <AddJogButton onClick={() => changeAddFormStatus(!isAddFormEnabled)}><img src={icon} /></AddJogButton>
        </>
    );
}

export default JogsPage;