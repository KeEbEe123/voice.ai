import React from "react";

const TutorialSection = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="bg-red-400 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-7">
        <h2 className="text-5xl font-extrabold text-center mb-8">
          How Does It Work?
        </h2>
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">1</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-mic"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
              </svg>
              <p className="text-lg text-center pt-3">
                Sing a scale in any range you're comfortable in and obtain your
                vocal key.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">2</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <p className="text-lg text-center pt-3">
                Search for any song that you want to sing.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">3</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-music-note-list"
                viewBox="0 0 16 16"
              >
                <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                <path fill-rule="evenodd" d="M12 3v10h-1V3z" />
                <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z" />
                <path
                  fill-rule="evenodd"
                  d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"
                />
              </svg>
              <p className="text-lg text-center pt-3">
                Play along with any instrument of your choice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialSection;
