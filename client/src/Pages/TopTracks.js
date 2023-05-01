import { useState, useEffect } from 'react';
import { getUserTopTracks } from '../spotify';
import { catchErrors } from '../util';
import { Tracklist, SectionWrapper, TimeRangeButtons} from '../Components';

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      const userTopTracks  = await getUserTopTracks(`${activeRange}_term`);
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Tracks this month" breadcrumb={true}>
      <div className="buttons-container">
      <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
      </div>
        {topTracks && topTracks.items && (
        <Tracklist tracks={topTracks.items} />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;