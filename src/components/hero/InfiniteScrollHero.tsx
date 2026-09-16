import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../../assets/hero/img1.webp";
// import img2 from "../../assets/hero/img2.webp";
// import img3 from "../../assets/hero/img3.webp";
// import img4 from "../../assets/hero/img4.webp";
// import img5 from "../../assets/hero/img5.webp";
// import img6 from "../../assets/hero/img6.webp";
// import img7 from "../../assets/hero/img7.webp";
// import img8 from "../../assets/hero/img8.webp";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONFIG
========================================================= */

const TUNNEL_DEPTH = 3200;

const PIN_DISTANCE = 3800;

const PERSPECTIVE = 1500;

/*
 * Wall dimensions.
 *
 * Slightly larger than before so the tunnel
 * feels like a real environment.
 */
const WALL_WIDTH = "52vw";
const WALL_HEIGHT = "52vh";

/*
 * Base image size.
 */
const IMAGE_WIDTH = "clamp(105px, 10vw, 165px)";
const IMAGE_HEIGHT = "clamp(130px, 13vw, 200px)";

/*
 * Scale while travelling.
 */
const MIN_SCALE = 0.68;
const MAX_SCALE = 1.16;

/*
 * Stretch effect.
 */
const MIN_STRETCH_X = 0.86;
const MAX_STRETCH_X = 1.10;

const MIN_STRETCH_Y = 0.92;
const MAX_STRETCH_Y = 1.06;

/*
 * Row spacing.
 */
const ROW_SPACING = 205;

/* =========================================================
   TYPES
========================================================= */

type Wall =
  | "top"
  | "bottom"
  | "left"
  | "right";

interface Photo {
  id: string;

  wall: Wall;

  row: number;

  column: number;

  src: string;

  position: number;

  size: number;

  rotation: number;
}

/* =========================================================
   IMAGES
========================================================= */

const PHOTO_URLS = [
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,

  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,

  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,

  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
  img1,
];

/* =========================================================
   EDITORIAL GRID PATTERN
========================================================= */

/*
 * Instead of:
 *
 * [ ] [ ] [ ] [ ]
 * [ ] [ ] [ ] [ ]
 * [ ] [ ] [ ] [ ]
 *
 * we use slightly different positions
 * on every row.
 *
 * This gives the wall the more natural
 * Framer-like composition.
 */

/*
 * TOP / BOTTOM
 */

const HORIZONTAL_PATTERNS = [
  /*
   * Row 1
   */
  [-470, -160, 180, 470],

  /*
   * Row 2
   */
  [-500, -235, 115, 455],

  /*
   * Row 3
   */
  [-455, -85, 270],
];

/*
 * LEFT / RIGHT
 */

const VERTICAL_PATTERNS = [
  /*
   * Row 1
   */
  [-450, -145, 185, 465],

  /*
   * Row 2
   */
  [-490, -220, 120, 460],

  /*
   * Row 3
   */
  [-450, -70, 270],
];

/* =========================================================
   IMAGE SIZE VARIATION
========================================================= */

const SIZE_PATTERN = [
  0.92,
  1.04,
  0.86,
  1.08,
  0.96,
  0.88,
  1.05,
  0.90,
  1.02,
  0.86,
  1.08,
  0.94,
];

/* =========================================================
   IMAGE ROTATION
========================================================= */

const ROTATION_PATTERN = [
  -2.2,
  1.4,
  -1.5,
  2.0,
  -1.2,
  2.4,
  -1.8,
  1.1,
  -2.0,
  1.7,
  -1.0,
  2.2,
];

/* =========================================================
   HELPERS
========================================================= */

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

/* =========================================================
   BUILD PHOTOS
========================================================= */

function buildWallPhotos(): Photo[] {
  const photos: Photo[] = [];

  const walls: Wall[] = [
    "top",
    "bottom",
    "left",
    "right",
  ];

  let imageIndex = 0;

  walls.forEach((wall) => {
    const patterns =
      wall === "left" ||
      wall === "right"
        ? VERTICAL_PATTERNS
        : HORIZONTAL_PATTERNS;

    patterns.forEach(
      (positions, rowIndex) => {
        positions.forEach(
          (position, columnIndex) => {
            photos.push({
              id: `${wall}-${rowIndex}-${columnIndex}`,

              wall,

              row: rowIndex,

              column: columnIndex,

              src:
                PHOTO_URLS[
                  imageIndex %
                    PHOTO_URLS.length
                ],

              position,

              size:
                SIZE_PATTERN[
                  imageIndex %
                    SIZE_PATTERN.length
                ],

              rotation:
                ROTATION_PATTERN[
                  imageIndex %
                    ROTATION_PATTERN.length
                ],
            });

            imageIndex++;
          }
        );
      }
    );
  });

  return photos;
}

/* =========================================================
   PHOTO CARD
========================================================= */

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = forwardRef<
  HTMLDivElement,
  PhotoCardProps
>(({ photo }, ref) => {
  return (
    <div
      ref={ref}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        overflow-hidden
        rounded-[8px]
        border
        border-white/[0.12]
        bg-white/[0.025]
        shadow-[0_18px_50px_rgba(0,0,0,0.42)]
        will-change-transform
      "
      style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,

        transformStyle:
          "preserve-3d",

        transformOrigin:
          "center center",

        /*
         * Individual image size variation.
         */
        ["--image-size" as string]:
          photo.size,
      }}
    >
      <img
        src={photo.src}
        alt=""
        draggable={false}
        className="
          h-full
          w-full
          select-none
          object-cover
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.06]
          via-transparent
          to-black/20
        "
      />
    </div>
  );
});

PhotoCard.displayName =
  "PhotoCard";

/* =========================================================
   ARROW
========================================================= */

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    >
      <path
        d="
          M2.5 7.5
          H12.5
          M8.5 3.5
          L12.5 7.5
          L8.5 11.5
        "
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InfiniteScrollHero() {
  const sectionRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const sceneRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const wallRefs =
    useRef<
      Record<
        Wall,
        HTMLDivElement | null
      >
    >({
      top: null,
      bottom: null,
      left: null,
      right: null,
    });

  const photoRefs =
    useRef<
      Record<
        string,
        HTMLDivElement | null
      >
    >({});

  const travel =
    useRef(0);

  const photos =
    useRef<Photo[]>(
      buildWallPhotos()
    );

  /* =======================================================
     GSAP SETUP
  ======================================================= */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const scene =
      sceneRef.current;

    if (!section || !scene) {
      return;
    }

    const ctx =
      gsap.context(() => {
        /* =================================================
           INITIAL SETUP
        ================================================= */

        travel.current = 0;

        gsap.set(scene, {
          perspective:
            PERSPECTIVE,

          transformStyle:
            "preserve-3d",
        });

        Object.values(
          photoRefs.current
        ).forEach((element) => {
          if (!element) return;

          gsap.set(element, {
            force3D: true,

            transformStyle:
              "preserve-3d",
          });
        });

        /* =================================================
           TUNNEL UPDATE
        ================================================= */

        const updateTunnel =
          () => {
            /*
             * Current tunnel travel.
             */
            const currentTravel =
              travel.current;

            /*
             * Z position of complete wall.
             *
             * The important part:
             *
             * ALL images on a wall share
             * the same Z position.
             *
             * Therefore the wall behaves
             * as one layer.
             */
            const z =
              -TUNNEL_DEPTH +
              currentTravel;

            /*
             * 0 -> far
             * 1 -> close
             */
            const depthProgress =
              clamp(
                currentTravel /
                  TUNNEL_DEPTH,
                0,
                1
              );

            /*
             * Smooth depth.
             */
            const smoothDepth =
              gsap.parseEase(
                "power2.inOut"
              )(depthProgress);

            /* =============================================
               SCALE
            ============================================= */

            const scale =
              MIN_SCALE +
              smoothDepth *
                (MAX_SCALE -
                  MIN_SCALE);

            /* =============================================
               HORIZONTAL STRETCH
            ============================================= */

            const stretchX =
              MIN_STRETCH_X +
              smoothDepth *
                (MAX_STRETCH_X -
                  MIN_STRETCH_X);

            /* =============================================
               VERTICAL STRETCH
            ============================================= */

            const stretchY =
              MIN_STRETCH_Y +
              smoothDepth *
                (MAX_STRETCH_Y -
                  MIN_STRETCH_Y);

            /* =============================================
               SMALL PERSPECTIVE ROTATION
            ============================================= */

            const tunnelRotation =
              (smoothDepth - 0.5) *
              1.2;

            /* =============================================
               WALL TRANSFORMS
            ============================================= */

            const wallTransforms: Record<
              Wall,
              string
            > = {
              top: `
                translate3d(
                  0,
                  -50%,
                  ${z}px
                )
                rotateX(90deg)
              `,

              bottom: `
                translate3d(
                  0,
                  50%,
                  ${z}px
                )
                rotateX(-90deg)
              `,

              left: `
                translate3d(
                  -50%,
                  0,
                  ${z}px
                )
                rotateY(-90deg)
              `,

              right: `
                translate3d(
                  50%,
                  0,
                  ${z}px
                )
                rotateY(90deg)
              `,
            };

            /* =============================================
               APPLY WALL MOVEMENT
            ============================================= */

            (
              Object.keys(
                wallRefs.current
              ) as Wall[]
            ).forEach((wall) => {
              const element =
                wallRefs.current[
                  wall
                ];

              if (!element) return;

              element.style.transform =
                wallTransforms[
                  wall
                ];
            });

            /* =============================================
               IMAGE MOVEMENT
            ============================================= */

            photos.current.forEach(
              (photo) => {
                const element =
                  photoRefs.current[
                    photo.id
                  ];

                if (!element) return;

                /*
                 * Three rows.
                 */
                const rowPosition =
                  (photo.row - 1) *
                  ROW_SPACING;

                /*
                 * Position remains fixed.
                 *
                 * This creates the actual grid.
                 */
                const finalPosition =
                  photo.position;

                /*
                 * Individual image size.
                 */
                const individualScale =
                  photo.size;

                /*
                 * Combine:
                 *
                 * tunnel scale
                 * ×
                 * individual size
                 */
                const finalScale =
                  scale *
                  individualScale;

                /*
                 * Slight rotation.
                 */
                const rotation =
                  photo.rotation +
                  tunnelRotation;

                /*
                 * Final scale.
                 */
                const finalScaleX =
                  finalScale *
                  stretchX;

                const finalScaleY =
                  finalScale *
                  stretchY;

                /* =========================================
                   TOP / BOTTOM
                ========================================= */

                if (
                  photo.wall ===
                    "top" ||
                  photo.wall ===
                    "bottom"
                ) {
                  element.style.transform = `
                    translate3d(
                      ${finalPosition}px,
                      ${rowPosition}px,
                      0
                    )

                    rotateZ(
                      ${rotation}deg
                    )

                    scale3d(
                      ${finalScaleX},
                      ${finalScaleY},
                      1
                    )
                  `;
                }

                /* =========================================
                   LEFT / RIGHT
                ========================================= */

                if (
                  photo.wall ===
                    "left" ||
                  photo.wall ===
                    "right"
                ) {
                  element.style.transform = `
                    translate3d(
                      ${rowPosition}px,
                      ${finalPosition}px,
                      0
                    )

                    rotateZ(
                      ${rotation}deg
                    )

                    scale3d(
                      ${finalScaleX},
                      ${finalScaleY},
                      1
                    )
                  `;
                }

                /*
                 * Keep images visible.
                 *
                 * Slight fade at far end.
                 */
                const opacity =
                  0.38 +
                  smoothDepth *
                    0.62;

                element.style.opacity =
                  String(opacity);
              }
            );
          };

        /* =================================================
           INITIAL POSITION
        ================================================= */

        updateTunnel();

        /* =================================================
           SCROLLTRIGGER
        ================================================= */

        const trigger =
          ScrollTrigger.create({
            trigger: section,

            start: "top top",

            end: `+=${PIN_DISTANCE}`,

            pin: true,

            scrub: 1,

            anticipatePin: 1,

            invalidateOnRefresh:
              true,

            onUpdate: (
              self
            ) => {
              travel.current =
                self.progress *
                TUNNEL_DEPTH;

              updateTunnel();
            },
          });

        /* =================================================
           RESIZE
        ================================================= */

        const handleResize =
          () => {
            ScrollTrigger.refresh();

            updateTunnel();
          };

        window.addEventListener(
          "resize",
          handleResize
        );

        /* =================================================
           CLEANUP
        ================================================= */

        return () => {
          window.removeEventListener(
            "resize",
            handleResize
          );

          trigger.kill();
        };
      }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* ===================================================
          3D SCENE
      =================================================== */}

      <div
        ref={sceneRef}
        className="
          absolute
          inset-0
          overflow-hidden
        "
        style={{
          perspective:
            `${PERSPECTIVE}px`,

          perspectiveOrigin:
            "50% 50%",
        }}
      >
        {/* ===============================================
            TOP
        =============================================== */}

        <div
          ref={(element) => {
            wallRefs.current.top =
              element;
          }}
          className="
            absolute
            left-1/2
            top-0
            flex
            items-center
            justify-center
          "
          style={{
            width: WALL_WIDTH,

            height: WALL_HEIGHT,

            marginLeft:
              `calc(${WALL_WIDTH} / -2)`,

            transformStyle:
              "preserve-3d",

            transformOrigin:
              "center center",
          }}
        >
          {photos.current
            .filter(
              (photo) =>
                photo.wall ===
                "top"
            )
            .map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                ref={(element) => {
                  photoRefs.current[
                    photo.id
                  ] = element;
                }}
              />
            ))}
        </div>

        {/* ===============================================
            BOTTOM
        =============================================== */}

        <div
          ref={(element) => {
            wallRefs.current.bottom =
              element;
          }}
          className="
            absolute
            bottom-0
            left-1/2
            flex
            items-center
            justify-center
          "
          style={{
            width: WALL_WIDTH,

            height: WALL_HEIGHT,

            marginLeft:
              `calc(${WALL_WIDTH} / -2)`,

            transformStyle:
              "preserve-3d",

            transformOrigin:
              "center center",
          }}
        >
          {photos.current
            .filter(
              (photo) =>
                photo.wall ===
                "bottom"
            )
            .map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                ref={(element) => {
                  photoRefs.current[
                    photo.id
                  ] = element;
                }}
              />
            ))}
        </div>

        {/* ===============================================
            LEFT
        =============================================== */}

        <div
          ref={(element) => {
            wallRefs.current.left =
              element;
          }}
          className="
            absolute
            left-0
            top-1/2
            flex
            items-center
            justify-center
          "
          style={{
            width: WALL_HEIGHT,

            height: WALL_WIDTH,

            marginTop:
              `calc(${WALL_WIDTH} / -2)`,

            transformStyle:
              "preserve-3d",

            transformOrigin:
              "center center",
          }}
        >
          {photos.current
            .filter(
              (photo) =>
                photo.wall ===
                "left"
            )
            .map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                ref={(element) => {
                  photoRefs.current[
                    photo.id
                  ] = element;
                }}
              />
            ))}
        </div>

        {/* ===============================================
            RIGHT
        =============================================== */}

        <div
          ref={(element) => {
            wallRefs.current.right =
              element;
          }}
          className="
            absolute
            right-0
            top-1/2
            flex
            items-center
            justify-center
          "
          style={{
            width: WALL_HEIGHT,

            height: WALL_WIDTH,

            marginTop:
              `calc(${WALL_WIDTH} / -2)`,

            transformStyle:
              "preserve-3d",

            transformOrigin:
              "center center",
          }}
        >
          {photos.current
            .filter(
              (photo) =>
                photo.wall ===
                "right"
            )
            .map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                ref={(element) => {
                  photoRefs.current[
                    photo.id
                  ] = element;
                }}
              />
            ))}
        </div>

        {/* ===============================================
            INNER FRAME
        =============================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[58vh]
            w-[58vw]
            -translate-x-1/2
            -translate-y-1/2
            border
            border-white/[0.08]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[46vh]
            w-[46vw]
            -translate-x-1/2
            -translate-y-1/2
            border
            border-white/[0.045]
          "
        />
      </div>

      {/* ===================================================
          FIXED CENTER CONTENT
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-50
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            pointer-events-auto
            flex
            max-w-[720px]
            flex-col
            items-center
            text-center
          "
        >
          <p
            className="
              mb-5
              text-[10px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-white/45
              sm:text-xs
            "
          >
            SaaS Hospitality Platform
          </p>

          <h1
            className="
              text-4xl
              font-semibold
              leading-[1.02]
              tracking-[-0.05em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[72px]
            "
          >
            Build smarter.
            <br />
            Grow faster.
          </h1>

          <p
            className="
              mt-6
              max-w-[540px]
              text-sm
              leading-7
              text-white/50
              sm:text-base
            "
          >
            Powerful hospitality
            technology designed to
            simplify operations,
            increase bookings and
            create better guest
            experiences.
          </p>

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            <button
              className="
                group
                flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-black
                transition-transform
                duration-300
                hover:scale-105
              "
            >
              Get Started

              <ArrowIcon />
            </button>

            <button
              className="
                rounded-full
                border
                border-white/15
                bg-white/[0.035]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/30
                hover:bg-white/[0.07]
              "
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================
          VIGNETTE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-40
          bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.88)_100%)]
        "
      />

      {/* ===================================================
          TOP FADE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-40
          h-36
          bg-gradient-to-b
          from-black
          to-transparent
        "
      />

      {/* ===================================================
          BOTTOM FADE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-40
          h-36
          bg-gradient-to-t
          from-black
          to-transparent
        "
      />

      {/* ===================================================
          SCROLL INDICATOR
      =================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-[60]
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-[9px]
          uppercase
          tracking-[0.3em]
          text-white/30
        "
      >
        <span>
          Scroll
        </span>

        <span
          className="
            h-8
            w-px
            bg-gradient-to-b
            from-white/40
            to-transparent
          "
        />
      </div>
    </section>
  );
}