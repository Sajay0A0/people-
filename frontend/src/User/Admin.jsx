import { useContext, useEffect, useState } from "react"
import { myContext } from "./Context"
import axios from "axios";

export default function Admin(){
  const {user,setUser} = useContext(myContext)
  const [image,setImage]=useState('');
  const [name,setName]=useState('');
  const [userid,setUserid]=useState('');
  const [status,setStatus]=useState('');
  const [role,setRole]=useState('');
  const [email,setEmail]=useState('');
  const [team,setTeam]=useState('');
  const [dob,setDob]=useState('');
  const [gender,setGender]=useState('')
  const [nationality,setNationality]=useState('')
  const [contact,setContact]=useState('')
  const [wrkemail,setWrkemail]=useState('')
  const [edituser,setEdituser]=useState(null);


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

const addUser=async()=>{
    try {
       await axios.post('http://localhost:5000/api/users/add',{ image:image,name:name,userid:userid,status:status,role:role,email:email,
        team:team,dob:dob,gender:gender,nationality:nationality,contact:contact,wrkemail:wrkemail},
       (req,res)=>console.log(req.body));
       fetchUser()

       setImage('');
       setName('');
       setUserid('');
       setStatus('');
       setRole('');
       setEmail('');
       setTeam('');
       setDob('');
       setGender('');
       setNationality('');
       setContact('');
       setWrkemail('');


    } catch (error) {
        console.error('error adding product',error );
        
    }
};


const editUser = (user)=>{
    setEdituser(user._id);
    setImage(user.image);
    setName(user.name);
    setUserid(user.userid);
    setStatus(user.status);
    setRole(user.role);
    setEmail(user.email);
    setTeam(user.team);
    setDob(user.dob);
    setGender(user.gender);
    setNationality(user.nationality);
    setContact(user.contact);
    setWrkemail(user.wrkemail);

};

const cancelEdit=()=>{
    setEdituser(null);
    setImage('');
    setName('');
    setUserid('');
    setStatus('');
    setRole('');
    setEmail('');
    setTeam('');
    setDob('');
    setGender('');
    setNationality('');
    setContact('');
    setWrkemail('');
};

const updateUser=async (id,updateimage,updateName,updateUserid,updateStatus,updateRole,updateEmail,updateTeam,UpdateDob,UpdateGender,updateNationality,updateContact,updateWrkemail)=>{
    try {
        await axios.put(`http://localhost:5000/api/users/update/${id}`,{image:updateimage,name:updateName,userid:updateUserid,status:updateStatus,role:updateRole,email:updateEmail,team:updateTeam,
            dob:UpdateDob,gender:UpdateGender,nationality:updateNationality,contact:updateContact,wrkemail:updateWrkemail});
        fetchUser();
        cancelEdit();
    } catch (error) {
        console.error('error updating product:',error);

    }
  };

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

    return(

        <div>
             <div>
            <h2 className="text-center" style={{marginTop:'30px'}}>Add Product</h2>
            <form style={{marginTop:'20px'}}>
                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" image" value={image}
                onChange={(e)=> setImage (e.target.value)}/>

                <input className="edit border w-25 h-10 rounded"  type="text" placeholder=" name" value={name}
                onChange={(e)=> setName (e.target.value)}/>

                <input className="edit border w-25 h-10 rounded"  type="text" placeholder=" userid" value={userid}
                onChange={(e)=> setUserid (e.target.value)}/> <br />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" status" value={status}
                onChange={(e)=> setStatus (e.target.value)}/>

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" role" value={role}
                onChange={(e)=> setRole(e.target.value)}/> 

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" email" value={email}
                onChange={(e)=> setEmail (e.target.value)} /><br />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" team" value={team}
                onChange={(e)=> setTeam (e.target.value)} />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" dob" value={dob}
                onChange={(e)=> setDob (e.target.value)} />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" gender" value={gender}
                onChange={(e)=> setGender (e.target.value)} /> <br />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" nationality" value={nationality}
                onChange={(e)=> setNationality (e.target.value)} />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" contact" value={contact}
                onChange={(e)=> setContact (e.target.value)} />

                <input className="edit border w-25 h-10 rounded" type="text" placeholder=" wrkemail" value={wrkemail}
                onChange={(e)=> setWrkemail (e.target.value)} /><br />

              

                <button className="edit-btn border w-16 h-10 rounded d-flex justify-content-center ml-96" onClick={addUser}> ADD </button>
            </form>

          </div>
          <h2  style={{textAlign:'center',marginTop:'60px'}}>All Products</h2>
          <div className="ul-decoration">
        <ol style={{margin:'0 0 0 20px'}}>
          {user.map((user)=>(
            <li key={user._id}>
                <div>
                    {edituser === user._id ?(
                        <>
                <input className="edit" type="text" placeholder="product name" value={image}
                onChange={(e)=> setImage (e.target.value)}/>

                <input className="edit"  type="text" placeholder="product price" value={name}
                onChange={(e)=> setName (e.target.value)}/>

                <input className="edit"  type="text" placeholder="product price" value={userid}
                onChange={(e)=> setUserid (e.target.value)}/>        

                <input className="edit" type="text" placeholder=" description" value={status}
                onChange={(e)=> setStatus (e.target.value)}/>

                <input className="edit" type="text" placeholder="image" value={role}
                onChange={(e)=> setRole(e.target.value)}/>

                <input className="edit" type="text" placeholder="catogery" value={email}
                onChange={(e)=> setEmail (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={team}
                onChange={(e)=> setTeam (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={dob}
                onChange={(e)=> setDob (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={gender}
                onChange={(e)=> setGender (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={nationality}
                onChange={(e)=> setNationality (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={contact}
                onChange={(e)=> setContact (e.target.value)} />

                <input className="edit" type="text" placeholder="brand" value={wrkemail}
                onChange={(e)=> setWrkemail (e.target.value)} />


                        <button className="btn3" onClick={()=> updateUser (image,name,userid,status,role,email,team,dob,
                        gender,nationality,contact,wrkemail)}>Update</button>
                        <button className="btn4" onClick={cancelEdit}>Cancel</button>
                        </>
                    ):(
                        <div className="adnav">
                        <span><img className="img" style={{marginLeft:'40px'}} src={user.image} alt="pic"/></span>
                        <div className="prod-content">
                        <span className="span" style={{paddingLeft:'20px'}}>{user.name}</span>
                        <span className="span"> - {user.userid} -</span>
                        <span className="span"> - {user.status} -</span>
                        <span className="span">- {user.role} -</span>
                        <span className="span">- {user.email} -</span>
                        <span className="span">- {user.team} -</span>
                        <span className="span">- {user.dob} -</span>
                        <span className="span">- {user.gender} -</span>
                        <span className="span">- {user.nationality} -</span>
                        <span className="span">- {user.contact} -</span>
                        <span className="span">- {user.wrkemail} -</span>

                        </div>
                        <div className="buttons"> 
                        <button className="btn1 border" onClick={()=> editUser(user)}>Edit</button>
                        <button className="btn2 border"  onClick={()=> confirmDelete(user._id,user.name)}> Delete </button>
                        </div>
                        </div>
                    )}
                </div>
            </li>
          ))}
          </ol>
          </div>

            
        </div>
    )
}