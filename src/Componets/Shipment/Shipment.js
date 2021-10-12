import './shipment.css'
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    // const { register, handleSubmit, watch, errors } = useForm();
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    // const onSubmit = data => console.log(data);

    // console.log(watch("example")); // watch input value by passing the name of it
    // onSubmit={handleSubmit(onSubmit)}
    return (
        < form className="ship-form"   >
            {/* < input name="name" ref={register({ required: true })} placeholder="your name" />
            {errors.name && <span className="error">This name is required</span>}

            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your email" />
            {errors.email && <span className="error">This Email is required</span>}

            < input name="address" ref={register({ required: true })} placeholder="your address" />
            {errors.address && <span className="error">This Address is required</span>}
            <input type="submit" /> */}
            <input type="text" />
        </form >
    );
};

export default Shipment;