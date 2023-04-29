import { useState, useEffect } from 'react';
import { getUserTopArtists } from '../spotify';
import { catchErrors } from '../util';
import { ArtistsGrid, SectionWrapper} from '../Components';

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
        <ul>
            <li><button onClick={() => setActiveRange('short')} > This month</button> </li>
            <li><button onClick={() => setActiveRange('medium')} > last 6 months</button> </li>
            <li><button onClick={() => setActiveRange('long')}> All time</button> </li>
        </ul>
      <SectionWrapper title="Top Artists this month" breadcrumb={true}>
        {topArtists && topArtists.items && (
          <ArtistsGrid artists={topArtists.items} />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;