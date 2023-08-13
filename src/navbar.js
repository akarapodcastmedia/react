import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
  } from "@material-tailwind/react";
  import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
   
  export default  function ProfileMenu() {
    return (
      <Navbar className="container-fluid bg-white-500 mx-auto mb-1 max-w-screen px-4 py-2">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Akara Podcast
          </Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <IconButton variant="Detail" color="blue-gray">
              <Cog6ToothIcon className="h-4 w-4" />
            </IconButton>
            <IconButton variant="about" color="blue-gray">
              <BellIcon className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button size="sm" className="!absolute right-1 top-1 rounded">
              Search
            </Button>
          </div>
        </div>
       
      </Navbar>
       
    );
  }