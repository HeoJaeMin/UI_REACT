function Header(){

    return(
        <div>
            <div style={{float:"left"}}>
                this is Header!
            </div>
            <div style={{float:"right"}}>
                <a href={process.env.PUBLIC_URL+"/logout"}>LOGOUT</a>
            </div>
        </div>
    )
};

export default Header;