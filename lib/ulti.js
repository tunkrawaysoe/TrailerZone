export function getMovieRedisKey(pageNo, limit) {
    return `movies:${pageNo}:${limit}`;
}