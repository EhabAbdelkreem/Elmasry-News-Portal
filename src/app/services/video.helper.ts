export interface ParsedVideo {
  type: 'youtube' | 'mp4' | 'unknown';
  embedUrl: string;
  youtubeId?: string;
  rawUrl: string;
  isPlayable: boolean;
}

export function parseVideoUrl(url: string | undefined | null, autoplay = false): ParsedVideo {
  if (!url || typeof url !== 'string') {
    return { type: 'unknown', embedUrl: '', rawUrl: '', isPlayable: false };
  }

  const clean = url.trim();
  if (!clean) {
    return { type: 'unknown', embedUrl: '', rawUrl: '', isPlayable: false };
  }

  // 1. Check YouTube (watch, youtu.be, embed, shorts)
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = clean.match(ytRegex);
  if (match && match[1]) {
    const id = match[1];
    const autoParam = autoplay ? '1' : '0';
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoParam}&rel=0&modestbranding=1&enablejsapi=1`,
      youtubeId: id,
      rawUrl: clean,
      isPlayable: true
    };
  }

  // 2. Already an embed link
  if (clean.includes('youtube.com/embed') || clean.includes('youtube-nocookie.com/embed')) {
    const hasParams = clean.includes('?');
    const autoParam = autoplay ? (hasParams ? '&autoplay=1' : '?autoplay=1') : '';
    return {
      type: 'youtube',
      embedUrl: clean + autoParam,
      rawUrl: clean,
      isPlayable: true
    };
  }

  // 3. Direct video format (mp4, webm, ogg, blob, data URL)
  if (
    /\.(mp4|webm|ogg|m4v)(\?.*)?$/i.test(clean) ||
    clean.startsWith('data:video/') ||
    clean.startsWith('blob:')
  ) {
    return {
      type: 'mp4',
      embedUrl: clean,
      rawUrl: clean,
      isPlayable: true
    };
  }

  // Fallback: If it's another video URL
  return {
    type: 'unknown',
    embedUrl: clean,
    rawUrl: clean,
    isPlayable: clean.length > 5
  };
}
