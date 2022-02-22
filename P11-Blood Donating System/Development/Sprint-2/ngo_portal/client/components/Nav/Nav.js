import Link from "next/link";
import { useContext } from "react";
import { NGOContext } from "../../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [state, setState] = useContext(NGOContext);
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/");
  };

  return (
    <nav className="nav bg-dark d-flex justify-content-between p-2">
      <div className="bg d-flex align-items-start">
        <Link href="/">
          <a className="nav-link text-light">Home</a>
        </Link>
      </div>
      {state === null ? (
        <>
          <div className="d-flex align-items-end">
            <Link href="/login">
              <a className="nav-link text-light">Login</a>
            </Link>
            <Link href="/register">
              <a className="nav-link text-light">Register</a>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link href="/members">
            <a className="nav-link text-light">Manage</a>
          </Link>
          <div className="d-flex align-items-end">
            <a className="nav-link text-light">
              {state && state.ngo && state.ngo.name}
            </a>
            <a className="nav-link text-light" onClick={logout}>
              Logout
            </a>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
