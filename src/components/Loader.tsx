// "use client";

// const Loader = () => {
//   const circles = [
//     {
//       color: "[--color:#a855f7]",
//       delay: "[animation-delay:0s]",
//       outDelay: "[animation-delay:0.9s]",
//     },
//     {
//       color: "[--color:#06b6d4]",
//       delay: "[animation-delay:0.3s]",
//       outDelay: "[animation-delay:1.2s]",
//     },
//     {
//       color: "[--color:#ec4899]",
//       delay: "[animation-delay:0.6s]",
//       outDelay: "[animation-delay:1.5s]",
//     },
//     {
//       color: "[--color:#f59e0b]",
//       delay: "[animation-delay:0.9s]",
//       outDelay: "[animation-delay:1.8s]",
//     },
//     {
//       color: "[--color:#a855f7]",
//       delay: "[animation-delay:1.2s]",
//       outDelay: "[animation-delay:2.1s]",
//     },
//   ];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//       <div className="flex justify-center items-center">
//         {circles.map((circle, i) => (
//           <div
//             key={i}
//             className={`relative flex items-center justify-center w-3 h-3 mx-2 rounded-full border-2 bg-transparent animate-circle
//               ${circle.color} dark:[--color:hsl(0,0%,87%)]
//               ${circle.delay} border-[var(--color)]`}
//           >
//             {/* Inner Dot */}
//             <div
//               className={`absolute w-3 h-3 rounded-full bg-[var(--color)] animate-dot ${circle.delay}`}
//             ></div>

//             {/* Expanding Outline */}
//             <div
//               className={`absolute w-3 h-3 rounded-full animate-outline ${circle.outDelay}`}
//             ></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

"use client";

const Loader = () => {
  const configs = [
    { pos: "left-[15%]", delay: "0s" },
    { pos: "left-[45%]", delay: "0.2s" },
    { pos: "right-[15%]", delay: "0.3s" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-[120px] h-[40px] z-1">
        {/* Circles */}
        {configs.map((item, i) => (
          <div
            key={`circle-${i}`}
            className={`absolute w-4 h-4 rounded-full bg-[var(--color-on-background)] origin-center animate-jump ${item.pos}`}
            style={{ animationDelay: item.delay }}
          />
        ))}

        {/* Shadows */}
        {configs.map((item, i) => (
          <div
            key={`shadow-${i}`}
            className={`absolute w-4 h-1 rounded-full bg-black/90 top-[62px] origin-center -z-1 blur-[1px] animate-shadow ${item.pos}`}
            style={{ animationDelay: item.delay }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
