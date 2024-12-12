import Image from "next/image";
import zaylo from "@/public/zaylo.png";

export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 400 400"
    >
      <defs>
        {/* <style>
      .cls-1 {
        stroke: #020202;
        stroke-linejoin: round;
        stroke-width: 2px;
        font-size: 208.375px;
        text-anchor: middle;
        fill: #090909;
        font-family: "Bebas Neue";
      }

      .cls-2 {
        fill: #fefefe;
      }
    </style> */}
      </defs>
      <g id="Artboard_1" data-name="Artboard 1">
        <text id="zaylo" className="cls-1" x="199.536" y="284.433">
          za<tspan className="cls-2">y</tspan>lo
        </text>
      </g>
    </svg>
  );
}
