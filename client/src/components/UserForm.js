import React, { useRef,useContext } from 'react';
import ItemContext from "../store/item-context";

import classes from './UserForm.module.css';

export default function UserFrom() {
    //accessing context data
    const itemCtx = useContext(ItemContext);

    const foodNameRef = useRef();
    const foodTypeRef = useRef();
    
    const formSubmitHandler = (e) => {
        e.preventDefault();

        const foodNameRefValue = foodNameRef.current.value;
        const foodTypeRefValue = foodTypeRef.current.value;

        let hasError = false, errorMessage = '';
        if(!foodNameRefValue) {
            hasError = true;
            errorMessage = 'Enter Food Name';
        } else if(!foodTypeRefValue) {
            hasError = true;
            errorMessage = 'Enter Food Type';
        }

        if(hasError) {
            console.log(errorMessage);
            document.getElementById('formError').innerHTML = errorMessage;
            document.getElementById('formError').style.display = 'block';
            document.getElementById('formSuccess').style.display = 'none';
        } else {
            hasError = false;
            errorMessage = '';
            document.getElementById('formSuccess').style.display = 'none';
            document.getElementById('formError').style.display = 'none';

            const formData = {
                foodName: foodNameRefValue,
                foodType: foodTypeRefValue,
                dateAdded: new Date()
            }
            saveFormData(formData);
            e.target.reset();
        }
    }

    const saveFormData = (formData) => {
        console.log(formData);
        itemCtx.addItem();
    };

    return (
        <section className={classes.formContainer} onSubmit={formSubmitHandler}>
                <form className={classes.form}>
                    <div className={classes.control}>
                        <label htmlFor='food-name'>Food Name</label>
                        <input type='text' id='food-name' ref={foodNameRef} placeholder='Enter your food name'/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='food-type'>Food Type</label>
                        <input type='text' id='food-type' ref={foodTypeRef} placeholder='Enter Food Type'/>
                    </div>
                    <div className={classes.formInfo}>
                        <span className={classes.formError} id='formError'></span>
                        <span className={classes.formSuccess} id='formSuccess'></span>
                    </div>
                    <div className={classes.actions}>
                        <button>Add Food Item</button>
                    </div>
                </form>
        </section>
    )
}
