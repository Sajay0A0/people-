import { Link, useLocation } from "react-router-dom";
import { FaTableCellsLarge } from "react-icons/fa6";
import { BiFontSize } from "react-icons/bi";

export default function Sidenav() {
    const location = useLocation();

    return (
        <div className="flex flex-col h-screen w-70 p-2 mt-3 bg-white-800  text-black">
            <div className="mb-4">
                <Link
                    to="/page1"
                    className={`text-decoration-none text-xl font-medium block gap-2 py-2 px-3 rounded text-[#000000] hover:text-purple-700 flex ${
                        location.pathname === "/page1" ? "text-purple-700"  : ""
                    }`}
                >
                    <FaTableCellsLarge className="mt-1 size-6 font-black" /> Overview
                </Link>
                <Link
                    to="/page2"
                    className={`text-decoration-none text-xl font-medium block gap-2 py-2 px-3 rounded text-[#000000] hover:text-purple-700 flex ${
                        location.pathname === "/page2" ? "text-purple-700" : ""
                    }`}
                >
                    <FaTableCellsLarge className="mt-1 size-6 font-black" /> People Directory
                </Link>
            </div>
           
        </div>
    );
}
