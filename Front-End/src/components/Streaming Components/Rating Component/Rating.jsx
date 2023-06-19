export default function Rating(props) {
  const voteAverage = Math.round(props.movie.rate * 10) / 10;
  // console.log(voteAverage);
  const circularProgressStyle = {
    background: `conic-gradient(#00d0c5 ${
      voteAverage * 3.6 * 10
    }deg, #ededed 0deg)`,
  };

  return (
    <div className=" ">
      <div className="circular-progress" style={circularProgressStyle}>
        <span className="progress-value">{voteAverage}</span>
      </div>
    </div>
  );
}
