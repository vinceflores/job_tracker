import React, {useState, useEffect} from 'react'
import { useContext } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import {db, auth} from '../../../controller/firebase'
import { AuthenticationContext  } from '../../../controller/AuthContext'

const useToggleModal = () => {
    const { authState, authDispatch } = useContext(AuthenticationContext);

    const handleDelete = () => {
      authDispatch({
        type: "Delete Applications",
      });
      authState.tableState.rows_selected.forEach((id) => {
        deleteDoc(doc(db, "users/" + auth.currentUser.uid + "/applications", id));
      });
    };
    const [open , setOpen] = useState(false); 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return {open, handleOpen, handleClose, handleDelete}
}

export default useToggleModal