import React from 'react'
import { useState, useEffect } from 'react'
import { catchErrors } from '../util'
import { getUserProfile, getUserPlaylists, getUserTopArtists, getUserTopTracks} from '../spotify'
import { ArtistsGrid, SectionWrapper, Tracklist } from '../Components'

const Profile = () => {
const [profile, setProfile] = useState(null);
const [playlists, setPlaylists] = useState(null);
const [topArtists, setTopArtists] = useState(null);
const [topTracks, setTopTracks] = useState(null);

useEffect(() => {
    const fetchData = async () =>{
        const userProfile = await getUserProfile();
        setProfile(userProfile.data);
        const userPlaylists  = await getUserPlaylists();
        setPlaylists(userPlaylists.data);
        const userTopArtists  = await getUserTopArtists();
        setTopArtists(userTopArtists.data);
        // console.log(userTopArtists.data);
        const userTopTracks = await getUserTopTracks();
        setTopTracks(userTopTracks.data);
    };
    catchErrors(fetchData());
}, [])


  return (
    <>
        {profile && (
            <div>
                <h1>{profile.display_name}</h1>
                {profile.images.length && profile.images[0].url && (<img className = "profile-picture" src={profile.images[0].url} 
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
                  {topArtists && topTracks && (
            <main>
              <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                <ArtistsGrid artists={topArtists.items.slice(0,8)} />
              </SectionWrapper>

              <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                <Tracklist tracks={topTracks.items.slice(0, 4)} />
              </SectionWrapper>
            </main>
          )}
    </>
  )
}

export default Profile;