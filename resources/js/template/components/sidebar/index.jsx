/* eslint-disable */

import { HiX } from "react-icons/hi";
import logo from '../../../../assets/logo.jpg'
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import MemoryIcon from '@mui/icons-material/Memory';
import {Pelanggan,Transaksi,Inventory,Laporan,Master,Konfigurasi} from "./routes";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

const Dropdown = ({primary, isOpen, onToggle,subMenu,icon}) => {
  
  return (
    <List className="m-0" style={{color:'#b89474',padding:'0'}}>
      {/* Menu Utama */}
      <ListItem onClick={onToggle}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={primary} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      {/* Submenu */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenu.map((menu,index) => 
            <ListItem key={index} sx={{ pl: 4}}>
                <ListItemIcon>
                  <ShortcutIcon style={{color: '#b89474',transform: 'rotate(180deg) scaleX(-1)'}}/>
                </ListItemIcon>
                <Link href={menu.link} underline="none" className="-ml-6">
                  <ListItemText primary={menu.name} />
                </Link>
            </ListItem>
          )}
        </List>
      </Collapse>
    </List>
  );
};


const Sidebar = ({ open, onClose }) => {
  
  const AllLinks = [
    ...Pelanggan,
    ...Transaksi,
    ...Inventory,
    ...Laporan,
    ...Master,
    ...Konfigurasi
  ]
  const path = location.pathname
  let ActiveGroupLink = null
  if(path != "/"){
    ActiveGroupLink = AllLinks.filter(link => link.link == path)[0].group
  }
  const [openDropdown, setOpenDropdown] = useState(ActiveGroupLink); 

  const handleToggle = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id)); 
  };

  function activeRoute(route){
    return location.pathname == route;
    
  }

  
  
  
   
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
        <List className={`m-0 ${activeRoute('/') ? 'text-[#b89474]' : 'text-gray-600'}`} style={{padding:'0'}}>
          <ListItem>
            <ListItemIcon>
              <HomeIcon className={`m-0 ${activeRoute('/') ? 'text-[#b89474]' : 'text-gray-600'}`} />
            </ListItemIcon>
            <Link href="/">
              <ListItemText primary="Beranda"/>
            </Link>
          </ListItem>
        </List>
        <Dropdown 
          id="Pelanggan"
          primary="Pelanggan"
          key="Pelanggan"
          isOpen={openDropdown === 'Pelanggan'}
          onToggle={() => handleToggle('Pelanggan')}
          subMenu={Pelanggan}
          icon={<AccountCircleIcon style={{color:'#b89474'}} />}
        />
        <Dropdown 
          id="Transaksi"
          primary="Transaksi"
          key="Transaksi"
          isOpen={openDropdown === 'Transaksi'}
          onToggle={() => handleToggle('Transaksi')}
          subMenu={Transaksi}
          icon={<ReceiptIcon style={{color:'#b89474'}} />}
        />
        <Dropdown 
          id="Inventory"
          primary="Inventory"
          key="Inventory"
          isOpen={openDropdown === 'Inventory'}
          onToggle={() => handleToggle('Inventory')}
          subMenu={Inventory}
          icon={<InventoryIcon style={{color:'#b89474'}}  />}
        />
        
        <Dropdown 
          id="Master"
          primary="Master"
          key="Master"
          isOpen={openDropdown === 'Master'}
          onToggle={() => handleToggle('Master')}
          subMenu={Master}
          icon={<MemoryIcon style={{color:'#b89474'}}  />}
        />
        <Dropdown 
          id="Laporan"
          primary="Laporan"
          key="Laporan"
          isOpen={openDropdown === 'Laporan'}
          onToggle={() => handleToggle('Laporan')}
          subMenu={Laporan}
          icon={<AssessmentIcon style={{color:'#b89474'}}  />}
        />
        <Dropdown 
          id="Konfigurasi"
          primary="Konfigurasi"
          key="Konfigurasi"
          isOpen={openDropdown === 'Konfigurasi'}
          onToggle={() => handleToggle('Konfigurasi')}
          subMenu={Konfigurasi}
          icon={<SettingsIcon style={{color:'#b89474'}}  />}
        />
        
      </div>
      

    </div>
  );
};

export default Sidebar;
