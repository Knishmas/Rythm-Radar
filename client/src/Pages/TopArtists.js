import { useState, useEffect } from 'react';
import { getUserTopArtists } from '../spotify';
import { catchErrors } from '../util';
import { ArtistsGrid, SectionWrapper, TimeRangeButtons} from '../Components';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists  = await getUserTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtists.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    
    <main>
        <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
      <SectionWrapper title="Top Artists this month" breadcrumb={true}>
        {topArtists && topArtists.items && (
          <ArtistsGrid artists={topArtists.items} />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;