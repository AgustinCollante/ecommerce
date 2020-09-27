import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./activity.css";
import {useDispatch,useSelector} from "react-redux";
import {getOrdersUser} from "../../Redux/orders.js";
import {Route,BrowserRouter as Router, Link} from "react-router-dom"
import {validation} from '../../Redux/users'

const Activity =({user})=>{

  const [ordenes, setOrden] = useState([]);
  const [usuario,setUsuario] = useState({})
  const [update, setUpdate] = useState(false)

  const dispatch = useDispatch();
  const orders = useSelector(store => store.orders.ordersUser);
  
  const name = (mail) => mail.split('@')[0]
  
  const Cancelar = async (e)=>{
    console.log('---- cancelar ----')
    console.log(e)
    await axios.put(`http://localhost:3001/user/${user.id}/cancelada/${e}`);
    dispatch(getOrdersUser(user));
  }

  useEffect(()=>{
    setUsuario(user)
    setOrden(orders);
    setUpdate(false)
  },[ordenes,user]);
  console.log(user)
  const handleSubmit = (e) => e.preventDefault()

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }
  const updateProfile = async() => {
    if(update){
      await axios.put(`http://localhost:3001/user/${user.id}`,usuario)
      dispatch(validation());
    }
    setUpdate(update ? false : true)
  }

  const cancelUpdate = () => {
    setUsuario(user)
    setUpdate(false)
  }

  const uploadImage = async (e) => {
        
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    
    setUsuario({
      ...usuario,
      image: base64});
    e.preventDefault();

  };
  
  const convertBase64 = (file) => {
    return new Promise ((resolve, reject) =>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        
        fileReader.onerror = (error) => {
            reject(error);
        }
     })
  };

    return(
      <Router>
        <div className='mayor_content'>
          <div className='panel'>
            <h3>Your Panel</h3>
            <Link to='/user'>Profile</Link>
            <Link to='/user/activity'>Activity</Link>
            <Link to='/user/account'>Account</Link>
          </div>
        <div className='content_admin'>
				<Route
					exact path='/user'
					render={()=>
						<div className = "contentActivity">
              <div className = "divInfo">
                <img className = "imgActivity"  src = {usuario.image || "data:image/png;base64,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"} />
                {update && <input className = "input" type="file" name="image" onChange={uploadImage}/>}
              </div>
              <div className = "crud_userpanel" >
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div >
                        <div>
                            <label>Name</label>
                            <br />
                            <input  className = "input" type="text" name="name"  placeholder='Your name...' onChange={(e)=> handleInputChange(e)} value={usuario.name} disabled={!update} />
                        </div>
                        <div className='descripcion'>
                            <label>Username</label><br />
                            <input className = "input" type="text" name="username" value={usuario.username} disabled/>
                        </div>
                        <div className='Precio' >
                            <label>Email</label><br />
                            <input className = "input" type="text" name="email" onChange={(e)=> handleInputChange(e)} value={usuario.email} disabled={!update} />
                        </div>
                        <div className = "divbutton">
                        <button className='buttonAdd' onClick={()=>updateProfile()} >{update ? "Save" :"Edit"}</button>
                        {update && <button className='buttonAdd' onClick={()=>cancelUpdate()}>Cancel</button>}
                        </div>
                    </div>
                </form>
            </div>
            </div>
					}
				/>
				<Route
					exact path='/user/activity'
					render={()=>
						<div className = "divHistory">
              <h1 className = "titleHistory">User activity</h1>

            <div className = 'card-bodyact'>
              <table>
                <tr className='columns-act col-10'>
                  <th className='th1-act col-5' >Name</th>
                  <th className='th1-act col-2' >Price</th>
                  <th className='th1-act col-2' >Quantity</th>
                  <th className='th1-act col-2' >Status</th>
                </tr>
                {orders && orders.map(o => 
                  <tr className='columns-act col-10'>
                    <td className='td1-act col-5'>{o.name}</td>
                    <td className='td1-act col-2' >${o.price}</td>
                    <td className='td1-act col-2' >{o.quantity}</td>
                    <td className='td1-act col-2' >{o.status}</td>
                    { o.status === "creada"  || o.status === "procesando" ? 
                    <button className='btoncancelar' onClick={()=> Cancelar(o.id)} >Cancel</button> : null}       
                  </tr>
                )}
              </table>
            </div>
          </div>}
				/>
				<Route
					exact path='/user/account'
					render={()=>
						<div>
								
						</div>}
				/>
			</div>
		</div>
	  </Router>
    );
};

export default Activity;
