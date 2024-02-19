import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Oval
      visible={true}
      height="20"
      width="20"
      color="#FFFFFF"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
