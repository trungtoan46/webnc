import React from "react";
import "../styles/CouponSection.css";

const coupons = [
  {
    code: "EGA10",
    title: "NHẬP MÃ: EGA10",
    description: "Mã giảm 10% cho đơn hàng tối thiểu 1.5 triệu",
    conditions: "- Mã giảm 10% cho đơn hàng có giá trị tối thiểu 1.5 triệu <br>- Giảm tối đa 500k",
    image: "https://theme.hstatic.net/200000696635/1001257291/14/coupon_1_img.png?v=107",
  },
  {
    code: "EGA15",
    title: "NHẬP MÃ: EGA15",
    description: "Mã giảm 15% cho đơn hàng tối thiểu 2 triệu",
    conditions: "- Mã giảm 15% cho đơn hàng có giá trị tối thiểu 2 triệu <br>- Giảm tối đa 500k",
    image: "https://theme.hstatic.net/200000696635/1001257291/14/coupon_2_img.png?v=107",
  },
  {
    code: "EGA99",
    title: "NHẬP MÃ: EGA99",
    description: "Giảm giá 99k các sản phẩm Áo thun",
    conditions: "- Giảm giá 99k các sản phẩm Áo thun <br>- Tổng giá trị sản phẩm từ 1 triệu trở lên",
    image: "https://theme.hstatic.net/200000696635/1001257291/14/coupon_3_img.png?v=107",
  },
  {
    code: "EGAFREESHIP",
    title: "NHẬP MÃ: EGAFREESHIP",
    description: "Miễn phí ship cho đơn hàng tối thiểu 500.000đ",
    conditions: "- Miễn phí ship 100K cho đơn hàng tối thiểu từ 500.000đ <br>- Áp dụng cho tất cả tỉnh / thành phố",
    image: "https://theme.hstatic.net/200000696635/1001257291/14/coupon_4_img.png?v=107",
  },
];

const CouponSection = () => {
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied coupon code: ${code}`);
  };

  return (
    <section className="coupon-section">
      <div className="container">
        <div className="row">
          {coupons.map((coupon, index) => (
            <div key={index} className="coupon-item">
              <div className="coupon-icon">
                <img src={coupon.image} alt={coupon.code} />
              </div>
              <div className="coupon-body">
                <h3 className="coupon-title">{coupon.title}</h3>
                <p className="coupon-desc">{coupon.description}</p>
                <button
                  className="btn-main"
                  onClick={() => handleCopy(coupon.code)}
                >
                  Sao chép
                </button>
                <div
                  className="coupon-conditions"
                  dangerouslySetInnerHTML={{ __html: coupon.conditions }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection; 