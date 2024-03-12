import { useEffect } from "react";
import "../styles/loading.scss";
export default function Loading() {
  return (
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
