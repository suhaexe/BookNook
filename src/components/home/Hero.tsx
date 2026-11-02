"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { display } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Stories",
    italic: "worth",
    end: "sharing.",
    text: "A little corner of the internet for stories that stay with you.",
    btnText: "Browse Library",
    link: "/books",
  },
  {
    title: "Knowledge",
    italic: "waiting",
    end: "to be found.",
    text: "Explore a curated collection of history, science, and art from fellow readers.",
    btnText: "Explore Collection",
    link: "/books",
  },
  {
    title: "Books",
    italic: "live",
    end: "longer.",
    text: "Add your own books to the shelf and share them with the community.",
    btnText: "Add a Book",
    link: "/add-book",
  },
];

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#EAE9E5] px-4 pb-8 pt-2 sm:px-8 lg:px-12 lg:pt-0 lg:mt-[-40px] lg:pb-8 overflow-hidden relative">
      <div className="mx-auto max-w-[1440px]">
        {/* desktop hero */}
        <div className="hidden lg:block">
          <div className="relative aspect-[1672/941] min-h-[600px] w-full">
            <div
              className="absolute inset-0 overflow-hidden bg-[#1a1512]"
              style={{
                maskImage: "url('/bg-overly.png')",
                WebkitMaskImage: "url('/bg-overly.png')",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <div
                className="absolute right-[3%] top-1/2 h-[70%] w-[55%] -translate-y-1/2"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              >
                <Image
                  src="/library.png"
                  alt="A cozy library"
                  fill
                  priority
                  sizes="55vw"
                  className="object-cover brightness-[0.8] saturate-[0.85] sepia-[0.2]"
                />
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1512_0%,#1a1512_30%,rgba(26,21,18,0)_65%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,21,18,0.5),rgba(26,21,18,0)_25%,rgba(26,21,18,0)_75%,rgba(26,21,18,0.6))]" />

              <span
                className={`${display.className} absolute -right-4 bottom-[12%] select-none text-[240px] leading-none text-[#8D7771]/20`}
              >
                01
              </span>

              <div className="absolute bottom-[14%] left-[3.5%] top-[38%] w-px bg-[#8D7771]/40" />
              <span className="absolute left-[3.5%] top-[64%] -translate-x-1/2 text-xl text-[#8D7771]">
                ✦
              </span>
            </div>

            {/* desktop swiper */}
            <div className="relative z-10 h-full w-full">
              <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 flex flex-col gap-4">
                <button className="hero-prev flex h-12 w-12 items-center justify-center rounded-full border border-[#EAE9E5]/40 bg-[#1a1512]/30 text-[#EAE9E5] backdrop-blur-md transition-all hover:bg-[#8D7771] hover:text-[#1a1512] hover:border-[#8D7771]">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="hero-next flex h-12 w-12 items-center justify-center rounded-full border border-[#EAE9E5]/40 bg-[#1a1512]/30 text-[#EAE9E5] backdrop-blur-md transition-all hover:bg-[#8D7771] hover:text-[#1a1512] hover:border-[#8D7771]">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {mounted && (
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade, Navigation]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={600}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
                  loop={true}
                  className="h-full w-full [&_.swiper-pagination]:!bottom-14 [&_.swiper-pagination]:!pl-[12%] [&_.swiper-pagination]:!justify-start [&_.swiper-pagination]:!text-left [&_.swiper-pagination-bullet-active]:!bg-[#8D7771] [&_.swiper-pagination-bullet]:bg-[#EAE9E5]/50"
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="!h-full">
                      <div className="flex h-full flex-col justify-center pl-[12%] pr-12">
                        <div className="mb-6 flex items-center gap-4">
                          <span className="h-px w-14 bg-[#B4B0A8]/60" />
                          <p className="text-xs uppercase tracking-[0.3em] text-[#B4B0A8]">
                            welcome to booknook
                          </p>
                        </div>

                        <h1
                          className={`${display.className} text-7xl font-medium leading-[0.9] text-[#F1EDE6] xl:text-[104px]`}
                        >
                          {slide.title}
                          <br />
                          <span className="italic text-[#8D7771]">
                            {slide.italic}
                          </span>
                          <br />
                          {slide.end}
                        </h1>

                        <p
                          className={`${display.className} mt-8 flex max-w-sm gap-4 text-xl leading-8 text-[#D8D3CA]`}
                        >
                          <span className="mt-1 text-[#8D7771]">✳</span>
                          <span>{slide.text}</span>
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                          <Link
                            href={slide.link}
                            className="rounded-sm bg-[#8D7771] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1512] transition hover:bg-[#A18B85]"
                          >
                            {slide.btnText}
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[#8D7771]">
            <div className="flex items-center gap-4">
              <span>✦</span>
              <span className="h-px w-72 bg-[#8D7771]/50" />
            </div>
            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.3em]">
              <span>Discover</span>
              <span>•</span>
              <span>Read</span>
              <span>•</span>
              <span>Return</span>
              <span className="ml-2 h-px w-40 bg-[#8D7771]/50" />
            </div>
          </div>
        </div>

        {/* mobile + tablet hero */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-md px-2 pt-4 md:max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#8D7771]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#59636A]">
                welcome to booknook
              </p>
            </div>

            <div className="relative ml-auto w-[84%] md:w-[80%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-[#1a1512]">
                <Image
                  src="/library.png"
                  alt="A cozy library"
                  fill
                  priority
                  sizes="(min-width: 768px) 60vw, 84vw"
                  className="object-cover object-right"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(234,233,229,0)_30%,#EAE9E5_92%)]" />
              </div>

              <p className="absolute -left-9 top-20 rotate-180 text-[10px] uppercase tracking-[0.3em] text-[#8D7771] [writing-mode:vertical-rl]">
                bound by ink. est. 2026
              </p>

              <span
                className={`${display.className} absolute -bottom-4 right-2 select-none text-7xl leading-none text-[#8D7771]/30`}
              >
                01
              </span>
            </div>

            {/* mobile swiper */}
            <div className="relative z-10 -mt-20 md:-mt-8 md:pl-12">
              {mounted && (
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade, Navigation]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={600}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: ".mobile-prev",
                    nextEl: ".mobile-next",
                  }}
                  loop={true}
                  autoHeight={true}
                  className="w-full [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:!text-left [&_.swiper-pagination-bullet-active]:!bg-[#8D7771] [&_.swiper-pagination-bullet]:bg-[#1a1512]/20"
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <h1
                        className={`${display.className} text-[64px] font-medium leading-[0.9] text-[#1a1512] sm:text-7xl md:text-[88px]`}
                      >
                        {slide.title}
                        <br />
                        <span className="italic text-[#8D7771]">
                          {slide.italic}
                        </span>
                        <br />
                        {slide.end}
                      </h1>

                      <p className="mt-6 max-w-xs text-[15px] leading-7 text-[#59636A]">
                        {slide.text}
                      </p>

                      <div className="mt-8 mb-10 flex flex-wrap gap-3">
                        <Link
                          href={slide.link}
                          className="rounded-full bg-[#1a1512] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EAE9E5] transition hover:bg-[#8D7771]"
                        >
                          {slide.btnText}{" "}
                          <span aria-hidden>{"\u2197\uFE0E"}</span>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              <div className="absolute bottom-0 right-0 z-50 flex gap-2 pointer-events-auto">
                <button
                  type="button"
                  className="mobile-prev flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#1a1512]/20 text-[#1a1512] hover:bg-[#1a1512]/10"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="mobile-next flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#1a1512]/20 text-[#1a1512] hover:bg-[#1a1512]/10"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#8D7771] sm:text-[11px]">
              <span>Discover</span>
              <span>•</span>
              <span>Read</span>
              <span>•</span>
              <span>Return</span>
              <span className="ml-2 h-px flex-1 bg-[#8D7771]/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
