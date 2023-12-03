import { useEffect } from 'react';

function DetailText() {
  useEffect(() => {
    console.log('useEffect mount');
    return () => {
      console.log('delete useEffect');
    };
  }, []);
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis harum vel
      eveniet nobis perspiciatis, vitae delectus minus voluptatem molestias.
      Voluptatum molestiae voluptate corrupti eum sint similique iure ipsum
      incidunt dolorem.
    </p>
  );
}

export default DetailText;
