/** Logo C: dua koin bertumpuk, ¥ indigo dan Rp kunyit, di kotak tinta. */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Logo YenRapi"
    >
      <rect width="120" height="120" rx="30" fill="#1C2433" />
      <circle cx="48" cy="60" r="28" fill="#2F4A8A" />
      <circle cx="74" cy="60" r="28" fill="#E3A43B" fillOpacity=".92" />
      <text
        x="48"
        y="70"
        textAnchor="middle"
        fontSize="28"
        fontWeight="800"
        fill="#fff"
        fontFamily="inherit"
      >
        ¥
      </text>
      <text
        x="76"
        y="68"
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fill="#1C2433"
        fontFamily="inherit"
      >
        Rp
      </text>
    </svg>
  );
}
