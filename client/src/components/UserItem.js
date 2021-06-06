import { useContext } from "react";
import classes from './UserList.module.css';
import ItemContext from '../store/item-context';

export default function UserItem(props) {
    //accessing context data
    const itemCtx = useContext(ItemContext);

    return (
        <li key={props.id} className={classes.listItem}>
            <div>{props.foodName}</div>
            <div>{props.foodType}</div>
            <div>
                <button className={classes.editBtn} onClick={itemCtx.editItem}>EDIT</button>
                <button className={classes.deleteBtn} onClick={itemCtx.deleteItem}>DELETE</button>
            </div>
        </li>
    );
}