const parseRoomLink = (link) => {
  const tmp = new URL(link);
  const videoID = tmp.searchParams.get('videoID');
  const roomID = tmp.pathname.split('/').pop();
  return [roomID, videoID];
}

export default parseRoomLink;