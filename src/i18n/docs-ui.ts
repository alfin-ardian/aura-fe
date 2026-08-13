import type { LocaleCode } from "@/i18n/locales";
import { useLocale } from "@/i18n/locale-provider";

export type DocsSectionId =
  | "intro"
  | "auth"
  | "keys"
  | "analyze"
  | "me"
  | "errors"
  | "whitelabel";

type DocsUi = {
  navHome: string;
  navApiReference: string;
  navApiKeys: string;
  getApiAccess: string;
  jumpTo: string;
  searchPlaceholder: string;
  groups: {
    introduction: string;
    gettingStarted: string;
    aiService: string;
    reference: string;
  };
  sections: Record<DocsSectionId, string>;
  intro: {
    eyebrow: string;
    title: string;
    body: string;
    baseUrl: string;
    prefixNote: string;
  };
  whitelabel: {
    eyebrow: string;
    title: string;
    steps: [string, string, string, string];
    dashboardLink: string;
  };
  auth: {
    eyebrow: string;
    title: string;
    body: string;
    bearer: string;
    xApiKey: string;
    storeNote: string;
  };
  keys: {
    eyebrow: string;
    title: string;
    body: string;
    responseOnce: string;
    openManager: string;
    warningExample: string;
  };
  analyze: {
    eyebrow: string;
    title: string;
    body: string;
    exampleResponse: string;
  };
  me: {
    eyebrow: string;
    title: string;
    body: string;
  };
  errors: {
    eyebrow: string;
    title: string;
    status: string;
    meaning: string;
    rows: Array<[string, string]>;
  };
  apiKeysPage: {
    title: string;
    subtitleBefore: string;
    subtitleDocs: string;
    subtitleAfter: string;
    nameLabel: string;
    namePlaceholder: string;
    creating: string;
    create: string;
    loadFail: string;
    nameRequired: string;
    createdToast: string;
    createFail: string;
    revokeConfirm: string;
    revokedToast: string;
    revokeFail: string;
    colName: string;
    colPrefix: string;
    colCreated: string;
    colLastUsed: string;
    colStatus: string;
    colActions: string;
    active: string;
    revoked: string;
    never: string;
    revoke: string;
    empty: string;
    createdTitle: string;
    createdBody: string;
    copy: string;
    copied: string;
  };
};

const en: DocsUi = {
  navHome: "Home",
  navApiReference: "API Reference",
  navApiKeys: "API Keys",
  getApiAccess: "Get API access",
  jumpTo: "JUMP TO",
  searchPlaceholder: "Search…",
  groups: {
    introduction: "Introduction",
    gettingStarted: "Getting started",
    aiService: "AI service",
    reference: "Reference",
  },
  sections: {
    intro: "About the API",
    whitelabel: "White-label integration",
    auth: "Authentication",
    keys: "Create API keys",
    analyze: "POST /v1/analyze",
    me: "GET /v1/me",
    errors: "Errors",
  },
  intro: {
    eyebrow: "Introduction",
    title: "About the API Reference",
    body: "The AuraAI Partner API lets brands and white-label apps call our skin analysis service directly. Authentication uses an API key issued to an affiliator account.",
    baseUrl: "Base URL",
    prefixNote: "All white-label endpoints live under the /v1 prefix.",
  },
  whitelabel: {
    eyebrow: "Introduction",
    title: "White-label integration",
    steps: [
      "Register as an AuraAI affiliator and activate your account via email.",
      "Create an API key in Dashboard → API Keys (or via POST /api-keys).",
      "Send the user’s selfie to POST /v1/analyze with the API key header.",
      "Render the analysis result in your own brand UI (white-label).",
    ],
    dashboardLink: "Dashboard → API Keys",
  },
  auth: {
    eyebrow: "Getting started",
    title: "Authentication",
    body: "Send the API key on every partner request:",
    bearer: "Authorization: Bearer aura_… (recommended)",
    xApiKey: "or X-API-Key: aura_…",
    storeNote:
      "The key is shown only once when created. Store it on your server / secret manager — never expose it in a public frontend.",
  },
  keys: {
    eyebrow: "Getting started",
    title: "Create API keys",
    body: "You need an affiliator JWT session (log in first), then:",
    responseOnce: "Response (shown once):",
    openManager: "Open API Keys manager →",
    warningExample: "Store this API key now…",
  },
  analyze: {
    eyebrow: "AI service",
    title: "POST /v1/analyze",
    body: "Skin analysis from a selfie. Required multipart field: image (JPEG / PNG / WebP, max 10MB).",
    exampleResponse: "Example response",
  },
  me: {
    eyebrow: "AI service",
    title: "GET /v1/me",
    body: "Validate the API key and inspect partner identity.",
  },
  errors: {
    eyebrow: "Reference",
    title: "Errors",
    status: "Status",
    meaning: "Meaning",
    rows: [
      ["401", "Missing / invalid / revoked API key"],
      ["400", "Validation failed (empty file, wrong format)"],
      ["422", "Image could not be processed (e.g. no face detected)"],
      ["429", "Rate limit"],
      ["500", "Server / AI service error"],
    ],
  },
  apiKeysPage: {
    title: "API Keys",
    subtitleBefore: "For white-label: call",
    subtitleDocs: "API documentation",
    subtitleAfter: "with this key. Read the",
    nameLabel: "Key name",
    namePlaceholder: "Production app",
    creating: "Creating...",
    create: "Create API key",
    loadFail: "Failed to load API keys",
    nameRequired: "Key name is required",
    createdToast: "API key created — save it now",
    createFail: "Failed to create key",
    revokeConfirm: "Revoke this API key? White-label integrations will stop.",
    revokedToast: "API key revoked",
    revokeFail: "Failed to revoke key",
    colName: "Name",
    colPrefix: "Prefix",
    colCreated: "Created",
    colLastUsed: "Last used",
    colStatus: "Status",
    colActions: "Actions",
    active: "Active",
    revoked: "Revoked",
    never: "Never",
    revoke: "Revoke",
    empty: "No API keys yet.",
    createdTitle: "Save this key now",
    createdBody: "This secret is shown only once.",
    copy: "Copy",
    copied: "Copied",
  },
};

const id: DocsUi = {
  navHome: "Beranda",
  navApiReference: "Referensi API",
  navApiKeys: "API Keys",
  getApiAccess: "Dapatkan akses API",
  jumpTo: "LONCAT KE",
  searchPlaceholder: "Cari…",
  groups: {
    introduction: "Pendahuluan",
    gettingStarted: "Mulai",
    aiService: "Layanan AI",
    reference: "Referensi",
  },
  sections: {
    intro: "Tentang API",
    whitelabel: "Integrasi white-label",
    auth: "Autentikasi",
    keys: "Buat API keys",
    analyze: "POST /v1/analyze",
    me: "GET /v1/me",
    errors: "Error",
  },
  intro: {
    eyebrow: "Pendahuluan",
    title: "Tentang Referensi API",
    body: "AuraAI Partner API memungkinkan brand / white-label memanggil layanan analisis kulit kami langsung dari aplikasi mereka. Autentikasi memakai API key yang diterbitkan ke akun afiliator.",
    baseUrl: "Base URL",
    prefixNote: "Semua endpoint white-label berada di bawah prefix /v1.",
  },
  whitelabel: {
    eyebrow: "Pendahuluan",
    title: "Integrasi white-label",
    steps: [
      "Daftar sebagai afiliator AuraAI dan aktifkan akun via email.",
      "Buat API key di Dashboard → API Keys (atau via POST /api-keys).",
      "Kirim selfie pengguna ke POST /v1/analyze dengan header API key.",
      "Render hasil analisis di UI brand Anda (white-label).",
    ],
    dashboardLink: "Dashboard → API Keys",
  },
  auth: {
    eyebrow: "Mulai",
    title: "Autentikasi",
    body: "Kirim API key pada setiap request partner:",
    bearer: "Authorization: Bearer aura_… (disarankan)",
    xApiKey: "atau X-API-Key: aura_…",
    storeNote:
      "Key hanya ditampilkan sekali saat dibuat. Simpan di server / secret manager — jangan expose di frontend publik.",
  },
  keys: {
    eyebrow: "Mulai",
    title: "Buat API keys",
    body: "Butuh JWT sesi afiliator (login dulu), lalu:",
    responseOnce: "Response (sekali saja):",
    openManager: "Buka pengelola API Keys →",
    warningExample: "Simpan API key ini sekarang…",
  },
  analyze: {
    eyebrow: "Layanan AI",
    title: "POST /v1/analyze",
    body: "Analisis kulit dari selfie. Field multipart wajib: image (JPEG / PNG / WebP, max 10MB).",
    exampleResponse: "Contoh response",
  },
  me: {
    eyebrow: "Layanan AI",
    title: "GET /v1/me",
    body: "Validasi API key dan lihat identitas partner.",
  },
  errors: {
    eyebrow: "Referensi",
    title: "Error",
    status: "Status",
    meaning: "Arti",
    rows: [
      ["401", "API key hilang / invalid / dicabut"],
      ["400", "Validasi gagal (file kosong, format salah)"],
      ["422", "Gambar tidak bisa diproses (mis. tidak ada wajah)"],
      ["429", "Rate limit"],
      ["500", "Error server / AI service"],
    ],
  },
  apiKeysPage: {
    title: "API Keys",
    subtitleBefore: "Untuk white-label: tembak",
    subtitleDocs: "dokumentasi API",
    subtitleAfter: "dengan key ini. Baca",
    nameLabel: "Nama key",
    namePlaceholder: "Production app",
    creating: "Membuat...",
    create: "Buat API key",
    loadFail: "Gagal memuat API keys",
    nameRequired: "Nama key wajib diisi",
    createdToast: "API key dibuat — simpan sekarang",
    createFail: "Gagal membuat key",
    revokeConfirm: "Cabut API key ini? Integrasi white-label akan berhenti.",
    revokedToast: "API key dicabut",
    revokeFail: "Gagal mencabut key",
    colName: "Nama",
    colPrefix: "Prefix",
    colCreated: "Dibuat",
    colLastUsed: "Terakhir dipakai",
    colStatus: "Status",
    colActions: "Aksi",
    active: "Aktif",
    revoked: "Dicabut",
    never: "Belum pernah",
    revoke: "Cabut",
    empty: "Belum ada API key.",
    createdTitle: "Simpan key ini sekarang",
    createdBody: "Secret ini hanya ditampilkan sekali.",
    copy: "Salin",
    copied: "Tersalin",
  },
};

const ko: DocsUi = {
  navHome: "홈",
  navApiReference: "API 레퍼런스",
  navApiKeys: "API 키",
  getApiAccess: "API 액세스 받기",
  jumpTo: "바로가기",
  searchPlaceholder: "검색…",
  groups: {
    introduction: "소개",
    gettingStarted: "시작하기",
    aiService: "AI 서비스",
    reference: "레퍼런스",
  },
  sections: {
    intro: "API 소개",
    whitelabel: "화이트라벨 연동",
    auth: "인증",
    keys: "API 키 만들기",
    analyze: "POST /v1/analyze",
    me: "GET /v1/me",
    errors: "오류",
  },
  intro: {
    eyebrow: "소개",
    title: "API 레퍼런스 소개",
    body: "AuraAI Partner API는 브랜드/화이트라벨 앱이 피부 분석 서비스를 직접 호출할 수 있게 합니다. 인증은 제휴(affiliator) 계정에 발급된 API 키를 사용합니다.",
    baseUrl: "Base URL",
    prefixNote: "모든 화이트라벨 엔드포인트는 /v1 접두사를 사용합니다.",
  },
  whitelabel: {
    eyebrow: "소개",
    title: "화이트라벨 연동",
    steps: [
      "AuraAI 제휴사로 가입하고 이메일로 계정을 활성화하세요.",
      "Dashboard → API Keys에서 API 키를 만들거나 POST /api-keys를 사용하세요.",
      "API 키 헤더와 함께 사용자 셀피를 POST /v1/analyze로 전송하세요.",
      "분석 결과를 자사 브랜드 UI에 렌더링하세요(화이트라벨).",
    ],
    dashboardLink: "Dashboard → API Keys",
  },
  auth: {
    eyebrow: "시작하기",
    title: "인증",
    body: "모든 파트너 요청에 API 키를 포함하세요:",
    bearer: "Authorization: Bearer aura_… (권장)",
    xApiKey: "또는 X-API-Key: aura_…",
    storeNote:
      "키는 생성 시 한 번만 표시됩니다. 서버/시크릿 매니저에 저장하고 공개 프론트엔드에 노출하지 마세요.",
  },
  keys: {
    eyebrow: "시작하기",
    title: "API 키 만들기",
    body: "제휴사 JWT 세션이 필요합니다(먼저 로그인). 그다음:",
    responseOnce: "응답(한 번만 표시):",
    openManager: "API Keys 관리 열기 →",
    warningExample: "지금 이 API 키를 저장하세요…",
  },
  analyze: {
    eyebrow: "AI 서비스",
    title: "POST /v1/analyze",
    body: "셀피 기반 피부 분석. 필수 multipart 필드: image (JPEG / PNG / WebP, 최대 10MB).",
    exampleResponse: "응답 예시",
  },
  me: {
    eyebrow: "AI 서비스",
    title: "GET /v1/me",
    body: "API 키를 검증하고 파트너 신원을 확인합니다.",
  },
  errors: {
    eyebrow: "레퍼런스",
    title: "오류",
    status: "상태",
    meaning: "의미",
    rows: [
      ["401", "API 키 누락 / 무효 / 폐기됨"],
      ["400", "유효성 검사 실패(빈 파일, 잘못된 형식)"],
      ["422", "이미지를 처리할 수 없음(예: 얼굴 미검출)"],
      ["429", "요청 한도 초과"],
      ["500", "서버 / AI 서비스 오류"],
    ],
  },
  apiKeysPage: {
    title: "API 키",
    subtitleBefore: "화이트라벨용:",
    subtitleDocs: "API 문서",
    subtitleAfter: "를 이 키로 호출하세요. 확인:",
    nameLabel: "키 이름",
    namePlaceholder: "Production app",
    creating: "만드는 중...",
    create: "API 키 만들기",
    loadFail: "API 키를 불러오지 못했습니다",
    nameRequired: "키 이름이 필요합니다",
    createdToast: "API 키가 생성되었습니다 — 지금 저장하세요",
    createFail: "키 생성에 실패했습니다",
    revokeConfirm: "이 API 키를 폐기할까요? 화이트라벨 연동이 중단됩니다.",
    revokedToast: "API 키가 폐기되었습니다",
    revokeFail: "키 폐기에 실패했습니다",
    colName: "이름",
    colPrefix: "접두사",
    colCreated: "생성일",
    colLastUsed: "최근 사용",
    colStatus: "상태",
    colActions: "작업",
    active: "활성",
    revoked: "폐기됨",
    never: "없음",
    revoke: "폐기",
    empty: "API 키가 없습니다.",
    createdTitle: "지금 이 키를 저장하세요",
    createdBody: "이 시크릿은 한 번만 표시됩니다.",
    copy: "복사",
    copied: "복사됨",
  },
};

const BY_LOCALE: Record<LocaleCode, DocsUi> = { en, id, ko };

export function useDocsUi(): DocsUi {
  const { locale } = useLocale();
  return BY_LOCALE[locale] ?? en;
}
