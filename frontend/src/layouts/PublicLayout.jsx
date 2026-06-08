import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarTopNews from "../components/SidebarTopNews";

const PublicLayout = () => {
    return (
        <div>
            <Navbar />

            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 3 }}>
                    <Outlet />
                </div>

                <div style={{ flex: 1 }}>
                    <SidebarTopNews />
                </div>
            </div>
        </div>
    );
};

export default PublicLayout;