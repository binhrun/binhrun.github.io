import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const circleFace1 = require("@site/static/img/circle-face-1.png");
const circleFace2 = require("@site/static/img/circle-face-2.png");
const circleFace3 = require("@site/static/img/circle-face-3.png");

type FeatureItem = {
  title: string;
  Component:
    | React.ComponentType
    | React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Theo dõi mọi buổi chạy của bạn",
    Component: () => {
      const ref = useRef(null);
      const inViewport = useIntersection(ref, "0px");
      const [transition, setTransition] = useState(false);

      useEffect(() => {
        if (inViewport) {
          const timeout = setTimeout(() => setTransition(true), 500);
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [inViewport]);

      return (
        <div className={styles.imageOneContainer} ref={ref} style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          minHeight: "300px"
        }}>
          <div style={{ 
            fontSize: "48px", 
            fontWeight: "bold", 
            color: "#FF6B35",
            marginBottom: "1rem",
            opacity: transition ? 1 : 0,
            transition: "opacity 0.5s"
          }}>
            5.2 km
          </div>
          <div style={{ 
            fontSize: "24px", 
            color: "#564E4A",
            marginBottom: "0.5rem",
            opacity: transition ? 1 : 0,
            transition: "opacity 0.5s 0.2s"
          }}>
            28:45
          </div>
          <div style={{ 
            fontSize: "18px", 
            color: "#564E4A",
            opacity: transition ? 1 : 0,
            transition: "opacity 0.5s 0.4s"
          }}>
            Pace: 5:32/km
          </div>
        </div>
      );
    },
    description: (
      <>
        Ghi lại mọi buổi chạy của bạn với GPS chính xác. Theo dõi quãng đường, 
        thời gian, tốc độ và độ cao. Binh.run tự động lưu lại lịch sử chạy bộ 
        của bạn để bạn có thể xem lại và theo dõi tiến trình theo thời gian.
      </>
    ),
  },
  {
    title: "Phân tích hiệu suất chi tiết",
    Component: () => {
      const [show, setShow] = useState(false);
      const stats = [
        { label: "Tổng quãng đường", value: "125.5 km", color: "#FF6B35" },
        { label: "Tổng thời gian", value: "10h 45m", color: "#41476E" },
        { label: "Số buổi chạy", value: "15", color: "#564E4A" },
        { label: "Pace trung bình", value: "5:08/km", color: "#FF6B35" },
      ];
      const [current, setCurrent] = useState(0);

      useEffect(() => {
        const interval = setInterval(() => {
          setShow(false);
          setCurrent((current) => (current + 1) % stats.length);
          setTimeout(() => setShow(true), 300);
        }, 2500);
        setShow(true);
        return () => clearInterval(interval);
      }, []);

      const stat = stats[current];

      return (
        <div className={styles.imageTwoContainer} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          minHeight: "300px"
        }}>
          <div style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "14px", color: "#564E4A", marginBottom: "0.5rem" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "42px", fontWeight: "bold", color: stat.color }}>
              {stat.value}
            </div>
          </div>
        </div>
      );
    },
    description: (
      <>
        Xem thống kê chi tiết về hiệu suất chạy bộ của bạn. Phân tích xu hướng, 
        cải thiện pace, và đặt mục tiêu mới. Binh.run cung cấp các biểu đồ và 
        báo cáo giúp bạn hiểu rõ hơn về tiến trình của mình.
      </>
    ),
  },
  {
    title: "Tham gia cộng đồng người chạy bộ",
    Component: () => {
      const ref = useRef(null);
      const inViewport = useIntersection(ref, "0px");

      const [transition, setTransition] = useState(false);
      const [facesTransition, setFacesTransition] = useState(false);

      useEffect(() => {
        if (inViewport) {
          const timeout = setTimeout(() => setTransition(true), 500);
          const facesTimeout = setTimeout(() => setFacesTransition(true), 1000);
          return () => {
            clearTimeout(timeout);
            clearTimeout(facesTimeout);
          };
        }
      }, [inViewport]);
      
      return (
        <div className={styles.imageThreeContainer} ref={ref} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          minHeight: "300px",
          position: "relative"
        }}>
          <div style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem"
          }}>
            <img
              alt="Runner"
              src={circleFace1.default}
              className={`${styles.circleFaceOneInitial} ${
                facesTransition ? styles.circleFaceOne : ""
              }`}
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
            <img
              alt="Runner"
              src={circleFace2.default}
              className={`${styles.circleFaceTwoInitial} ${
                facesTransition ? styles.circleFaceTwo : ""
              }`}
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
            <img
              alt="Runner"
              src={circleFace3.default}
              className={`${styles.circleFaceThreeInitial} ${
                facesTransition ? styles.circleFaceThree : ""
              }`}
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
          </div>
          <div style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#41476E",
            opacity: transition ? 1 : 0,
            transition: "opacity 0.5s"
          }}>
            Kết nối với hàng ngàn người chạy
          </div>
          <div style={{
            fontSize: "16px",
            color: "#564E4A",
            marginTop: "0.5rem",
            opacity: transition ? 1 : 0,
            transition: "opacity 0.5s 0.2s"
          }}>
            Chia sẻ, thách thức và cùng nhau tiến bộ
          </div>
        </div>
      );
    },
    description: (
      <>
        Tham gia cộng đồng người chạy bộ lớn nhất Việt Nam. Kết nối với bạn bè, 
        tham gia các thử thách, và chia sẻ thành tích của bạn. Cộng đồng Binh.run 
        luôn sẵn sàng động viên và hỗ trợ bạn trên hành trình chạy bộ.
      </>
    ),
  },
];

function Feature({ title, description, Component }: FeatureItem): JSX.Element {
  return (
    <div className={styles.rowContainer}>
      <div className={"col col--6 padding--top--md"}>
        <div className="text--left">
          <p className={styles.featureTitle}>{title}</p>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
      <div className={"col col--6"}>
        <div className={styles.featureComponentContainer}>
          <Component className={styles.featureComponent} />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

const useIntersection = (
  element: MutableRefObject<Element | null>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);
  const observerRef: MutableRefObject<IntersectionObserver | null> =
    useRef(null);
  // store our own copy of element ref for un-observing, as it will be undefined
  // later when component is removed
  const elementRef: MutableRefObject<Element | null> = useRef(null);

  useEffect(() => {
    // store in variable for typescript narrowing
    const currentElement = element.current;
    if (observerRef.current === null && currentElement !== null) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setState(!!entry?.isIntersecting);
          if (!!entry?.isIntersecting) observer.unobserve(currentElement);
        },
        { rootMargin }
      );
      elementRef.current = element.current;
      observerRef.current = observer;

      element.current && observer.observe(element.current);
    }

    return () => {
      currentElement && observerRef.current?.unobserve(currentElement);
      observerRef.current = null;
      elementRef.current = null;
    };
  }, []);

  return isVisible;
};
