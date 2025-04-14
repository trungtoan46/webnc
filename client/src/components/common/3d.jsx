import { useRef } from "react"
import { useAnimationFrame } from "motion/react"
import { useNavigate } from "react-router-dom";



export default function ProductAnimation() {
  const ref = useRef(null)
  const navigate = useNavigate();

  useAnimationFrame((t) => {
    if (!ref.current) return

    const rotate = Math.sin(t / 10000) * 200
    const y = (1 + Math.sin(t / 1000)) * -50
    ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`
  })

  return (
    <div className="container-3d fixed bottom-5 right-10 cursor-pointer" onClick={() => {
        navigate('/')
    }}>
      <div className="cube" ref={ref}>
        <div className="side front">
          <div className="image-container">
            <span className="font-bold text-2xl text-blue-200">E</span>
          </div>
        </div>
        <div className="side left">
          <div className="image-container">
          <span className="font-bold text-2xl text-blue-200">G</span>
          </div>
        </div>
        <div className="side right">
          <div className="image-container">
            <span className="font-bold text-2xl text-blue-200">A</span>
          </div>
        </div>
        <div className="side top">
          <div className="image-container">
            <span className="font-bold text-2xl text-blue-200">M</span>
          </div>
        </div>
        <div className="side bottom">
          <div className="image-container">
            <span className="font-bold text-2xl text-blue-200">N</span>
          </div>
        </div>
        <div className="side back">
          <div className="image-container">
            <span className="font-bold text-2xl text-blue-200">E</span>
          </div>
        </div>
      </div>
      <StyleSheet />
    </div>
  )
}
function StyleSheet() {
    return (
      <style>{`
        .container-3d {
          perspective: 600px;
          width: 40px;
          height: 40px;
          margin: 0 auto;
        }
  
        .cube {
          width: 40px;
          height: 40px;
          position: relative;
          transform-style: preserve-3d;
        }
  
        .side {
          position: absolute;
          width: 40px;
          height: 40px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          color: #2a68d9;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
  
        .front {
          transform: rotateY(0deg) translateZ(20px);
        }
        .right {
          transform: rotateY(90deg) translateZ(20px);
        }
        .back {
          transform: rotateY(180deg) translateZ(20px);
        }
        .left {
          transform: rotateY(-90deg) translateZ(20px);
        }
        .top {
          transform: rotateX(90deg) translateZ(20px);
        }
        .bottom {
          transform: rotateX(-90deg) translateZ(20px);
        }
      `}</style>
    )
  }
// Compare this snippet from client/src/components/common/3d.jsx:  


