import React from "react";
import AppBar  from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {signoutUser, 
        getUserSigninData,
        cleanStore,
        getUserDataToDisplay} from "../../features/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ButtonGroup, Divider, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from "react";




const useStyles = makeStyles(theme=>({
    card: {
        maxWidth:600,
        margin:'auto',
        marginTop:theme.spacing(5),
        marginBottom: theme.spacing(5),
        display:'inline'
    },
    title:{
        padding: `${theme.spacing(5)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    dashboardTitle:{
        padding: `${theme.spacing(1)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media:{
        minHeight:400
    },
    credit:{
        padding:10,
        textAlign:'right',
        backgroundColor:'#ededed',
        borderBottom:'1px solid #d0d0d0',
        '& a': {
            color:'#3f4771'
        }
    },
    logo: {
        maxWidth: 80,
      },
    rightButtons: {
        backgroundColor: 'white',
        marginRight: '2px',
        marginTop:'50px',
        textTransform:'none',
        marginLeft:'auto'
    },
    welcomeMessage:{
        paddingLeft:"20px"
    }
    
}))

const Header = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(getUserSigninData)
  const displayUserName = useSelector(getUserDataToDisplay)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
 
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const editProfile = () => {
        navigate(`editProfile/${userData.user._id}`)
    }

    const editPassword = () => {
        navigate(`/editPassword/${userData.user._id}`)
    }

    const deleteAccount = () => {
      navigate(`/deleteAccount/${userData.user._id}`)
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    const date = new Date()

    const signout = () => {
        dispatch(signoutUser())
        dispatch(cleanStore())
        navigate('/')
    }

    const handleOpenNavMenu = (event) => {
      
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
    return(
        
  <AppBar position="static" >
 
  

        <Toolbar disableGutters>
 
            <Box
                component="img"
                sx={{
                height: window.location.pathname === '/' 
                || window.location.pathname === '/signin' 
                || window.location.pathname === '/signup' ? 64 : 38,
                xs:38,
                marginTop:{xs:'4px'},
                marginBottom:{xs:'4px'}
                }}
                alt="Expense tracker"
                src="https://joyofandroid.com/wp-content/uploads/2019/06/monefy-money-manager-best-android-business-expense-tracker-finance-financial-income-list-add-deduct-minus-computer-smartphone.png"
            />
            
            <Typography variant={window.location.pathname === '/' 
                || window.location.pathname === '/signin' 
                || window.location.pathname === '/signup' ? 'h4' : 'h6'} className={window.location.pathname === '/' 
                || window.location.pathname === '/signin' 
                || window.location.pathname === '/signup' ? classes.title : classes.dashboardTitle}
                sx={{display:{xs:'none', md:"block"}}}>
                Personal Expense Tracker and Analyst
                 
            </Typography>
            <br />

   
        
            {
              window.location.pathname === '/signup' ||  window.location.pathname === '/' ?

            null 
            :  <ButtonGroup style={{marginLeft:'auto'}}>
            <div>
                <Button
                    style={{textTransform:'none'}}
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="primary"
                    
                   onClick={handleOpenNavMenu}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Profile
                </Button>

                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}>

                    <MenuItem onClick={editProfile} disableRipple>
                      <Typography textAlign="center" style={{marginLeft:'5px', marginRight:'5px'}}>  Edit Profile</Typography>
                    </MenuItem>
                      <Divider />
                    <MenuItem onClick={editPassword} disableRipple>
                      <Typography textAlign="center" style={{marginLeft:'5px', marginRight:'5px'}}>New Password</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={deleteAccount} disableRipple>
                      <Typography textAlign="center" style={{marginLeft:'5px', marginRight:'5px'}}> Delete Account</Typography> 
                    </MenuItem>
            </Menu>
            </div>
                   
           <Button variant="primary" onClick={signout} style={{textTransform:'none'}}>Signout</Button>   
   
     
        
           </ButtonGroup>
            
            
        }
     


        </Toolbar>
     
        { 
                Object.keys(displayUserName).length !== 0 ?
               <span style={{display:'block',marginLeft:'10px'}}>
               
               <Typography variant="h6" >
                    
                
                        Hello, {displayUserName.user.firstName}
                    </Typography>
                    <Typography component='p' style={{fontSize:'10px'}}>
                        {dateFormat(date, 'dddd, dd mmmm')}
                    </Typography>
                    </span>
                : null
        }

</AppBar>)}
    

export default Header