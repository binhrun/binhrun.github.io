```mermaid
graph TD
    subgraph E2E Tests
        A[homepage.spec.ts]
        B[navigation.spec.ts]
        C[docs.spec.ts]
        D[blog.spec.ts]
        E[accessibility.spec.ts]
    end

    subgraph Homepage Tests
        A1(nên load thành công và hiển thị title)
        A2(nên hiển thị hero section với title và description)
        A3(nên có CTA "Bắt đầu chạy ngay" trỏ đến /activities)
        A4(nên hiển thị "Hoạt động gần đây" và có link "Xem tất cả hoạt động")
        A5(nên hiển thị "Thống kê tuần này" và tổng quãng đường)
        A6(nên có navigation bar với logo)
        A7(nên hiển thị section "Các buổi chạy gần đây" và link "Xem tất cả buổi chạy")
        A8(footer nên có copyright Binh.run)
    end

    subgraph Navigation Tests
        B1(nên có thể navigate đến trang intro)
        B2(nên có sidebar navigation trong trang docs)
        B3(nên có thể navigate đến recipes section)
        B4(nên có thể quay lại trang chủ từ navbar)
    end

    subgraph Docs Tests
        C1(trang intro nên load thành công)
        C2(nên hiển thị content trong trang docs)
        C3(nên có thể navigate đến recipes page nếu tồn tại)
        C4(nên có breadcrumb navigation)
    end

    subgraph Blog Tests
        D1(nên load trang /blog và thấy danh sách bài viết)
        D2(nên vào được bài sample-post)
    end

    subgraph Accessibility Tests
        E1(nên có accessibility tree đúng cho trang chủ)
        E2(nên có accessibility tree đúng cho trang activities)
        E3(nên có accessibility tree đúng cho trang docs)
        E4(nên so sánh accessibility tree với snapshot đã lưu)
        E5(nên lưu ARIA snapshot vào file)
        E6(nên so sánh ARIA snapshot với snapshot đã lưu)
        E7(nên kiểm tra ARIA snapshot chứa các elements cần thiết)
    end

    A --> A1
    A --> A2
    A --> A3
    A --> A4
    A --> A5
    A --> A6
    A --> A7
    A --> A8

    B --> B1
    B --> B2
    B --> B3
    B --> B4

    C --> C1
    C --> C2
    C --> C3
    C --> C4

    D --> D1
    D --> D2

    E --> E1
    E --> E2
    E --> E3
    E --> E4
    E --> E5
    E --> E6
    E --> E7
```
