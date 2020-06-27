import React, { useState} from 'react';


const ContactUs: React.FC = () => {
    const [fields, setFields] = useState({name:'', email: '', password: '', age: ''});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    console.log('fields', fields);
    return (
        <div>
            <form onChange={handleInputChange}>
                <input name="name" type="text" placeholder="name"/>
                <input name="email" type="email" placeholder="email"/>
                <input name="password" type="password" placeholder="password" />
                <input name="age" type="number" placeholder="age" />
            </form>
        </div>
    )
}

export default ContactUs;


