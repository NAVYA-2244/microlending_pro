import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Footer extends Component {
    state = {  } 
    render() { 
        return (
            <div className='footer default-footer mt-auto py-3 text-center'>
                <span className="fs-14">Copyright © <span className="year">2024</span> <Link href='' className='text-primary'>Micro lending</Link> All rights reserved</span>
            </div>
        );
    }
}
 
export default Footer;