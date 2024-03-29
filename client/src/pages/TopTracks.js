import { useState, useEffect } from 'react';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, TrackList, TimeRangeButtons } from '../components';
//Component for TopTracks, shown when a user clicks see more next to their top tracks on profile
//or when they click on top tracks on the navbar. 
const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(null);
    const [activeRange, setActiveRange] = useState('short');

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopTracks(`${activeRange}_term`);
            setTopTracks(data);
        };

        catchErrors(fetchData());
    }, [activeRange]);

    return (
        <main>
            <SectionWrapper title="Top Tracks" breadcrumb={true}>
                <TimeRangeButtons
                    activeRange={activeRange}
                    setActiveRange={setActiveRange}
                />

                {topTracks && topTracks.items && (
                    <TrackList tracks={topTracks.items} />
                )}
            </SectionWrapper>
        </main>
    );
};

export default TopTracks;