
function test() {
  return (
    

    <div className="bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Kerala Escapades</h1>
      <p className="text-gray-600 mb-4">
        Cochin - Munnar - Thekkady - Alleppey - Kovalam - Trivandrum
      </p>
      <p className="text-green-600 font-semibold text-lg mb-4">₹39000 BOOK NOW</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        ENQUIRE NOW
      </button>
      <p className="text-gray-600 mt-4">
        Tour Exclusions: Any Air Fare, Train fare, Bus fare, Lunches, Activities on own cost, etc.
      </p>
      {/* Other content and highlights can be added here */}
    </div>


  )
}

export default test