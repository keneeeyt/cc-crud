/**
 * This file defines the routes for the application.
 * Each route includes a path, name, icon, and the component to be rendered.
 */

import { People } from 'react-bootstrap-icons';
import CustomerList from '../pages/customers/customer-list';
import AddCustomer from '../pages/customers/add-customer';
import EditCustomer from '../pages/customers/edit-customer';

/**
 * Array of route configurations for the application.
 * @type {Array<{ path: string, name: string, icon: React.ComponentType, component: React.ComponentType }>}
 */
export const routes = [
    {
        path: "/customers",
        name: "Customers",
        icon: People,
        component: CustomerList,
        action: "view"
    },
    {
        path: "/customers/add",
        component: AddCustomer,
        action: "create"
    },
    {
        path: "/customers/edit/:id",
        component: EditCustomer,
        action: "update"
    }
];