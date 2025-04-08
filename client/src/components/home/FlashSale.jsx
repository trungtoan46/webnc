import React, { useState, useEffect } from "react";
import '../styles/FlashSale.css';
const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 5); // Set countdown to 5 hours from now

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex align-items-center flex-wrap flashsale__header justify-content-between">
      <div className="flash-sale-heading">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h2 className="heading-bar__title flashsale__title m-0">
            <a className="link" href="/collections/hot-products" title="GIẢM SỐC 50%">
              GIẢM SỐC 50%
            </a>
            <span className="ega-dot">
              <span className="ega-ping"></span>
            </span>
          </h2>
          <img
            style={{ maxHeight: "55px" }}
            width="50"
            height="50"
            alt="GIẢM SỐC 50%"
            src="//theme.hstatic.net/200000696635/1001257291/14/flashsale-hot.png?v=107"
          />
        </div>
      </div>

      <div className="flashsale__countdown-wrapper">
        <span className="flashsale__countdown-label">Kết thúc sau</span>
        <div className="flashsale__countdown">
          <div className="ega-badge-ctd">
            <div>
              <div className="ega-badge-ctd__item ega-badge-ctd__h text-gray-800">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-gray-800">Giờ</span>
            </div>
            <div className="ega-badge-ctd__colon">:</div>
            <div>
              <div className="ega-badge-ctd__item ega-badge-ctd__m text-gray-800">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-gray-800">Phút</span>
            </div>
            <div className="ega-badge-ctd__colon">:</div>
            <div>
              <div className="ega-badge-ctd__item ega-badge-ctd__s text-gray-800">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <span className="text-gray-800">Giây</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale; 