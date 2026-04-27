"use client";
import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { ROUTE_PATHS } from "@/config/routes";
import { useRequestOtp, useVerifyOtp } from "@/hooks/useAuth";
import styles from "@/styles/pages/login.module.css";
import { useNavigation } from "@/hooks/useNavigate";

export function LoginForm() {
  const { navigate } = useNavigation();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const { mutate: requestOtp, isPending: isRequesting } = useRequestOtp();
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();

  const handleRequestOtp = () => {
    if (phone.length < 10) return alert("Enter valid phone number");
    requestOtp(phone, { onSuccess: () => setStep("otp") });
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return alert("Enter valid OTP");
    verifyOtp({ phone, otp }, { onSuccess: () => navigate(ROUTE_PATHS.HOME) });
  };

  const isLoading = isRequesting || isVerifying;

  const onSelectLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate("/select-language");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>OnePe</div>
        <div className={styles.headerActions}>
          <button
            className={styles.langButton}
            onClick={(e) => onSelectLanguage(e)}
          >
            <span>Eng</span>
            <ChevronDown size={20} />
          </button>
          <button onClick={() => navigate(ROUTE_PATHS.HOME)}>skip</button>
        </div>
      </div>

      {/* Back Navigation */}
      {step === "otp" && (
        <div className={styles.backSection}>
          <button
            className={styles.backButton}
            onClick={() => setStep("phone")}
          >
            <ChevronLeft size={24} />
            <h1>Back</h1>
          </button>
        </div>
      )}

      {/* Form Content */}
      <div className={styles.content}>
        <div className={styles.inputGroup}>
          {step === "phone" ? (
            <TextField
              name="phone"
              label="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="00000 00000"
              maxLength={10}
              startAdornment={
                <span className="pr-2 border-r border-white/10 mr-2 font-bold">
                  +91
                </span>
              }
            />
          ) : (
            <TextField
              label="Enter OTP"
              name="otp"
              className="text-center tracking-[0.5em] text-xl"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="••••••"
              maxLength={6}
            />
          )}

          {step === "otp" && (
            <div className={styles.resendBtn}>
              <button onClick={handleRequestOtp}>Resend OTP?</button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={styles.footerSection}>
        <p className={styles.disclaimer}>
          Standard carrier rates may apply for SMS. We never share your data.
        </p>

        <Button
          onClick={step === "phone" ? handleRequestOtp : handleVerifyOtp}
          disabled={
            isLoading || (step === "phone" ? phone.length < 10 : otp.length < 4)
          }
          className={styles.submitBtn}
        >
          {isLoading
            ? "Processing..."
            : step === "phone"
              ? "Proceed Securely"
              : "Done"}
        </Button>

        <p className={styles.policyText}>
          By proceeding, you agree to our{" "}
          <span className={styles.link}>Terms & Conditions</span> and{" "}
          <span className={styles.link}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
