export type Project = {
  id: string
  name: string
  domain: [string, string]
  summary: [string, string]
  detail: [string, string]
  stack: string[]
  modules: [string[], string[]]
  note: [string, string]
  color: string
  stores?: { google: string; apple: string; name: string }
}
export const projects: Project[] = [
  {
    id: 'mebione',
    name: 'Mebione',
    domain: ['Vận hành nuôi tôm', 'Aquaculture operations'],
    summary: ['Từ ao nuôi đến quyết định vận hành.', 'From pond operations to informed decisions.'],
    detail: [
      'Ứng dụng di động kết nối hoạt động ao nuôi, kế hoạch sản xuất, báo cáo và điều khiển thiết bị. Tôi tham gia phát triển các module nghiệp vụ và tích hợp dịch vụ AI cho quy trình nuôi tôm.',
      'A mobile application connecting pond operations, production planning, reporting and device controls. I contribute business modules and integrate AI services into shrimp-farming workflows.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'TanStack Query'],
    stores: {
      google: 'https://play.google.com/store/apps/details?id=com.mebisoft.mebieco',
      apple: 'https://apps.apple.com/vn/app/mebieco/id6757392489',
      name: 'Mebieco',
    },
    modules: [
      [
        'Báo cáo & biểu đồ vận hành',
        'Kế hoạch nuôi và CRUD khu nuôi',
        'Lập lịch điều khiển thiết bị',
        'Chatbot UI & tích hợp API',
        'Nhật ký cho ăn',
        'Tích hợp AI sức khỏe tôm',
      ],
      [
        'Operational reports & charts',
        'Farming plans and farm-area CRUD',
        'Device control schedules',
        'Chatbot UI & API integration',
        'Feeding logs',
        'Shrimp health AI service integration',
      ],
    ],
    note: [
      'Phát triển ứng dụng và tích hợp dịch vụ AI; không phải xây dựng mô hình AI.',
      'Application development and AI service integration; not AI model development.',
    ],
    color: 'aqua',
  },
  {
    id: 'dss',
    name: 'DSS-CRM',
    domain: ['CRM & tổng đài', 'CRM & call center'],
    summary: [
      'Ngữ cảnh khách hàng. Ngay trong cuộc gọi.',
      'Customer context. Right in the conversation.',
    ],
    detail: [
      'Ứng dụng Flutter cho quy trình bán hàng và chăm sóc khách hàng. Tôi tham gia Customer360, cơ hội bán hàng, chuyển đổi lead và trải nghiệm cuộc gọi tích hợp.',
      'A Flutter application supporting sales and customer care. My contributions span Customer360, sales opportunities, lead conversion and integrated calling experiences.',
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'Dio', 'SIP / WebRTC'],
    stores: {
      google: 'https://play.google.com/store/apps/details?id=vn.com.datgroup.dss',
      apple: 'https://apps.apple.com/vn/app/dss/id6801755603',
      name: 'DSS',
    },
    modules: [
      [
        'Hồ sơ khách hàng Customer360',
        'Cơ hội bán hàng & giai đoạn',
        'Chuyển đổi khách hàng tiềm năng',
        'VoIP, bàn phím số & cuộc gọi',
        'Thông báo với BLoC',
        'Form khách hàng & phân quyền',
      ],
      [
        'Customer360 profiles',
        'Sales opportunities & stages',
        'Lead conversion',
        'VoIP, dialpad & active calls',
        'BLoC notifications',
        'Customer forms & permissions',
      ],
    ],
    note: [
      'Các module CRM và tổng đài được trình bày theo phạm vi đóng góp.',
      'CRM and call-center modules are presented within my contribution scope.',
    ],
    color: 'blue',
  },
  {
    id: 'mebipha',
    name: 'Mebipha',
    domain: ['Danh mục & mua sắm', 'Product discovery & shopping'],
    summary: [
      'Một hành trình tìm sản phẩm liền mạch.',
      'A connected product discovery experience.',
    ],
    detail: [
      'Ứng dụng React Native cho trải nghiệm tìm kiếm sản phẩm và giỏ hàng. Tôi tham gia các luồng tài khoản, danh mục, chi tiết sản phẩm và lớp dữ liệu giỏ hàng.',
      'A React Native application for product discovery and shopping baskets. I contribute account flows, categories, product details and basket data integration.',
    ],
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Redux Saga', 'Zod'],
    modules: [
      [
        'Đăng nhập & xác thực OTP',
        'Tìm kiếm & phân trang sản phẩm',
        'Quản lý địa chỉ CRUD',
        'Danh mục & bộ lọc',
        'Lớp dữ liệu giỏ hàng',
        'Chi tiết sản phẩm & API',
      ],
      [
        'Sign-in & OTP verification',
        'Product search & pagination',
        'Address CRUD',
        'Categories & filters',
        'Basket data layer',
        'Product details & APIs',
      ],
    ],
    note: [
      'Một số module đang phát triển; không khẳng định đã phát hành toàn bộ luồng mua hàng.',
      'Some modules are in development; this does not imply a fully released purchase flow.',
    ],
    color: 'peach',
  },
]
