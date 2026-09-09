import { SectionHeading } from "@/components/ui/SectionHeading";
// Replace this with wherever your existing diagram/component actually lives
import OrbitImages from "@/components/orbit/Orbit";

const benefits = [
    "Sync rates and availability across every OTA in real time.",
    "Eliminate double bookings with true two-way channel sync.",
    "Manage Booking.com, Expedia, Airbnb & more from a single dashboard.",
    "Push updates once — every connected channel reflects it instantly.",
];


import img1 from '../../assets/agoda.png';
import img2 from '../../assets/mmt.png';
import img3 from '../../assets/booking.png';
import img4 from '../../assets/goibibo.png';
import img5 from '../../assets/yatra.png';
import img6 from '../../assets/airbnb-logo.png';

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-5 w-5 shrink-0 text-navy-900 dark:text-white"
            aria-hidden="true"
        >
            <circle
                cx="10"
                cy="10"
                r="9"
                className="stroke-navy-300 dark:stroke-navy-600"
                strokeWidth="1.5"
            />
            <path
                d="M6.5 10.3l2.2 2.2 4.8-5.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function OtaConnected() {
    const images = [
        img1, img2, img3, img4, img5, img6,
    ]

    return (
        <section className="bg-canvas py-20 dark:bg-navy-900 lg:py-28">
            <div className="container-px">
                {/* =========================================
              TOP: THE CHALLENGE
           ========================================= */}
                <SectionHeading
                    eyebrow="The Challenge"
                    title="Hotel Operations Shouldn't Be Complicated."
                    subtitle="Running a hotel today means managing a web of channels, rates, and systems that rarely talk to each other. The result is busywork, missed revenue, and risk."
                />

                {/* =========================================
              BELOW: TWO EQUAL COLUMNS
           ========================================= */}
                <div
                    className="
            mt-14
            grid
            grid-cols-1
            items-center
            gap-10
            lg:mt-20
            lg:grid-cols-2
            lg:gap-16
          "
                >
                    {/* -----------------------------------------
                LEFT: WRITTEN CONTENT
             ----------------------------------------- */}
                    <div className="flex flex-col">
                        <span
                            className="
                eyebrow
                text-navy-500
                dark:text-navy-300
              "
                        >
                            Channel Manager
                        </span>

                        <h3
                            className="
                mt-3
                text-2xl
                font-bold
                text-navy-900
                dark:text-white
                sm:text-3xl
              "
                        >
                            Every OTA.{" "}
                            <span className="gradient-text">One Connected Channel Manager.</span>
                        </h3>

                        <p
                            className="
                mt-4
                text-base
                leading-relaxed
                text-secondary
              "
                        >
                            Stop logging into a dozen extranets. Our channel manager plugs
                            directly into every major OTA, keeping your rates, inventory,
                            and availability perfectly in sync — automatically, in both
                            directions.
                        </p>

                        <ul className="mt-8 flex flex-col gap-4">
                            {benefits.map((point) => (
                                <li key={point} className="flex items-start gap-3">
                                    <CheckIcon />
                                    <span
                                        className="
                      text-sm
                      leading-relaxed
                      text-navy-700
                      dark:text-navy-100
                      sm:text-[15px]
                    "
                                    >
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* -----------------------------------------
                RIGHT: YOUR EXISTING COMPONENT
             ----------------------------------------- */}
                    <div className="w-full">
                        <OrbitImages
                            images={images}
                            pathColorClassName = 'text-navy-900 dark:text-white'
                            shape="ellipse"
                            radiusX={450}
                            radiusY={180}
                            rotation={-8}
                            duration={10}
                            itemSize={100}
                            responsive={true}
                            radius={260}
                            direction="normal"
                            fill
                            showPath
                            paused={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}