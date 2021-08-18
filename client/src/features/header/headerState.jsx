import { IconButton, Menu, MenuItem } from "@material-ui/core"
import { useState } from "react"
import {AccountCircle} from "@material-ui/icons"
export const HeaderState = () => {

    const [menu, handleMenu] = useState(false)
    return( <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={menu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(menu)}
          onClose={()=>handleMenu(!menu)}
        >
          <MenuItem onClick={handleMenu}>Profile</MenuItem>
          <MenuItem onClick={handleMenu}>My account</MenuItem>
        </Menu>
      </div>)
}