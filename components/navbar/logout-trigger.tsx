'use client';

import { logout } from '@/actions/auth/logout';
import React, { useEffect } from 'react';


const onLogout = async () => {
    await logout();
}

const LogoutTrigger: React.FC = () => {
    useEffect(() => {
        onLogout();
    }, []);


    return (
        null
    );
};

export default LogoutTrigger;
