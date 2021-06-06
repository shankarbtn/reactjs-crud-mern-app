import { useContext, useEffect } from "react";
import UserItem from "./UserItem";
import ItemContext from "../store/item-context";
import Modal from "../ui/Modal";

import classes from "./UserList.module.css";

export default function UserList() {
    //accessing context data
    const itemCtx = useContext(ItemContext);
    console.log(itemCtx);
    
    useEffect(() => {
        itemCtx.getItem();
    }, []);

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
                <Modal />
            </section>
        );
    }
}
