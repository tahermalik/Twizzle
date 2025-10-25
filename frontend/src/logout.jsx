import axios from "axios";
import { USER_API_END_POINTS } from "./utils/endpoints";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNull_T } from "./redux/slices/tweetSlice";
import { setNull_U } from "./redux/slices/userSlice";
export default function Logout() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
        const logout = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINTS}/logout`, { withCredentials: true });
                toast.success(res.data.message);
                dispatch(setNull_T())
                dispatch(setNull_U())
                navigate("/login");

            } catch (err) {
                const message = err?.response?.data?.message || "Something went wrong";
                toast.error(message);
            }
        };
        logout();
    }, [navigate]
    );


    return (
        <>
        </>
    )
}