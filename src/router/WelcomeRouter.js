import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from "../components/core/Login.js"
import Logout from "../components/core/Logout.js"
import MainRoute from './MainRouter.js';

function WelcomeRouter(){

    const pubUrl = process.env.PUBLIC_URL;

    return(
        <>
            <Router>
                <Routes>
                    <Route path={pubUrl+"/login"} element={<Login/>} />
                    <Route path={pubUrl+"/logout"} element={<Logout/>}/>
                    <Route path={"*"} element = {<MainRoute/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default WelcomeRouter;