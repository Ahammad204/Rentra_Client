import useAuth from "@/Hooks/useAuth";
import { FaHandHoldingMedical, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {


  const { user } = useAuth();

//   if(isAdminLoading || isVolunteerLoading){
//     return <Loading></Loading>
//   }

  return (
    <div className="md:flex">
      {/* dashboard side bar */}
      <div className="md:w-64 min-h-screen  bg-[#0fb894] text-white">
        <ul className="menu p-4">
          {/* {isAdmin ? (
            <>
               <li ><NavLink className=" mb-3 flex justify-center text-center w-full"  to="/dashboard/admin">Admin Home</NavLink></li>
              <hr />
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-blood-donation-request">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  All Blood Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  Content Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management/add-blog">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  Add Blog
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          ) : (
            <></>
          )}
             {isAdmin || isVolunteer ? (
            <>
               <li ><NavLink className=" mb-3 flex justify-center text-center w-full"  to="/dashboard/volunteer">Volunteer Home</NavLink></li>
              <hr />
              <li>
                <NavLink to="/dashboard/all-blood-donation-request">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  All Blood Donation Request
                </NavLink>
              </li>
                <li>
                <NavLink to="/dashboard/content-management">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  Content Management
                </NavLink>
              </li>
              
              <div className="divider"></div>
            </>
          ) : (
            <></>
          )}
           */}
          {/* shared nav links */}
          <li ><NavLink className=" mb-3 flex justify-center text-center w-full"  to="/dashboard">Home</NavLink></li>
          <hr />
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myservice">
              <FaHome></FaHome>
              My services
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myserviceRequest">
              <FaHome></FaHome>
              My services Request
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myrentalItem">
              <FaHome></FaHome>
              My Rental Item
            </NavLink>
          </li>

          
          <li>
            <NavLink to="/dashboard/createTask">
              <FaHandHoldingMedical />
              Create Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/serviceRequest">
              <FaHandHoldingMedical />
              Create Service Request
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/rentPost">
              <FaHandHoldingMedical />
              Create Item rent post
            </NavLink>
          </li>
         
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <p className="text-4xl uppercase border-y-4 py-4
         text-center bg-[#0fb894] text-white">
          {" "}
          Welcome {user?.name}
        </p>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
