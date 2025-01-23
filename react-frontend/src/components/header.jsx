/**
 * Header Component
 *
 * This component renders the navigation header for the application.
 * It includes links to different routes and a greeting message.
 *
 * Example usage:
 * <Header />
 */

import { Link } from "react-router-dom";
import { routes } from "../routes/route";

const Header = () => {
    const filteredRoutes = routes.filter((r) => r.action === "view");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* Brand */}
                <a className="navbar-brand" href="/">
                    CRUD
                </a>
                {/* Toggler button for mobile view */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Collapsible content */}
                <div className="collapse navbar-collapse" id="navbarText">
                    {/* Navigation links */}
                    {filteredRoutes.map((route) => {
                        return (
                            <ul
                                key={route.name}
                                className="navbar-nav me-auto mb-2 mb-lg-0"
                            >
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === route.path
                                                ? "active"
                                                : ""
                                        }`}
                                        to={route.path}
                                    >
                                        <route.icon className="me-2" />
                                        {route.name}
                                    </Link>
                                </li>
                            </ul>
                        );
                    })}
                    {/* Greeting message */}
                    <span className="navbar-text">Hello, Admin!</span>
                </div>
            </div>
        </nav>
    );
};

export default Header;
