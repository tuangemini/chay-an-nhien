/**
 * CƠ SỞ DỮ LIỆU NHÀ HÀNG CHAY AN NHIÊN - VIỆT TRÌ
 * Địa chỉ: 135 Đường Nguyễn Tất Thành, P. Thanh Miếu, TP. Việt Trì, Phú Thọ
 * Google Maps: https://maps.app.goo.gl/jiUzPeL6tQKrjULy9
 * Hotline: 0935 388 399
 */

const RESTAURANT_DATA = {
  name: "Nhà hàng Chay An Nhiên - Việt Trì",
  shortName: "Chay An Nhiên",
  tagline: "Tâm An Vạn Sự An • Hương Vị Thuần Chay Dưỡng Thân Tâm",
  address: "135 Đường Nguyễn Tất Thành, Phường Thanh Miếu, TP. Việt Trì, Tỉnh Phú Thọ",
  hotline: "0376 056 913",
  hotlineDisplay: "0376.056.913",
  hotlineSecondary: "0935 388 399",
  zalo: "0376056913",
  website: "https://chayannhien.life",
  domain: "chayannhien.life",
  openHours: "Trưa: 11:00 – 13:30 | Tối: 18:00 – 20:30 (Mở cửa tất cả các ngày)",
  buffetDays: "Ngày 14, 15, 30 & mùng 1 Âm lịch hàng tháng",
  rating: 4.9,
  totalReviews: 620,
  mapsUrl: "https://maps.app.goo.gl/jiUzPeL6tQKrjULy9"
};

const CHAY_MENU = [
  {
    id: "ln-01",
    name: "Lẩu Nấm An Nhiên Thập Cẩm Quý",
    category: "hotpot",
    categoryName: "Lẩu Nấm Dưỡng Sinh",
    price: 259000,
    priceDisplay: "259.000đ",
    badge: "Món Ký Danh",
    image: "lau-nam.jpg",
    desc: "Nước dùng thanh ngọt tự nhiên ninh từ rau củ quả trong 8 tiếng, hòa quyện hơn 8 loại nấm quý tươi ngon (nấm tùng nhung, nấm tiên, nấm hương, nấm linh chi, nấm đùi gà, nấm kim châm), đậu hũ non và rau xanh hữu cơ.",
    tags: ["Nấm quý", "Nước dùng 8h", "Thanh nhiệt", "Phù hợp 3-4 người"]
  },
  {
    id: "ln-02",
    name: "Lẩu Thái Chay Chua Cay Bách Thảo",
    category: "hotpot",
    categoryName: "Lẩu Nấm Dưỡng Sinh",
    price: 239000,
    priceDisplay: "239.000đ",
    image: "lau-nam.jpg",
    desc: "Vị chua thanh tự nhiên từ dứa và cà chua, cay dịu của ớt hiểm và thơm lừng hương sả lá chanh Thái, ăn kèm chả nấm, nấm bào ngư và đậu hũ ky chiên giòn.",
    tags: ["Chua cay", "Lá chanh Thái", "Đậu hũ ky", "Ấm bụng"]
  },
  {
    id: "com-01",
    name: "Cơm Hạt Sen Gói Lá Sen Tươi",
    category: "rice-noodle",
    categoryName: "Cơm & Mì Thuần Chay",
    price: 85000,
    priceDisplay: "85.000đ",
    isBestSeller: true,
    badge: "Bán Chạy Nhất",
    image: "com-la-sen.jpg",
    desc: "Cơm hạt sen thơm dẻo nấu cùng hạt sen tươi bùi ngậy, nấm đông cô, bắp ngọt, cà rốt và đậu hà lan, bọc kín trong lá sen tươi hấp chín giữ trọn hương thơm thanh khiết của đất trời.",
    tags: ["Hạt sen tươi", "Lá sen thơm", "Thực dưỡng", "Thanh tao"]
  },
  {
    id: "com-02",
    name: "Cơm Chiên Trái Thơm Hạt Điều",
    category: "rice-noodle",
    categoryName: "Cơm & Mì Thuần Chay",
    price: 79000,
    priceDisplay: "79.000đ",
    image: "com-la-sen.jpg",
    desc: "Cơm tơi xốp chiên giòn cùng cùi dứa chua ngọt, hạt điều Bình Phước rang muối bùi béo, nấm hương và ớt chuông đỏ vàng bắt mắt.",
    tags: ["Trái thơm", "Hạt điều béo", "Đậm đà"]
  },
  {
    id: "com-03",
    name: "Mì Xào Giòn Nấm Hoàng Kim",
    category: "rice-noodle",
    categoryName: "Cơm & Mì Thuần Chay",
    price: 75000,
    priceDisplay: "75.000đ",
    image: "com-la-sen.jpg",
    desc: "Sợi mì chiên vàng giòn rụm bên dưới, phủ lớp sốt nấm đùi gà, nấm rơm và rau củ xào bóng bẩy, đậm đà gia vị.",
    tags: ["Mì giòn", "Sốt nấm sệt", "Rau củ tươi"]
  },
  {
    id: "kh-01",
    name: "Chả Giò Nấm An Nhiên Giòn Rụm",
    category: "appetizer",
    categoryName: "Khai Vị & Gỏi Thanh",
    price: 65000,
    priceDisplay: "65.000đ",
    isBestSeller: true,
    badge: "Món Khoái Khẩu",
    image: "hero-chay.jpg",
    desc: "Vỏ cuốn giòn tan vàng ươm, nhân bên trong đầy đặn nấm mèo, nấm hương, khoai môn dẻo bùi và cà rốt, chấm cùng sốt mè rang bùi béo hoặc tương chua ngọt.",
    tags: ["Giòn rụm", "Khoai môn dẻo", "Sốt mè rang"]
  },
  {
    id: "kh-02",
    name: "Gỏi Ngó Sen Hoa Chuối Phù Trúc",
    category: "appetizer",
    categoryName: "Khai Vị & Gỏi Thanh",
    price: 69000,
    priceDisplay: "69.000đ",
    image: "hero-chay.jpg",
    desc: "Ngó sen trắng giòn hòa quyện hoa chuối thái sợi, phù trúc vàng ươm và đậu phộng rang giã dập, trộn cùng nước sốt chua ngọt thanh tao giải ngấy tuyệt đối.",
    tags: ["Ngó sen giòn", "Hoa chuối", "Chua ngọt thanh"]
  },
  {
    id: "kh-03",
    name: "Đậu Hũ Non Sốt Nấm Đông Cô",
    category: "main-dish",
    categoryName: "Món Kho & Xào Đậm Vị",
    price: 68000,
    priceDisplay: "68.000đ",
    image: "lau-nam.jpg",
    desc: "Đậu hũ non mềm mịn tan trong miệng, tưới ngập lớp sốt nấm đông cô sánh mượt, rắc hạt tiêu Phú Quốc thơm lừng.",
    tags: ["Đậu hũ non", "Nấm đông cô", "Mềm mịn"]
  },
  {
    id: "mon-01",
    name: "Nấm Đùi Gà Kho Tiêu Xanh Nồi Đất",
    category: "main-dish",
    categoryName: "Món Kho & Xào Đậm Vị",
    price: 75000,
    priceDisplay: "75.000đ",
    badge: "Đưa Cơm",
    image: "lau-nam.jpg",
    desc: "Nấm đùi gà thái quân cờ kho trong nồi đất với nước mắm chay hảo hạng, đường thốt nốt và từng chùm tiêu xanh cay the nồng nàn rất tốn cơm.",
    tags: ["Kho tộ", "Tiêu xanh cay", "Đậm đà đưa cơm"]
  },
  {
    id: "mon-02",
    name: "Cà Tím Nướng Mỡ Hành Chay & Đậu Phộng",
    category: "main-dish",
    categoryName: "Món Kho & Xào Đậm Vị",
    price: 55000,
    priceDisplay: "55.000đ",
    image: "hero-chay.jpg",
    desc: "Cà tím nướng than hồng mềm ngọt, rưới mỡ hành boa-rô thơm phức và đậu phộng rang giòn, chấm nước tương tỏi ớt chay.",
    tags: ["Cà tím nướng", "Hành boa-rô", "Dân dã thơm ngon"]
  },
  {
    id: "buffet-01",
    name: "Suất Buffet Chay Đại Tiệc Rằm & Mùng 1 (Người Lớn)",
    category: "buffet",
    categoryName: "Tiệc Buffet & Mâm Cỗ",
    price: 139000,
    priceDisplay: "139.000đ",
    badge: "Đại Tiệc Rằm",
    image: "khong-gian.jpg",
    desc: "Trải nghiệm không giới hạn hơn 35+ món chay nghệ thuật: quầy khai vị gỏi cuốn, quầy lẩu nấm dưỡng sinh, quầy cơm sen ngũ sắc, các món kho xào truyền thống và tráng miệng chè dưỡng nhan.",
    tags: ["35+ món ngon", "Không giới hạn", "Ngày rằm mùng 1", "Miễn phí đồ uống"]
  },
  {
    id: "buffet-02",
    name: "Mâm Cỗ Chay Trọn Vị Cúng Rằm / Gia Đình (6 - 8 Người)",
    category: "buffet",
    categoryName: "Tiệc Buffet & Mâm Cỗ",
    price: 680000,
    priceDisplay: "680.000đ",
    image: "hero-chay.jpg",
    desc: "Mâm cỗ chay trang trọng chuẩn phong tục: 1 Lẩu nấm dưỡng sinh, 1 Cơm hạt sen lá sen, 1 Gỏi ngó sen ngũ sắc, 1 Đĩa chả giò nấm, 1 Đậu hũ sốt nấm, 1 Nấm kho tiêu xanh và 1 Canh dưỡng nhan hạt sen.",
    tags: ["Trọn gói 7 món", "Cúng gia tiên", "Gia đình sum vầy", "Đặt trước 2h"]
  },
  {
    id: "dr-01",
    name: "Trà Dưỡng Nhan Tuyết Yến Hạt Chia",
    category: "drinks",
    categoryName: "Trà Thảo Mộc & Thức Uống",
    price: 32000,
    priceDisplay: "32.000đ",
    isBestSeller: true,
    badge: "Thanh Lọc Thân Tâm",
    image: "hero-chay.jpg",
    desc: "Nấu từ tuyết yến tự nhiên, nhựa đào, kỷ tử đỏ, táo đỏ Tân Cương, hạt sen và hạt chia, ngọt thanh mát lành nuôi dưỡng làn da và an định tinh thần.",
    tags: ["Tuyết yến", "Táo đỏ", "Kỷ tử", "Ngọt thanh"]
  },
  {
    id: "dr-02",
    name: "Ấm Trà Hoa Cúc Mật Ong Thảo Mộc (Ấm 2 - 4 Người)",
    category: "drinks",
    categoryName: "Trà Thảo Mộc & Thức Uống",
    price: 45000,
    priceDisplay: "45.000đ",
    image: "hero-chay.jpg",
    desc: "Búp hoa cúc vàng sấy lạnh ướp cùng cam thảo và mật ong hoa rừng, uống nóng giúp thư giãn thần kinh và dễ ngủ.",
    tags: ["Trà ấm", "Hoa cúc vàng", "Thư giãn tĩnh tâm"]
  }
];

const MINDFUL_QUOTES = [
  { text: "Mỗi bữa ăn thuần chay là một hạt giống thiện lành gieo vào tâm hồn.", author: "Thiền Ngữ An Nhiên" },
  { text: "Tâm an vạn sự an. Khi lòng thanh tịnh, mọi món ăn đều hóa vị cam lộ.", author: "Lời Dạy Cổ Đức" },
  { text: "Nuôi dưỡng lòng từ bi bắt đầu từ chính chén cơm, ngọn rau mỗi ngày.", author: "Chay An Nhiên" },
  { text: "Sống chậm lại để lắng nghe tiếng lòng và cảm nhận trọn vẹn hương vị đất trời.", author: "An Lạc Từng Phút Giây" },
  { text: "Hạnh phúc không nằm ở những điều xa xôi, mà hiện diện ngay trong bữa cơm ấm áp bên người thân.", author: "Thân Tâm An Lạc" },
  { text: "Ăn chay là lối sống xanh, nhẹ nhàng buông bỏ gánh nặng cho cơ thể và mẹ thiên nhiên.", author: "Sống Xanh Tỉnh Thức" }
];

const REVIEWS_AN_NHIEN = [
  {
    name: "Cô Diệu Hương (Phật tử Chùa Thiên Long, Việt Trì)",
    rating: 5,
    time: "3 ngày trước",
    comment: "Ghé An Nhiên vào ngày mùng một thấy lòng nhẹ nhõm vô cùng. Không gian quán tre trúc mộc mạc, tiếng nhạc thiền êm dịu, món Lẩu nấm thanh ngọt từ củ quả chứ không hề lạm dụng bột ngọt hóa chất. Sẽ còn ghé thường xuyên!"
  },
  {
    name: "Anh Hoàng Bách (Kỹ sư Công nghệ, Việt Trì)",
    rating: 5,
    time: "1 tuần trước",
    comment: "Trước giờ mình ít khi ăn chay, nhưng được bạn bè dẫn đến đây thử món Cơm hạt sen gói lá sen và Chả giò nấm thì mê mẩn luôn. Vừa ngon miệng vừa nhẹ bụng, không hề ngấy. Nhân viên phục vụ rất nhã nhặn và lễ độ."
  },
  {
    name: "Gia đình chị Thu Hà (Thanh Miếu, Phú Thọ)",
    rating: 5,
    time: "2 tuần trước",
    comment: "Gia đình mình đặt bàn tiệc sinh nhật cho bà ở đây. Mâm cỗ chay 7 món trình bày trang nhã, bà và các cháu đều khen nức nở. Bể cá sen nhỏ giữa quán tạo cảm giác thư thái tuyệt vời."
  }
];

// THƯ VIỆN HÌNH ẢNH NHÀ HÀNG THỰC TẾ
const RESTAURANT_GALLERY = [
  {
    id: "gal-01",
    src: "images/restaurant/nha-hang-04.jpg",
    title: "Bức Bích Họa Hoa Sen Vàng & Quầy Buffet Chay",
    desc: "Không gian trang nghiêm, ấm cúng với điểm nhấn hoa sen vàng nghệ thuật",
    category: "khong-gian"
  },
  {
    id: "gal-02",
    src: "images/restaurant/nha-hang-03.jpg",
    title: "Toàn Cảnh Đại Tiệc Buffet Chay Từ Trên Cao",
    desc: "Hàng chục món chay tươi ngon bày biện đẹp mắt, phong phú dưỡng chất",
    category: "buffet"
  },
  {
    id: "gal-03",
    src: "images/restaurant/nha-hang-06.jpg",
    title: "Đội Ngũ Nhân Viên Lễ Độ & Thân Thiện",
    desc: "Đón tiếp quý khách bằng sự tận tâm, nụ cười an lạc và trang nhã",
    category: "phuc-vu"
  },
  {
    id: "gal-04",
    src: "images/restaurant/nha-hang-05.jpg",
    title: "Góc Không Gian An Nhiên Thanh Tịnh",
    desc: "Nơi lý tưởng để gặp gỡ bạn bè, sum vầy gia đình thưởng trà chay",
    category: "khong-gian"
  },
  {
    id: "gal-05",
    src: "images/restaurant/nha-hang-01.jpg",
    title: "Bảng Hiệu & Mặt Tiền Nhà Hàng Chay An Nhiên",
    desc: "Tọa lạc tại 135 Nguyễn Tất Thành, TP. Việt Trì - rất dễ tìm và đỗ xe",
    category: "khong-gian"
  },
  {
    id: "gal-06",
    src: "images/restaurant/nha-hang-02.jpg",
    title: "Không Gian Mộc Mạc Gần Gũi Thiên Nhiên",
    desc: "Đèn lồng ấm áp, vách gỗ thanh lịch mang lại cảm giác an yên",
    category: "khong-gian"
  }
];

// MÂM CỖ CHAY THỰC TẾ TẠI NHÀ HÀNG
const MAM_CO_PACKAGES = [
  {
    id: "mc-01",
    name: "Mâm Cỗ An Nhiên - 6 Món",
    price: "300.000 VNĐ",
    image: "images/mam-co/mam-co-01.jpg",
    dishes: [
      "Canh chua An Nhiên",
      "Nem hải sản chay",
      "Cơm sen thơm",
      "Củ quả luộc (kho quẹt chay)",
      "Giò lụa chay",
      "Miến xào nấm tươi"
    ]
  },
  {
    id: "mc-02",
    name: "Mâm Cỗ An Nhiên - 7 Món",
    price: "400.000 VNĐ",
    image: "images/mam-co/mam-co-01.jpg",
    dishes: [
      "Cơm sen hạt sen",
      "Canh củ sen hầm dưỡng sinh",
      "Ram cốm chiên giòn",
      "Giò lụa truyền thống",
      "Miến xào nấm thơm",
      "Gỏi củ hũ dừa chua ngọt",
      "Xôi hạt sen dẻo thơm"
    ]
  },
  {
    id: "mc-03",
    name: "Mâm Cỗ An Nhiên - 8 Món",
    price: "500.000 VNĐ",
    image: "images/mam-co/mam-co-02.jpg",
    dishes: [
      "Cơm sen ngũ sắc",
      "Canh rong biển đậu non",
      "Giò lụa thượng hạng",
      "Gỏi nấm tuyết ngó sen",
      "Nem hải sản chiên xù",
      "Đậu hũ hoàng kim",
      "Cải chíp xào nấm",
      "Miến xào nấm quý"
    ]
  },
  {
    id: "mc-04",
    name: "Mâm Cỗ An Nhiên - 9 Món",
    price: "600.000 VNĐ",
    image: "images/mam-co/mam-co-02.jpg",
    dishes: [
      "Cơm sen",
      "Canh chua An Nhiên",
      "Nấm kho tiêu xanh nồi đất",
      "Đậu hũ hoàng kim",
      "Nộm củ hũ dừa ngũ sắc",
      "Giò lụa chay",
      "Củ quả luộc kho quẹt",
      "Ram cốm giòn rụm",
      "Miến xào nấm hương"
    ]
  },
  {
    id: "mc-05",
    name: "Mâm Cỗ An Nhiên - 10 Món",
    price: "800.000 VNĐ",
    image: "images/mam-co/mam-co-03.jpg",
    dishes: [
      "Cơm sen",
      "Canh củ sen",
      "Nem thính chay",
      "Sườn dừa sốt chua ngọt",
      "Xôi nếp nương gấc",
      "Miến xào nấm",
      "Gỏi nấm hầu thủ",
      "Củ quả luộc kho quẹt",
      "Đậu hũ hoàng kim",
      "Nấm rang muối giòn"
    ]
  },
  {
    id: "mc-06",
    name: "Mâm Cỗ An Nhiên - 12 Món (Đại Tiệc Cúng)",
    price: "1.000.000 VNĐ",
    image: "images/mam-co/mam-co-03.jpg",
    dishes: [
      "Cơm sen",
      "Canh củ sen",
      "Giò lụa",
      "Nấm hầu thủ xào sả ớt",
      "Bánh bao hoa sen hấp",
      "Xôi hạt sen",
      "Rau xào nấm",
      "Ram cốm",
      "Đậu hũ hoàng kim",
      "Sườn dừa sốt chua ngọt",
      "Gỏi nấm tuyết ngó sen",
      "Miến xào nấm đông cô"
    ]
  }
];

// 12 TRANG MENU GỐC CHI TIẾT
const MENU_BOOK_PAGES = [
  { page: 1, title: "Trang bìa & Giới thiệu Chay An Nhiên", src: "images/menu/menu-page-01.jpg" },
  { page: 2, title: "Khai vị & Các món Gỏi thanh tao", src: "images/menu/menu-page-02.jpg" },
  { page: 3, title: "Các món Nem, Chả & Món Chiên giòn", src: "images/menu/menu-page-03.jpg" },
  { page: 4, title: "Các món Đậu hũ nghệ thuật", src: "images/menu/menu-page-04.jpg" },
  { page: 5, title: "Các món Nấm quý xào & kho tộ", src: "images/menu/menu-page-05.jpg" },
  { page: 6, title: "Rau xanh hữu cơ & Củ quả luộc", src: "images/menu/menu-page-06.jpg" },
  { page: 7, title: "Cơm hạt sen & Các món Cơm chiên", src: "images/menu/menu-page-07.jpg" },
  { page: 8, title: "Mì xào, Miến xào & Bún thuần chay", src: "images/menu/menu-page-08.jpg" },
  { page: 9, title: "Các món Canh dưỡng sinh & Soup", src: "images/menu/menu-page-09.jpg" },
  { page: 10, title: "Đại tiệc Lẩu nấm dưỡng sinh", src: "images/menu/menu-page-10.jpg" },
  { page: 11, title: "Trà thảo mộc & Thức uống thanh nhiệt", src: "images/menu/menu-page-11.jpg" },
  { page: 12, title: "Tráng miệng & Chè dưỡng nhan", src: "images/menu/menu-page-12.jpg" }
];
