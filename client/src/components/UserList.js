import { useContext, useEffect } from "react";
import UserItem from "./UserItem";
import ItemContext from "../store/item-context";
import EditForm from '../components/EditForm';
//import Axios from "axios";

import classes from "./UserList.module.css";

export default function UserList() {
    //accessing context data
    const itemCtx = useContext(ItemContext);
    console.log(itemCtx);
    
    //const itemListLength = itemCtx.itemsList.length;
    //const listItems = itemCtx.itemsList;
    //console.log(itemCtx);
    //const [items, setItem] = useState([]);
    
    useEffect(() => {
        itemCtx.getItem();
        console.log(itemCtx);
    
        // async function getItemHandler() {
        //     try {
        //         await Axios.get('http://localhost:3001/read')
        //         .then(function (response) {
        //             console.log('server response >>> '+ JSON.stringify(response));
        //             setItem(response.data);
        //         })
                
        //     }catch(err) {
        //         console.log(err);
        //     }
        // }
        // getItemHandler();
    }, [itemCtx]);

    if (itemCtx.totalItemsList === 0) {
        return (
            <section className={classes.listContainer}>
                <h2>No Data !!!</h2>
            </section>
        );
    } else {
        return (
            <section className={classes.listContainer}>
                <ul>
                    <li className={classes.listItem}>
                        <div className={classes.header}>Food Name</div>
                        <div className={classes.header}>Food Type</div>
                        <div className={classes.header}>Actions</div>
                    </li>
                    {itemCtx.itemsList.map((val, key) => (
                        <UserItem
                            key={key}
                            id={val._id}
                            foodName={val.foodName}
                            foodType={val.foodType}
                        />
                    ))}
                </ul>
                <EditForm />
            </section>
        );
    }
}
