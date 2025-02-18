/* eslint-disable */

import { HiX } from "react-icons/hi";
import logo from '../../../../assets/logo.jpg'
import logo2 from '../../../../assets/favicon.ico'
import { useState,useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { List, ListItem, ListItemText, Collapse, ListItemIcon, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import HomeIcon from '@mui/icons-material/Home';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FaExpandAlt } from "react-icons/fa";
import { FiMinimize2 } from "react-icons/fi";


const Dropdown = ({primary, isOpen, onToggle,subMenu,icon,color,miniSidebar}) => {
  const pathname = location.pathname.split('/')[1]
  const activeItemRef = useRef(null);
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  return (
    <List className="m-0 dropdownParent" style={{color:'#b89474',padding:'0',cursor:'pointer'}}>
      {/* Menu Utama */}
      <Tooltip placement="right-start" title={`${miniSidebar ? primary : ""}`}>
        <ListItem onClick={onToggle}>
          <ListItemIcon >
            <i className={`fa ${icon} dropdownIcon`} style={{color:color}}></i>
          </ListItemIcon>
          <ListItemText className="dropdownText" style={{color:color}} primary={primary} />
          {isOpen ? <ExpandLess style={{color:color}} className="dropdownIcon" /> : <ExpandMore style={{color:color}} className="dropdownIcon" />}
        </ListItem>
      </Tooltip>
      
      
      {/* Submenu */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenu.map((menu,index) => 
                <Link href={`/${menu.link.toLowerCase()}`} key={index} style={{cursor : "pointer"}} underline="none">
                  <ListItem className="listItem" ref={pathname == menu.link.toLowerCase() ? activeItemRef : null}  sx={{ pl: 4,pb:0,pt:1, borderRight : pathname == menu.link.toLowerCase() ? "5px solid #b89474" : "none"}}>
                      <ListItemIcon>
                        <ShortcutIcon className="listIcon" style={{color: pathname == menu.link.toLowerCase() ? "#b89474" : "#a3aed0",transform: 'rotate(180deg) scaleX(-1)'}}/>
                      </ListItemIcon>
                        <ListItemText className="listText" style={{color: pathname == menu.link.toLowerCase() ? "#b89474" : "#a3aed0"}} primary={menu.name} />
                  </ListItem>
                </Link>
          )}
        </List>
      </Collapse>
    </List>
  );
};


const Sidebar = ({ open, onClose, miniSidebar, setMiniSidebar }) => {
  
  const menu = usePage().props.menu;
  
  const AllLinks = menu.map((m) => [m.controller_menu,m.folder_name_bahasa])
  const path = location.pathname
  
  let ActiveGroupLink = null
  // console.log(AllLinks[6]);
  
  if(path != "/"){
    ActiveGroupLink = AllLinks.filter(link => link[0].toLowerCase() == path.split('/')[1] ? link[1] : null)[0][1]
  }
  
  const [openDropdown, setOpenDropdown] = useState(ActiveGroupLink); 

  const handleToggle = (id) => {
    setOpenDropdown((prev) => (prev === id && miniSidebar === false ? null : id));
    setMiniSidebar(false)
  };
  

  function activeRoute(route){
    return location.pathname == route;
    
  }

  
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
  const [buttonExpand,setButtonExpand] = useState(true)
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth < 1200 ? setButtonExpand(false) : setButtonExpand(true));
    window.innerWidth < 1200 ? setButtonExpand(false) : setButtonExpand(true)
  }, []);
  
  
  
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 
        ${open ? "translate-x-0" : "-translate-x-96"}`} style={{width : miniSidebar ? "50px" : ""}}
    >
      <span
        className="absolute top-4 right-4 block z-999 cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div>
          <List className={`${buttonExpand ? 'hidden lg:block' : 'hidden'} `} style={{cursor:'pointer'}} onClick={() => {setMiniSidebar(!miniSidebar); setOpenDropdown(null)}}>
              <ListItem className="flex justify-end">
                <ListItemIcon>
                  {miniSidebar ? <FaExpandAlt className="ml-1" style={{color : "#b89474"}}/> : <FiMinimize2 className="ml-1" style={{color : "#b89474"}}/>}
                </ListItemIcon>
              </ListItem>
          </List>
        </div>

      <div className={`mx-[56px] mt-[5px] flex items-center ${miniSidebar ? 'hidden' : ''}`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img src={logo} alt="logo" width="200" />
        </div>
      </div>
      
      <div className={`${miniSidebar ? '' : 'hidden'} mx-auto flex items-center`}>
        <img src={logo2} width="25" alt="" />
      </div>

      <div className={`${miniSidebar ? 'mt-[20px]' :'mt-[58px]'} mb-1 h-px bg-[#b89474]`} />
      {/* Nav item */}

      <div className="sidebar-item" style={{overflowY:'auto',height : '100vh'}}>
          <Link href="/">
            <List className={`m-0 ${activeRoute('/') ? 'text-[#b89474]' : 'text-gray-600'} dropdownParent`} style={{padding:'0'}}>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon className={`m-0 ${activeRoute('/') ? 'text-[#b89474]' : 'text-gray-600'} dropdownIcon`} />
                </ListItemIcon>
                  <ListItemText className="dropdownText" primary="Beranda"/>
              </ListItem>
            </List>
          </Link>

        
        {Object.keys(folderMenuObject).map((menu,index)=>
          <Dropdown 
          color={ActiveGroupLink == menu ? "#b89474" : "#a3aed0"} 
          key={index}
          primary={menu} 
          miniSidebar={miniSidebar}
          id={menu} 
          isOpen={openDropdown === menu && miniSidebar === false} 
          subMenu={folderMenuObject[menu]} 
          onToggle={() => handleToggle(menu)}
          icon={folderMenuObject[menu][0].icon}
          />
        )}
        <div style={{marginBottom:"145px"}}></div>
        
      </div>
      
    </div>
  );
};

export default Sidebar;
