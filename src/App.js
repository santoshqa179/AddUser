import React, { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

function App() {

  const [list, setList] = useState([]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary
  }));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fullName, setFullName] = useState({
    fname: "",
    lname: "",
    gender: ""
  });
  const inputEvent = (event) => {
    const { value, name } = event.target;
    setFullName({ ...fullName ,[name]:value})
  }
  const rendom = async () => {
    const res = await fetch('https://randomuser.me/api/?inc=gender,name')
    const data = await res.json();
    const fname = data.results[0].name.first;
    const lname = data.results[0].name.last;
    const gender = data.results[0].gender;
    const cardDetails = { fname, lname, gender }
    setFullName(cardDetails)
  }
  const onSubmits = (event) => {
    event.preventDefault();
    setFullName({ ...fullName, [event.target.name]: event.target.value });
    alert(fullName.fname)
    setList((ls) => [...ls, fullName])
    handleClose();
  }
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Dirctory
            </Typography>
            <div>
              <Button color="inherit" onClick={handleOpen}>Add User</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Stack spacing={2}>
                    <TextField className='aa' name="fname" value={fullName.fname} onChange={inputEvent} id="outlined-basic" label="First" variant="outlined" />
                    <TextField className='aa' name="lname" value={fullName.lname} onChange={inputEvent} id="outlined-basic" label="Last" variant="outlined" />
                  </Stack>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label" >Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      onChange={inputEvent}
                      value={fullName.gender}
                    >
                      <FormControlLabel name="gender" value="female"  control={<Radio />} label="Female" />
                      <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" />
                      <FormControlLabel name="gender" value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                  <div className='button1'>
                    <Stack spacing={2} direction="row">
                      <Button variant="outlined" onClick={rendom}>Random User</Button><br></br>
                      <Button variant="outlined" onClick={onSubmits}>Save</Button><br></br>
                      <Button variant="outlined" onClick={handleClose}>Cancle</Button>
                    </Stack>
                  </div>
                </Box>
              </Modal>
            </div>

          </Toolbar>
        </AppBar>
      </Box>
      <div>
        {list?.map((data, index) => (
          <>
            <div key={index}>
              <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>

                <StyledPaper
                  sx={{
                    my: 1,
                    mx: "auto",
                    p: 7
                  }}
                >

                  <Grid container wrap="nowrap" spacing={3}>
                    <Grid item>
                      <Avatar>{data.fname[0]}</Avatar>
                    </Grid>

                    <Grid item xs>
                      <Typography variant="body1" color="text.first">
                        First: {data.fname}
                      </Typography>
                      <Typography variant="body1" color="text.first">
                        Last: {data.lname}

                      </Typography>
                      <Typography variant="body1" color="text.first">
                        Gender: {data.gender}
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </Box>
            </div>
          </>
        ))}
      </div>

    </div>
  );
}

export default App;
