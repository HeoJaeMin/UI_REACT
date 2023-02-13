import axios from "axios";
import { continueOauth, TryLogout } from "../oauth/oauth";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_RESOURCE_URI
})

axiosInstance.interceptors.request.use(//서버에 요청을 보낼 때 조건을 설정합니다.
    function(config){
        const token = JSON.parse(window.localStorage.getItem('ens_qms_token')).access_token;

        config.headers = {//header를 설정합니다.
            'Authorization': `Bearer ${token}`,//인증 토큰을 설정합니다.
            'Accept': 'application/json',
            'Content-Type': "application/json; charset=utf-8"
        };
        return config;
    },
    function(error){
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(//서버에서 데이터를 받을 때 조건을 설정합니다.
    function(response){
        return response;
    },
    function(error){

        if(error.response.status===401){//토큰 만료로 인한 오류일 때 토큰 갱신을 시도합니다.
            continueOauth().then(function(token){
                if(token===null){
                    alert("토큰이 만료되었습니다. 로그인 페이지로 돌아갑니다.")
                    TryLogout();
                }else{
                    window.localStorage.setItem("ens_qms_token", token);
                    error.config.headers.Authorization = `Bearer ${token}`;
                    return axios.request(error.config);
                }
            })
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;