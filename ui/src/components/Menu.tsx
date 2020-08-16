import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { restore } from '../utils/authStorage';

interface IMenuProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose(): void;
}

const MyMenu: React.FC<IMenuProps> = ({ open, anchorEl, handleClose }) => {
  const logOut = () => {
    restore();
    handleClose();
    window.location.href = '/';
  };
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={logOut}>
        <Typography variant="body1" color="textPrimary">
          log out
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <NavLink to="/post">
          <Typography variant="body1" color="textPrimary">
            Create post
          </Typography>
        </NavLink>
      </MenuItem>
    </Menu>
  );
};
export default MyMenu;
