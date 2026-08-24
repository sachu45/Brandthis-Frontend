import { useEffect, useState } from 'react';
import { VIDEO_DURATION_SECONDS } from '../../data/constants';
import {
  CaptionsIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  SettingsIcon,
  ShareIcon,
  VolumeIcon,
} from '../icons';

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

/** Non-functional video player used as a product teaser on the landing page. */
export function VideoMock() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) =>
        current + 1 > VIDEO_DURATION_SECONDS ? 0 : current + 1,
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const progress = (elapsed / VIDEO_DURATION_SECONDS) * 100;

  return (
    <div className="video-section">
      <div className="video-card">
        <div className="video-top">
          <div className="badge" />
          <div>
            <div className="ttl">Brandthis - the brand layer for agents</div>
            <div className="sub">Brandthis AI</div>
          </div>
          <div className="video-controls-top">
            <VolumeIcon className="icon-sm" />
            <CaptionsIcon className="icon-sm" />
            <SettingsIcon className="icon-sm" />
          </div>
        </div>

        <div className="video-center">
          <button
            className="play-btn"
            onClick={() => setPlaying((current) => !current)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          {playing && (
            <div className="video-caption">
              The brand layer
              <br />
              for agents
            </div>
          )}
        </div>

        {playing && (
          <div className="video-caption-line">
            Meet Brandthis. The brand layer for agents.
          </div>
        )}

        <div className="video-bottom">
          <div className="video-progress">
            <i style={{ width: progress + '%' }} />
          </div>
          <div className="video-bottom-row">
            <div className="left">
              <ShareIcon className="icon-sm" />
              <ReplayIcon className="icon-sm" />
              <span>
                {formatTime(elapsed)} / {formatTime(VIDEO_DURATION_SECONDS)}
              </span>
            </div>
            <div className="video-more">
              <span style={{ fontSize: '13px' }}>More videos</span>
              <div className="thumb" />
              <button className="btn-yt">▶ YouTube</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
