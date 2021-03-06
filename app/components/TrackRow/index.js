import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import FontAwesome from 'react-fontawesome';
import artPlaceholder from '../../../resources/media/art_placeholder.png';
import ContextPopup from '../ContextPopup';
import { formatDuration } from '../../utils';

import styles from './styles.scss';

class TrackRow extends React.Component {
  renderAddTrackToQueueButton (track, index, addToQueue, musicSources) {
    return (
      <a
        key={'add-track-' + index}
        href='#'
        onClick={() =>
          addToQueue(musicSources, {
            artist: track.artist.name,
            name: track.name,
            thumbnail: _.get(track, 'image[0][\'#text\']', artPlaceholder)
          })
        }
        className={styles.add_button}
        aria-label='Add track to queue'
      >
        <FontAwesome name='plus' /> Add to queue
      </a>
    );
  }

  renderPlayTrackButton (
    index,
  ) {
    return (
      <a
        key={'play-track-' + index}
        href='#'
        onClick={this.playTrack}
        className={styles.add_button}
        aria-label='Play this track now'
      >

        <FontAwesome name='play' /> Play now
      </a>
    );
  }

  playTrack = () => {
    const {
      track,
      clearQueue,
      addToQueue,
      selectSong,
      startPlayback,
      musicSources
    } = this.props;

    clearQueue();
    addToQueue(musicSources, {
      artist: track.artist.name,
      name: track.name,
      thumbnail: _.get(track, 'image[0][\'#text\']', artPlaceholder)
    });
    selectSong(0);
    startPlayback();
  }

  renderDuration (track) {
    if (track.duration === 0) {
      return <td className={styles.track_duration} />;
    }
    return (
      <td className={styles.track_duration}>
        {formatDuration(track.duration)}
      </td>
    );
  }

  renderTrigger (track) {
    return (
      <tr className={styles.track} onDoubleClick={this.playTrack}>
        {this.props.displayCover ? <td
          style={{
            backgroundImage: `url(${_.get(track, 'image[0][#text]', artPlaceholder)})`,
            backgroundPosition: 'center'
          }}
          className={styles.track_thumbnail}
        /> : null}
        {this.props.displayTrackNumber ? <td className={styles.track_artist}>{track.position}</td> : null}
        {this.props.displayArtist ? <td className={styles.track_artist}>{track.artist.name}</td> : null}
        <td className={styles.track_name}>{track.name}</td>
        {this.props.displayDuration ? this.renderDuration(track) : null}
        {this.props.displayPlayCount ? <td className={styles.playcount}>{numeral(track.playcount).format('0,0')}</td> : null}
      </tr>
    );
  }

  render () {
    let {
      index,
      track,
      addToQueue,
      musicSources
    } = this.props;

    let popupContents = [
      this.renderAddTrackToQueueButton(
        track,
        index,
        addToQueue,
        musicSources
      ),
      this.renderPlayTrackButton(
        index,
      )
    ];
    return (
      <ContextPopup
        key={'track-' + index}
        trigger={this.renderTrigger(track)}
        artist={track.artist.name}
        title={track.name}
        thumb={_.get(track, 'image[1][\'#text\']', _.get(track, 'image[0][\'#text\']', artPlaceholder))}
      >
        {popupContents}
      </ContextPopup>
    );
  }
}

export default TrackRow;
