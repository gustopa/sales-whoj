/* eslint-disable */

import { HiX } from "react-icons/hi";
import logo from '../../../../assets/logo.jpg'
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import MemoryIcon from '@mui/icons-material/Memory';
import {Pelanggan,Transaksi,Inventory,Laporan,Master,Konfigurasi} from "./routes";
import HomeIcon from '@mui/icons-material/Home';
import '@fortawesome/fontawesome-svg-core/styles.css'


const Dropdown = ({primary, isOpen, onToggle,subMenu,icon,color}) => {
  return (
    <List className="m-0 dropdownParent" style={{color:'#b89474',padding:'0',cursor:'pointer'}}>
      {/* Menu Utama */}
      <ListItem onClick={onToggle}>
        <ListItemIcon >
          <i className={`fa ${icon} dropdownIcon`} style={{color:color}}></i>
        </ListItemIcon>
        <ListItemText className="dropdownText" style={{color:color}} primary={primary} />
        {isOpen ? <ExpandLess style={{color:color}} className="dropdownIcon" /> : <ExpandMore style={{color:color}} className="dropdownIcon" />}
      </ListItem>

      {/* Submenu */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenu.map((menu,index) => 
            <ListItem className="listItem" key={index} sx={{ pl: 4}}>
                <ListItemIcon>
                  <ShortcutIcon className="listIcon" style={{color: location.pathname == '/'+menu.link ? "#b89474" : "#a3aed0",transform: 'rotate(180deg) scaleX(-1)'}}/>
                </ListItemIcon>
                <Link href={menu.link} underline="none" className="-ml-6 ">
                  <ListItemText className="listText" style={{color: location.pathname == '/'+menu.link ? "#b89474" : "#a3aed0"}} primary={menu.name} />
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

  const menu = usePage().props.menu;
  const folderMenu = menu.map((m) => m.folder_name_bahasa);
  const folderMenuObject = folderMenu.reduce((acc, folderName) => {
    acc[folderName] = menu
      .filter((m) => m.folder_name_bahasa === folderName) 
      .map((m) => ({ 
        name : m.menu_name_bahasa, 
        link : m.controller_menu,
        icon : m.folder_icon
      })) 
  
    return acc;
  }, {});

  
  
  
  
  
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
        <List className={`m-0 ${activeRoute('/') ? 'text-[#b89474]' : 'text-gray-600'} dropdownParent`} style={{padding:'0'}}>
          <ListItem>
            <ListItemIcon>
              <HomeIcon className={`m-0 ${activeRoute('/') ? 'text-[#b89474]' : 'text-gray-600'} dropdownIcon`} />
            </ListItemIcon>
            <Link href="/">
              <ListItemText className="dropdownText" primary="Beranda"/>
            </Link>
          </ListItem>
        </List>

        
        {Object.keys(folderMenuObject).map((menu,index)=>
          <Dropdown 
          color={ActiveGroupLink == menu ? "#b89474" : "#a3aed0"} 
          key={index} 
          primary={menu} 
          id={menu} 
          isOpen={openDropdown === menu} 
          subMenu={folderMenuObject[menu]} 
          onToggle={() => handleToggle(menu)}
          icon={folderMenuObject[menu][0].icon}
          />
          
        )}
        
      </div>
      

    </div>
  );
};

export default Sidebar;
