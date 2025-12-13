import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const activities = [
  {
    id: 1,
    athlete: "Nguyễn Văn A",
    distance: "8.5 km",
    duration: "42:15",
    pace: "4:58/km",
    date: new Date(),
    location: "Công viên Thống Nhất",
    elevation: "+125m",
    type: "Run",
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
    type: "Run",
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
    type: "Run",
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
    type: "Run",
  },
];

export default function ActivitiesPage(): JSX.Element {
  return (
    <Layout title="Hoạt động" description="Danh sách các hoạt động chạy bộ">
      <div className="container margin-vert--lg">
        <h1>Hoạt động chạy bộ</h1>
        <div className={styles.activitiesList}>
          {activities.map((activity) => (
            <Link
              key={activity.id}
              to={`/activities/${activity.id}`}
              className={styles.activityCard}
            >
              <div className={styles.activityHeader}>
                <span className={styles.activityType}>{activity.type}</span>
                <span className={styles.activityDistance}>{activity.distance}</span>
              </div>
              <div className={styles.activityDetails}>
                <p>
                  <strong>{activity.duration}</strong> • {activity.location} • {activity.elevation}
                </p>
                <p>
                  <strong>{activity.pace}</strong> • {activity.date.toLocaleDateString("vi-VN")} bởi{" "}
                  <strong>{activity.athlete}</strong>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
