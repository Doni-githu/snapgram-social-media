import { Routes, Route } from "react-router-dom"
import { SignupForm, SigninForm } from "./_auth/forms"
import { Home } from "./_root/pages"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import AllUsers from "./_root/pages/AllUsers"
import CreatePost from "./_root/pages/CreatePost"
import EditPost from "./_root/pages/EditPost"
import Explore from "./_root/pages/Explore"
import Saved from "./_root/pages/Saved"
import PostDetails from "./_root/pages/PostDetails"
import Profile from "./_root/pages/Profile"
import UpdateProfile from "./_root/pages/UpdateProfile"
const AppRouter = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
            </Route>

            {/* private routes */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/update-post/:id" element={<EditPost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/profile/:id/*" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpdateProfile />} />
            </Route>
        </Routes>
    )
}

export default AppRouter