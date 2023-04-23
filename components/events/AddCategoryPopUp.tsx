import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useApiClient } from 'api/apiClient';
import { useRecoilState } from 'recoil';
import { sessionTokenState } from 'recoil/sessionTokenState';

export default function AddCategoryPopUp() {
    const [open, setOpen] = React.useState(false);
    const [sessionToken, setSessionToken] = useRecoilState(sessionTokenState);
    const [category, setCategory] = React.useState<string>("");
    const apiClient = useApiClient();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const addNewCategory = async () =>{
        const input = {
            sessionToken : sessionToken,
            categoryName : category
        };
        if (sessionToken !== undefined) {
            const response = await apiClient.categories.addCategories({ headers: { sessionToken : sessionToken,categoryName : category }});
            if (response.ok) {
                console.log("juhuu")
            } else {
                console.log("nie udalo sie")
            }
        }
       else{
           console.log("nie masz tokena")
        }
       handleClose();
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{padding:'3px'}}>
                ADD CATEGORY
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new event category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new event category to this website, please enter the category of your choice.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New category"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addNewCategory}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}