import { ProgressBar } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#3f51b5"
        barColor="red"
      />
    </div>
  );
};

export default Loader;
