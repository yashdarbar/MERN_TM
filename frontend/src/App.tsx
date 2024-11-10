//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import {
    BrowserRouter as Router,
    Route,
    Navigate,
    BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./route";


//import Routes from "./routes";


// import { Button } from "./components/ui/button";
// import {
//     BriefcaseBusiness,
//     Clock4,
//     Filter,
//     MoreHorizontal,
//     Plus,
//     TimerOff,
// } from "lucide-react";
// import { Input } from "./components/ui/input";
// import { Card, CardContent } from "./components/ui/card";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";

function App() {
    //const [count, setCount] = useState(0)

    // const onclick = () => {
    //   console.log("get back to work");
    //   alert('clicked')
    //  }

    



    return (
        <>
            <div className="">
                {/* Main Content */}
                <BrowserRouter>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
