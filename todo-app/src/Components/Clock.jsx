import React, { useState, useEffect } from "react";

// Function to format the date and time
const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedDate = `${date.toLocaleString("en-US", { weekday: "long" })}, ${date.getDate()} ${
        date.toLocaleString("en-US", { month: "long" })
    } ${date.getFullYear()}`;

    return {
        time: `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`,
        date: formattedDate,
    };
};

const Clock = () => {
    const [time, setTime] = useState(formatTime(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatTime(new Date())); // Update time every second
        }, 1000);

        return () => clearInterval(interval); // Clear the interval on unmount
    }, []);

    return (
        <div className="clock-container">
            <div className="time">{time.time}</div>
            <div className="date">{time.date}</div>
        </div>
    );
};

export default Clock;
