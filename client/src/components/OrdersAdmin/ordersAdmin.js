import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Orden from '../Orden/orden';
import Axios from 'axios';
import './ordersAdmin.css'

const OrdersAdmin = ({orders}) => {
    
    const [order,setOrder] = useState([]);
    const [totalPrice,setTotalPrice] = useState();
    const [userData,setUserData] = useState({})
    const getTotal = (arg) => {
        let total = 0;
        for(var product in arg){
            total = total + arg[product].price;
        }
        return total;
    };

    const handleSearch = async(e) => {
        const stat = e.status
        const {data} = await Axios.get(`http://localhost:3001/user/${e.order}/admin/${stat}`)
        const user = await Axios.get(`http://localhost:3001/user/get/${data[0].userId}`)
        const total = getTotal(data);
        setUserData(user.data)
        setTotalPrice(total);
        setOrder(data);
    }
    
    return(
    
        <div className = "crud_content">
            <div className = "tableOrders">
                    <h1 className='h11'>Orders</h1>

                     {orders.map(function (p) {
                        /* let date = ()=> p.createdAt.split('T')[0]
                        console.log(date) */
                     return <Link onClick={() => handleSearch(p)} >  {"->"}  Orden N°{p.order}______({p.status})</Link>
                    })}<br /> 
            </div>
            {order[0] && <div className='ordenes'><Orden order={order} total={totalPrice} userData={userData}/></div>}
        </div>
    );
};

export default OrdersAdmin; 