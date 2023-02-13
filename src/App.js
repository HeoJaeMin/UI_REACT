import jwtDecode from "jwt-decode";
import axiosInstance from "./interceptor/axios";
import WelcomeRouter from "./router/WelcomeRouter";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slice/userSlice";
import { attachMenu } from "./redux/slice/menuSlice";

function App() {
  const token = JSON.parse(window.localStorage.getItem("ens_qms_token"));
  const dispatch = useDispatch();

  if(token===null){//OAuth 토큰이 없을 경우 로그인 페이지로 이동
    window.history.pushState(null, null, process.env.PUBLIC_URL+"/login");
    
  }else{
    const userId = jwtDecode(token.access_token).user_name;

      axiosInstance.get("/bi/userOne/"+userId).then((response)=>{
        
        dispatch(setUser(response.data));
      })
      .then(
        axiosInstance.get("/bi/ProgramUserGrant/InterceptorMenu").then(response=>{
          dispatch(attachMenu(response.data));
        })
      )
  }

  return (
    <div>
      <WelcomeRouter/>
    </div>
  )
}

export default App;