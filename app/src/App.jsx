import React, { useEffect } from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { checkAuthentication } from "./services/UserService";
import Home from './pages/Home';
import PostAdd from './pages/PostAdd';
import Login from './pages/Login';
import PostsList from "./pages/PostsList";

const routes = [
    {
        path: "/",
        title: 'Home',
        exact: true,
        component: Home
    },
    {
        path: "/posts", // /posts/:category
        title: 'The posts',
        component: PostsList,
        requireAuth: true
    },
    {
        path: "/post/create",
        title: 'Add a new post',
        component: PostAdd,
        requireAuth: true
    },
    {
        path: "/login",
        title: 'Login',
        component: Login
    }
];

function App() {
    // if (authenticated)  { routes.filter((route) => route.path !== '/login'); }
    // const history = useHistory();

    useEffect(() => {
        checkAuthentication().then((res) => {
            if (res && res.data) {
                console.log('authenticated ==> ', res.data.authenticated);
                // TODO faire ca avec Redux
            }
        });
    }, []);

    return (
        <div>
            <ul>
                {routes.map((route, index) => <li key={index}><Link to={route.path}>{route.title}</Link></li>)}
            </ul>

            {/* connected && <button onClick={() => { history.push("/"); }>Sign out</button>*/}
            <hr />

            <Switch>
                {routes.map((route, index) => {
                    if (route.requireAuth) {
                        const Component = route.component;
                        return (
                            <PrivateRoute {...route} key={index} authenticated={true}>
                                <Component />
                            </PrivateRoute>
                        );
                    }

                    return <Route key={index} {...route} />;
                })}
            </Switch>
        </div>
    );
}

export default App;

// TODO mettre propTypes
function PrivateRoute({ children, authenticated, ...rest }) {

    return (
        <Route
            path={rest.path}
            render={({ location }) => authenticated ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }}/>) }
        />
    );
}
