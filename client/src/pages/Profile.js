import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getCurrentUserProfile, getTopArtists, getTopTracks, getPopularity } from '../spotify';
import { SectionWrapper, ArtistsGrid, TrackList } from '../components';
import { StyledHeader } from '../styles';
//Page for profile. Component is displayed when the website is on the main page '/'.
const Profile = () => {
    //Use States for things retrieved by API 
    const [profile, setProfile] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    //Variables for the average track and artist popularity
    let avgArtPop = 0;
    let avgTrackPop = 0;
    //Use Effect that awaits functions from Spotify.js, which make calls to API, and then once the promises
    //resolve, they set the data of the variables in the use effect to the retrieved data.
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getCurrentUserProfile();
            setProfile(data);

            const userTopArtist = await getTopArtists();
            setTopArtists(userTopArtist.data);

            const userTopTracks = await getTopTracks();
            setTopTracks(userTopTracks.data);
        };

        catchErrors(fetchData());
    }, []);
    //Function that takes the popularity array given, and returns the average popularity.
    const avgPop = (arr) => {
        let popularity = 0;
        for(const item of arr){
            popularity += item;
        }
        return Math.floor(popularity/arr.length);
    }
    //IF Top Tracks and Top Artists are not null (the default value)
    if(topTracks && topArtists){
        //Retrieves a popularity array (from spotify.js) for both tracks and artists
        const trackPopularity = getPopularity(topTracks.items);
        const artistPopularity = getPopularity(topArtists.items);
        //Calls the avgPop function to get the average popularity of the array and sets 
        //the avgArtPop and avgTrackPop values to it.
        avgArtPop = avgPop(artistPopularity);
        avgTrackPop = avgPop(trackPopularity);

    }

    return (
        <>
            {profile && (
                <>
                    <StyledHeader type="user">
                        <div className="header__inner">
                            {profile.images.length && profile.images[0].url && (
                                <img className="header__img" src={profile.images[0].url} alt="Avatar"/>
                            )}
                            <div>
                                <div className="header__overline">Profile</div>
                                <h1 className="header__name">{profile.display_name}</h1>
                                <p className="header__meta">
                                    <span>
                                        {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                                    </span>
                                    <span>
                                        Average Popularity of Top Artists: {avgArtPop}
                                    </span>
                                    <span>
                                        Average Popularity of Top Tracks: {avgTrackPop}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
                    {topArtists && topTracks && (
                        <main>
                            <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                                <ArtistsGrid artists={topArtists.items.slice(0, 5)} />
                            </SectionWrapper>
                            <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                                <TrackList tracks={topTracks.items.slice(0, 5)} />
                            </SectionWrapper>
                        </main>
                    )}
              </>
            )}
        </>
    )
};

export default Profile;