import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./detail.module.css";

const activity = {
  id: 3,
  athlete: "Lê Văn C",
  distance: "5.0 km",
  duration: "24:10",
  pace: "4:50/km",
  date: new Date(Date.now() - 172800000),
  location: "Công viên Lê Nin",
  elevation: "+50m",
  type: "Run",
};

export default function ActivityDetailPage(): JSX.Element {
  return (
    <Layout title={`${activity.type} - ${activity.distance}`} description={`Chi tiết hoạt động ${activity.type} của ${activity.athlete}`}>
      <div className="container margin-vert--lg">
        <Link to="/activities" className={styles.backLink}>
          ← Quay lại danh sách hoạt động
        </Link>
        <div className={styles.activityDetail}>
          <div className={styles.activityHeader}>
            <span className={styles.activityType}>{activity.type}</span>
            <span className={styles.activityDistance}>{activity.distance}</span>
          </div>
          <div className={styles.activityInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Thời gian:</span>
              <span className={styles.infoValue}>{activity.duration}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Tốc độ trung bình:</span>
              <span className={styles.infoValue}>{activity.pace}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Địa điểm:</span>
              <span className={styles.infoValue}>{activity.location}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Độ cao:</span>
              <span className={styles.infoValue}>{activity.elevation}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Ngày:</span>
              <span className={styles.infoValue}>{activity.date.toLocaleDateString("vi-VN")}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Vận động viên:</span>
              <span className={styles.infoValue}>{activity.athlete}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
