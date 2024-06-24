import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('email'));

    // Fetch existing contacts for the user on component mount and whenever userId changes
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/contacts/", {
                    params: { userId }
                });
                setContacts(response.data);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };
        fetchContacts();
    }, [userId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContact = { userId, name, dob };
            const response = await axios.post("http://localhost:5000/api/contacts/", newContact);
            setContacts([...contacts, response.data]); // Add new contact to the list
            setName('');
            setDob('');
            
            // Update userId to trigger useEffect and fetch updated contacts
            setUserId(localStorage.getItem('email'));
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="Cards">
                <h1>My Contacts</h1>
                <div className="Card-Items">
                    {contacts.map(contact => (
                        <div key={contact._id} className="card">
                            <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719100800&semt=ais_user" alt="Avatar" />
                            <h3>{contact.name}</h3>
                            <p>{new Date(contact.dob).toLocaleDateString()}</p>
                        </div>
                    ))}
                    <div className="card upload">
                        <h2>Add Contact with DOB</h2>
                        <img
                            src="https://thumbs.dreamstime.com/b/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734.jpg"
                            alt="Avatar"
                        />
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                placeholder="DOB"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                            <button type="submit">Add Contact</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
