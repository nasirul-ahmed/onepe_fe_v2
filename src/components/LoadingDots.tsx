import React from "react";

export default function LoadingDots() {
  const [dots, setDots] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ display: "inline-block", width: "24px", textAlign: "left" }}>
      {dots}
    </span>
  );
}
