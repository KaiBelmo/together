const parseYoutubeLink = (link) => {
  const tmp = new URL(link);
  const videoID = tmp.searchParams.get('v');
  return videoID;
}

export default parseYoutubeLink;