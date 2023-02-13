import axios from "axios";
import sha256 from "sha256";
import { encode } from "base-64";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/slice/userSlice";

export const oauthInfo = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    accessTokenUri: process.env.REACT_APP_CLIENT_TOKEN_URI,
    scope: ['trust'],
    grant_type: 'password'
};

export function tryLogin(loginInfo){
    const formData = new FormData();
    formData.append('username', loginInfo.inputName);
    formData.append('password', sha256(loginInfo.inputPassword));
    formData.append('grant_type', oauthInfo.grant_type);

    axios.post(oauthInfo.accessTokenUri,
        formData,
        {
            headers: {
                'Authorization': 'Basic '+encode(oauthInfo.clientId+":"+oauthInfo.clientSecret),
                'Content-Type': 'multipart/form-data',
            }
            
        }
    )
    .then(response=>{
        const data = response.data;
        window.localStorage.setItem('ens_qms_token', JSON.stringify(data) )
        
        window.location.href= process.env.PUBLIC_URL+"/"
    })
    .catch(()=>{
        alert('아이디 또는 비밀번호가 정확하지 않습니다.');
    })
    ;
}

export function TryLogout(){
    const dispatch = useDispatch();
    dispatch(deleteUser());
    window.localStorage.removeItem("ens_qms_token");
    window.location.href = process.env.PUBLIC_URL+"/";
}

export async function continueOauth(){
    const refreshToken = JSON.parse(window.localStorage.getItem('ens_qms_token')).refresh_token;

    const formData = new FormData();
    formData.append('refresh_token', refreshToken);
    formData.append('grant_type', 'refresh_token')

    axios.post(oauthInfo.accessTokenUri, formData,
        {
            headers: { 
                'Authorization': 'Basic '+encode(oauthInfo.clientId+":"+oauthInfo.clientSecret),
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    .then(function(response){
        return JSON.stringify(response.data);
    })
    .error(function(){
        return null;
    })
}