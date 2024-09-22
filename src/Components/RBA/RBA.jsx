import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Decode from "../JWT/Decode";

const RoleBasedAuthentication = () => {
    const role = useSelector((state) => state.setLog.role);
    const navigate = useNavigate();

    useEffect(() => {        
        navigate('/schedule');
    }, [role, navigate]);

    return null; 
};

export default RoleBasedAuthentication;
