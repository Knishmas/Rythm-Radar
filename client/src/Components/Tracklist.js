import { formatTime } from '../util';
import './Styles/Tracklist.css';

const TrackList = ({ tracks }) => (
  <div className='StyledTrackList'>
    {tracks && tracks.length ? (
      <>
        {tracks.map((track, i) => (
          <li className="track__item" key={i}>
            <div className="track__item__num">{i + 1}</div>
            <div className="track__item__title-group">
              {track.album.images.length && track.album.images[2] && (
                <div className="track__item__img">
                  <img src={track.album.images[2].url} alt={track.name} />
                </div>
              )}
              <div className="track__item__name-artist">
                <div className="track__item__name">
                  {track.name}
                </div>
                <div className="track__item__artist">
                  {track.artists.map((artist, i) => (
                    <span key={i}>
                      {artist.name}{i !== track.artists.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="track__item__album">
              {track.album.name}
            </div>
            <div className="track__item__duration">
              {formatTime(track.duration_ms)}
            </div>
          </li>
        ))}
      </>
    ) : ( //If tracks prop is undefined/null or if tracks has a length of 0
      <p className="empty-notice">No tracks available</p>
    )}
  </div>
);

export default TrackList;