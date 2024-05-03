import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='footer default-footer mt-auto py-3 text-center'>
            <span className="fs-14">
                Copyright © <span className="year">{currentYear}</span>{" "}
                <Link to='' className='text-primary'>Micro lending</Link> All rights reserved
            </span>
        </div>
    );
};

export default Footer;
