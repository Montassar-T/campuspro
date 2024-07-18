import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Login from "../components/Login";
import { Wrapper } from "../components/Wrapper";
import Workers from "../components/Workers";
import { Absences } from "../components/Absences";
import App from "../App";
const accessToken = Cookies.get('accessToken')
import Cookies from "js-cookie";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route  path="/login" element={
              accessToken ? <Navigate to='/workers' replace /> : <Login />
            } />
      <Route element={<Wrapper />}>
        <Route path="workers" element={<Workers />} />
        <Route path="absences" element={<Absences />} />
      </Route>
     

      <Route exact path="/" element={<Navigate to ="/login"/>}  />
      <Route path="*" element={<Navigate to="/login" />} />
    </Route>
  )
);

export default router;
