// // import { Banner } from "@/types/banner";
// import styles from "@/styles/components/bannerCard.module.css";
// import { cn } from "@/lib/utils";

// interface BannerCardProps {
//   banner: any;
// }

// export default function BannerCard({ banner }: BannerCardProps) {
//   // Apply dynamic styles from database
//   const dynamicStyles = {
//     backgroundColor: banner.backgroundColor || undefined,
//     color: banner.textColor || undefined,
    
//   };

//   return (
//     <div
//       className={cn(styles.bannerContainer, "rounded-2xl ml-1 mr-1 p-6 bg-gray-900")}
//       style={dynamicStyles}
//     >
//       {/* 1. Handle Media (Image or Video) */}
//       {banner.type === "image" && banner.imageUrl && (
//         <img
//           src={banner.imageUrl}
//           alt={banner.header || "banner"}
//           className={styles.media}
//         />
//       )}
//       {banner.type === "video" && banner.videoUrl && (
//         <video
//           src={banner.videoUrl}
//           autoPlay
//           loop
//           muted
//           className={styles.media}
//         />
//       )}

//       {/* 2. Text Content */}
//       <div className={cn(styles.content)}>
//         {banner.header && <h3 className={styles.header}>{banner.header}</h3>}
//         {banner.middleText && (
//           <p className={styles.middleText}>{banner.middleText}</p>
//         )}
//         {banner.body && <p className={styles.body}>{banner.body}</p>}
//       </div>

//       {/* 3. CTA */}
//       {banner.ctaText && (
//         <a href={banner.ctaUrl || "#"} className={styles.ctaButton}>
//           {banner.ctaText}
//         </a>
//       )}
//     </div>
//   );
// }
