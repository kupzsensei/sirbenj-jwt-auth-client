# React Example

This example demonstrates how to use `sirbenj-jwt-auth-client` in a React application.

## Running the Example

1.  Navigate to this directory:

    ```bash
    cd examples/react-example
    ```

2.  Install the dependencies:

    ```bash
    npm install
    npm install react-router-dom @tanstack/react-query
    ```

3.  Start the development server:

    ```bash
    npm start
    ```

This will open a new browser tab with the example application.

The example demonstrates:
- AuthProvider + useAuth
- React Router v6 guarded routes with RequireAuth and RequirePermissions
- TanStack Query integrations via useAuthQuery and useAuthMutation
