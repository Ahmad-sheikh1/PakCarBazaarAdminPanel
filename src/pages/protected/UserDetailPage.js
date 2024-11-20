import React from 'react'
import UserIndex from '../../features/UserDetail'
import { PersonalDetails } from '../../features/UserDetail/personalAccountDetail'


const UserDetailPage = () => {
    return (
        <>
            <UserIndex />
        </>
    )
}

export default UserDetailPage


export const PersonalUserDetailPage = () => {
    return (
        <>
            <PersonalDetails />
        </>
    )
}

