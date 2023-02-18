import { MenuItem, Divider, Button, Typography, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function DropdownMenuButtons({
  buttonLabel,
  handleOpenMenuButtons,
  menuButtons,
  menuFunctions,
  open,
  handleClose,
  anchorEl,
}) {
  return (
    <div>
      <Button
        style={{ textTransform: 'none' }}
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='primary'
        onClick={handleOpenMenuButtons}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {buttonLabel}
      </Button>

      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuButtons.map((button, index) => {
          return (
            <div key={menuButtons[index]}>
              <MenuItem onClick={menuFunctions[index]} disableRipple>
                <Typography textAlign='center' style={{ marginLeft: '5px', marginRight: '5px' }}>
                  {' '}
                  {menuButtons[index]}
                </Typography>
              </MenuItem>
              {index < menuButtons.length - 1 ? <Divider /> : null}
            </div>
          );
        })}
      </Menu>
    </div>
  );
}
