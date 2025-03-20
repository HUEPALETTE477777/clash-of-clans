import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Search from "../components/Search.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import PostDetail from "../pages/PostDetail.jsx";
import ClanDetail from "../pages/ClanDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <h2>ABOUT</h2>
            },
            {
                path: "/search",
                element: <Search/>
            },
            {
                path: "/contact",
                element: <h2>CONTACt</h2>
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/posts/:postId",  
                element: <PostDetail />
            },
            {
                path: "/clan/:clanTag",
                element: <ClanDetail />
            }
        ]
    }
])

export default router;