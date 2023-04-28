import { useState, useEffect } from 'react';
import { getUserTopArtists } from '../spotify';
import { catchErrors } from '../util';
import { ArtistsGrid, SectionWrapper} from '../Components';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists  = await getUserTopArtists();
      setTopArtists(userTopArtists.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <main>
      <SectionWrapper title="Top Artists this month" breadcrumb={true}>
        {topArtists && topArtists.items && (
          <ArtistsGrid artists={topArtists.items} />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;