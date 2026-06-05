import { Outlet } from "react-router-dom";
import CmsNavbar from "../components/CmsNavbar";

const CmsLayout = () => {
    return (
        <div>
            <CmsNavbar />

            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default CmsLayout;