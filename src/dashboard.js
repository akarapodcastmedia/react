
//==============================<< slider bar section import >>============
import React from "react";
import { useState,useEffect} from "react";
//==============================<< import component section >>=============
import Upload from "./podcastsection/upload";
import Graphs from "./graphs/graph";
import axios from 'axios';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
// ==================== section of nave bar import ============
import {
    Navbar,
    MobileNav,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
  } from "@material-tailwind/react";
  import {
    CubeTransparentIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    RocketLaunchIcon,
    Bars2Icon,
  } from "@heroicons/react/24/solid";
// profile menu component
const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   
    const closeMenu = () => setIsMenuOpen(false);
   
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-blue-500 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }
 
  // nav list component
const navListItems = [
    {
      label: "Podcaster",
      icon: UserCircleIcon,
    },
    {
      label: "Podcasts",
      icon: CubeTransparentIcon,
    },
    {
      label: "Top trending",
      icon: CodeBracketSquareIcon,
    },
  ];
   
  function NavList() {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label, icon }, key) => (
          <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }
//=============================================================
export default function Dashboard(){
    // sliderbar section
    const [open, setOpen] = React.useState(0);
    const [isShowComponent,setShowComponent] = useState("");
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
  
    //============================================
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [refresh , setRefresh] = useState(null);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(async() => {
    if(refresh==null){
      axios.defaults.withCredentials = true;
      const {data} = await axios.post("https://dev.akarahub.tech/server4/akara/token/refresh",{
        grantType : "credential",
        clientId: "$2b$07$q7lz6DgTNzyd2oODBhZOrOQSYQbQ11RxzuaY2laNaQ0nF/OdL26n.",
        clientSecret: "$2b$07$q7lz6DgTNzyd2oODBhZOrOwS/Z2sBQEUibkd858UkeIqz9wAZlt52",
        scope: "web"
      });
      setRefresh(data.refreshToken);
      
    }
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
    return (
        <div className="flex md:flex-row sm:flex-col sm-1:flex-col sm-2:flex-col">
            <div className='md:h-screen md:w-1/5 md:max-h-full md:max-h-screen sm-1:w-full sm-1:h-20 sm-2:h-20 md-1:h-20'>
            <Card className="h-screen w-full max-w-1/5 p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray">
                            Akara podcast
                        </Typography>
                    </div>
                    <List>
                    {/* outset of slider podcast */}
                    <Accordion
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                            />
                        }
                        >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>

                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Podcast Section
                                </Typography>
                            </AccordionHeader>       
                        </ListItem>

                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem onClick={()=> setShowComponent("uploadpodcast")}>
                                <   ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    upload podcast
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    update podcast
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    list podcast
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    delete podcast
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    {/* end of section of slider podcast */}

                    {/* outset of section of slider category */}
                    <Accordion
                        open={open === 2}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                            />
                        }
                        >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Category Section
                            </Typography>
                            </AccordionHeader>
                        </ListItem>

                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    create category
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    update category
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    delete category
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    list category
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    {/* end of category section */}
                    {/* outset of section of slider playlist */}
                    <Accordion
                        open={open === 3}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                            />
                        }
                        >
                        <ListItem className="p-0" selected={open === 3}>
                            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Playlist Section
                            </Typography>
                            </AccordionHeader>
                        </ListItem>

                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    create playlist
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    update playlist
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    delete playlist
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    list playlist
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    {/* end of playlist section */}
                    {/* outset of section of slider favourite */}
                    <Accordion
                        open={open === 5}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""}`}
                            />
                        }
                        >
                        <ListItem className="p-0" selected={open === 5}>
                            <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Favourite Section
                            </Typography>
                            </AccordionHeader>
                        </ListItem>

                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    list favourite
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    omit all favoute
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    {/* end of favourite section */}
                    {/* outset of section of slider trending */}
                    <Accordion
                        open={open === 4}
                        icon={
                            <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                            />
                        }
                        >
                        <ListItem className="p-0" selected={open === 4}>
                            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Trending Section
                            </Typography>
                            </AccordionHeader>
                        </ListItem>

                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    list trending
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    hour trending
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    today trending
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    week trending
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    {/* end of playlist section */}
                    <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>

                </List>
            </Card>
            </div>
            <div className='md:max-h-screen md:w-4/5  sm-1:max-h-screen sm-1:h-screen sm-2:h-screen md-1:h-screen'>
                <div className="w-full h-1/5">
                    <Navbar className="mx-auto max-w-screen-xl p-2 rounded-none ">
                                <div className="relative mx-auto flex items-center text-blue-gray-900">
                                    <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                                    <NavList />
                                    </div>
                                    <IconButton
                                    size="sm"
                                    color="blue-gray"
                                    variant="text"
                                    onClick={toggleIsNavOpen}
                                    className="ml-auto mr-2 lg:hidden"
                                    >
                                    <Bars2Icon className="h-6 w-6" />
                                    </IconButton>
                                    <ProfileMenu />
                                </div>
                                <MobileNav open={isNavOpen} className="overflow-scroll">
                                <NavList />
                            </MobileNav>
                            </Navbar>
                        </div>
                    <div className="w-full h-4/5 flex flex-col justify-center items-center overflow-scroll scroll-smooth">
                          
                          {
                            isShowComponent === "" ? <Graphs /> 
                            : isShowComponent === "uploadpodcast" ? 
                            <div className="flex shadow-lg rounded-sm p-2 justify-center items-center flex-col max-w-screen w-5/6">
                                  <Upload refresh={refresh}/> 
                            </div>
                            : ""
                          }
                         
                        
                    </div>
            </div>
        </div>
    )
}