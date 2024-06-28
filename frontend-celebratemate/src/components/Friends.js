import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';

const Friend = () => {
    const [friends, setFriends] = useState([]);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('email'));

    // Fetch existing friends for the user on component mount and whenever userId changes
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/friends/", {
                    params: { userId }
                });
                setFriends(response.data.reverse()); // Reverse the array to display most recent first
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };
        fetchFriends();
    }, [userId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newFriend = { userId, name, dob };
            const response = await axios.post("http://localhost:5000/api/friends/", newFriend);
            setFriends([response.data, ...friends]); // Add new Friend to the beginning of the list
            setName('');
            setDob('');
            
            // Update userId to trigger useEffect and fetch updated friends
            setUserId(localStorage.getItem('email'));
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="Cards">
                <h1>My Friends</h1>
                <div className="Card-Items">
                    <div className="card upload">
                        <h2>Add Friend with DOB</h2>
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
                            <button type="submit">Add Friend</button>
                        </form>
                    </div>
                    {friends.map(friend => (
                        <div key={friend._id} className="card">
                            <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719100800&semt=ais_user" alt="Avatar" />
                            <h3>{friend.name}</h3>
                            <p>{new Date(friend.dob).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Friend;
