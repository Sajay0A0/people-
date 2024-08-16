import Usernavbar from "./Navbar";
import Sidenav from "./Sidenav";
import { FiFilter } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../userstyle/Page2style.css'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { myContext } from "./Context";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSettingsBackupRestore } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";






export default function Page2(){
    const {user,setUser}=useContext(myContext)
    const [showModal, setShowModal] = useState(false);
    const [userDetais, setUserDetails] =useState(false)


    useEffect(()=>{
        fetchUser();
    },[]);

    const fetchUser=async()=>{
        try {
            const response =await axios.get('http://localhost:5000/api/users/getdata');
            setUser(response.data);
    
        } catch (error) {
            console.error('error fetch product:',error);
            
        }
    };
    console.log("user",user);

    const confirmDelete=(id,deleteUserName)=>{
        if (window.confirm(`are you sure you want to delete this product,"${deleteUserName}"?`)) {
            deleteUser(id);
            console.log("deleteUser",id);
        }
      };
      const deleteUser =async(id)=>{
        try {
            await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
            fetchUser();
        } catch (error) {
            console.error('error deleting user:',error);
            
            
        }
      };

      const handleShowModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);

      const handleShowDetais =() => setUserDetails(true);
      const handleCloseDetais =() => setUserDetails(false)



    return(
        <div>
            <Usernavbar/>
            <div className="d-flex gap-4">
            <Sidenav/>
            <div className="rounded w-4/5 p-3 m-3" style={{border:'solid 1px #ddd',}}>
            <div>
                <div style={{gap:'15px'}} className="d-flex  border-bottom mt-1 mb-3">
            <h5  style={{marginRight:'41%'}}>Team members</h5>
            <IoIosSearch className="d-flex position-absolute text-gray-500" style={{margin:'10px 0 0 62%',fontSize:'22px'}}/>
            <input className="border w-80  " style={{height:'40px',borderRadius:'8px 8px 0px 0px'}} type="text" placeholder="   Search" />
            <Link ><FiFilter className="text-gray-700 font-thin mt-2" style={{fontSize:'25px'}}/></Link>
            <button onClick={handleShowModal} className="border-none rounded w-36 h-10  bg-violet-700 mb-3" style={{color:'white'}}>+ ADD MEMBER</button>
            
            </div>
            <table className="border table">
        <thead >
        <tr className="table-head "  >
            <th className="table-head" style={{color:'#1b1b1b'}} >Name</th>
            <th></th>
            <th className="table-head" style={{color:'#1b1b1b'}} >Status</th>
            <th className="table-head" style={{color:'#1b1b1b'}}>Role</th>
            <th className="table-head" style={{color:'#1b1b1b'}}>Email address</th>
            <th className="table-head" style={{color:'#1b1b1b'}}>Team</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        {user.map((user) => (
    <tbody key={user._id}>
        <tr>
            <img className="rounded-full h-18 d-flex position-absolute mt-3" onClick={handleShowDetais} src={user.image} alt="Avatar" width="55px" />
            <p className="border-none mt-3" onClick={handleShowDetais} style={{ margin: '10px 10px -15px 60px' }}>{user.name}</p>
            <p className="border-none"onClick={handleShowDetais} style={{ margin: '0px 10px 0px 60px', color: '#414141', fontSize: '13px' }}>{user.userid}</p>
            <td></td>
            <td style={{ paddingTop: '30px' }}>
                <p className="rounded" onClick={handleShowDetais} style={{ border: 'solid 1px #ddd', width: '70px', display: 'flex', paddingLeft: '25px' }}>{user.status}</p>
            </td>
            <td className="table-details" onClick={handleShowDetais} style={{ paddingTop: '30px' }}>{user.role}</td>
            <td onClick={handleShowDetais} style={{ paddingTop: '30px' }}>{user.email}</td>
            <td onClick={handleShowDetais} style={{ paddingTop: '30px' }}>{user.team}</td>
            <th></th>
            <td className="border-none mt-4">
                <button className="border-none ml-3 mt-4" style={{fontSize:'20px'}} onClick={() => confirmDelete(user._id, user.name)}><RiDeleteBin6Line/></button>
                <button className="border-none ml-4" style={{fontSize:'22px'}} data-bs-toggle="modal" data-bs-target={`#modal-${user._id}`}><MdOutlineModeEdit/></button>
            </td>
        </tr>

        <div className="modal fade " id={`modal-${user._id}`} tabIndex="-1" aria-labelledby={`modalLabel-${user._id}`} aria-hidden="true">
            <div className="modal-dialog w-full rounded">
                <div className="modal-conten  w-full rounded">
                <div>
                      <h5 className="modal-title ml-5 mt-3 font-bold">Edit Profile</h5>
                        </div>
                    <div>
                        <img className="modal-title d-flex justify-center rounded-full w-25"  style={{display:'flex',margin:' 30px 0 0 36%'}} src={user.image} id={`modalLabel-${user._id}`}/> <br />
                    </div>
                    <div className=" d-flex ml-10 gap-8 " >
                        <button className="border w-40 h-8 ml-4 "> <MdSettingsBackupRestore className="d-flex position-absolute pt-1" style={{fontSize:'22px',display:'flex'}}/>CHANGE PHOTO</button>                         
                        <button className="border w-40 h-8 ml-4  "><RiDeleteBin6Line className="d-flex position-absolute pt-1" style={{fontSize:'20px',display:'flex'}}/>REMOVE PHOTO</button>
                        </div>
                    <div className="modal-body">
                        <div className="d-flex mt-5">
                        <label className="position-absolute" style={{marginTop:'-25px'}}>Name</label><br />
                        <p className="rounded " style={{width:'200px',height:'35px',border:'solid 1px #ddd', padding:'5px 0 0 10px'}}>{user.name}</p>
                        <label className="position-absolute" style={{margin:'-25px 0 0 50%'}}>Email</label><br />
                        <p className="rounded " style={{width:'210px',height:'35px',border:'solid 1px #ddd',margin:"0 0 0 40px",padding:'5px 0 0 10px'}}>{user.email}</p>

                        </div>
                        <div className="d-flex mt-4">
                        <label className="position-absolute " style={{marginTop:'-25px'}}>Role</label><br />
                        <p className="rounded " style={{width:'200px',height:'35px',border:'solid 1px #ddd', padding:'5px 0 0 10px'}}>{user.role}</p>
                        <label className="position-absolute" style={{margin:'-25px 0 0 50%'}}>Status</label><br />
                        <p className="rounded "  style={{width:'210px',height:'35px',border:'solid 1px #ddd',margin:"0 0 0 40px",padding:'5px 0 0 10px'}}>{user.status}</p>
                        </div>
                        <div className="d-flex mt-4">
                        <label className="position-absolute" style={{marginTop:'-25px'}}>Team</label><br />
                        <p className="rounded " style={{width:'500px',height:'35px',border:'solid 1px #ddd', padding:'5px 0 0 10px'}}>{user.team}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save </button>
                     </div>
                   </div>
                  </div>
                </div>
              </tbody>
            ))}
           </table>
           {showModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog bg-gray-400 w-full rounded">
                        <div className="modal-content w-full rounded">
                            <div className="modal-heade">
                                <h5 className="modal-title ml-5 mt-3 font-bold">Add New Member</h5>
                            </div>
                            <div className="modal-body">
                                {user.length > 0 && (
                                <div>
                                    <div>
                                    <img className="modal-title d-flex justify-center rounded-full w-25" style={{display:'flex',margin:' 30px 0 0 36%'}} src={user[0].image} id={`modalLabel-${user[0]._id}`}/> <br />
                                    </div>
                                    <div className=" d-flex ml-10 gap-8 " >
                                    <button className="border w-40 h-8 ml-4 "> <MdSettingsBackupRestore className="d-flex position-absolute pt-1"
                                     style={{fontSize:'22px',display:'flex'}}/>CHANGE PHOTO</button>                         
                                    <button className="border w-40 h-8 ml-2  "><RiDeleteBin6Line className="d-flex position-absolute pt-1" 
                                    style={{fontSize:'20px',display:'flex'}}/>REMOVE PHOTO</button>
                                    </div>

                                <div  className="d-flex mt-5">
                                    <label className="position-absolute" style={{ marginTop: '-25px',fontSize:'16px',fontWeight:'600' }}>Name</label><br />
                                    <p className="rounded " style={{width:'200px',height:'35px',border:'solid 1px #ddd', padding:'5px 0 0 10px'}}>{user[0].name}</p>
                                    <label className="position-absolute" style={{ margin: '-25px 0 0 50%',fontSize:'16px',fontWeight:'600' }}>Email</label><br />
                                    <p className="rounded " style={{width:'210px',height:'35px',border:'solid 1px #ddd',margin:"0 0 0 47px",padding:'5px 0 0 10px'}}>{user[0].email}</p>
                                    </div>
                                <div className="d-flex mt-4">
                                    <label className="position-absolute" style={{ marginTop: '-25px',fontSize:'16px',fontWeight:'600' }}>Role</label><br />
                                    <p className="rounded " style={{width:'200px',height:'35px',border:'solid 1px #ddd', padding:'5px 0 0 10px'}}>{user[0].role}</p>
                                    <label className="position-absolute" style={{ margin: '-25px 0 0 50%',fontSize:'16px',fontWeight:'600' }}>Status</label><br />
                                    <p className="rounded "  style={{width:'210px',height:'35px',border:'solid 1px #ddd',margin:"0 0 0 47px",padding:'5px 0 0 10px'}}>{user[0].status}</p>
                                    </div>
                                <div className="d-flex mt-4">
                                     <label className="position-absolute" style={{marginTop:'-25px'}}>Team</label><br />
                                     <p className="rounded text-violet-600  d-flex" style={{width:'500px',height:'35px',border:'solid 1px #ddd', padding:'5px 0 0 10px'}}> 
                                        <span>{user[0].team} </span></p>
                                     </div>
                                </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


                {userDetais && (
                <div className="modal fade show " tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog bg-gray-200 d-flex  rounded" style={{justifyContent:'end',width:'500px',margin:'7% 0 0 63.5%'}}>
                        <div className="modal-content w-76  h-full rounded" style={{width:'500px'}}>
                        <button type="button" className="close" style={{display:'flex',fontSize:'40px',margin:'-20px 0 0 95%'}} onClick={handleCloseDetais} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                           
                            <div className="modal-body">
                                {user.length > 0 && (
                                <div>
                                    <div>
                                        <div className="modal-header bg-sky-800" style={{backgroundColor:''}}>
                                       

                                    <img className="modal-title d-flex justify-cente rounded-full w-25" style={{display:'flex',margin:' 0 0 0 0',}} 
                                    src={user[0].image} id={`modalLabel-${user[0]._id}`}/> <br />
                                    <p className=" text-white-500 " style={{width:'400px',height:'35px',color:'white',fontSize:'20px',padding:'0 0 0 25px'}}>{user[0].name}</p> <br />
                                    <div className="d-flex position-absolute mt-5 " style={{padding:'0 0 0 25%'}}>
                                    <p className=" position-absolue" style={{width:'30px',height:'35px',color:'white', fontSize:'14px',padding:'5px 0 0 10px'}}>{user[0].userid}</p>
                                    <label className="position-absolute" style={{width:'60px',margin:'30px 0 0 10px',color:'white'}}> User ID</label>
                                    </div>
                                    <div className="border-end position-absolute text-sky-800" style={{margin:'10% 0 0 42%'}}>.</div>
                                    <div>
                                    <p className=" d-flex position-re;ative mt-14" style={{width:'200px',height:'35px', fontSize:'13px',color:'white', padding:'8px 20px 20px -10px'}}>{user[0].role}</p>
                                    <label className="position-absolute" style={{width:'60px',margin:'-22px 0 0 10px',color:'white'}}> Role</label>
                                    </div>
                                    </div>
                                    </div>

                                    <div className=" d-flex " >
                                    <p className="border h-10 mt-2 bg-gray-200 text-gray-700 "style={{padding:'6px 0 0 10px',width:'500px',fontSize:'18px',fontWeight:'500' }} >Personal Information</p>                         
                                    
                                    </div>
                                
                                <div className="d-flex mt-4 border-bottom h-5"> <label style={{marginTop:'-15px'}}> <span style={{margin:' 0 100px 0 0 '}}>Date of Birth</span> {user[0].dob}</label></div>
                                <div className="d-flex mt-4 border-bottom h-5"> <label style={{marginTop:'-15px'}}> <span style={{margin:' 0 140px 0 0 '}}>Gender</span> {user[0].gender}</label></div>
                                <div className="d-flex mt-4 border-bottom h-5"> <label style={{marginTop:'-15px'}}> <span style={{margin:' 0 115px 0 0 '}}>Nationality</span> {user[0].nationality}</label></div>
                                <div className="d-flex mt-4 border-bottom h-5"> <label style={{marginTop:'-15px'}}> <span style={{margin:' 0 110px 0 0 '}}>Contact no.</span> {user[0].contact}</label></div>
                                <div className="d-flex mt-4 border-bottom h-5"> <label style={{marginTop:'-15px'}}> <span style={{margin:' 0 87px 0 0 '}}>E-mail Address</span> {user[0].email}</label></div>
                                <div className="d-flex mt-4 border-bottom h-5"> <label style={{marginTop:'-15px'}}> <span style={{margin:' 0 52px 0 0 '}}>Work email Address</span> {user[0].wrkemail}</label></div>

                                </div>
                                
                                )}
                            </div>
                            <div className=" d-flex " >
                                    <p className="border h-10 mt-2 bg-gray-200 text-gray-700 "style={{padding:'6px 0 0 10px',width:'500px',fontSize:'18px',fontWeight:'500' }} >Research & Publication </p>                         
                                    </div>
                                    <div>
                                        <h6 style={{fontSize:'15px',margin:'2px 0 0 20px'}} >AI and User Experience: The Future of Design</h6>
                                        <p className="text-gray-600" style={{fontSize:'12px',margin:'2px 0 0 20px'}}>Published in the Journal of  Modern Design . 2022</p>
                                    </div>
                            {/* <div className="modal-footr">
                                <button type="button d-flex" style={{margin:'0 0 0 85%'}} className="btn btn-secondary" onClick={handleCloseDetais}>Cancel</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}


        </div>
       </div>
      </div>
    </div>
    )
}