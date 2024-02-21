import React, { useState } from "react";

const DegreeSwitcher = ({ onChange }) => {
    const [unit, setUnit] = useState("C");

    const handleChange = () => {
        setUnit(unit === "C" ? "F" : "C");
        onChange(unit === "C" ? "imperial" : "metric");
    };

    return (
        <div className="degree-switcher">
            <button onClick={handleChange}>{unit}</button>
        </div>
    );
};

export default DegreeSwitcher;