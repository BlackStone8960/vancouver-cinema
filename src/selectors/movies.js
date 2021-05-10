const selectMovies = (movies, { text }) => {
  return movies.filter((movie) => {
    const textMatch = movie.title.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  })
}

export { selectMovies as default };