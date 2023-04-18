import { Alert } from '@mui/material';
import React from 'react';
import { getToken } from '../../utils/authenticate';
import jwtDecode from 'jwt-decode';

function WelcomeUser(props) {
    const token = getToken();
    return (
        <Alert variant='outlined' icon={false} severity="warning"> <div className="text-xl lg:text-3xl">Xin chào, {jwtDecode(token).fullName} !</div></Alert>
    );
}

export default WelcomeUser;