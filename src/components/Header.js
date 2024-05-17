import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo_unactive.png";
import logoActive from "./logo_active.png";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Create", href: "/create_game" },
  { name: "Join", href: "/join_game" },
  { name: "Profile", href: "/profile" },
  { name: "Logout", href: "/logout" },
];

export default function Header(props) {
  const [isLogoActive, setIsLogoActive] = useState(false);

  return (
    <>
      <div className="my-2 flex items-center">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => setIsLogoActive(false)}
            className={({ isActive }) => {
              return (
                "px-5 py-1 text-base no-underline " +
                (!isActive
                  ? "text-slate-200 hover:text-white font-Noto_Sans_Lisu font-medium"
                  : "text-yellow-400 font-Noto_Sans_Lisu font-medium")
              );
            }}
          >
            {item.name === "About"
              ? ({ isActive }) =>
                  isActive ? (
                    <a href={item.href}>
                      <img
                        src={logoActive}
                        alt="HTML tutorial"
                        style={{ height: "30px", width: "auto" }}
                      />
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      onMouseEnter={() => setIsLogoActive(true)}
                      onMouseLeave={() => setIsLogoActive(false)}
                    >
                      <img
                        src={isLogoActive ? logoActive : logo}
                        alt="HTML tutorial"
                        style={{ height: "30px", width: "auto" }}
                      />
                    </a>
                  )
              : item.name}
          </NavLink>
        ))}
      </div>
      <div>{props.children}</div>
    </>
  );
}
