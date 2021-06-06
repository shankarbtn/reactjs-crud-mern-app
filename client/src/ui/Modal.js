import classes from '../components/UserForm.module.css';

function Modal() {
  const updateItemHandler = () => {};
  const closeModaleHandler = () => {};

  return (
    <div className="backdrop">
      <div className="modal">
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
      </div>
    </div>
  );
}

export default Modal;
