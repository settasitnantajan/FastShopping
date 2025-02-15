import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from 'lucide-react';
import { toast } from "react-toastify";
import Logo from "../../public/pic/Logo.png"

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const logout = useEcomStore((s)=>s.logout)
  const userName = useEcomStore((s)=>s.userName)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const logOut = () => {
    logout()
    navigate('/')
    toast.success('Logout Successfully!!',{
      position: 'top-center'
    })
    
  }

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">



            <Link to={"/"} className="w-16 h-16">
              <img src={Logo}/>
            </Link>


            <NavLink 
            className={({isActive})=>
            isActive
            ? "bg-orange-300 text-white px-3 py-2 rounded-2xl text-sm font-medium"
            : "px-3 py-2 rounded-2xl text-sm font-medium hover:bg-orange-300 hover:text-white"
            }
            to={"/"}>
              Home
            </NavLink>



            <NavLink 
            className={({isActive})=>
            isActive
            ? "bg-orange-300 text-white px-3 py-2 rounded-2xl text-sm font-medium"
            : "px-3 py-2 rounded-2xl text-sm font-medium hover:bg-orange-300 hover:text-white"
            }
            
            to={"shop"}>
              Shop</NavLink>
            {/* Badge */}


            <NavLink 
            className={({isActive})=>
            isActive
            ? "bg-orange-300 text-white px-3 py-2 rounded-2xl text-sm font-medium"
            : "px-3 py-2 rounded-2xl text-sm font-medium hover:bg-orange-300 hover:text-white"
            } 
            to={"/cart"}>
              Cart
              { carts.length > 0 && 
                <span className="absolute top-0 bg-red-500 text-white rounded-full px-2">{carts.length}</span>
              }
            </NavLink>

            <div className="bg-orange-300 p-1 rounded-2xl text-center">
                <p className="text-[7px] text-white">Design by Settasit Nantajan</p>
            </div>
          </div>

          


          {
            userName
            ? <div className="flex items-center gap-4">
            <button 
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-full">
              <img 
              className="w-8 h-8"
              src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-student-avatars-flat-icons-pack-people-456332.png?f=webp&w=512" />
              <ChevronDown/>
            </button>

              {
                isOpen && 
                <div className="absolute mt-2 top-12 bg-white shadow-md z-50 rounded-2xl p-2">
                  <Link 
                  to={'/user/history'}
                  className="block px-2 py-2 hover:bg-gray-200 rounded-2xl">
                  History
                  </Link>
                  <button 
                  onClick={logOut}
                  className="block px-2 py-2 hover:bg-gray-200 rounded-2xl">
                  Logout
                  </button>
                  </div>
              }
          
              </div>
            : <div className="flex items-center gap-4">
          <NavLink 
            className={({isActive})=>
            isActive
            ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            } 
            to={"/register"}>
              Register</NavLink>


            <NavLink 
            className={({isActive})=>
            isActive
            ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            }
            to={"/login"}>
              Login</NavLink>
          </div>
          }
 
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
