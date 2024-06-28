import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';

const Reminder = () => {
    const [friends, setFriends] = useState([]);
    const userId = localStorage.getItem('email');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/friends/", {
                    params: { userId }
                });
                setFriends(response.data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };
        fetchFriends();
    }, [userId]);

    const getNextBirthday = (dob) => {
        const today = new Date();
        const birthday = new Date(dob);
        birthday.setFullYear(today.getFullYear());

        if (birthday < today) {
            birthday.setFullYear(today.getFullYear() + 1);
        }

        return birthday;
    };

    const formatDate = (dob) => {
        const date = new Date(dob);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-GB', options);
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age + 1; // Age they are turning on their next birthday
    };

    const getTimeRemaining = (dob) => {
        const nextBirthday = getNextBirthday(dob);
        const now = new Date();
        const diff = nextBirthday - now;
    
        if (diff < 86400000) { // Less than 1 day
            return { text: '1 day', color: 'red' };
        } else if (diff < 2592000000) { // Less than 1 month
            const days = Math.ceil(diff / 86400000); // Use Math.ceil to round up to next day
            return { text: `${days} days`, color: 'rgb(255, 120, 61)' };
        } else if (diff < 7776000000) { // Less than 3 months
            const months = Math.floor(diff / 2592000000);
            const days = Math.floor((diff % 2592000000) / 86400000);
            return { text: `${months} months ${days} days`, color: 'rgb(255, 165, 0)' };
        } else { // 3 months or more
            const months = Math.floor(diff / 2592000000);
            return { text: `${months} months`, color: 'green' };
        }
    };

    const sortedFriends = [...friends].sort((a, b) => getNextBirthday(a.dob) - getNextBirthday(b.dob));

    return (
        <div>
            <Navbar />
            <div className="Reminder">
                <h1>Reminders</h1>
                <div className="Rem-Card-Items">
                    {sortedFriends.map((friend, index) => {
                        const { text, color } = getTimeRemaining(friend.dob);
                        return (
                            <div key={friend._id} className="Rem-card">
                                <span>{index + 1}.</span>
                                <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719100800&semt=ais_user" alt="Avatar" />
                                <h3>{friend.name}</h3>
                                <p className="p1">{formatDate(friend.dob)}</p>
                                <p className="p2">{calculateAge(friend.dob)}</p>
                                <p className="p3" style={{ color }}>{text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Reminder;
