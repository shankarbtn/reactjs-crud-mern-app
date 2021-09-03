import { useContext } from "react";
import ItemContext from "../store/item-context";
import classes from '../ui/Modal.module.css';

export default function Modal(props) {
  //accessing context data
  const itemCtx = useContext(ItemContext);

  return (
    <div className={classes.backdrop} style={(itemCtx.isModelOpen) ? {display:'block'} : {display:'block'}}>
      <div className={classes.modal}>
        {props.children}
      </div>
    </div>
  );
}