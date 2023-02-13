import { Route, Routes} from 'react-router-dom';

import Home from "../components/core/Home";
import NotFound from "../components/core/NotFound";
import Header from "../components/fragment/Header";
import Sidebar from "../components/fragment/Sidebar";

function MainRoute(){
    const pubUrl = process.env.PUBLIC_URL;

    return (
        <>
            <Sidebar/>
            <div style={{float:"left"}}>
                <Header/>
                <div>
                    iFrame section
                </div>
                <Routes>
                    <Route path={pubUrl+"/"} element = {<Home/>}/>
                    <Route path={"*"} element = {<NotFound/>}/>
                </Routes>
            </div>
        </>
    )
}

export default MainRoute;