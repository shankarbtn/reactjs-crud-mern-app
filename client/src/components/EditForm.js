import { useContext } from "react";
import Modal from '../ui/Modal';
import ItemContext from "../store/item-context";

import classes from '../components/UserForm.module.css';

export default function EditForm() {
  //accessing context data
  const itemCtx = useContext(ItemContext);

  const updateItemHandler = () => {};
  const closeModaleHandler = () => {};

  let content = null;
  if(itemCtx.isModelOpen) {
    content = <Modal>
                <form className={classes.form}>
                    <div className={classes.control}>
                        <label htmlFor='update-food-name'>Food Name</label>
                        <input type='text' id='update-food-name' placeholder='Enter your food name'/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='update-food-type'>Food Type</label>
                        <input type='text' id='update-food-type' placeholder='Enter Food Type'/>
                    </div>
                    <div className={classes.actions}>
                      <button onClick={updateItemHandler}>Update</button>
                      <button onClick={closeModaleHandler}>Close</button>
                    </div>
                    <div className={classes.formInfo}>
                        <span className={classes.formError} id='update-formError'></span>
                        <span className={classes.formSuccess} id='update-formSuccess'></span>
                    </div>
                </form>
              </Modal>;
  }
  return (
    {content}
  );
}