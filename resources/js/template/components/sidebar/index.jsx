/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import logo from '../../../../assets/logo.jpg'
import SidebarCard from "$/components/sidebar/componentsrtl/SidebarCard";
import routes from "$/routes.jsx";
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { AccountCircle } from "@mui/icons-material";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import InventoryIcon from '@mui/icons-material/Inventory';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PeopleIcon from '@mui/icons-material/People';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import MemoryIcon from '@mui/icons-material/Memory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Stok,Produksi,HR,Laporan,Master,Administrator } from "./routes";
const Dropdown = ({primary, isOpen, onToggle,subMenu,icon}) => {
  const [open, setOpen] = useState(null);
  
  // const handleToggle = () => {
  //   setOpen(!open);
  // };
  const handleOpen = (name)=>{
    setOpen((prev) => (prev === name ? null : name))
  }


  return (
    <List key={primary} className="m-0" style={{color:'#b89474'}}>
      {/* Menu Utama */}
      <ListItem button={true} onClick={onToggle}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={primary} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      {/* Submenu */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List key={primary} component="div" disablePadding>
          {subMenu?.map((menu,index) =>
            <>
            <ListItem key={index} sx={{ pl: 4}} button={menu.IsSubMenu ? true : false} onClick={() => menu.IsSubMenu ? handleOpen(menu.name) : ''}>
                <ListItemIcon>
                  <ShortcutIcon style={{color: '#b89474',transform: 'rotate(180deg) scaleX(-1)'}}/>
                </ListItemIcon>
              {!menu.IsSubMenu ? 
                <Link href={menu.link} underline="none" className="-ml-6">
                  <ListItemText primary={menu.name} />
                </Link>
              : 
                <>
                  <ListItemText primary={menu.name} />
                  {open === menu.name ? <ExpandLess /> : <ExpandMore />}
                </>
              }
            </ListItem>
            {menu.IsSubMenu ? 
              <Collapse in={open === menu.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.childMenu?.map((child,k)=>
                    <ListItem key={k} sx={{pl:8}}>
                      <ListItemIcon>
                        <ShortcutIcon style={{color: '#b89474',transform: 'rotate(180deg) scaleX(-1)'}}/>
                      </ListItemIcon>
                      <Link href={child.link} underline="none" className="-ml-6">
                        <ListItemText primary={child.name} />
                      </Link>
                    </ListItem>
                  )}
                </List>
              </Collapse>
            : 
                <></>
            }
            </>
          )}
        </List>
      </Collapse>
    </List>
  );
};


const Sidebar = ({ open, onClose }) => {
  
  const [openDropdown, setOpenDropdown] = useState(null); // Menyimpan ID dropdown yang terbuka

  const handleToggle = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id)); // Tutup dropdown jika sudah terbuka
  };
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[35px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img src={logo} alt="logo" width="200" />
        </div>
      </div>
      <div className="mt-[58px] mb-1 h-px bg-[#b89474]" />
      {/* Nav item */}
      <div className="" style={{overflowY:'auto',height : '100vh'}}>
        <Dropdown 
          id="Stok"
          primary="Stok"
          isOpen={openDropdown === 'Stok'}
          onToggle={() => handleToggle('Stok')}
          subMenu={Stok}
          icon={<InventoryIcon style={{color:'#b89474'}} />}
        />
        <Dropdown 
          id="Produksi"
          primary="Produksi"
          isOpen={openDropdown === 'Produksi'}
          onToggle={() => handleToggle('Produksi')}
          subMenu={Produksi}
          icon={<PrecisionManufacturingIcon style={{color:'#b89474'}} />}
        />
        <Dropdown 
          id="HR"
          primary="HR"
          isOpen={openDropdown === 'HR'}
          onToggle={() => handleToggle('HR')}
          subMenu={HR}
          icon={<PeopleIcon style={{color:'#b89474'}}  />}
        />
        <Dropdown 
          id="Laporan"
          primary="Laporan"
          isOpen={openDropdown === 'Laporan'}
          onToggle={() => handleToggle('Laporan')}
          subMenu={Laporan}
          icon={<DocumentScannerIcon style={{color:'#b89474'}}  />}
        />
        <Dropdown 
          id="Master"
          primary="Master"
          isOpen={openDropdown === 'Master'}
          onToggle={() => handleToggle('Master')}
          subMenu={Master}
          icon={<MemoryIcon style={{color:'#b89474'}}  />}
        />
        <Dropdown 
          id="Administrator"
          primary="Administrator"
          isOpen={openDropdown === 'Administrator'}
          onToggle={() => handleToggle('Administrator')}
          subMenu={Administrator}
          icon={<AdminPanelSettingsIcon style={{color:'#b89474'}}  />}
        />
        
      </div>
      

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
