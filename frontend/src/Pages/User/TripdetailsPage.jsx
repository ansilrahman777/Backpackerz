import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import Header from '../../Components/User/Header/Header';

function TripdetailsPage() {
  const { id } = useParams(); // Destructure the id parameter using useParams
  const [packageDetail, setPackageDetail] = useState(null);

  useEffect(() => {
    // Fetch package details from the backend API
    axios.get(`http://127.0.0.1:8000/api/packages/${id}/`) // Use the id parameter
      .then(response => {
        setPackageDetail(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching package details:', error);
      });
  }, [id]); // Add id to the dependency array

  return (
<div>

    <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${packageDetail ?packageDetail.image_url:''})`, backgroundSize: 'cover' }}>
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-black text-4xl decoration-red-800">
        <h1 className="text-center cherry-bomb text-ba text-black decoration-red-800  font-extrabold text-8xl mb-4">{packageDetail ?packageDetail.package_name:''}</h1>
          <p className=" items-center text-center cherry-bomb text-black text-5xl">
          {packageDetail ?packageDetail.price:''} /-</p>
        </div>
        
    </div>
    {/* <div className="p-10">
        <h1 className="text-2xl font-bold font-serif mb-2 ml-16">{packageDetail ?packageDetail.package_name:''}</h1>
        <p className="text-gray-700 font-semiboldfont-serif mb-4 ml-16">{packageDetail ?packageDetail.description:''}</p>
    </div> */}
            

    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Day Wise Itirary</h2>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {packageDetail? packageDetail.itinerary.map((item, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">Day {item.day_number}</dt>
                    <dd className="mt-2 text-sm text-gray-500">Description: {item.description}</dd>
                </div>
                )) :''}  
            </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            {packageDetail ? packageDetail.itinerary.map((item, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Day {item.day_number}</dt>
                <img
                    src={item.image}
                    alt={item.day_number}
                    className="rounded-lg bg-gray-100"
                />
                </div>
                )):''}
        </div>
    </div>

    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Package</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Inculsions and Exclusions
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {packageDetail?packageDetail.inclusions && (
                <>
                <h3>Inclusions:</h3>
                <ul>
                    {packageDetail.inclusions.map((inclusion, index) => (
                    <li key={index}>{inclusion.inclusion}</li>
                    ))}
                </ul>
                </>
            ):''}
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {packageDetail?packageDetail.exclusions && (
            <>
              <h3>Exclusions:</h3>
              <ul>
                {packageDetail.exclusions.map((exclusion, index) => (
                  <li key={index}>{exclusion.exclusion}</li>
                ))}
              </ul>
            </>
          ):''}
        </div>
      </div>
    </div>

      {/* {packageDetail ? (
        <div>
          {packageDetail.inclusions && (
            <>
              <h3>Inclusions:</h3>
              <ul>
                {packageDetail.inclusions.map((inclusion, index) => (
                  <li key={index}>{inclusion.inclusion}</li>
                ))}
              </ul>
            </>
          )}
          {packageDetail.exclusions && (
            <>
              <h3>Exclusions:</h3>
              <ul>
                {packageDetail.exclusions.map((exclusion, index) => (
                  <li key={index}>{exclusion.exclusion}</li>
                ))}
              </ul>
            </>
          )}
          
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default TripdetailsPage;
