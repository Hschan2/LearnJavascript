import React from "react";

function InstagramLink() {
  return (
    <section className="w-full flex justify-center">
      <a
        href="https://www.instagram.com/hravel_pic"
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          flex
          w-full
          max-w-md
          items-center
          justify-between
          rounded-2xl
          border
          border-gray-200
          px-5
          py-4
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-gray-400
          hover:shadow-sm
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              text-gray-800
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">여행 인스타그램</p>
            <p className="mt-0.5 text-xs text-gray-400">
              여행 기록과 새로운 이야기를 만나보세요
            </p>
          </div>
        </div>

        <span
          className="
            ml-4
            text-lg
            text-gray-400
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-gray-800
          "
        >
          ↗
        </span>
      </a>
    </section>
  );
}

export default InstagramLink;
