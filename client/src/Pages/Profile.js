import React from 'react'
import { useState, useEffect } from 'react'
import { catchErrors } from '../util'
import { getUserProfile, getUserPlaylists, getUserTopArtists} from '../spotify'
import { ArtistsGrid } from '../Components'

const Profile = () => {
const [profile, setProfile] = useState(null);
const [playlists, setPlaylists] = useState(null);
const [topArtists, setTopArtists] = useState(null);

useEffect(() => {
    const fetchData = async () =>{
        const userProfile = await getUserProfile();
        setProfile(userProfile.data);
        const userPlaylists  = await getUserPlaylists();
        setPlaylists(userPlaylists.data);
        const userTopArtists  = await getUserTopArtists();
        setTopArtists(userTopArtists.data);
        console.log(userTopArtists.data);
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
        {topArtists && (
            <main>
                <ArtistsGrid artists={topArtists.items.slice()}/>
            </main>
        )}
    </>
  )
}

export default Profile;