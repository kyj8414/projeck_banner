# 배너 운영 관리 시스템

U+ 브랜드 배너 제작·편집·배포 자동화 Admin 시스템

---

## GitHub에 올리는 방법

1. [github.com/new](https://github.com/new) → Repository name: `banner-admin` → **Create repository**
2. **uploading an existing file** 클릭
3. 이 폴더 안의 **파일과 폴더 전체** 드래그 앤 드롭
4. **Commit changes** 클릭

---

## Vercel 배포 방법

1. [vercel.com/new](https://vercel.com/new) → GitHub `banner-admin` 선택 → **Deploy**
2. 배포 완료 후 **Settings → Environment Variables** 에서 추가:
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` ([console.anthropic.com](https://console.anthropic.com) 에서 발급)
3. **Redeploy** → 완료!

---

## 로컬 실행

```bash
npm install
cp .env.example .env   # .env 파일에 API Key 입력
npm run dev            # http://localhost:5173
```

---

## 파일 구조

```
banner-admin/
├── index.html          ← HTML 진입점
├── vite.config.js      ← Vite 설정
├── package.json
├── vercel.json         ← Vercel 배포 설정
├── .gitignore
├── .env.example        ← API Key 템플릿
├── src/
│   ├── main.jsx        ← React 마운트
│   └── App.jsx         ← 전체 앱
└── README.md
```
