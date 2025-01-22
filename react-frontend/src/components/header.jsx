/**
 * Header Component
 * 
 * This component renders the navigation header for the application.
 * It includes links to different routes and a greeting message.
 * 
 * Example usage:
 * <Header />
 */

import { routes } from "../routes/route";

const Header = () => {
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
                    {routes.map((route) => {
                        return (
                            <ul
                                key={route.name}
                                className="navbar-nav me-auto mb-2 mb-lg-0"
                            >
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href={route.path}
                                    >
                                        <route.icon className="me-2" />
                                        {route.name}
                                    </a>
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