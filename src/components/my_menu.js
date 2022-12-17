import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useGlobalContext } from '../context';

export default function BasicMenu(user) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {logout} = useGlobalContext()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar src={user.avatar} sx={{width: 40, height: 40}} onClick={handleClick}/>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          // 'aria-labelledby': 'basic-button',
          sx: {
            backgroundColor: '#1ebe71',
            color: 'white'
          }
        }}
      >
        <MenuItem onClick={()=>{logout(); handleClose();}}>
          <Logout sx={{fontSize: 13}}/>
          <Typography mr={3} sx={{fontSize: 13}}>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}