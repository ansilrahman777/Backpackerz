import React from "react";
import { Link } from "react-router-dom";
import np from "./../assets/Images/notfound.jpg"

function ErrorPage() {
  return (
    <div>
      <main class="grid min-h-screen place-items-center bg-white px-6 py-20 sm:py-30 lg:px-8"
      style={{ backgroundImage: `url(${np})`, backgroundSize: "cover" , backgroundRepeat: "no-repeat",backgroundPosition: "center", }}
      >
        <div class="text-center">
          <p class="text-4xl font-bold text-gray-900">404</p>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <div class="animate-bounce mt-7">
          <svg
            class="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
          <p class="mt-6 text-lg font-medium leading-7 text-gray-900">
          Sorry, the page you are looking for doesn't exist.Let's get you back
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              class="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Go back home <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main> 
    </div>
  );
}

export default ErrorPage;
