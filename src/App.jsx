/* eslint-disable */
import React, { useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 에셋: U+one 로고 (Figma 실측값 그대로)
// ─────────────────────────────────────────────────────────────────────────────
const UPLUS_MARK = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMuNzQ4IiBoZWlnaHQ9IjEzLjc3NyIgdmlld0JveD0iMCAwIDI0IDE0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMy4wMzIgMFY4LjQzNEMzLjAzMiA5Ljk0MyAzLjk0NyAxMS4xNjYgNS43NDIgMTEuMTY2QzcuNTM3IDExLjE2NiA4LjQ1MSA5Ljk0MiA4LjQ1MSA4LjQzNFYwSDExLjQ4M1Y4LjAyNkMxMS40ODMgMTEuNDcgOS42NjUgMTQgNS43NDIgMTRDMS44MTkgMTQgMCAxMS40NyAwIDguMDI2VjBIMy4wMzJaTTE5LjU3MyAwLjAwNFY0LjAwMUgyMy4zMzFWNi42MkgxOS41NzNWMTAuNTA3SDE2Ljk2N1Y2LjYySEgxMy4xOFY0LjAwMUgxNi45NjdWMC4wMDRIMTkuNTczWiIgZmlsbD0iI0ZGMkU5OCIvPgo8L3N2Zz4=";
const UPLUS_ONE  = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzcuNzIyIiBoZWlnaHQ9IjEyLjIxNSIgdmlld0JveD0iMCAwIDM3LjcyMiAxMi4yMTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cjx0ZXh0IHg9IjAiIHk9IjEwIiBmb250LXNpemU9IjExLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRjJFOTgiIGZvbnQtZmFtaWx5PSJQcmV0ZW5kYXJkLCBzYW5zLXNlcmlmIiBsZXR0ZXItc3BhY2luZz0iLTAuMyI+b25lPC90ZXh0Pgo8L3N2Zz4=";

// ─────────────────────────────────────────────────────────────────────────────
// 사이드바 메뉴 구조
// ─────────────────────────────────────────────────────────────────────────────
const MENU = [
  { id: "bottom-sheet", label: "바텀 시트 배너", group: false },
  { id: "card", label: "카드 배너", group: true, children: [
    { id: "card-large",    label: "대형", size: "362 × 104 px" },
    { id: "card-medium",   label: "중형", size: "362 × 88 px" },
    { id: "card-small",    label: "소형", size: "362 × 56 px" },
    { id: "card-personal", label: "개인화", size: "362 × 76 px" },
  ]},
  { id: "main", label: "메인 배너", group: true, children: [
    { id: "main-period",  label: "기간제형",  size: "320 × 426 px" },
    { id: "main-product", label: "상품형",    size: "320 × 426 px" },
    { id: "main-gift",    label: "기프트형",  size: "320 × 426 px" },
  ]},
  { id: "sticky", label: "띠 배너", group: true, children: [
    { id: "sticky-no-bg", label: "배경 없음", size: "402 × 48 px" },
    { id: "sticky-bg",    label: "배경 있음", size: "402 × 48 px" },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// 샘플 배너 데이터
// ─────────────────────────────────────────────────────────────────────────────
const SAMPLE_BANNERS = [
  { id: "b1", name: "스타벅스 쿠폰 카드 배너", templateId: "card-large",
    label: "내게 맞는 요금제 찾으면",
    title: "다양한 쿠폰 혜택을 받을 수 있어요!",
    backgroundColor: "#EEF2FF",
    imageUrl: null },
  { id: "b2", name: "데이터 요금제 배너", templateId: "card-large",
    label: "지금 바로 확인하세요",
    title: "내 요금제 맞춤 혜택 보기",
    backgroundColor: "#F0FDF4",
    imageUrl: null },
];

// ─────────────────────────────────────────────────────────────────────────────
// 배너 컴포넌트: 실제 카드 배너 UI (362 × 104 기준)
// ─────────────────────────────────────────────────────────────────────────────
function BannerCard({ banner, scale = 1 }) {
  const w = 362 * scale;
  const h = 104 * scale;
  const fs = scale;
  return (
    <div style={{
      width: w, height: h, borderRadius: 12 * scale,
      background: banner.backgroundColor || "#F2F2F2",
      display: "flex", alignItems: "center",
      padding: `${16 * scale}px ${20 * scale}px`,
      gap: 12 * scale, boxSizing: "border-box",
      flexShrink: 0, overflow: "hidden",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13 * fs, color: "#6B7684", marginBottom: 4 * scale,
          fontFamily: "'Pretendard', sans-serif", whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis" }}>
          {banner.label || "상단 레이블"}
        </div>
        <div style={{ fontSize: 16 * fs, fontWeight: 700, color: "#1A1A1A",
          fontFamily: "'Pretendard', sans-serif", lineHeight: 1.3,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {banner.title || "타이틀 텍스트"}
        </div>
      </div>
      {banner.imageUrl
        ? <img src={banner.imageUrl} alt="" style={{ width: 64 * scale, height: 64 * scale, objectFit: "contain", borderRadius: 8 * scale, flexShrink: 0 }} />
        : <div style={{ width: 64 * scale, height: 64 * scale, borderRadius: 8 * scale, background: "rgba(0,0,0,0.06)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 * scale }}>🏷️</div>
      }
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 중앙: 모바일 앱 UI (U+one 앱 화면 재현 — 배너가 임베드됨)
// ─────────────────────────────────────────────────────────────────────────────
function MobileAppViewer({ banner }) {
  return (
    <div style={{
      width: 402, background: "white", borderRadius: 16,
      overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    }}>
      {/* 가입 정보 섹션 */}
      <div style={{ padding: "20px 20px 0", background: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#9EA6B2", marginBottom: 2 }}>가입일</div>
          </div>
          <div style={{ fontSize: 12, color: "#9EA6B2" }}>2024-01-01</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: "#333" }}>가입 매장 정보</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#FF2E98", fontWeight: 600 }}>양산남부직영점(신종한)</div>
            <div style={{ fontSize: 13, color: "#FF2E98" }}>1544-0010</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#333" }}>유심 잠금해제 번호(PUK)</div>
          <div style={{ fontSize: 13, color: "#9EA6B2" }}>조회 ›</div>
        </div>
        {/* 버튼 4개 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {["요금제 변경","자급제/중고폰 등록","번호 변경","eSIM 전환/재발급"].map(t => (
            <div key={t} style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid #E5E8EC", borderRadius: 8, fontSize: 13, color: "#333", cursor: "pointer" }}>{t}</div>
          ))}
        </div>
      </div>

      {/* ★ 배너 영역 — 실시간 반영 */}
      <div style={{ padding: "0 20px 16px" }}>
        <BannerCard banner={banner} scale={1} />
      </div>

      <div style={{ height: 1, background: "#F0F2F5", margin: "0 20px" }} />

      {/* 요금 조회/납부 정보 */}
      <div style={{ padding: "20px 20px 24px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>요금 조회/납부 정보</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: "#9EA6B2" }}>2월 요금</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#FF2E98" }}>123,000원</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontSize: 12, color: "#C5CBD4" }}>01-01~01-31</div>
          <div style={{ fontSize: 12, color: "#C5CBD4" }}>010-12**-56** 외 5건</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontSize: 13, color: "#9EA6B2" }}>결제일</div>
          <div style={{ fontSize: 13, color: "#333" }}>1차(9일)</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 13, color: "#9EA6B2" }}>납부 방법</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#333" }}>신용카드 자동이체</div>
            <div style={{ fontSize: 12, color: "#9EA6B2" }}>🔴 비씨카드</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 공통 헤더
// ─────────────────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{ height: 80, background: "white", borderBottom: "1px solid #DFE2E5",
      display: "flex", alignItems: "center", paddingLeft: 20, gap: 16, flexShrink: 0 }}>
      <div style={{ width: 66.5, height: 14, position: "relative", flexShrink: 0 }}>
        <img src={UPLUS_MARK} alt="" style={{ position: "absolute", left: 0, top: 0, width: 23.75, height: 13.78 }} />
        <img src={UPLUS_ONE}  alt="" style={{ position: "absolute", left: 28.76, top: 0.78, width: 37.72, height: 12.22 }} />
      </div>
      <span style={{ fontSize: 18, fontWeight: 600, color: "#333D4B", fontFamily: "'Pretendard', sans-serif" }}>
        배너 관리 시스템
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 사이드바 (Main용)
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ selectedId, onSelect }) {
  const [open, setOpen] = useState({ card: true, main: true, sticky: false });
  const font = "'Pretendard', sans-serif";

  return (
    <div style={{ width: 200, background: "white", borderRight: "1px solid #EDEFF1",
      display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
      {MENU.map(item => !item.group ? (
        <div key={item.id}
          onClick={() => onSelect(item.id)}
          style={{ height: 59, display: "flex", alignItems: "center", paddingLeft: 20,
            cursor: "pointer", fontSize: 16, fontWeight: 600, fontFamily: font,
            color: selectedId === item.id ? "#2272EB" : "#4E5968" }}>
          {item.label}
        </div>
      ) : (
        <div key={item.id}>
          <div onClick={() => setOpen(p => ({ ...p, [item.id]: !p[item.id] }))}
            style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 20px", cursor: "pointer" }}>
            <span style={{ fontSize: 16, fontWeight: 600, fontFamily: font,
              color: item.children.some(c => c.id === selectedId) ? "#2272EB" : "#4E5968" }}>
              {item.label}
            </span>
            <span style={{ fontSize: 14, color: "#B0B8C1",
              display: "inline-block", transform: open[item.id] ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.15s" }}>∨</span>
          </div>
          {open[item.id] && item.children.map(child => (
            <div key={child.id}
              onClick={() => onSelect(child.id)}
              style={{ height: 59, display: "flex", alignItems: "center", paddingLeft: 20,
                cursor: "pointer", background: "#EFF2F6",
                fontSize: 16, fontWeight: 600, fontFamily: font,
                color: selectedId === child.id ? "#2272EB" : "#4E5968" }}>
              {child.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 사이드바 (Sub용 — "이전으로")
// ─────────────────────────────────────────────────────────────────────────────
function SubSidebar({ onBack }) {
  return (
    <div style={{ width: 200, background: "white", borderRight: "1px solid #EDEFF1",
      flexShrink: 0 }}>
      <div onClick={onBack}
        style={{ height: 60, display: "flex", alignItems: "center", gap: 8,
          paddingLeft: 20, cursor: "pointer" }}>
        <span style={{ fontSize: 16, color: "#4E5968" }}>‹</span>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#4E5968",
          fontFamily: "'Pretendard', sans-serif" }}>이전으로</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 우측 패널 (Main — 배너 목록)
// ─────────────────────────────────────────────────────────────────────────────
function BannerListPanel({ banners, selectedId, onSelect, onCreateNew }) {
  const font = "'Pretendard', sans-serif";
  return (
    <div style={{ width: 420, background: "#F0F2F5", borderLeft: "1px solid #EDEFF1",
      display: "flex", flexDirection: "column", padding: "0 0 24px" }}>
      <div style={{ padding: "50px 30px 20px", display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#4E5968", fontFamily: font }}>배너 목록</span>
        <span style={{ fontSize: 20, fontWeight: 900, color: "#2272EB", fontFamily: font }}>{banners.length}</span>
      </div>
      <div style={{ padding: "0 30px", display: "flex", flexDirection: "column", gap: 12 }}>
        {banners.map(b => (
          <div key={b.id}
            onClick={() => onSelect(b.id)}
            style={{
              background: "white", borderRadius: 8, height: 86,
              display: "flex", alignItems: "center",
              border: selectedId === b.id ? "1.5px solid #2272EB" : "1.5px solid transparent",
              cursor: "pointer", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
            <div style={{ width: 120, height: "100%", overflow: "hidden", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 12px" }}>
              <BannerCard banner={b} scale={0.3} />
            </div>
            <div style={{ flex: 1, paddingLeft: 8, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#4E5968", fontFamily: font,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {b.name}
              </div>
            </div>
            <div style={{ paddingRight: 16, color: "#B0B8C1", fontSize: 18 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 우측 패널 (Sub — AI 에디터)
// ─────────────────────────────────────────────────────────────────────────────
function EditorPanel({ banner, onChange, onExport }) {
  const [aiTab, setAiTab] = useState("copy");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef(null);
  const font = "'Pretendard', sans-serif";

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 300,
          system: "U+one 브랜드 배너 카피라이터. 간결하고 혜택이 명확한 한국어 카피 생성. JSON {label, title} 만 반환.",
          messages: [{ role: "user", content: `프로모션 목표: ${prompt}\n배너 레이블(20자 이하)과 타이틀(30자 이하) JSON으로 생성` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (parsed.label) onChange("label", parsed.label);
      if (parsed.title) onChange("title", parsed.title);
    } catch {}
    setGenerating(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange("imageUrl", ev.target.result);
    reader.readAsDataURL(file);
  };

  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#4E5968", fontFamily: font, marginBottom: 8 };
  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 8,
    border: "1px solid #E5E8EC", fontSize: 14, fontFamily: font,
    outline: "none", background: "white", boxSizing: "border-box", color: "#1A1A1A",
  };

  return (
    <div style={{ width: 300, background: "white", borderLeft: "1px solid #EDEFF1",
      display: "flex", flexDirection: "column", overflowY: "auto", flexShrink: 0 }}>

      {/* AI 에디터 */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", fontFamily: font, marginBottom: 16 }}>AI 에디터</div>
        {/* 탭 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[["copy","카피"],["image","이미지"]].map(([k, l]) => (
            <button key={k} onClick={() => setAiTab(k)}
              style={{
                flex: 1, height: 40, borderRadius: 8, border: "1px solid #E5E8EC",
                background: aiTab === k ? "#1A1A1A" : "white",
                color: aiTab === k ? "white" : "#4E5968",
                fontSize: 14, fontWeight: 600, fontFamily: font, cursor: "pointer",
              }}>{l}</button>
          ))}
        </div>
        <input value={prompt} onChange={e => setPrompt(e.target.value)}
          placeholder="프로모션 목표를 입력하세요"
          style={{ ...inputStyle, marginBottom: 12 }} />
        <button onClick={handleGenerate} disabled={generating}
          style={{ width: "100%", height: 48, borderRadius: 8, border: "none",
            background: generating ? "#9EA6B2" : "#1A1A1A", color: "white",
            fontSize: 15, fontWeight: 700, fontFamily: font, cursor: generating ? "not-allowed" : "pointer",
            marginBottom: 0 }}>
          {generating ? "생성 중..." : "생성하기"}
        </button>
      </div>

      <div style={{ height: 1, background: "#F0F2F5", margin: "24px 0" }} />

      {/* 이미지 업로드 */}
      <div style={{ padding: "0 20px" }}>
        <div style={labelStyle}>이미지 업로드</div>
        <div onClick={() => fileRef.current?.click()}
          style={{ ...inputStyle, cursor: "pointer", color: "#B0B8C1", textAlign: "center" }}>
          클릭 또는 이미지 드래그
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
      </div>

      <div style={{ height: 1, background: "#F0F2F5", margin: "24px 0" }} />

      {/* 텍스트 편집 */}
      <div style={{ padding: "0 20px" }}>
        <div style={labelStyle}>텍스트 편집</div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#9EA6B2", fontFamily: font, marginBottom: 6 }}>상단 레이블</div>
          <input value={banner.label} onChange={e => onChange("label", e.target.value)}
            placeholder="예) 내게 맞는 요금제 찾으면" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#9EA6B2", fontFamily: font, marginBottom: 6 }}>타이틀</div>
          <input value={banner.title} onChange={e => onChange("title", e.target.value)}
            placeholder="예) 다양한 쿠폰 혜택을 받을 수 있어요" style={inputStyle} />
        </div>
      </div>

      <div style={{ height: 1, background: "#F0F2F5", margin: "24px 0" }} />

      {/* 배경 색상 */}
      <div style={{ padding: "0 20px" }}>
        <div style={labelStyle}>배경 색상</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px",
          border: "1px solid #E5E8EC", borderRadius: 8, background: "white" }}>
          <input type="color" value={banner.backgroundColor || "#F2F2F2"}
            onChange={e => onChange("backgroundColor", e.target.value)}
            style={{ width: 26, height: 26, borderRadius: 4, border: "1px solid #E5E8EC",
              cursor: "pointer", padding: 0 }} />
          <input value={banner.backgroundColor || "#F2F2F2"}
            onChange={e => onChange("backgroundColor", e.target.value)}
            style={{ border: "none", outline: "none", fontSize: 14, fontFamily: font,
              color: "#1A1A1A", width: "100%", background: "transparent" }} />
        </div>
      </div>

      {/* 내보내기 */}
      <div style={{ padding: "24px 20px", marginTop: "auto" }}>
        <button onClick={onExport}
          style={{ width: "100%", height: 55, borderRadius: 12, border: "none",
            background: "#FF2E98", color: "white", fontSize: 16, fontWeight: 700,
            fontFamily: font, cursor: "pointer" }}>
          내보내기
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main 화면 — 대시보드
// ─────────────────────────────────────────────────────────────────────────────
function MainView({ selectedTemplateId, onSelectTemplate, banners, onCreateNew, onEdit }) {
  const [previewBannerId, setPreviewBannerId] = useState(banners[0]?.id || null);
  const font = "'Pretendard', sans-serif";

  const tmplInfo = (() => {
    for (const m of MENU) {
      if (!m.group && m.id === selectedTemplateId) return { label: m.label, size: "402 × 192 px" };
      if (m.group) {
        const c = m.children?.find(c => c.id === selectedTemplateId);
        if (c) return { label: `${m.label} ${c.label}`, size: c.size };
      }
    }
    return { label: "배너", size: "" };
  })();

  const filteredBanners = banners.filter(b => b.templateId === selectedTemplateId);
  const previewBanner = filteredBanners.find(b => b.id === previewBannerId) || filteredBanners[0] || SAMPLE_BANNERS[0];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* 중앙: 모바일 뷰어 */}
      <div style={{ flex: 1, background: "#F0F2F5", display: "flex", flexDirection: "column",
        padding: "0 50px", overflow: "hidden" }}>
        {/* 페이지 제목 */}
        <div style={{ fontSize: 30, fontWeight: 800, color: "#4E5968", fontFamily: font,
          paddingTop: 50, paddingBottom: 24, flexShrink: 0 }}>
          {tmplInfo.label}
        </div>
        {/* 미리보기 헤더 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 16, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#4E5968", fontFamily: font }}>미리보기</span>
            <span style={{ fontSize: 14, color: "#9EA6B2", fontFamily: font }}>{tmplInfo.size}</span>
          </div>
          <button onClick={onCreateNew}
            style={{ padding: "10px 20px", borderRadius: 8, border: "none",
              background: "#1A1A1A", color: "white", fontSize: 14, fontWeight: 600,
              fontFamily: font, cursor: "pointer" }}>
            템플릿 생성하기
          </button>
        </div>
        {/* 모바일 앱 뷰어 */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", justifyContent: "flex-start" }}>
          <MobileAppViewer banner={previewBanner} />
        </div>
      </div>

      {/* 우측: 배너 목록 */}
      <BannerListPanel
        banners={filteredBanners.length > 0 ? filteredBanners : SAMPLE_BANNERS}
        selectedId={previewBannerId}
        onSelect={(id) => { setPreviewBannerId(id); }}
        onCreateNew={onCreateNew}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub 화면 — AI 에디터
// ─────────────────────────────────────────────────────────────────────────────
function SubView({ banner, onBack, onChange, onExport }) {
  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* 중앙: 실시간 프리뷰 */}
      <div style={{ flex: 1, background: "#F0F2F5", display: "flex",
        alignItems: "flex-start", justifyContent: "center",
        padding: "80px 50px 0", overflow: "hidden" }}>
        <MobileAppViewer banner={banner} />
      </div>
      {/* 우측: AI 에디터 패널 */}
      <EditorPanel banner={banner} onChange={onChange} onExport={onExport} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App — 루트
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("main"); // "main" | "sub"
  const [selectedTemplateId, setSelectedTemplateId] = useState("card-large");
  const [banners, setBanners] = useState(SAMPLE_BANNERS);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleCreateNew = () => {
    const newBanner = {
      id: "new-" + Date.now(),
      name: "새 배너",
      templateId: selectedTemplateId,
      label: "",
      title: "",
      backgroundColor: "#F2F2F2",
      imageUrl: null,
    };
    setEditingBanner(newBanner);
    setScreen("sub");
  };

  const handleEdit = (bannerId) => {
    const banner = banners.find(b => b.id === bannerId);
    if (banner) { setEditingBanner({ ...banner }); setScreen("sub"); }
  };

  const handleChange = (field, value) => {
    setEditingBanner(prev => ({ ...prev, [field]: value }));
  };

  const handleExport = () => {
    if (!editingBanner) return;
    setBanners(prev => {
      const exists = prev.find(b => b.id === editingBanner.id);
      if (exists) return prev.map(b => b.id === editingBanner.id ? editingBanner : b);
      return [...prev, editingBanner];
    });
    alert("저장되었습니다.");
    setScreen("main");
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh",
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", overflow: "hidden" }}>
      <Header />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {screen === "main" ? (
          <Sidebar selectedId={selectedTemplateId} onSelect={handleSelectTemplate} />
        ) : (
          <SubSidebar onBack={() => setScreen("main")} />
        )}
        {screen === "main" ? (
          <MainView
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={handleSelectTemplate}
            banners={banners}
            onCreateNew={handleCreateNew}
            onEdit={handleEdit}
          />
        ) : (
          <SubView
            banner={editingBanner || SAMPLE_BANNERS[0]}
            onBack={() => setScreen("main")}
            onChange={handleChange}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}
