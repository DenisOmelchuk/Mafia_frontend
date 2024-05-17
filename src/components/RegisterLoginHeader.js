import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Register", href: "/register/" },
  { name: "Login", href: "/login/" },
];

export default function RegisterLogin() {
  return (
    <div className="sign_in_up_header">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) => {
            return (
              "px-10 py-1 text-2xl no-underline " +
              (!isActive
                ? "text-slate-200 hover:text-white font-Noto_Sans_Lisu font-medium"
                : "text-yellow-400 font-Noto_Sans_Lisu font-medium")
            );
          }}>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
