import React from "react";

const Link = ({ title, link, description }) => {
    return (
        <div>
            <h2>{title}</h2>
            <a about="blank" href={link}>{link}</a>
            <p>
                { description }
            </p>
        </div>
    )
};

export default Link;