import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRecoilState } from 'recoil';
import { sessionTokenState } from '../../recoil/sessionTokenState';
import { useApiClient } from '../../functions/useApiClient';

export default function AddCategoryPopUp() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
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
        setError("");
        if(category === ""){
            setError("Please type sth.....");
            return;
        }
        const input = {
            sessionToken : sessionToken,
            categoryName : category
        }
        if (sessionToken !== undefined) {
            const response = await apiClient.categories.addCategories({ headers: { sessionToken : sessionToken,categoryName : category }});
            if (response.ok) {
                console.log("juhuu");
                console.log(response.data);
                handleClose();
            } else {
                if(response.status === 400){
                    setError("Category already exist");
                }
                else alert("Could not add category. Please refresh page.\n Received error: "+response.statusText);
            }
        }
       else{
           setError("nie masz tokena");
        }
    }
    return (
        <div>
            <Button
                variant="outlined"
                data-testid="open-form-btn"
                onClick={handleClickOpen}
                sx={{padding:'3px'}}
            >
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
                        data-testid="category"
                        fullWidth
                        variant="standard"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        error={error !== ""}
                        helperText={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} data-testid="cancel-btn">Cancel</Button>
                    <Button onClick={addNewCategory} data-testid="add-category-btn">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}