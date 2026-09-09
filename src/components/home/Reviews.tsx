import React from "react";

interface Review {
  id: number;
  name: string;
  review: string;
}

interface ReviewCardProps {
  review: Review;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    review:
      "Amazing experience! The service was excellent and everything was handled perfectly.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    review:
      "Beautiful property with wonderful hospitality. Would definitely recommend it.",
  },
  {
    id: 3,
    name: "Amit Patel",
    review:
      "The entire experience was smooth and comfortable. The staff were very helpful.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    review:
      "One of the best stays I have had. Great ambience, excellent rooms and amazing service.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    review:
      "Everything exceeded my expectations. I will definitely come back again.",
  },
  {
    id: 6,
    name: "Neha Joshi",
    review:
      "Loved the atmosphere and hospitality. The attention to detail was impressive.",
  },
];

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <article
      className="
        w-[300px]
        min-w-[300px]
        cursor-pointer
        rounded-2xl
        border
        border-canvas-line
        bg-canvas
        p-6
        shadow-sm
        transition-all
        duration-300
        ease-out

        hover:z-20
        hover:scale-[1.02]
        hover:shadow-lg

        dark:border-navy-600
        dark:bg-navy-800
        dark:shadow-black/10
        dark:hover:shadow-black/30
      "
    >
      {/* Reviewer */}
      <div className="mb-4 flex items-center gap-3">
        {/* Avatar */}
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-navy-900
            text-sm
            font-semibold
            text-white

            dark:bg-white
            dark:text-navy-900
          "
        >
          {review.name.charAt(0).toUpperCase()}
        </div>

        {/* Name + Rating */}
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-navy-900 dark:text-white">
            {review.name}
          </h3>

          <div
            className="flex gap-1 text-yellow-500"
            aria-label="5 out of 5 stars"
          >
            {"★".repeat(5)}
          </div>
        </div>
      </div>

      {/* Review */}
      <p className="text-sm leading-6 text-navy-500 dark:text-navy-200">
        &quot;{review.review}&quot;
      </p>
    </article>
  );
};

const Reviews: React.FC = () => {
  // Duplicate the reviews to create a seamless infinite marquee.
  const topRow: Review[] = [...reviews, ...reviews];
  const bottomRow: Review[] = [...reviews, ...reviews];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-canvas
        py-20
        dark:bg-navy-900
      "
      aria-labelledby="reviews-heading"
    >
      {/* ================================
          HEADER
      ================================= */}
      <div className="container-px mb-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3 text-navy-500 dark:text-navy-300">
            Testimonials
          </p>

          <h2
            id="reviews-heading"
            className="
              text-4xl
              font-bold
              text-navy-900
              md:text-5xl
              dark:text-white
            "
          >
            What People Say
          </h2>

          <p className="mt-4 text-secondary">
            Hear from people who have experienced our service.
          </p>
        </div>
      </div>

      {/* ================================
          TOP ROW
      ================================= */}
      <div className="group mb-8 overflow-hidden">
        <div className="review-track-right flex w-max gap-6">
          {topRow.map((review, index) => (
            <ReviewCard
              key={`top-${review.id}-${index}`}
              review={review}
            />
          ))}
        </div>
      </div>

      {/* ================================
          BOTTOM ROW
      ================================= */}
      <div className="group overflow-hidden">
        <div className="review-track-left flex w-max gap-6">
          {bottomRow.map((review, index) => (
            <ReviewCard
              key={`bottom-${review.id}-${index}`}
              review={review}
            />
          ))}
        </div>
      </div>

      {/* ================================
          LEFT FADE
      ================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-10
          w-24
          bg-gradient-to-r
          from-canvas
          to-transparent

          dark:from-navy-900
        "
        aria-hidden="true"
      />

      {/* ================================
          RIGHT FADE
      ================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-10
          w-24
          bg-gradient-to-l
          from-canvas
          to-transparent

          dark:from-navy-900
        "
        aria-hidden="true"
      />
    </section>
  );
};

export default Reviews;
