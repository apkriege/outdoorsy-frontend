"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// NEEDS
// 1. Search bar
// 2. List of trailers
// 3. Trailer details
// 4. Trailer images
// 5. Filter by keyword search
// 6. Pagination

interface Trailer {
  id: number;
  attributes: {
    name: string;
    description: string;
  };
  relationships: {
    primary_image: {
      data: {
        id: number;
      };
    };
  };
}

interface Image {
  id: number;
  attributes: {
    url: string;
  };
}

interface ImageHashMap<Image> {
  [key: number]: Image;
}

export default function Home() {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [images, setImages] = useState<ImageHashMap<Image>>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getTrailers("");
  }, []);

  const getTrailers = async (search: string) => {
    try {
      const trailers = await axios.get(`https://search.outdoorsy.com/rentals?filter[${search}]`);
      console.log(trailers.data.data.length)

      const images = createHashMapForImages(trailers.data.included);
      setImages(images);

      const modeledTrailers = modelTrailers(trailers.data.data);
      setTrailers(modeledTrailers);
    } catch (err) {
      console.log(err);
    }
  };

  const createHashMapForImages = (images: Image[]) => {
    const hashMap: ImageHashMap<Image> = images.reduce((acc, image) => {
      return { ...acc, [image.id]: image };
    }, {});

    return hashMap;
  };

  const modelTrailers = (trailers: Trailer[]) => {
    return trailers.map((trailer: Trailer) => {
      const imageId = trailer.relationships.primary_image.data.id;
      return { ...trailer, image: images[imageId] };
    });
  };

  return (
    <main>
      <div className="p-5 bg-gray-100">
        <h1 className="text-3xl font-light">Find Your Dream Trailer</h1>
        <label className="block mt-5">Search</label>
        <input 
          type="text" 
          className="border border-gray-300 rounded-md h-10 w-1/2 p-3" 
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={() => getTrailers(search)}
        >Search</button>


        <div>
          <h3 className="text-xl font-bold my-3">Results</h3>
          {trailers.map((trailer) => (
            <div key={trailer.id} className="">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                  <img
                    className=""
                    src={images[trailer.relationships.primary_image.data.id].attributes.url || ""}
                    alt=""
                  />
                </div>
                <div className="col-span-4">
                  <h2>{trailer.attributes.name}</h2>
                  {/* <p>{trailer.attributes.description}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// import Image from 'next/image'

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore the Next.js 13 playground.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
