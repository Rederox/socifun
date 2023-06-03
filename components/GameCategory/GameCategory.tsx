import {
  GetGameDataDocument,
  GetGameDataQuery,
  GetGameDataQueryVariables,
} from "@/generated";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

interface GameCategoryProps {
  category: string;
  data: GetGameDataQuery | null | undefined;
}

const GameCategory: React.FC<GameCategoryProps> = ({ category, data }) => {
  const [isImageLoaded, setImageLoaded] = React.useState(false);

  const breakpoints = React.useMemo(
    () => ({
      200: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
    }),
    []
  );

  return (
    <div className="bg-[#2e2e52] w-[99%] shadow-lg rounded-md p-2">
      <div className="flex justify-between items-center m-4 flex-wrap">
        <h2 className="font-bold text-2xl text-[#cbf7ed]">{category}!</h2>
        <Link href={"Category/" + category}>
          <span className="font-bold text-sm sm:text-2xl text-[#cbf7ed] transition-colors duration-300 ease-in-out border-[#cbf7ed] border-2 rounded-lg px-2 sm:px-4 py-1 hover:bg-[#50fa7b] hover:text-[#2e2e52] cursor-pointer">
            Voir plus +
          </span>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap relative text-[#cbf7ed]">
        {data && data.gamesSearched ? (
          <>
            <Swiper
              freeMode={true}
              mousewheel={{
                releaseOnEdges: true,
                sensitivity: 6
              }}
              navigation={{
                prevEl: `.swiper-button-prev-${category}`,
                nextEl: `.swiper-button-next-${category}`,
              }}
              slidesPerView={1}
              breakpoints={breakpoints}
              modules={[Navigation]}
              className="mySwiper text-[#cbf7ed] "
            >
              <div
                className={`swiper-button-prev swiper-button-prev-${category} text[20px] text-[#cbf7ed] absolute md:-left-0 -left-2 top-1/2 transform -translate-y-1/2 hover:text-[#50fa7b] transition-colors duration-300`}
              ></div>
              <div
                className={`swiper-button-next swiper-button-next-${category} text-[#cbf7ed] absolute md:-right-0 -right-1 top-1/2 transform -translate-y-1/2 hover:text-[#50fa7b] transition-colors duration-300`}
              ></div>

              {data?.gamesSearched?.hits?.map((hit) => {
                const asset = hit?.assets?.find(
                  (res) => res.width === 512 && res.height === 512
                );

                return (
                  <SwiperSlide key={hit.objectID}>
                    <div className="flex flex-col justify-center items-center px-4 py-2">
                      <div className="relative w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                        <div
                          className="rounded-lg cursor-pointer"
                          onClick={() =>
                            window.open(
                              `Game/GD/${hit?.slugs?.[0].name}`,
                              "_self"
                            )
                          }
                        >
                          <Image
                            src={
                              "https://img.gamedistribution.com/" +
                              (asset?.name ?? hit?.assets?.[0]?.name)
                            }
                            alt={hit?.title ?? "Game image"}
                            width={asset?.width ?? 512}
                            height={asset?.height ?? 512}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            className={`rounded-lg ${isImageLoaded ? "opacity-100" : "opacity-0"
                              } transition-opacity duration-500`}
                          />
                        </div>
                      </div>
                      <h3 className="mt-2 text-center text-gray-100 font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {hit?.title}
                      </h3>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        ) : (
          <div className="w-full text-center">
            <BeatLoader color="#cbf7ed" />
          </div>
        )}
      </div>
    </div >
  );
};

export default GameCategory;
