import Spline from "@splinetool/react-spline";
import "../index.css";

export default function Sphere() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-[-1]">
        <Spline scene="https://prod.spline.design/AODS0PAyyoxn3Wtw/scene.splinecode" />
      </div>
    </div>
  );
}
