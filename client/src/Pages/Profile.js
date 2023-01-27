import React from 'react'
import { useState, useEffect } from 'react'
import { catchErrors } from '../util'
import { getUserProfile, getUserPlaylists } from '../spotify'

const Profile = () => {
const [profile, setProfile] = useState(null);
const [playlists, setPlaylists] = useState(null);

useEffect(() => {
    const fetchData = async () =>{
        const userProfile = await getUserProfile();
        setProfile(userProfile.data);
        const userPlaylists  = await getUserPlaylists();
        setPlaylists(userPlaylists.data);
    };
    catchErrors(fetchData());
}, [])


  return (
    <>
        {profile && (
            <div>
                <h1>{profile.display_name}</h1>
                {profile.images.length && profile.images[0].url && (<img src={profile.images[0].url} 
                alt='profile-picture'></img>)}
                <p>
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <br />
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                </p>
            </div>
        )}
    </>
  )
}

export default Profile;