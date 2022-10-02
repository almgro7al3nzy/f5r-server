import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import ROUTER from "src/router";

let url_request = ROUTER.FLASK_ROUTE.concat("api/create_room");

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    room_name: '',
    description: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (room_name, description) => () => {
    setValues({"room_name": "", "description": ""});
    setOpen(false);
    console.log(values.room_name)
    console.log(room_name)
    console.log(description)
    axios.post(url_request, {
      "room_name": room_name,
      "description": description
    })
      .then((response) => {
      })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Room
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to create a new room, please give an eye-catching name and write a detailed
            introduction to attract the audience.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Room Name"
            onChange={handleChange("room_name")}
            value={values.room_name}

            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            onChange={handleChange("description")}
            value={values.description}

            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(values.room_name, values.description)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ProductListToolbar = (props) => (

  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
    <FormDialog >

    </FormDialog>

    </Box>
    {/*
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
      */}
  </Box>
);

export default ProductListToolbar;
