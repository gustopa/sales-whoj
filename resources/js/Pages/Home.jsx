import React from "react";
import Navbar from "$/components/navbar";
import Sidebar from "$/components/sidebar";
import {Head} from '@inertiajs/react'

export default function Admin(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  document.documentElement.dir = "ltr";
  return (
    <>
      <Head>
        <title>Dashboard</title>
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
                name={props.name}
                onOpenSidenav={() => setOpen(true)}
                logoText={"Horizon UI Tailwind React"}
                brandText={"Home"}
                // secondary={getActiveNavbar(routes)}
                {...rest}
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[90dvh] p-2 md:pr-2">
                  <h1 className="text-5xl dark:text-white">Home pages</h1>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
