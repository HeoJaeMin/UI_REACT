import { useState } from "react";
import { tryLogin } from "../../oauth/oauth";

function Login(){

    const [loginForm, setLoginForm] = useState({
        inputName: null,
        inputPassword: null
    })
    

    function handleInputChange(e){
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value  
        })
    };

    function login(e){
        e.preventDefault();
        tryLogin(loginForm);
    };

    return(
        <>
            <div>LOGIN PAGE</div>
            <div>
                <form id="loginForm" onSubmit={login}>
                    <input type="text" id="userId" name="inputName" placeholder="User Id" onChange={handleInputChange}/>
                    <input type="password" id="userPw" name="inputPassword" placeholder="Password" onChange = {handleInputChange}/>
                    <button type="submit">login</button>
                </form>
            </div>
        </>
    )
};

export default Login;