import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import { ArtistsGrid, SectionWrapper, TimeRangeButtons } from '../components';
//Component for TopArtists, shown when a user clicks see more next to their top artists on profile.
const TopArtists = () => {
    const [topArtists, setTopArtists] = useState(null);
    const [activeRange, setActiveRange] = useState('short');
    //Gets top artists from spotify's api using a function in spotify.js
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopArtists(`${activeRange}_term`);
            setTopArtists(data);
        };

        catchErrors(fetchData());
    }, [activeRange]);
    //HTML returned when component is used
    return (
        <main>
            <SectionWrapper title="Top Artists" breadcrumb={true}>
                <TimeRangeButtons
                    activeRange={activeRange}
                    setActiveRange={setActiveRange}
                />

                {topArtists && topArtists.items && (
                    <>
                        
                        <ArtistsGrid artists={topArtists.items} />
                    </>
                )}
            </SectionWrapper>
        </main>
    );
};

export default TopArtists;