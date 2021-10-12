/* eslint-disable no-unused-vars */

import { useContext } from 'react';
import { categoryContext } from '../../App';



const Condition = (props) => {
    const category = useContext(categoryContext)
    const familiar = props.familiar;
    let greetings ;
    if(familiar){
        greetings = <p>Welcome My Friends!</p>
    }else{
        greetings = <p>Who the hell are you?</p>
    }
    familiar ? greetings = <p>Let's Join my facebook!</p> : greetings = <p>I don't add stranger</p>
    return (
        <div className="text-center">
            <div>
                <h2>Greetings</h2>
                {greetings }
                
            </div>
            <div>
                <h2>Food</h2>
                {
                    familiar &&  <p>I will buy Food for you!</p>
                }
            </div>
            <div>
                <h2>Connection</h2>
                {greetings}
                
            </div>
            <div>
                <p>Selected Categories: {category}</p>
            </div>
        </div>
    );
};

export default Condition;