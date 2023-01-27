import React from 'react'
import { useState, useEffect } from 'react'
import { catchErrors } from '../util'
import { getUserProfile } from '../spotify'

const Profile = () => {
const [profile, setProfile] = useState(null);

useEffect(() => {
    const fetchData = async () =>{
        const {data} = await getUserProfile();
        setProfile(data);
    };
    catchErrors(fetchData());
}, [])


  return (
    <>
        {profile && (
            <div>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers</p>
                {profile.images.length && profile.images[0].url && (<img src={profile.images[0].url} 
                alt='profile-picture'></img>)}
            </div>
        )}
    </>
  )
}

export default Profile;