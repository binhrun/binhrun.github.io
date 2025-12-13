import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import moment from "moment";

import styles from "./index.module.css";
import SVGImage from "../components/SVGImage";
import * as Arrow from "@site/static/img/arrow.svg";

const heroImage = require("@site/static/img/hero-graphic.svg");
const faceWinking = require("@site/static/img/face-winking.png");

// Mock data for recent activities (in real app, this would come from API)
const mockActivities = [
  {
    id: 1,
    type: "Run",
    distance: "5.2 km",
    duration: "28:45",
    date: new Date(),
    athlete: "Nguyễn Văn A",
    location: "Công viên Thống Nhất",
  },
  {
    id: 2,
    type: "Run",
    distance: "10.0 km",
    duration: "52:30",
    date: new Date(Date.now() - 86400000),
    athlete: "Trần Thị B",
    location: "Hồ Tây",
  },
];

const RecentActivities = () => {
  return (
    <div className={styles.newSection}>
      <div className={styles.notificationSection}>
        <div className={styles.notificationTag}>
          <p className={styles.notificationTagText}>Hoạt động gần đây</p>
        </div>
        {mockActivities.slice(0, 2).map((activity) => (
          <div key={activity.id} style={{ marginBottom: "20px" }}>
            <h3 className={styles.notificationTitle}>
              <span style={{ color: "#FF6B35", fontWeight: "bold" }}>
                {activity.type}
              </span>
              {" - "}
              {activity.distance}
            </h3>
            <p className={styles.notificationDate}>
              <b>{activity.duration}</b> • {activity.location}
            </p>
            <p className={styles.notificationDate}>
              {moment(activity.date).format("DD/MM/YYYY")} bởi{" "}
              <b>{activity.athlete}</b>
            </p>
          </div>
        ))}
        <Link className={styles.notificationLink} to="/activities">
          <b className={styles.notificationLinkText}>Xem tất cả hoạt động</b>
          <Arrow.default />
        </Link>
      </div>
      <div className={styles.notificationSection}>
        <div className={styles.notificationTag}>
          <p className={styles.notificationTagText}>Thống kê tuần này</p>
        </div>
        <h3 className={styles.notificationTitle}>Tổng quãng đường</h3>
        <p className={styles.notificationDate} style={{ fontSize: "32px", fontWeight: "bold", color: "#FF6B35" }}>
          42.5 km
        </p>
        <p className={styles.notificationDate}>
          <b>5</b> buổi chạy • <b>3h 45m</b> tổng thời gian
        </p>
      </div>
    </div>
  );
};

const title = "Binh.run - Chạy bộ và sống khỏe mỗi ngày!";
const description =
  "Binh.run là nền tảng dành cho những người yêu thích chạy bộ và muốn sống một cuộc sống khỏe mạnh. Chúng tôi cung cấp các công cụ, mẹo và cộng đồng để giúp bạn đạt được mục tiêu chạy bộ của mình.";

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroImage}>
        <SVGImage Svg={heroImage.default} classNameOverride="heroImage" />
      </div>
      <div className={styles.headerRight}>
        <div className="titleContainer">
          <img src={faceWinking.default} className={styles.faceWinking} />
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{description}</p>
        </div>
        <div className={styles.buttons}>
          <Link
            className={styles.heroButton}
            to="/activities"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#f4f2f1"/>
            </svg>
            <p className={styles.buttonTitle}>Bắt đầu chạy ngay</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

function RecentRuns() {
  const recentRuns = [
    {
      id: 1,
      athlete: "Nguyễn Văn A",
      distance: "8.5 km",
      duration: "42:15",
      pace: "4:58/km",
      date: new Date(),
      location: "Công viên Thống Nhất",
      elevation: "+125m",
    },
    {
      id: 2,
      athlete: "Trần Thị B",
      distance: "12.0 km",
      duration: "58:30",
      pace: "4:52/km",
      date: new Date(Date.now() - 86400000),
      location: "Hồ Tây",
      elevation: "+200m",
    },
    {
      id: 3,
      athlete: "Lê Văn C",
      distance: "5.0 km",
      duration: "24:10",
      pace: "4:50/km",
      date: new Date(Date.now() - 172800000),
      location: "Công viên Lê Nin",
      elevation: "+50m",
    },
    {
      id: 4,
      athlete: "Phạm Thị D",
      distance: "15.3 km",
      duration: "1:15:45",
      pace: "4:57/km",
      date: new Date(Date.now() - 259200000),
      location: "Đường Láng",
      elevation: "+180m",
    },
  ];

  return (
    <div className={styles.freshSection}>
      <p className={styles.freshSectionHeader}>Các buổi chạy gần đây</p>
      {recentRuns.map((run) => {
        return (
          <Link
            key={run.id}
            to={`/activities/${run.id}`}
            className={styles.recipeWrapper}
          >
            {moment(run.date).diff(moment(), "days") * -1 < 7 && (
              <div className={styles.freshSectionTag}>
                <p className={styles.freshSectionTagText}>Mới</p>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h3 className={styles.freshSectionTitle}>
                  {run.distance} • {run.duration}
                </h3>
                <p className={styles.freshSectionDate}>
                  <b>{run.pace}</b> • {run.location} • {run.elevation}
                </p>
                <p className={styles.freshSectionDate}>
                  {moment(run.date).format("DD/MM/YYYY")} bởi{" "}
                  <b>{run.athlete}</b>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      <Link to="/activities" className={styles.viewAllRecipes}>
        Xem tất cả buổi chạy
      </Link>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Chạy bộ và sống khỏe mỗi ngày với Binh.run!"
    >
      <RecentActivities />
      <HomepageHeader />
      <main className={styles.mainContainer}>
        <HomepageFeatures />
        <RecentRuns />
      </main>
    </Layout>
  );
}
