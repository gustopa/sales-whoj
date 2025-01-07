import React, { useState } from "react";
import Navbar from "$/components/navbar";
import Sidebar from "$/components/sidebar";
import {Head} from '@inertiajs/react'
import {usePage} from "@inertiajs/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
export default function Layout(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);
  const {name} = usePage().props
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  document.documentElement.dir = "ltr";
  return (
    <>
        <Head>
          <title>{props.title}</title>
        </Head>
        <div className="flex h-full w-full">
          <Sidebar open={open} onClose={() => setOpen(false)} />
          {/* Navbar & Main Content */}
          <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
            {/* Main Content */}
            <main
              className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
            >
              {/* Routes */}
              <div className="h-full px-3">
                <Navbar
                  name={name}
                  onOpenSidenav={() => setOpen(true)}
                  logoText={"Horizon UI Tailwind React"}
                  brandText={props.page}
                  // secondary={getActiveNavbar(routes)}
                  {...rest}
                />
                <div className="pt-7 mx-auto mb-auto h-full min-h-[92dvh] p-2 md:pr-2">
                    {props.children}
                </div>

              </div>
            </main>
          </div>
        </div>
    </>
  );
}
