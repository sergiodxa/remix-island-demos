export function RemixLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={180}
      height={180}
      viewBox="0 0 539 601"
      fill="none"
      className="w-full h-full"
    >
      <g filter="url(#filter0_dd_3_106)" fill="#E8F2FF">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M456.946 428.768c4.255 54.65 4.255 80.268 4.255 108.232H334.756c0-6.091.109-11.663.219-17.313.342-17.564.699-35.88-2.147-72.868-3.761-54.152-27.08-66.185-69.957-66.185H64v-98.525h204.889c54.16 0 81.241-16.476 81.241-60.098 0-38.357-27.081-61.601-81.241-61.601H64V64h227.456C414.069 64 475 121.912 475 214.42c0 69.193-42.877 114.319-100.799 121.84 48.895 9.777 77.48 37.605 82.745 92.508z"
        />
        <path d="M64 537v-73.447h133.697c22.332 0 27.181 16.563 27.181 26.441V537H64z" />
      </g>
      <defs>
        <filter
          id="filter0_dd_3_106"
          x={0}
          y={0}
          width={539}
          height={601}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={28} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.223529 0 0 0 0 0.572549 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3_106" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={32} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.223529 0 0 0 0 0.572549 0 0 0 0 1 0 0 0 0.9 0" />
          <feBlend
            in2="effect1_dropShadow_3_106"
            result="effect2_dropShadow_3_106"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_3_106"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
