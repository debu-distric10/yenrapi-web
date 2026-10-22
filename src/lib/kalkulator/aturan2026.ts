/**
 * Tarif dan tabel resmi kalkulator gaji 2026 — SALINAN dari aplikasi
 * (YenRapi/lib/features/calculators/domain/payroll_rules_2026.dart).
 * Ubah keduanya bersamaan; tes `kalkulator.test.ts` membandingkan hasil web
 * dengan hasil aplikasi.
 *
 * Tarif dalam satuan 0,001% (mis. 9,85% → 9850) agar hitungan memakai
 * bilangan bulat.
 */
export const aturan2026 = {
  label: "Aturan resmi 2026 (diriset 20 Oktober 2026)",

  // Lembur (割増賃金) — 厚生労働省, persen minimum menurut hukum.
  overtimePercent: 25,
  overtimeOver60Percent: 50,
  lateNightPercent: 25,
  holidayPercent: 35,

  // 協会けんぽ 令和8年度.
  healthRateByPrefecture: {
    "Hokkaido 北海道": 10280,
    "Aomori 青森県": 9850,
    "Iwate 岩手県": 9510,
    "Miyagi 宮城県": 10100,
    "Akita 秋田県": 10010,
    "Yamagata 山形県": 9750,
    "Fukushima 福島県": 9500,
    "Ibaraki 茨城県": 9520,
    "Tochigi 栃木県": 9820,
    "Gunma 群馬県": 9680,
    "Saitama 埼玉県": 9670,
    "Chiba 千葉県": 9730,
    "Tokyo 東京都": 9850,
    "Kanagawa 神奈川県": 9920,
    "Niigata 新潟県": 9210,
    "Toyama 富山県": 9590,
    "Ishikawa 石川県": 9700,
    "Fukui 福井県": 9710,
    "Yamanashi 山梨県": 9550,
    "Nagano 長野県": 9630,
    "Gifu 岐阜県": 9800,
    "Shizuoka 静岡県": 9610,
    "Aichi 愛知県": 9930,
    "Mie 三重県": 9770,
    "Shiga 滋賀県": 9880,
    "Kyoto 京都府": 9890,
    "Osaka 大阪府": 10130,
    "Hyogo 兵庫県": 10120,
    "Nara 奈良県": 9910,
    "Wakayama 和歌山県": 10060,
    "Tottori 鳥取県": 9860,
    "Shimane 島根県": 9940,
    "Okayama 岡山県": 10050,
    "Hiroshima 広島県": 9780,
    "Yamaguchi 山口県": 10150,
    "Tokushima 徳島県": 10240,
    "Kagawa 香川県": 10020,
    "Ehime 愛媛県": 9980,
    "Kochi 高知県": 10050,
    "Fukuoka 福岡県": 10110,
    "Saga 佐賀県": 10550,
    "Nagasaki 長崎県": 10060,
    "Kumamoto 熊本県": 10080,
    "Oita 大分県": 10080,
    "Miyazaki 宮崎県": 9770,
    "Kagoshima 鹿児島県": 10130,
    "Okinawa 沖縄県": 9440,
  } as Record<string, number>,

  /** 介護保険 umur 40–64 tahun. */
  careRate: 1620,
  /** 子ども・子育て支援金, mulai gaji April 2026 (tahun*12 + bulan-1). */
  childSupportRate: 230,
  childSupportFromMonth: 2026 * 12 + 3,
  /** 厚生年金. */
  pensionRate: 18300,
  /** 雇用保険 bagian pekerja (usaha umum). */
  employmentInsuranceRate: 500,

  /** 標準報酬月額 健康保険: [標準報酬月額, batas bawah 報酬月額]. */
  healthGrades: [
    [58000, 0],
    [68000, 63000],
    [78000, 73000],
    [88000, 83000],
    [98000, 93000],
    [104000, 101000],
    [110000, 107000],
    [118000, 114000],
    [126000, 122000],
    [134000, 130000],
    [142000, 138000],
    [150000, 146000],
    [160000, 155000],
    [170000, 165000],
    [180000, 175000],
    [190000, 185000],
    [200000, 195000],
    [220000, 210000],
    [240000, 230000],
    [260000, 250000],
    [280000, 270000],
    [300000, 290000],
    [320000, 310000],
    [340000, 330000],
    [360000, 350000],
    [380000, 370000],
    [410000, 395000],
    [440000, 425000],
    [470000, 455000],
    [500000, 485000],
    [530000, 515000],
    [560000, 545000],
    [590000, 575000],
    [620000, 605000],
    [650000, 635000],
    [680000, 665000],
    [710000, 695000],
    [750000, 730000],
    [790000, 770000],
    [830000, 810000],
    [880000, 855000],
    [930000, 905000],
    [980000, 955000],
    [1030000, 1005000],
    [1090000, 1055000],
    [1150000, 1115000],
    [1210000, 1175000],
    [1270000, 1235000],
    [1330000, 1295000],
    [1390000, 1355000],
  ] as const,

  pensionMinStandard: 88000,
  pensionMaxStandard: 650000,

  /** 所得税 別表第二: potongan per tanggungan. */
  dependentDeduction: 31667,
};

export const prefekturBawaan = "Tokyo 東京都";
