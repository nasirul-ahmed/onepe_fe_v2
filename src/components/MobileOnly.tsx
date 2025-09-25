// components/MobileOnlyMessage.tsx
import styles from "@/styles/components/mobileOnly.module.css";

const MobileOnlyMessage = () => {
  return (
    <div className={styles.mobileOnlyOverlay}>
      <div className={styles.mobileOnlyContainer}>
        {/* Mobile device illustration */}
        <div className={styles.deviceIllustration}>
          <div className={styles.deviceFrame}>
            <div className={styles.deviceNotch}></div>
            <div className={styles.deviceScreen}>
              <div className={styles.deviceAppIcon}>
                <svg
                  className={styles.deviceAppIconSvg}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className={styles.deviceHomeButton}>
              <div className={styles.deviceHomeIndicator}></div>
            </div>
          </div>
        </div>

        <h1 className={styles.mobileOnlyTitle}>
          Mobile App Required
        </h1>

        <p className={styles.mobileOnlyDescription}>
          For the best experience, please access this application from your
          mobile device. The desktop version is not supported.
        </p>
      </div>
    </div>
  );
};

export default MobileOnlyMessage;
