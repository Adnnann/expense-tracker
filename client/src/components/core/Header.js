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
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from "react";
import Container from '@mui/material/Container';


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

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
   <Container maxWidth="xl">
       
     
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
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
            {
              window.location.pathname === '/signup' ||  window.location.pathname === '/' ?

            null 
            : <><div style={{marginLeft:"auto"}}>
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
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               <MenuItem onClick={editProfile}>
               <Typography textAlign="center">  Edit Profile</Typography>
                    </MenuItem>

                    <MenuItem onClick={editPassword} disableRipple>
                    <Typography textAlign="center">New Password</Typography>
                    </MenuItem>

                    <MenuItem onClick={deleteAccount} disableRipple>
                    <Typography textAlign="center"> Delete Account</Typography>
                       
                    </MenuItem>
            </Menu>
              
                   
                    
        
              </div>
            <Button variant="primary" onClick={signout} style={{textTransform:'none'}}>Signout</Button></>
            
        }

        { 
                Object.keys(displayUserName).length !== 0 ?
                    <Typography variant="h6" className={classes.welcomeMessage}>
                       {dateFormat(date, 'dddd, dd mmmm')}
                        <br />
                        Hello, {
                         displayUserName.user.firstName}
                    </Typography>
                : null
        }

        </Toolbar>
</Container>

    </AppBar>
    )


}
    

export default Header