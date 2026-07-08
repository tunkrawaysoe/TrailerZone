export const getMovieRedisKey = (
    page,
    limit,
    genreId,
    search,
    sort
) => {
    return `movies:${page}:${limit}:${genreId || "all"}:${search}:${sort}`;
};

