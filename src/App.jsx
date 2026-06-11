/* eslint-disable */
import React, { useState, useRef } from "react";

// ── Design Tokens (from Figma) ──────────────────────────────────────────
const tokens = {
  color: {
    brand: "#E10975",
    brandLight: "#FFE8F2",
    primary: "#1A1A1A",
    secondary: "#474747",
    quaternary: "#747474",
    neutral3: "#3B4044",
    neutral4: "#181A1B",
    bgHigh: "#F2F2F2",
    bgWhite: "#FFFFFF",
    bgPage: "#F7F7F7",
  },
  font: {
    family: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
  },
};

// ── Banner Template Definitions (from Figma node analysis) ─────────────
const TEMPLATES = {
  "bottom-sheet": {
    id: "bottom-sheet",
    label: "바텀 시트 배너",
    category: "bottom-sheet",
    figmaNodeId: "11:405",
    canvasW: 402,
    canvasH: 192,
    bgColor: "#FFFFFF",
    slots: [
      { id: "subtitle", label: "부제목", type: "text", maxLen: 16, placeholder: "일이삼사오육칠팔구십일이삼사오육", style: { fontSize: 16, fontWeight: 500, color: "#474747", letterSpacing: -0.32 } },
      { id: "title",    label: "제목",   type: "text", maxLen: 18, placeholder: "일이삼사오육칠팔구십일이삼사오육칠팔", style: { fontSize: 28, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.56 } },
      { id: "desc",     label: "설명",   type: "text", maxLen: 20, placeholder: "일이삼사오육칠팔구십일이삼사오육칠팔구십...", style: { fontSize: 14, fontWeight: 500, color: "#747474", letterSpacing: -0.28 } },
    ],
    hasImage: true,
  },
  "card-large": {
    id: "card-large",
    label: "카드 배너 대형",
    category: "card",
    figmaNodeId: "11:406",
    canvasW: 362,
    canvasH: 104,
    bgColor: "#F2F2F2",
    slots: [
      { id: "title", label: "제목", type: "text", maxLen: 30, placeholder: "카드 배너 대형 제목", style: { fontSize: 18, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.36 } },
    ],
    hasImage: true,
  },
  "card-medium": {
    id: "card-medium",
    label: "카드 배너 중형",
    category: "card",
    figmaNodeId: "11:408",
    canvasW: 362,
    canvasH: 88,
    bgColor: "#F2F2F2",
    slots: [
      { id: "eyebrow", label: "상단 레이블", type: "text", maxLen: 20, placeholder: "카테고리 또는 기간", style: { fontSize: 14, fontWeight: 500, color: "#747474" } },
      { id: "title",   label: "제목",       type: "text", maxLen: 20, placeholder: "카드 배너 중형 제목", style: { fontSize: 16, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.32 } },
    ],
    hasImage: true,
  },
  "card-small": {
    id: "card-small",
    label: "카드 배너 소형",
    category: "card",
    figmaNodeId: "11:407",
    canvasW: 362,
    canvasH: 56,
    bgColor: "#F2F2F2",
    slots: [
      { id: "title", label: "제목", type: "text", maxLen: 20, placeholder: "카드 배너 소형 제목", style: { fontSize: 16, fontWeight: 700, color: "#3B4044", letterSpacing: -0.32 } },
    ],
    hasImage: false,
    hasIcon: true,
  },
  "card-personal": {
    id: "card-personal",
    label: "카드 배너 개인화",
    category: "card",
    figmaNodeId: "11:409",
    canvasW: 362,
    canvasH: 76,
    bgColor: "#F2F2F2",
    slots: [
      { id: "title",     label: "개인화 문구", type: "text",   maxLen: 30, placeholder: "개인화된 메시지", style: { fontSize: 16, fontWeight: 600, color: "#1A1A1A" } },
      { id: "illustId",  label: "일러스트",    type: "illust", maxLen: 0,  placeholder: "", style: {} },
    ],
    hasImage: false,
    hasLogo: true,
    hasIllust: true,
  },
  "main-left": {
    id: "main-left",
    label: "메인 배너 기간제형",
    category: "main",
    figmaNodeId: "29:210",
    canvasW: 320,
    canvasH: 426,
    bgColor: "#FFFFFF",
    // bg-white / flex-col / items-start / pt:54 / px:20
    // [Text Set Title]: flex-col gap:12 items-start not-italic text-center
    //   wrapper: flex-col gap:8 leading:0
    //     eyebrow: 14px/SemiBold/#474747/lh:1.5
    //     title:   24px/Bold/#1A1A1A/-0.48/h:68/w:280
    //   period: 16px/Medium/#474747/lh:1.5
    // Image: h:239 w:280 overflow-clip
    slots: [
      { id: "eyebrow", label: "상단 레이블", type: "text", maxLen: 16, placeholder: "데이터와 쿠폰 혜택",       style: { fontSize: 14, fontWeight: 600, color: "#474747" } },
      { id: "title",   label: "제목",       type: "text", maxLen: 20, placeholder: "데이터 부족,\n자주 걱정되시나요?", style: { fontSize: 24, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.48 }, allowNewline: true },
      { id: "period",  label: "기간",       type: "text", maxLen: 20, placeholder: "4.1 ~ 4.30",               style: { fontSize: 16, fontWeight: 500, color: "#474747" } },
    ],
    hasImage: true,
  },
  "main-center": {
    id: "main-center",
    label: "메인 배너 상품형",
    category: "main",
    figmaNodeId: "29:180",
    canvasW: 320,
    canvasH: 426,
    bgColor: "#FFFFFF",
    // bg-white / flex-col / gap:20 / items-center / px:20 / py:24
    // [Text Set Title]: flex-col gap:16 items-start w-full
    //   Logo: h:14 w-full (U+one SVG)
    //   wrapper: flex-col gap:12 items-start not-italic w-full word-break:break-word
    //     title: 24px/Bold/#1A1A1A/-0.48 leading:0 w-full (마지막 "." → #E10975)
    //     description: 16px/Medium/#474747/lh:1.5 w-full
    // img area: h:200 overflow-clip w-full / image absolute left:0 top:0 w:280 h:200
    slots: [
      { id: "title", label: "제목", type: "text", maxLen: 30, placeholder: "딱 맞는 요금제 변경으로\n데이터는 든든하게 .", style: { fontSize: 24, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.48 }, allowNewline: true },
      { id: "desc",  label: "설명", type: "text", maxLen: 60, placeholder: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십", style: { fontSize: 16, fontWeight: 500, color: "#474747" } },
    ],
    hasImage: true,
    hasLogo: true,
  },
  "main-gift": {
    id: "main-gift",
    label: "메인 배너 기프트형",
    category: "main",
    figmaNodeId: "29:252",
    canvasW: 320,
    canvasH: 426,
    bgColor: "#FFFFFF",
    // bg-white / flex-col / gap:14 / items-center / pt:24 / px:20
    // [Text Set Title] y:24 w:280: flex-col gap:16 items-start
    //   slot-top w:74 h:14 → uplus_bi absolute left:0 top:0.5 w:23.33 h:14
    //   wrapper y:30 w:280 h:68: title 24px/Bold/#1A1A1A/-0.48 lh:0, p lh:1.4, "."→#E10975
    // image x:20 y:136 w:280 h:200 overflow-clip
    // Banner x:20 y:350 w:280 h:76 bg:#F2F2F2 rounded:12 px:20 py:14 gap:12 items-center
    //   wrapper w:180: eyebrow 14px/Medium/#66707A/lh:1.5 + title 16px/Bold/#181A1B lh:1.4
    //   img area 48×48 overflow-clip: 스타벅스컵 scaleY(-1) rotate(180)
    slots: [
      { id: "title",      label: "제목",          type: "text", maxLen: 30, placeholder: "딱 맞는 요금제 변경으로\n데이터는 든든하게 .", style: { fontSize: 24, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.48 }, allowNewline: true },
      { id: "giftLabel",  label: "기프트 레이블", type: "text", maxLen: 16, placeholder: "맞춤 요금제 변경 혜택",    style: { fontSize: 14, fontWeight: 500, color: "#66707A" } },
      { id: "giftTitle",  label: "기프트 제목",   type: "text", maxLen: 20, placeholder: "스타벅스 라테 쿠폰 증정!", style: { fontSize: 16, fontWeight: 700, color: "#181A1B" } },
    ],
    hasImage: true,
    hasLogo: true,
  },
  // ── 띠 배너 정책 ────────────────────────────────────────────────────────
  // 케이스 1: 배경 없는 케이스 (투명/흰 배경, 텍스트만)
  // 케이스 2: 배경 있는 케이스 (승인 팔레트 8종 랜덤 적용, AI 이미지 사이드 배치)
  // 특정 그래픽 형식(선물박스·코인 등) 미정의 — AI 생성 이미지로만 처리
  "sticky-no-bg": {
    id: "sticky-no-bg",
    label: "띠 배너 (배경 없음)",
    category: "sticky",
    figmaNodeId: "15:444",
    canvasW: 402,
    canvasH: 48,
    bgColor: "#FFFFFF",
    bgFixed: false,
    hasImage: false,
    textColor: "#1A1A1A",           // 배경 없는 케이스는 다크 텍스트
    slots: [
      { id: "title", label: "문구", type: "text", maxLen: 22, placeholder: "내게 딱 맞는 요금제 찾고 쿠폰 혜택까지!", style: { fontSize: 16, fontWeight: 600, color: "#1A1A1A", letterSpacing: -0.32 } },
    ],
  },
  "sticky-bg": {
    id: "sticky-bg",
    label: "띠 배너 (배경 있음)",
    category: "sticky",
    figmaNodeId: "15:443",
    canvasW: 402,
    canvasH: 48,
    bgFixed: false,
    // 승인된 배경 팔레트 8종
    bgPalette: ["#331413", "#462914", "#2F2714", "#092817", "#312253", "#1C1D3C", "#221932", "#33001E"],
    bgColor: "#1C1D3C",             // 초기값 (생성 시 랜덤 배정)
    // 텍스트 세이프존: w=249px 중앙 → left 76px, right 76px
    textSafeZone: { left: 76, right: 76, textW: 249 },
    slots: [
      { id: "title",    label: "문구",       type: "text",     maxLen: 22, placeholder: "내게 딱 맞는 요금제 찾고 쿠폰 혜택까지!", style: { fontSize: 16, fontWeight: 600, color: "#FFFFFF", letterSpacing: -0.32 } },
      { id: "aiPrompt", label: "이미지 주제", type: "ai-image", maxLen: 60, placeholder: "예: 커피잔, 스마트폰, 데이터 아이콘", style: {} },
    ],
    hasImage: true,
    hasAIImage: true,
  },
};

const MENU = [
  { id: "bottom-sheet", label: "바텀 시트 배너", icon: "⬆", category: "bottom-sheet" },
  { id: "card", label: "카드 배너", icon: "▤", isGroup: true, children: [
    { id: "card-large",    label: "대형 (Large)" },
    { id: "card-medium",   label: "중형 (Medium)" },
    { id: "card-small",    label: "소형 (Small)" },
    { id: "card-personal", label: "개인화 (Personal)" },
  ]},
  { id: "main", label: "메인 배너", icon: "◉", isGroup: true, children: [
    { id: "main-left",   label: "기간제형" },
    { id: "main-center", label: "상품형" },
    { id: "main-gift",   label: "기프트형" },
  ]},
  { id: "sticky", label: "띠 배너", icon: "▬", isGroup: true, children: [
    { id: "sticky-no-bg", label: "배경 없음" },
    { id: "sticky-bg",    label: "배경 있음" },
  ]},
];

// ── Approved Card Banner Background Palette (가이드라인 준수) ──────────
const CARD_BG_PALETTE = [
  { hex: "#F4F4EE", name: "아이보리",   tags: ["자연", "내추럴", "친환경", "편안", "따뜻", "기본", "뉴트럴", "클래식"] },
  { hex: "#FDE9E7", name: "소프트 핑크", tags: ["감성", "소프트", "여성", "쿠폰", "혜택", "선물", "로맨틱", "프로모션"] },
  { hex: "#FFEDE0", name: "피치",       tags: ["따뜻", "활기", "푸드", "음료", "스타벅스", "커피", "에너지", "리워드"] },
  { hex: "#FDF6DD", name: "레몬 크림",  tags: ["밝음", "경쾌", "여름", "데이터", "속도", "혜택", "신선", "할인"] },
  { hex: "#E6F6E8", name: "민트 그린",  tags: ["친환경", "건강", "성장", "절약", "데이터충전", "안정", "성공", "요금제"] },
  { hex: "#E8F1FC", name: "스카이 블루", tags: ["신뢰", "기술", "모바일", "디지털", "통신", "클린", "전문", "무제한"] },
  { hex: "#ECEDFE", name: "라벤더",     tags: ["모던", "프리미엄", "AI", "혁신", "스마트", "미래", "고급", "플랜"] },
  { hex: "#EFEAFB", name: "소프트 퍼플", tags: ["고급", "프리미엄", "VIP", "개인화", "특별", "멤버십", "엔터테인먼트"] },
];

// 컨셉 키워드 → 팔레트 자동 매핑
function matchPaletteByKeywords(keywords = "", goal = "") {
  const combined = (keywords + " " + goal).toLowerCase();
  let best = null;
  let bestScore = -1;
  for (const p of CARD_BG_PALETTE) {
    const score = p.tags.filter(tag => combined.includes(tag)).length;
    if (score > bestScore) { bestScore = score; best = p; }
  }
  return best || CARD_BG_PALETTE[0];
}

// 팔레트 내 가장 유사한 색상 찾기 (hex distance)
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function colorDistance(a, b) {
  const [r1,g1,b1] = hexToRgb(a), [r2,g2,b2] = hexToRgb(b);
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}
function findNearestPaletteColor(hex) {
  return CARD_BG_PALETTE.reduce((best, p) =>
    colorDistance(hex, p.hex) < colorDistance(hex, best.hex) ? p : best
  , CARD_BG_PALETTE[0]);
}
function isInPalette(hex) {
  return CARD_BG_PALETTE.some(p => p.hex.toLowerCase() === hex.toLowerCase());
}

// ── U+one Illust Library Figma File Key ──────────────────────────────────
const FIGMA_FILE = "bfloWxjt1VRNgiDQ59U80R";

const STATUS_COLORS = {
  draft:     { bg: "#FFF8E1", text: "#B8860B", label: "초안" },
  review:    { bg: "#E3F2FD", text: "#1565C0", label: "검토 중" },
  published: { bg: "#E8F5E9", text: "#2E7D32", label: "게시됨" },
  archived:  { bg: "#EEEEEE", text: "#757575", label: "보관됨" },
};

// ── Utility ─────────────────────────────────────────────────────────────
let _id = 1;
const uid = () => `bnn-${_id++}`;

function formatDate(d) {
  return new Date(d).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" });
}

// ── Mini Canvas Preview ──────────────────────────────────────────────────
function BannerPreview({ template, slotValues, scale = 1, onClick, bgColor }) {
  const tmpl = TEMPLATES[template];
  if (!tmpl) return null;

  const w = tmpl.canvasW * scale;
  const h = tmpl.canvasH * scale;

  // 배경색 우선순위: prop(bgColor) > tmpl 기본값
  const activeBg = bgColor || tmpl.bgColor;

  const getValue = (id) => slotValues?.[id] || tmpl.slots.find(s => s.id === id)?.placeholder || "";

  return (
    <div
      onClick={onClick}
      style={{
        width: w,
        height: h,
        background: activeBg,
        borderRadius: 10 * scale,
        overflow: "hidden",
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        boxSizing: "border-box",
        border: "1px solid rgba(0,0,0,0.07)",
        flexShrink: 0,
      }}
    >
      {/* Render slots */}
      {/* ── 바텀 시트 배너 — Figma 11:405
           w:402 h:192 / bg:white / pt:40 pb:20 px:20
           flex-col / items-start
           content: flex-row gap:8 items-center w-full
             좌: [Text Set] flex-1 flex-col gap:16
               wrapper: flex-col gap:8
                 subtitle: 16px/500/#474747/-0.32/h:20/lh:1.2
                 title:    28px/700/#1A1A1A/-0.56/h:68/lh:1.2
               desc: 14px/500/#747474/-0.28/h:17/w:230/whitespace-nowrap/ellipsis
             우: image 130h×124w / overflow-clip / 우하단 고정 ── */}
      {tmpl.id === "bottom-sheet" && (
        <div style={{ paddingTop: 40*scale, paddingBottom: 20*scale, paddingLeft: 20*scale, paddingRight: 20*scale, display: "flex", flexDirection: "column", alignItems: "flex-start", height: "100%", boxSizing: "border-box" }}>
          {/* content row */}
          <div style={{ display: "flex", gap: 8*scale, alignItems: "center", width: "100%" }}>
            {/* 텍스트 영역: flex-1, flex-col, gap:16 */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16*scale }}>
              {/* wrapper: flex-col gap:8 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8*scale }}>
                {/* subtitle: 16px/500/#474747/-0.32/h:20/lh:1.2 */}
                <div style={{ height: 20*scale, display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 16*scale, fontWeight: 500, color: "#474747", fontFamily: tokens.font.family, letterSpacing: -0.32*scale, lineHeight: 1.2, width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {getValue("subtitle")}
                </div>
                {/* title: 28px/700/#1A1A1A/-0.56/h:68/lh:1.2 — \n 줄바꿈 지원 */}
                <div style={{ height: 68*scale, display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 28*scale, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, letterSpacing: -0.56*scale, lineHeight: 1.2, width: "100%", overflow: "hidden" }}>
                  {getValue("title").split("\n").map((line, i) => (
                    <span key={i} style={{ display: "block" }}>{line || "\u00A0"}</span>
                  ))}
                </div>
              </div>
              {/* desc: 14px/500/#747474/-0.28/h:17/w:230/whitespace-nowrap/ellipsis */}
              <div style={{ height: 17*scale, width: 230*scale, display: "flex", flexDirection: "column", justifyContent: "center", fontSize: 14*scale, fontWeight: 500, color: "#747474", fontFamily: tokens.font.family, letterSpacing: -0.28*scale, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {getValue("desc")}
              </div>
            </div>
            {/* 이미지 영역: 130h×124w / overflow-clip / 우하단 고정 */}
            <div style={{ width: 124*scale, height: 130*scale, flexShrink: 0, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 124*scale, height: 130*scale, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                {slotValues?.illustUrl ? (
                  <img src={slotValues.illustUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom right" }} />
                ) : (
                  /* 기본 플레이스홀더 */
                  <div style={{ width: 124*scale, height: 130*scale, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.25 }}>
                    <svg width={48*scale} height={48*scale} viewBox="0 0 48 48" fill="none">
                      <rect x="4" y="4" width="40" height="40" rx="8" stroke="#E10975" strokeWidth="2" strokeDasharray="4 3"/>
                      <path d="M18 24 L24 18 L30 24 M24 18 V32" stroke="#E10975" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <text x="24" y="42" textAnchor="middle" fontSize="7" fill="#E10975" fontFamily="Pretendard, sans-serif">AI 생성</text>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── 카드 배너 대형 — Figma 11:406
           w:362 h:76 / bg:#F2F2F2 / px:20 py:16
           좌: 텍스트(18px bold -0.36px tracking, lineHeight 1.3) flex-1
           우: 일러스트 영역 72×72px ── */}
      {tmpl.id === "card-large" && (
        <div style={{ padding: `${16*scale}px ${20*scale}px`, display: "flex", alignItems: "center", gap: 24*scale, height: "100%", boxSizing: "border-box" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18*scale, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, letterSpacing: -0.36*scale, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {getValue("title")}
            </div>
          </div>
          {/* 일러스트 존 72×72 — 데이터 차트 SVG (Figma 원본 재현) */}
          <div style={{ width: 72*scale, height: 72*scale, flexShrink: 0, position: "relative" }}>
            {/* 배경 카드 */}
            <div style={{ position: "absolute", left: 13*scale, top: 14*scale, width: 46*scale, height: 44*scale, borderRadius: 5*scale, background: "linear-gradient(135deg,#F5F7FF 3.8%,#E3E7F7 97.8%)", boxShadow: "inset -2px -2px 10px -1px rgba(189,199,232,0.5), inset 1px 1px 2px -0.5px rgba(214,219,242,0.65)" }} />
            {/* 막대 3개 */}
            {[{l:22,h:30,t:21},{l:33,h:23,t:28},{l:43,h:16,t:35}].map((b,i) => (
              <div key={i} style={{ position:"absolute", left:b.l*scale, top:b.t*scale, width:7*scale, height:b.h*scale, borderRadius:`${2*scale}px ${2*scale}px 0 0`, background: i===0?"#5B6FE8":"#A0AAE8", opacity:0.9 }} />
            ))}
            {/* 코인 아이콘 */}
            <div style={{ position:"absolute", left:45*scale, top:40*scale, width:22*scale, height:16*scale, borderRadius:8*scale, background:"#FFD700", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:8*scale, fontWeight:800, color:"#B8860B", fontFamily:tokens.font.family }}>₩</div>
            </div>
            {/* 체크 뱃지 */}
            <div style={{ position:"absolute", left:5*scale, top:7*scale, width:20*scale, height:20*scale, borderRadius:"50%", background:"#4CAF50", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:10*scale, color:"white" }}>✓</div>
            </div>
            {/* 그림자 */}
            <div style={{ position:"absolute", left:12*scale, bottom:2*scale, width:48*scale, height:3*scale, borderRadius:"50%", background:"rgba(0,0,0,0.12)" }} />
          </div>
        </div>
      )}
      {/* ── 카드 배너 중형 — Figma 11:408
           w:362 h:72 / bg:#F2F2F2 / px:20 py:16
           좌: quaternary 14px medium + primary 16px bold gap:4px
           우: 이미지 56×56px ── */}
      {/* ── 카드 배너 중형 — Figma 11:408
           w:362 h:88 / bg:#F2F2F2 / px:20 py:16 / content gap:24
           좌: [14px/500/#747474/lh:1.5/w-full] + [16px/700/#1A1A1A/-0.32px/lh:1.3/ellipsis] gap:4px
           우: 56×56px overflow-clip / 내부 35.8×46.3px -scaleY(1) rotate(180deg) ── */}
      {tmpl.id === "card-medium" && (
        <div style={{ padding: `${16*scale}px ${20*scale}px`, display: "flex", alignItems: "center", gap: 24*scale, height: "100%", boxSizing: "border-box" }}>
          {/* 텍스트 영역 */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4*scale, justifyContent: "center" }}>
            <div style={{ fontSize: 14*scale, fontWeight: 500, color: "#747474", fontFamily: tokens.font.family, lineHeight: 1.5, width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {getValue("eyebrow")}
            </div>
            <div style={{ fontSize: 16*scale, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, letterSpacing: -0.32*scale, lineHeight: 1.3, width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {getValue("title")}
            </div>
          </div>
          {/* 이미지 56×56 / 내부 상하반전(-scaleY·rotate180) */}
          <div style={{ width: 56*scale, height: 56*scale, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ transform: "scaleY(-1) rotate(180deg)" }}>
              <div style={{ fontSize: 36*scale, lineHeight: 1 }}>☕</div>
            </div>
          </div>
        </div>
      )}
      {/* ── 카드 배너 소형 — Figma 11:407
           w:362 h:56 / bg:#F2F2F2 / pl:20 pr:16 py:14 / overflow:clip
           items-center justify-center
           content: gap:10 / items-center
           좌: slot-start → object/gift 28×28 (gift SVG 21.7×20.3 at left:3.15 top:3.85)
           중: 16px/700/#3B4044/tracking:-0.32px/lh:1.3/whitespace-nowrap/ellipsis flex-1
           우: slot-end → chevronRight 24×24 (Vector left:37.5% right:33.33% top:25% bottom:25%) ── */}
      {tmpl.id === "card-small" && (
        <div style={{ paddingLeft: 20*scale, paddingRight: 16*scale, paddingTop: 14*scale, paddingBottom: 14*scale, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", height: "100%", boxSizing: "border-box" }}>
          {/* content: flex-1, gap:10, items-center */}
          <div style={{ display: "flex", flex: 1, gap: 10*scale, alignItems: "center", minWidth: 0 }}>
            {/* slot-start: shrink-0 / object/gift 28×28 */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative", width: 28*scale, height: 28*scale, flexShrink: 0 }}>
                <div style={{ position: "absolute", left: 3.15*scale, top: 3.85*scale, width: 21.7*scale, height: 20.3*scale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18*scale }}>🎁</div>
              </div>
            </div>
            {/* 텍스트: flex-1 / 16px/700/#3B4044/-0.32px/lh:1.3/whitespace-nowrap/ellipsis */}
            <div style={{ flex: 1, minWidth: 0, fontSize: 16*scale, fontWeight: 700, color: "#3B4044", fontFamily: tokens.font.family, letterSpacing: -0.32*scale, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", wordBreak: "break-word" }}>
              {getValue("title")}
            </div>
            {/* slot-end: shrink-0 / chevronRight 24×24 */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative", width: 24*scale, height: 24*scale }}>
                {/* Vector: left:37.5% right:33.33% top:25% bottom:25% */}
                <div style={{ position: "absolute", left: "37.5%", right: "33.33%", top: "25%", bottom: "25%", display: "flex", alignItems: "center", justifyContent: "center", color: "#3B4044" }}>
                  <svg width={24*scale * 0.3} height={24*scale * 0.5} viewBox="0 0 6 10" fill="none">
                    <path d="M1 1L5 5L1 9" stroke="#3B4044" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── 카드 배너 개인화 — Figma 11:409
           w:362 h:72 / bg:#F2F2F2 / px:20 py:16 gap:16
           좌: U+ 원형 40×40(핑크 #FF5DAE 30px 내부) or 일러스트
           우: 텍스트 16px semibold(600) primary lineHeight:1.4 ── */}
      {/* ── 카드 배너 개인화 — Figma 11:409
           w:362 h:72 / bg:#F2F2F2 / px:20 py:16 / outer gap:0
           content gap:16 / items-center
           좌: slot-start 40×40 shrink-0
             └ Logo/uplusCircle: 핑크 원 30px (translate-50% 중앙) + U+ h:9.333 left:30% right:30% top:calc(50%+0.67px)
           우: 16px/600/#1A1A1A/lh:1.4/ls:0/word-break/ellipsis ── */}
      {tmpl.id === "card-personal" && (
        <div style={{ padding: `${16*scale}px ${20*scale}px`, display: "flex", alignItems: "center", height: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16*scale, flex: 1, minWidth: 0 }}>
            {/* slot-start 40×40 shrink-0 */}
            <div style={{ width: 40*scale, height: 40*scale, flexShrink: 0, position: "relative" }}>
              {slotValues?.illustId ? (
                <div style={{ width: 40*scale, height: 40*scale, borderRadius: 8*scale, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={`https://www.figma.com/component-thumbnail?node-id=${slotValues.illustId.replace(":","-")}&file-key=${FIGMA_FILE}`} alt=""
                    onError={e => { e.target.style.display = "none"; }}
                    style={{ width: 36*scale, height: 36*scale, objectFit: "contain" }} />
                </div>
              ) : (
                /* Logo/uplusCircle: 40×40 컨테이너 / 핑크 원 30px 중앙 / U+ 벡터 위치 재현 */
                <div style={{ position: "absolute", left: 0, top: 0, width: 40*scale, height: 40*scale }}>
                  <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 30*scale, height: 30*scale, borderRadius: "50%", background: "#FF5DAE" }} />
                  <div style={{ position: "absolute", left: "30%", right: "30%", top: `calc(50% + ${0.67*scale}px)`, transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 8*scale, fontWeight: 800, color: "white", fontFamily: tokens.font.family, letterSpacing: -0.5, lineHeight: 1, whiteSpace: "nowrap" }}>U+</span>
                  </div>
                </div>
              )}
            </div>
            {/* 텍스트: flex-1 / 16px/600/#1A1A1A/lh:1.4/ls:0/word-break:break-word/ellipsis */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ flex: 1, minWidth: 0, fontSize: 16*scale, fontWeight: 600, color: "#1A1A1A", fontFamily: tokens.font.family, lineHeight: 1.4, letterSpacing: 0, wordBreak: "break-word", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {getValue("title")}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── 메인 배너 기본형 — Figma 29:219 (중앙 정렬) ── */}
      {tmpl.id === "main-left" && (
        <div style={{ background: "white", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 54*scale, paddingLeft: 20*scale, paddingRight: 20*scale, boxSizing: "border-box" }}>

          {/* [Text Set Title]: items-center text-center */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12*scale, alignItems: "center", fontStyle: "normal", textAlign: "center", wordBreak: "break-word", flexShrink: 0, width: "100%" }}>
            {/* wrapper */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8*scale, alignItems: "center", lineHeight: 0, flexShrink: 0, width: "100%" }}>
              {/* eyebrow */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: 0, width: "100%", fontSize: 14*scale, fontWeight: 600, color: "#474747", fontFamily: tokens.font.family }}>
                <p style={{ lineHeight: 1.5, margin: 0 }}>{getValue("eyebrow")}</p>
              </div>
              {/* title */}
              <div style={{ height: 68*scale, flexShrink: 0, fontSize: 24*scale, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, letterSpacing: -0.48*scale, width: "100%", overflow: "hidden" }}>
                {getValue("title").split("\n").map((line, i) =>
                  <p key={i} style={{ lineHeight: 1.4, marginBottom: 0 }}>{line}</p>
                )}
              </div>
            </div>
            {/* period */}
            <p style={{ lineHeight: 1.5, flexShrink: 0, fontSize: 16*scale, fontWeight: 500, color: "#474747", fontFamily: tokens.font.family, margin: 0, width: "100%" }}>
              {getValue("period")}
            </p>
          </div>

          {/* Image */}
          <div style={{ height: 239*scale, overflow: "hidden", flexShrink: 0, width: "100%", position: "relative" }}>
            <img
              src={slotValues?.illustUrl || "data:image/jpeg;base64,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"}
              alt=""
              style={{ position: "absolute", left: 0, top: 0, width: 280*scale, height: 239*scale, objectFit: "cover", pointerEvents: "none" }}
            />
          </div>

        </div>
      )}
      {/* ── 메인 배너 중앙형 — Figma 29:180 (좌측 정렬)
           bg-white / flex-col / gap:20 / items-center / px:20 / py:24
           [Text Set Title]: flex-col gap:16 items-start shrink-0 w-full
             Logo: h:14 w-full (U+one)
             wrapper: flex-col gap:12 items-start not-italic w-full word-break:break-word
               title: leading:0 shrink-0 24px/Bold/#1A1A1A/-0.48 w-full
               description: leading:1.5 shrink-0 16px/Medium/#474747 w-full
           img area: h:200 overflow-clip shrink-0 w-full ── */}
      {tmpl.id === "main-center" && (
        <div style={{ background: "white", width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 20*scale, alignItems: "center", padding: `${24*scale}px ${20*scale}px`, boxSizing: "border-box" }}>

          {/* [Text Set Title]: flex-col gap:16 items-start shrink-0 w-full */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16*scale, alignItems: "flex-start", flexShrink: 0, width: "100%" }}>

            {/* Logo: h:14 w-full / U+one absolute left:0 top:0 w:23.33 h:14 */}
            <div style={{ height: 14*scale, flexShrink: 0, width: "100%", position: "relative" }}>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuMDMyMjMgMFY4LjQzMzU5QzMuMDMyMjMgOS45NDI1MSAzLjk0NzM3IDExLjE2NiA1Ljc0MjE5IDExLjE2NkM3LjUzNjczIDExLjE2NTggOC40NTExNyA5Ljk0MjM5IDguNDUxMTcgOC40MzM1OVYwSDExLjQ4MzRWOC4wMjYzN0MxMS40ODM0IDExLjQ3IDkuNjY1MjQgMTMuOTk5OCA1Ljc0MjE5IDE0QzEuODE4ODUgMTQgMCAxMS40NzAxIDAgOC4wMjYzN1YwSDMuMDMyMjNaTTE5LjU3MzIgMC4wMDM5MDYyNVY0LjAwMDk4SDIzLjMzMTFWNi42MjAxMkgxOS41NzMyVjEwLjUwNjhIMTYuOTY2OFY2LjYyMDEySDEzLjE3OTdWNC4wMDA5OEgxNi45NjY4VjAuMDAzOTA2MjVIMTkuNTczMloiIGZpbGw9IiNGRjJFOTgiLz4KPC9zdmc+Cg=="
                alt="U+one"
                style={{ position: "absolute", left: 0, top: 0, width: 23.33*scale, height: 14*scale, display: "block" }}
              />
            </div>

            {/* wrapper: flex-col gap:12 items-start not-italic shrink-0 w-full word-break:break-word */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12*scale, alignItems: "flex-start", fontStyle: "normal", flexShrink: 0, width: "100%", wordBreak: "break-word" }}>

              {/* title: leading:0 shrink-0 24px/Bold/#1A1A1A/-0.48 w-full — 마지막 "." → #E10975 */}
              <div style={{ lineHeight: 0, flexShrink: 0, fontSize: 24*scale, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, letterSpacing: -0.48*scale, width: "100%" }}>
                {getValue("title").split("\n").map((line, i, arr) => {
                  const trimmed = line.trimEnd();
                  const hasDot = i === arr.length - 1 && trimmed.endsWith(".");
                  return hasDot
                    ? <p key={i} style={{ lineHeight: 1.4, marginBottom: 0 }}><span>{trimmed.slice(0, -1)}</span><span style={{ color: "#E10975" }}>.</span></p>
                    : <p key={i} style={{ lineHeight: 1.4, marginBottom: 0 }}>{line}</p>;
                })}
              </div>

              {/* description: leading:1.5 shrink-0 16px/Medium/#474747 w-full */}
              <p style={{ lineHeight: 1.5, flexShrink: 0, fontSize: 16*scale, fontWeight: 500, color: "#474747", fontFamily: tokens.font.family, margin: 0, width: "100%" }}>
                {getValue("desc")}
              </p>

            </div>
          </div>

          {/* img area: h:200 overflow-clip shrink-0 w-full / image absolute left:0 top:0 w:280 h:200 object-cover */}
          <div style={{ height: 200*scale, overflow: "hidden", flexShrink: 0, width: "100%", position: "relative" }}>
            {slotValues?.illustUrl
              ? <img src={slotValues.illustUrl} alt="" style={{ position: "absolute", left: 0, top: 0, width: 280*scale, height: 200*scale, objectFit: "cover", pointerEvents: "none" }} />
              : <img src="data:image/jpeg;base64,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" alt="" style={{ position: "absolute", left: 0, top: 0, width: 280*scale, height: 200*scale, objectFit: "contain", objectPosition: "center bottom", pointerEvents: "none" }} />
            }
          </div>

        </div>
      )}
      {/* ── 메인 배너 기프트형 — Figma 29:252
           bg-white / flex-col / gap:14 / items-center / pt:24 / px:20
           [Text Set Title] y:24 w:280: flex-col gap:16 items-start shrink-0 w-full
             slot-top w:74 h:14 → uplus_bi absolute left:0 top:0.5 w:23.33 h:14
             wrapper y:30 w:280 h:68: title 24px/Bold/#1A1A1A/-0.48/lh:0, p lh:1.4, "."→#E10975
           image y:136 h:200 overflow-clip w-full
           Banner y:350 w:280 h:76 bg:#F2F2F2 rounded:12 px:20 py:14 gap:12 items-center
             wrapper w:180: eyebrow 14px/Medium/#66707A/lh:1.5 + title 16px/Bold/#181A1B/lh:1.4
             img area 48×48 overflow-clip: scaleY(-1) rotate(180) ── */}
      {tmpl.id === "main-gift" && (
        <div style={{ background: "white", width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 14*scale, alignItems: "center", paddingTop: 24*scale, paddingLeft: 20*scale, paddingRight: 20*scale, boxSizing: "border-box" }}>

          {/* [Text Set Title]: flex-col gap:16 items-start shrink-0 w-full */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16*scale, alignItems: "flex-start", flexShrink: 0, width: "100%" }}>

            {/* slot-top: h:14 w:74 shrink-0 / uplus_bi absolute left:0 top:0.5 w:23.33 h:14 */}
            <div style={{ height: 14*scale, width: 74*scale, flexShrink: 0, position: "relative" }}>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuMDMyMjMgMFY4LjQzMzU5QzMuMDMyMjMgOS45NDI1MSAzLjk0NzM3IDExLjE2NiA1Ljc0MjE5IDExLjE2NkM3LjUzNjczIDExLjE2NTggOC40NTExNyA5Ljk0MjM5IDguNDUxMTcgOC40MzM1OVYwSDExLjQ4MzRWOC4wMjYzN0MxMS40ODM0IDExLjQ3IDkuNjY1MjQgMTMuOTk5OCA1Ljc0MjE5IDE0QzEuODE4ODUgMTQgMCAxMS40NzAxIDAgOC4wMjYzN1YwSDMuMDMyMjNaTTE5LjU3MzIgMC4wMDM5MDYyNVY0LjAwMDk4SDIzLjMzMTFWNi42MjAxMkgxOS41NzMyVjEwLjUwNjhIMTYuOTY2OFY2LjYyMDEySDEzLjE3OTdWNC4wMDA5OEgxNi45NjY4VjAuMDAzOTA2MjVIMTkuNTczMloiIGZpbGw9IiNGRjJFOTgiLz4KPC9zdmc+Cg==" alt="U+one" style={{ position: "absolute", left: 0, top: 0.5*scale, width: 23.33*scale, height: 14*scale, display: "block" }} />
            </div>

            {/* wrapper: w-full h:68 / title lh:0 24px/Bold/#1A1A1A/-0.48 w:280 */}
            <div style={{ width: "100%", flexShrink: 0 }}>
              <div style={{ lineHeight: 0, fontSize: 24*scale, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, letterSpacing: -0.48*scale, wordBreak: "break-word", fontStyle: "normal", width: 280*scale }}>
                {getValue("title").split("\n").map((line, i, arr) => {
                  const trimmed = line.trimEnd();
                  const hasDot = i === arr.length - 1 && trimmed.endsWith(".");
                  return hasDot
                    ? <p key={i} style={{ lineHeight: 1.4, marginBottom: 0 }}><span>{trimmed.slice(0, -1)}</span><span style={{ color: "#E10975" }}>.</span></p>
                    : <p key={i} style={{ lineHeight: 1.4, marginBottom: 0 }}>{line}</p>;
                })}
              </div>
            </div>

          </div>

          {/* image: h:200 overflow-clip shrink-0 w-full / absolute left:0 top:0 w:280 h:200 object-cover */}
          <div style={{ height: 200*scale, overflow: "hidden", flexShrink: 0, width: "100%", position: "relative" }}>
            {slotValues?.illustUrl
              ? <img src={slotValues.illustUrl} alt="" style={{ position: "absolute", left: 0, top: 0, width: 280*scale, height: 200*scale, objectFit: "cover", pointerEvents: "none" }} />
              : <img src="data:image/jpeg;base64,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" alt="" style={{ position: "absolute", left: 0, top: 0, width: 280*scale, height: 200*scale, objectFit: "contain", objectPosition: "center bottom", pointerEvents: "none" }} />
            }
          </div>

          {/* Banner: w:280 h:76 bg:#F2F2F2 rounded:12 px:20 py:14 gap:12 items-center flex */}
          <div style={{ width: 280*scale, height: 76*scale, background: "#F2F2F2", borderRadius: 12*scale, padding: `${14*scale}px ${20*scale}px`, display: "flex", gap: 12*scale, alignItems: "center", flexShrink: 0, boxSizing: "border-box" }}>

            {/* wrapper: w:180 flex-col items-start not-italic word-break:break-word shrink-0 */}
            <div style={{ width: 180*scale, display: "flex", flexDirection: "column", alignItems: "flex-start", fontStyle: "normal", wordBreak: "break-word", flexShrink: 0 }}>
              {/* eyebrow: 14px/Medium/#66707A/lh:1.5 w-full */}
              <p style={{ fontSize: 14*scale, fontWeight: 500, color: "#66707A", fontFamily: tokens.font.family, lineHeight: 1.5, margin: 0, width: "100%" }}>
                {getValue("giftLabel")}
              </p>
              {/* title: flex-col justify-center 16px/Bold/#181A1B lh:0 → p lh:1.4 w-full */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: 0, fontSize: 16*scale, fontWeight: 700, color: "#181A1B", fontFamily: tokens.font.family, width: "100%", flexShrink: 0 }}>
                <p style={{ lineHeight: 1.4, margin: 0 }}>{getValue("giftTitle")}</p>
              </div>
            </div>

            {/* img area: 48×48 overflow-clip flex items-center justify-center */}
            <div style={{ width: 48*scale, height: 48*scale, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* 스타벅스 컵: scaleY(-1) rotate(180) — Figma 원본 그대로 */}
              <div style={{ transform: "scaleY(-1) rotate(180deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 32*scale, lineHeight: 1 }}>☕</div>
              </div>
            </div>

          </div>

        </div>
      )}
      {/* ── 띠 배너: 배경 없는 케이스 ── */}
      {tmpl.id === "sticky-no-bg" && (
        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background: activeBg, border:"1px solid rgba(0,0,0,0.08)", boxSizing:"border-box" }}>
          <div style={{ fontSize:10*scale, fontWeight:600, color:"#1A1A1A", fontFamily:tokens.font.family, letterSpacing:-0.32*scale, textAlign:"center", padding:`0 ${16*scale}px`, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"100%" }}>
            {getValue("title")}
          </div>
        </div>
      )}
      {/* ── 띠 배너: 배경 있는 케이스 ── */}
      {tmpl.id === "sticky-bg" && (
        <div style={{ width:"100%", height:"100%", position:"relative", overflow:"hidden", background: activeBg }}>
          <div style={{ position:"absolute", left:0, top:0, width:72*scale, height:"100%", overflow:"hidden" }}>
            {slotValues?.aiImageUrl
              ? <img src={slotValues.aiImageUrl} alt="" style={{ position:"absolute", left:0, top:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center right", maskImage:"linear-gradient(to right,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)", WebkitMaskImage:"linear-gradient(to right,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)" }} />
              : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:6*scale, height:6*scale, borderRadius:"50%", background:"rgba(255,255,255,0.2)" }} /></div>
            }
          </div>
          <div style={{ position:"absolute", right:0, top:0, width:72*scale, height:"100%", overflow:"hidden" }}>
            {slotValues?.aiImageUrl
              ? <img src={slotValues.aiImageUrl} alt="" style={{ position:"absolute", right:0, top:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center left", maskImage:"linear-gradient(to left,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)", WebkitMaskImage:"linear-gradient(to left,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)" }} />
              : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:6*scale, height:6*scale, borderRadius:"50%", background:"rgba(255,255,255,0.2)" }} /></div>
            }
          </div>
          <div style={{ position:"absolute", left:76*scale, right:76*scale, top:0, bottom:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
            <div style={{ fontSize:10*scale, fontWeight:600, color:"#FFFFFF", fontFamily:tokens.font.family, letterSpacing:-0.32*scale, textAlign:"center", width:"100%", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {getValue("title")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Figma 원본 그래픽 스타일 분석 결과 (15:443 노드) ────────────────────
// - 비트맵 레이어 합성: Rectangle × 20 + SVG Vector × 4 + Star PNG
// - mix-blend-multiply 레이어로 광택·그림자 표현
// - 소프트 3D 일러스트: 핑크-퍼플 그라디언트 리본, 파란 하이라이트, 골드 스타
// - 배경과 자연스럽게 블렌딩되는 반투명 레이어 구조
const FIGMA_STYLE_PRESET = `
ILLUSTRATION STYLE (strictly follow — based on actual Figma design system):
- Soft 3D illustration with layered bitmap blending (mix-blend-multiply technique)
- Smooth gradient fills: pink-to-purple ribbon (#E91E8C → #FF80CC), blue highlight shadows
- Semi-transparent overlapping layers giving depth and glow
- Gold/white sparkle star accents with varying opacity (50~80%)
- Objects have subtle drop shadows and inner glow
- Style: polished Korean mobile app promotional illustration
- Color palette: warm pinks, purples, electric blues, gold highlights on dark background
- Small, compact objects (max 40×40px within 72px zone), bottom-anchored
- Render as if composited from multiple soft-edge PNG layers
`;

// ── Sticky BG Panel (배경 있는 케이스 전용) ──────────────────────────────
// 정책: 배경 팔레트 8종 랜덤 적용 + 수정 가능 / AI 이미지 사이드 배치
const STICKY_BG_PALETTE = ["#331413","#462914","#2F2714","#092817","#312253","#1C1D3C","#221932","#33001E"];
const STICKY_BG_LABELS  = ["딥 레드","딥 오렌지","딥 옐로우","딥 그린","딥 퍼플","딥 네이비","딥 인디고","딥 버건디"];

function StickyBgPanel({ currentBg, onBgChange, onApplyImage, currentImageUrl }) {
  const [topic, setTopic] = useState("");
  const [ilStyle, setIlStyle] = useState("figma");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || null);
  const [prompt, setPrompt] = useState("");

  const isDark = (hex) => {
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    return (r*299+g*587+b*114)/1000 < 128;
  };

  const STYLE_OPTIONS = [
    { id:"figma",    label:"Figma 원본", desc:"소프트 3D 블렌딩", badge:"추천" },
    { id:"minimal",  label:"미니멀",     desc:"단순·깔끔" },
    { id:"illust",   label:"일러스트",   desc:"플랫 벡터" },
    { id:"cute",     label:"큐트",       desc:"아이콘 스타일" },
  ];

  const generate = async () => {
    if (!topic.trim()) { setError("이미지 주제를 입력해 주세요."); return; }
    setError(""); setLoading(true); setPreviewUrl(null); setPrompt("");
    const bgHex = currentBg || "#1C1D3C";

    // Figma 원본 스타일 vs 기타 스타일 분기
    const styleGuide = ilStyle === "figma"
      ? FIGMA_STYLE_PRESET
      : {
          minimal:  "minimalist flat icon, simple geometric shapes, 2-3 colors max, clean edges",
          illust:   "flat vector illustration, clean outlines, vibrant but not busy",
          cute:     "cute kawaii character or icon, rounded shapes, pastel accents, chibi style",
        }[ilStyle];

    const safeZoneRule = `
CRITICAL LAYOUT CONSTRAINT:
- Total banner: 402×48px horizontal strip
- ONLY place objects in: LEFT zone (x: 0~72px) and RIGHT zone (x: 330~402px)
- Center zone (x: 76~326px, w=249px) MUST be 100% empty — background color only
- Objects: small (max 44px tall), bottom-anchored or vertically centered
- Must visually contrast against dark background: ${bgHex}
`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_API_KEY||"","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:400,
          system:`You are a DALL-E 3 prompt engineer specializing in Korean mobile app promotional banners.
${safeZoneRule}
${styleGuide}
Return ONLY the English DALL-E 3 prompt string. No explanation, no JSON, no quotes.`,
          messages:[{role:"user",content:`Illustration subject: ${topic}\nBackground color: ${bgHex}`}]
        })
      });
      const data = await res.json();
      const dp = data.content?.find(c=>c.type==="text")?.text?.trim()||"";
      setPrompt(dp);
      const seed = encodeURIComponent(topic.split(" ").slice(0,2).join(","));
      setPreviewUrl(`https://source.unsplash.com/144x96/?${seed},dark,minimal&sig=${Date.now()}`);
    } catch(e) { setError("생성 중 오류가 발생했습니다."); }
    finally { setLoading(false); }
  };

  const bg = currentBg || "#1C1D3C";
  const textColor = isDark(bg) ? "white" : "#1A1A1A";

  return (
    <div style={{ background:"#12132A", border:"1px solid #2A2C52", borderRadius:12, padding:18, marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <span style={{ fontSize:16 }}>🎨</span>
        <div style={{ fontSize:13, fontWeight:700, color:"white", fontFamily:tokens.font.family }}>배경 있는 케이스 편집</div>
      </div>

      {/* ── 배경 컬러 선택 (승인 팔레트 8종) ── */}
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.6)", fontFamily:tokens.font.family }}>배경 컬러</div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:14, height:14, borderRadius:3, background:bg, border:"1px solid rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.5)", fontFamily:"monospace" }}>{bg}</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
          {STICKY_BG_PALETTE.map((c,i)=>(
            <div key={c} onClick={()=>onBgChange(c)}
              style={{ cursor:"pointer", borderRadius:8, overflow:"hidden", border: bg===c ? `2px solid ${tokens.color.brand}` : "2px solid transparent", boxShadow: bg===c ? `0 0 0 2px rgba(225,9,117,0.4)` : "none" }}>
              <div style={{ height:28, background:c }} />
              <div style={{ padding:"3px 4px", background:"#0D0E24" }}>
                <div style={{ fontSize:9, color: bg===c ? tokens.color.brand : "rgba(255,255,255,0.45)", fontFamily:tokens.font.family, fontWeight: bg===c ? 700:400, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{STICKY_BG_LABELS[i]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 세이프존 가이드 ── */}
      <div style={{ marginBottom:16, borderRadius:8, overflow:"hidden", border:"1px solid #2A2C52" }}>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", padding:"4px 10px", background:"#0D0E24", fontFamily:tokens.font.family }}>레이아웃 세이프존</div>
        <div style={{ display:"flex", height:24, background:bg }}>
          <div style={{ width:72, background:"rgba(225,9,117,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, borderRight:"1px dashed rgba(225,9,117,0.4)" }}>
            <span style={{ fontSize:8, color:"rgba(225,9,117,0.8)", fontFamily:tokens.font.family, fontWeight:600 }}>이미지</span>
          </div>
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", borderRight:"1px dashed rgba(225,9,117,0.4)" }}>
            <span style={{ fontSize:8, color:isDark(bg)?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.3)", fontFamily:tokens.font.family }}>텍스트 세이프존 · 침범 금지</span>
          </div>
          <div style={{ width:72, background:"rgba(225,9,117,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:8, color:"rgba(225,9,117,0.8)", fontFamily:tokens.font.family, fontWeight:600 }}>이미지</span>
          </div>
        </div>
      </div>

      {/* ── AI 이미지 생성 ── */}
      <div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.6)", marginBottom:8, fontFamily:tokens.font.family }}>AI 이미지 (사이드 존)</div>
      <div style={{ marginBottom:10 }}>
        <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()}
          placeholder="예: 커피잔, 스마트폰, 데이터 아이콘"
          style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1px solid #2A2C52", fontSize:13, fontFamily:tokens.font.family, boxSizing:"border-box", outline:"none", background:"#0D0E24", color:"white" }} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
        {STYLE_OPTIONS.map(s=>(
          <div key={s.id} onClick={()=>setIlStyle(s.id)}
            style={{ padding:"6px 10px", borderRadius:8, cursor:"pointer", border: ilStyle===s.id ? `1.5px solid ${s.id==="figma" ? "#FFD700" : tokens.color.brand}` : "1.5px solid #2A2C52", background: ilStyle===s.id ? (s.id==="figma" ? "rgba(255,215,0,0.1)" : "rgba(225,9,117,0.15)") : "#0D0E24", position:"relative" }}>
            {s.badge && (
              <span style={{ position:"absolute", top:-6, right:6, fontSize:9, padding:"1px 5px", borderRadius:8, background:"#FFD700", color:"#000", fontWeight:700, fontFamily:tokens.font.family }}>{s.badge}</span>
            )}
            <div style={{ fontSize:11, fontWeight:600, color: ilStyle===s.id ? (s.id==="figma"?"#FFD700":tokens.color.brand) : "rgba(255,255,255,0.75)", fontFamily:tokens.font.family }}>{s.label}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", fontFamily:tokens.font.family }}>{s.desc}</div>
          </div>
        ))}
      </div>
      {error && <div style={{ fontSize:11, color:"#FF6B6B", marginBottom:8, fontFamily:tokens.font.family }}>{error}</div>}
      <button onClick={generate} disabled={loading}
        style={{ width:"100%", padding:"8px 0", borderRadius:8, border:"none", background: loading?"#333":tokens.color.brand, color:"white", fontSize:12, fontWeight:700, fontFamily:tokens.font.family, cursor: loading?"not-allowed":"pointer", marginBottom:10 }}>
        {loading ? "생성 중..." : "🎨 이미지 생성"}
      </button>

      {/* 생성된 프롬프트 */}
      {prompt && (
        <div style={{ marginBottom:10, padding:"8px 10px", borderRadius:8, background:"#0D0E24", border:"1px solid #2A2C52" }}>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", marginBottom:3, fontFamily:tokens.font.family }}>DALL-E 프롬프트</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontFamily:"monospace", lineHeight:1.5, wordBreak:"break-all" }}>{prompt}</div>
        </div>
      )}

      {/* 미리보기 + 세이프존 확인 */}
      {previewUrl && (
        <div>
          <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.45)", marginBottom:5, fontFamily:tokens.font.family }}>세이프존 미리보기</div>
          <div style={{ position:"relative", height:48, background:bg, borderRadius:8, overflow:"hidden", border:"1px solid #2A2C52", marginBottom:8 }}>
            <img src={previewUrl} alt="" style={{ position:"absolute", left:0, top:0, width:72, height:"100%", objectFit:"cover", objectPosition:"center right", maskImage:"linear-gradient(to right,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)", WebkitMaskImage:"linear-gradient(to right,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)" }} />
            <img src={previewUrl} alt="" style={{ position:"absolute", right:0, top:0, width:72, height:"100%", objectFit:"cover", objectPosition:"center left", maskImage:"linear-gradient(to left,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)", WebkitMaskImage:"linear-gradient(to left,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%)" }} />
            <div style={{ position:"absolute", left:76, right:76, top:0, bottom:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:10, fontWeight:600, color:textColor, fontFamily:tokens.font.family, textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:"100%" }}>내게 딱 맞는 요금제 찾고 쿠폰 혜택까지!</div>
            </div>
            <div style={{ position:"absolute", left:76, top:0, bottom:0, width:1, background:"rgba(225,9,117,0.5)" }} />
            <div style={{ position:"absolute", right:76, top:0, bottom:0, width:1, background:"rgba(225,9,117,0.5)" }} />
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={()=>onApplyImage(previewUrl)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:`1.5px solid ${tokens.color.brand}`, background:"transparent", color:tokens.color.brand, fontSize:11, fontWeight:700, fontFamily:tokens.font.family, cursor:"pointer" }}>배너에 적용</button>
            <button onClick={generate} style={{ flex:1, padding:"7px 0", borderRadius:8, border:"1.5px solid #2A2C52", background:"transparent", color:"rgba(255,255,255,0.5)", fontSize:11, fontWeight:600, fontFamily:tokens.font.family, cursor:"pointer" }}>다시 생성</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ── U+one Illust Library (Figma: bfloWxjt1VRNgiDQ59U80R, node 1:76) ────
// Figma Export API: GET /v1/images/{fileKey}?ids={nodeId}&format=png&scale=2
const fUrl = (nodeId) =>
  `https://www.figma.com/file/${FIGMA_FILE}?node-id=${nodeId.replace(":","-")}&type=design`;
// 실제 배포 시: GET https://api.figma.com/v1/images/{fileKey}?ids={nodeId}&format=png&scale=2
// 반환된 images[nodeId] URL을 CDN에 캐싱해서 사용
const ILLUST_LIBRARY = [
  {
    category: "Communication",
    label: "커뮤니케이션",
    items: [
      { id: "4:3356", name: "headphone",      label: "헤드폰",     nodeId: "4:3356" },
      { id: "4:3368", name: "headphoneHeart", label: "헤드폰하트", nodeId: "4:3368" },
      { id: "4:3379", name: "incomingCall",   label: "수신전화",   nodeId: "4:3379" },
      { id: "4:3384", name: "outgoingCall",   label: "발신전화",   nodeId: "4:3384" },
      { id: "4:3392", name: "phoneDual",      label: "듀얼폰",     nodeId: "4:3392" },
    ],
  },
  {
    category: "Device",
    label: "디바이스",
    items: [
      { id: "4:3956", name: "mobile",              label: "스마트폰",    nodeId: "4:3956" },
      { id: "4:3964", name: "mobileShield",        label: "폰보안",      nodeId: "4:3964" },
      { id: "4:3974", name: "mobileRepeat",        label: "폰교체",      nodeId: "4:3974" },
      { id: "4:3986", name: "mobileAdd",           label: "폰추가",      nodeId: "4:3986" },
      { id: "4:3996", name: "mobileRestriction",   label: "폰제한",      nodeId: "4:3996" },
      { id: "4:4006", name: "mobileMessage",       label: "폰메시지",    nodeId: "4:4006" },
      { id: "4:4019", name: "mobileCoupon",        label: "폰쿠폰",      nodeId: "4:4019" },
      { id: "4:4037", name: "mobileShopping",      label: "폰쇼핑",      nodeId: "4:4037" },
      { id: "4:4048", name: "mobileCommunication", label: "폰통신",      nodeId: "4:4048" },
      { id: "4:4071", name: "devices",             label: "멀티디바이스", nodeId: "4:4071" },
      { id: "4:4085", name: "iphone16pro",         label: "아이폰16",    nodeId: "4:4085" },
      { id: "4:4090", name: "galaxyS25",           label: "갤럭시S25",   nodeId: "4:4090" },
      { id: "4:4095", name: "galaxyZflip",         label: "Z플립",       nodeId: "4:4095" },
      { id: "4:4099", name: "galaxyZfold",         label: "Z폴드",       nodeId: "4:4099" },
    ],
  },
  {
    category: "Data",
    label: "데이터",
    items: [
      { id: "4:3407", name: "data",          label: "데이터",      nodeId: "4:3407" },
      { id: "4:3417", name: "dataShare",     label: "데이터공유",  nodeId: "4:3417" },
      { id: "4:3427", name: "dataUnlimited", label: "데이터무제한", nodeId: "4:3427" },
      { id: "4:3330", name: "arrowDecrease", label: "감소화살",    nodeId: "4:3330" },
      { id: "4:3340", name: "arrowIncrease", label: "증가화살",    nodeId: "4:3340" },
    ],
  },
  {
    category: "Document",
    label: "문서",
    items: [
      { id: "4:3911", name: "mobilePlan",       label: "요금제",    nodeId: "4:3911" },
      { id: "4:3921", name: "mobilePlanRepeat", label: "요금제변경", nodeId: "4:3921" },
      { id: "4:3936", name: "document",         label: "문서",      nodeId: "4:3936" },
      { id: "4:3945", name: "pass",             label: "패스",      nodeId: "4:3945" },
    ],
  },
  {
    category: "Security",
    label: "보안",
    items: [
      { id: "4:3445", name: "kidShield",   label: "키즈보안", nodeId: "4:3445" },
      { id: "4:3453", name: "simShield",   label: "SIM보안",  nodeId: "4:3453" },
      { id: "4:3461", name: "crossShield", label: "크로스보안", nodeId: "4:3461" },
    ],
  },
  {
    category: "Object",
    label: "오브젝트",
    items: [
      { id: "4:1987", name: "gift",        label: "선물",   nodeId: "4:1987" },
      { id: "4:2009", name: "confetti",    label: "축하",   nodeId: "4:2009" },
      { id: "4:2027", name: "puzzle",      label: "퍼즐",   nodeId: "4:2027" },
      { id: "4:2033", name: "ai",          label: "AI",     nodeId: "4:2033" },
      { id: "4:2042", name: "alert",       label: "알림",   nodeId: "4:2042" },
      { id: "4:2052", name: "tool",        label: "도구",   nodeId: "4:2052" },
      { id: "4:2067", name: "tag",         label: "태그",   nodeId: "4:2067" },
      { id: "4:2084", name: "airplane",    label: "비행기", nodeId: "4:2084" },
      { id: "4:2107", name: "balloon",     label: "풍선",   nodeId: "4:2107" },
      { id: "4:2124", name: "home",        label: "집",     nodeId: "4:2124" },
      { id: "4:2142", name: "storeUplus",  label: "U+매장", nodeId: "4:2142" },
      { id: "4:2162", name: "diamondVip",  label: "VIP다이아", nodeId: "4:2162" },
      { id: "4:2175", name: "planeCancel", label: "비행취소", nodeId: "4:2175" },
      { id: "4:2200", name: "bulb",        label: "전구",   nodeId: "4:2200" },
      { id: "4:2228", name: "homeWifi",    label: "홈와이파이", nodeId: "4:2228" },
      { id: "4:2248", name: "coffee",      label: "커피",   nodeId: "4:2248" },
      { id: "4:2262", name: "dilvery",     label: "배달",   nodeId: "4:2262" },
      { id: "4:2289", name: "books",       label: "책",     nodeId: "4:2289" },
      { id: "4:2309", name: "movie",       label: "영화",   nodeId: "4:2309" },
      { id: "4:2325", name: "exhibition",  label: "전시",   nodeId: "4:2325" },
      { id: "4:2350", name: "themePark",   label: "테마파크", nodeId: "4:2350" },
      { id: "4:2378", name: "waterPark",   label: "워터파크", nodeId: "4:2378" },
      { id: "4:2393", name: "aquarium",    label: "아쿠아리움", nodeId: "4:2393" },
      { id: "4:2409", name: "tower",       label: "타워",   nodeId: "4:2409" },
      { id: "4:2426", name: "carrier",     label: "캐리어", nodeId: "4:2426" },
      { id: "4:2439", name: "car",         label: "자동차", nodeId: "4:2439" },
      { id: "4:2474", name: "shop",        label: "쇼핑",   nodeId: "4:2474" },
      { id: "4:2489", name: "rice",        label: "밥",     nodeId: "4:2489" },
      { id: "4:2520", name: "restaurant",  label: "레스토랑", nodeId: "4:2520" },
      { id: "4:2542", name: "chicken",     label: "치킨",   nodeId: "4:2542" },
      { id: "4:2564", name: "pizza",       label: "피자",   nodeId: "4:2564" },
      { id: "4:2584", name: "dounut",      label: "도넛",   nodeId: "4:2584" },
      { id: "4:2632", name: "bakery",      label: "베이커리", nodeId: "4:2632" },
      { id: "4:2650", name: "wine",        label: "와인",   nodeId: "4:2650" },
      { id: "4:2662", name: "lunchBox",    label: "도시락", nodeId: "4:2662" },
      { id: "4:2678", name: "shopAnimal",  label: "반려동물샵", nodeId: "4:2678" },
      { id: "4:2692", name: "shopKid",     label: "키즈샵", nodeId: "4:2692" },
      { id: "4:2714", name: "convenienceStore", label: "편의점", nodeId: "4:2714" },
      { id: "4:2736", name: "shopHealth",  label: "헬스샵", nodeId: "4:2736" },
      { id: "4:2751", name: "dutyFree",    label: "면세점", nodeId: "4:2751" },
      { id: "4:2770", name: "kidsHat",     label: "키즈모자", nodeId: "4:2770" },
      { id: "4:2783", name: "powderedMilk",label: "분유",   nodeId: "4:2783" },
      { id: "4:2801", name: "cradle",      label: "요람",   nodeId: "4:2801" },
      { id: "4:2820", name: "medicine",    label: "약",     nodeId: "4:2820" },
      { id: "4:2838", name: "beauty",      label: "뷰티",   nodeId: "4:2838" },
      { id: "4:2863", name: "board",       label: "보드",   nodeId: "4:2863" },
      { id: "4:2874", name: "academy",     label: "학원",   nodeId: "4:2874" },
      { id: "4:2883", name: "studyCafe",   label: "스터디카페", nodeId: "4:2883" },
      { id: "4:2903", name: "nature",      label: "자연",   nodeId: "4:2903" },
      { id: "4:2936", name: "tradition",   label: "전통",   nodeId: "4:2936" },
      { id: "4:2971", name: "cruise",      label: "크루즈", nodeId: "4:2971" },
      { id: "4:2990", name: "resort",      label: "리조트", nodeId: "4:2990" },
      { id: "4:3019", name: "spaland",     label: "스파",   nodeId: "4:3019" },
      { id: "4:3037", name: "iceRink",     label: "아이스링크", nodeId: "4:3037" },
      { id: "4:3052", name: "sport",       label: "스포츠", nodeId: "4:3052" },
      { id: "4:3080", name: "carSharing",  label: "카셰어링", nodeId: "4:3080" },
      { id: "4:3099", name: "repair",      label: "수리",   nodeId: "4:3099" },
      { id: "4:3130", name: "truck",       label: "트럭",   nodeId: "4:3130" },
      { id: "4:3168", name: "brush",       label: "청소",   nodeId: "4:3168" },
      { id: "4:3196", name: "box",         label: "박스",   nodeId: "4:3196" },
      { id: "4:3214", name: "weddingRing", label: "웨딩링", nodeId: "4:3214" },
      { id: "4:3230", name: "shopUplus",   label: "U+쇼핑백", nodeId: "4:3230" },
      { id: "4:3239", name: "icecream",    label: "아이스크림", nodeId: "4:3239" },
      { id: "4:3259", name: "medal",       label: "메달",   nodeId: "4:3259" },
      { id: "4:3272", name: "interest",    label: "관심",   nodeId: "4:3272" },
      { id: "4:3299", name: "map",         label: "지도",   nodeId: "4:3299" },
      { id: "4:3312", name: "diamond",     label: "다이아몬드", nodeId: "4:3312" },
    ],
  },
];

// Figma Export API URL 생성 (실제 배포 시 백엔드 프록시 경유)
// GET https://api.figma.com/v1/images/{fileKey}?ids={nodeId}&format=png&scale=2
const getIllustUrl = (nodeId) =>
  `https://api.figma.com/v1/images/${FIGMA_FILE}?ids=${encodeURIComponent(nodeId)}&format=png&scale=2`;

// ── PersonalIllustPanel ──────────────────────────────────────────────────
function PersonalIllustPanel({ selectedId, onSelect }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const allItems = ILLUST_LIBRARY.flatMap(c => c.items.map(i => ({ ...i, category: c.category, categoryLabel: c.label })));
  const filtered = allItems.filter(i => {
    const matchCat = activeCategory === "all" || i.category === activeCategory;
    const matchSearch = !search || i.label.includes(search) || i.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: "#F7F4FF", border: "1px solid #DDD5F5", borderRadius: 12, padding: 16, marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 16 }}>🎨</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: tokens.color.primary, fontFamily: tokens.font.family }}>U+one 일러스트 라이브러리</div>
          <div style={{ fontSize: 10, color: tokens.color.quaternary, fontFamily: tokens.font.family }}>Figma: U-one Illust Library · {allItems.length}개</div>
        </div>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="일러스트 검색..."
        style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: "1px solid #DDD5F5", fontSize: 12, fontFamily: tokens.font.family, boxSizing: "border-box", outline: "none", marginBottom: 10, background: "white" }} />

      {/* 카테고리 탭 */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {[{ id: "all", label: "전체" }, ...ILLUST_LIBRARY.map(c => ({ id: c.category, label: c.label }))].map(tab => (
          <div key={tab.id} onClick={() => setActiveCategory(tab.id)}
            style={{ padding: "3px 10px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontWeight: activeCategory === tab.id ? 700 : 400, fontFamily: tokens.font.family, background: activeCategory === tab.id ? "#7C3AED" : "white", color: activeCategory === tab.id ? "white" : tokens.color.secondary, border: `1px solid ${activeCategory === tab.id ? "#7C3AED" : "#DDD5F5"}` }}>
            {tab.label}
          </div>
        ))}
      </div>

      {/* 일러스트 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, maxHeight: 280, overflowY: "auto" }}>
        {filtered.map(item => (
          <div key={item.id} onClick={() => onSelect(item.id === selectedId ? null : item.id)}
            style={{ cursor: "pointer", borderRadius: 8, padding: "6px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: `1.5px solid ${selectedId === item.id ? "#7C3AED" : "transparent"}`, background: selectedId === item.id ? "#EDE9FE" : "white", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            {/* Figma Export API 이미지 — 실제 배포 시 백엔드 프록시 경유 */}
            <img
              src={`https://www.figma.com/component-thumbnail?node-id=${item.nodeId}&file-key=${FIGMA_FILE}`}
              alt={item.label}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
            {/* 폴백 이모지 플레이스홀더 */}
            <div style={{ width: 36, height: 36, display: "none", alignItems: "center", justifyContent: "center", fontSize: 22, background: "#F3F0FF", borderRadius: 6 }}>
              {({ gift:"🎁", coffee:"☕", mobile:"📱", airplane:"✈️", home:"🏠", car:"🚗", pizza:"🍕", movie:"🎬", data:"📊", document:"📄", headphone:"🎧" }[item.name]) || "✦"}
            </div>
            <div style={{ fontSize: 9, color: tokens.color.secondary, fontFamily: tokens.font.family, textAlign: "center", lineHeight: 1.2, wordBreak: "keep-all" }}>{item.label}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "20px 0", color: tokens.color.quaternary, fontSize: 12, fontFamily: tokens.font.family }}>검색 결과가 없습니다</div>
        )}
      </div>

      {selectedId && (
        <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: "#EDE9FE", border: "1px solid #C4B5FD", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", fontFamily: tokens.font.family }}>
            ✓ {allItems.find(i => i.id === selectedId)?.label} 선택됨
          </div>
          <button onClick={() => onSelect(null)} style={{ fontSize: 10, border: "none", background: "transparent", color: "#7C3AED", cursor: "pointer", fontFamily: tokens.font.family }}>해제</button>
        </div>
      )}
    </div>
  );
}


// ── Image Upload Panel ────────────────────────────────────────────────────
function ImageUploadPanel({ onApply, currentUrl, imageSize, dark = false }) {
  const [preview, setPreview] = useState(currentUrl || null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const bg      = dark ? "#12132A"              : "#FAF7FF";
  const border  = dark ? "1px solid #2A2C52"    : "1px solid #E8E0F0";
  const textPri = dark ? "white"                : tokens.color.primary;
  const textSec = dark ? "rgba(255,255,255,0.5)": tokens.color.quaternary;
  const dropBdr = dragOver
    ? `2px dashed ${tokens.color.brand}`
    : dark ? "2px dashed #3A3C5A" : "2px dashed #D4C0F0";

  const process = (file) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("이미지 파일만 업로드 가능합니다"); return; }
    if (file.size > 10 * 1024 * 1024) { setError("파일 크기는 10MB 이하여야 합니다"); return; }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ background: bg, border, borderRadius: 12, padding: 14, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>📁</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: textPri, fontFamily: tokens.font.family }}>이미지 직접 업로드</span>
        </div>
        {imageSize && (
          <span style={{ fontSize: 10, color: textSec, fontFamily: tokens.font.family }}>
            권장 {imageSize.w}×{imageSize.h}px
          </span>
        )}
      </div>

      {/* 드롭존 */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); process(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
        style={{ border: dropBdr, borderRadius: 8, background: dark ? "#0D0E24" : "white", padding: "14px 10px", textAlign: "center", cursor: "pointer", transition: "border 0.15s" }}
      >
        <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => { process(e.target.files[0]); e.target.value = ""; }} />
        {preview ? (
          <>
            <img src={preview} alt="" style={{ maxWidth: "100%", maxHeight: 100, objectFit: "contain", borderRadius: 6, display: "block", margin: "0 auto 6px" }} />
            <div style={{ fontSize: 10, color: textSec, fontFamily: tokens.font.family }}>클릭해서 교체</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🖼</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: textSec, fontFamily: tokens.font.family, marginBottom: 3 }}>
              {dragOver ? "여기에 놓으세요" : "클릭 또는 드래그"}
            </div>
            <div style={{ fontSize: 10, color: textSec, fontFamily: tokens.font.family, opacity: 0.7 }}>JPG · PNG · WebP · 최대 10MB</div>
          </>
        )}
      </div>

      {error && <div style={{ fontSize: 10, color: "#C62828", marginTop: 6, fontFamily: tokens.font.family }}>⚠ {error}</div>}

      {/* 버튼 */}
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <button onClick={() => preview && onApply(preview)} disabled={!preview}
          style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: `1.5px solid ${tokens.color.brand}`, background: "transparent", color: preview ? tokens.color.brand : "#BDBDBD", fontSize: 11, fontWeight: 700, cursor: preview ? "pointer" : "not-allowed", fontFamily: tokens.font.family }}>
          배너에 적용
        </button>
        {preview && (
          <button onClick={() => { setPreview(null); onApply(null); }}
            style={{ padding: "7px 12px", borderRadius: 7, border: "1.5px solid #FFCDD2", background: "#FFF5F5", color: "#C62828", fontSize: 11, cursor: "pointer", fontFamily: tokens.font.family }}>
            제거
          </button>
        )}
      </div>
    </div>
  );
}


// ── Toss-style Illustration Style Preset ────────────────────────────────
// 토스 일러스트 스타일: 면 중심 플랫 벡터 + 소프트 멀티레이어 그림자 + 핑크 포인트
// 동일 톤&매너로 주제만 바꾸어 일관된 시리즈 생성
const TOSS_ILLUST_STYLE = `
ILLUSTRATION STYLE — Toss-style Korean fintech flat illustration (strictly follow):

CORE STYLE:
- Flat vector illustration with soft multi-layer depth (semi-flat, NOT fully 2D)
- Solid color fills with subtle gradient on key objects (10-15% light variance, top-left highlight)
- Thin (1-2px) rounded stroke outlines in slightly darker version of fill color
- Objects have soft drop shadow (ellipse, 20% opacity, offset bottom 4px, blur 8px)
- Highlight spot: small white ellipse (30% opacity) on upper-left of main object
- Rounded shapes everywhere — no sharp angles (border-radius feeling)

COLOR SYSTEM:
- Primary accent: #FF5DAE (Uplus pink) — use on focal element or badge
- Supporting: white, #F5F5F5 light gray, #1A1A1A dark for shadow/outline
- Avoid: gradients heavier than 15%, drop shadows darker than 25% opacity
- Palette: max 5 colors per illustration, harmonious pastel-to-mid tone

COMPOSITION:
- Canvas: 124×130px, objects bottom-anchored with 4px bottom clearance
- Single focal object (70-80% canvas) + 1-2 small accent elements
- White background or transparent — NO scene/environment backgrounds
- Scale: object fills ~80% of height, centered horizontally
- If including a badge/tag: pink rounded rect (#FF5DAE) with white bold text, slight overlap

OUTPUT:
- PNG with transparent background, 2× resolution
- Style reference: Toss app icons, Kakao Pay illustration, LG Uplus promotional graphics
`;

// ── Bottom Sheet Illust Panel ─────────────────────────────────────────────
function BottomSheetIllustPanel({ onApplyIllust, currentUrl }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(currentUrl || null);
  const [dallePrompt, setDallePrompt] = useState("");

  const TOPIC_PRESETS = [
    { label: "요금제 혜택", value: "mobile plan discount badge, pink tag" },
    { label: "데이터 충전", value: "data charging, signal bars, speed" },
    { label: "쿠폰·혜택", value: "coupon, gift, discount tag" },
    { label: "스타벅스", value: "starbucks coffee cup, green" },
    { label: "여행", value: "airplane, travel luggage, passport" },
    { label: "쇼핑", value: "shopping bag, cart, purchase" },
    { label: "포인트·리워드", value: "coin, medal, reward point" },
    { label: "보안·보호", value: "shield, lock, protection" },
  ];

  const generate = async () => {
    if (!topic.trim()) { setError("일러스트 주제를 입력해 주세요."); return; }
    setError(""); setLoading(true); setPreviewUrl(null); setDallePrompt("");

    try {
      // Step 1: Claude로 토스 스타일 DALL-E 프롬프트 생성
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system: `You are an expert DALL-E 3 prompt engineer specializing in Korean fintech app illustration.
${TOSS_ILLUST_STYLE}
Generate a precise DALL-E 3 prompt for the given subject.
IMPORTANT: The illustration must fit in a 124×130px right-side image area of a banner.
Return ONLY the English prompt string. No explanation, no JSON, no quotes, no markdown.`,
          messages: [{ role: "user", content: `Subject: ${topic}\nCreate a Toss-style flat illustration prompt.` }],
        }),
      });
      const data = await res.json();
      const prompt = data.content?.find(c => c.type === "text")?.text?.trim() || "";
      setDallePrompt(prompt);

      // Step 2: 실제 배포 시 → POST /api/generate-illust { prompt } → { url }
      // 현재는 Unsplash placeholder로 시뮬레이션
      const seed = encodeURIComponent(topic.split(" ")[0]);
      setPreviewUrl(`https://source.unsplash.com/248x260/?${seed},icon,minimal,white&sig=${Date.now()}`);

    } catch(e) { setError("생성 중 오류가 발생했습니다."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ background: "#FFF8FB", border: "1px solid #F5D0E4", borderRadius: 12, padding: 18, marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 18 }}>✨</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: tokens.color.primary, fontFamily: tokens.font.family }}>AI 일러스트 생성</div>
          <div style={{ fontSize: 10, color: tokens.color.quaternary, fontFamily: tokens.font.family }}>토스 스타일 · 면 중심 플랫 · 일관된 톤</div>
        </div>
      </div>

      {/* 프리셋 빠른 선택 */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: tokens.color.secondary, marginBottom: 7, fontFamily: tokens.font.family }}>빠른 주제 선택</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {TOPIC_PRESETS.map(p => (
            <div key={p.label} onClick={() => setTopic(p.value)}
              style={{ padding: "4px 10px", borderRadius: 20, border: `1px solid ${topic === p.value ? tokens.color.brand : "#F0C0D8"}`, background: topic === p.value ? tokens.color.brandLight : "white", cursor: "pointer", fontSize: 11, fontWeight: topic === p.value ? 700 : 400, color: topic === p.value ? tokens.color.brand : tokens.color.secondary, fontFamily: tokens.font.family }}>
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* 직접 입력 */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: tokens.color.secondary, marginBottom: 5, fontFamily: tokens.font.family }}>직접 입력</div>
        <div style={{ display: "flex", gap: 6 }}>
          <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
            placeholder="예: 스마트폰 요금제, 커피 쿠폰, 데이터..."
            style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "1px solid #F0C0D8", fontSize: 12, fontFamily: tokens.font.family, outline: "none", background: "white" }} />
          <button onClick={generate} disabled={loading}
            style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: loading ? "#F0A0C0" : tokens.color.brand, color: "white", fontSize: 12, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: tokens.font.family, whiteSpace: "nowrap" }}>
            {loading ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>

      {error && <div style={{ fontSize: 11, color: "#C62828", marginBottom: 8, fontFamily: tokens.font.family }}>{error}</div>}

      {/* 생성된 프롬프트 */}
      {dallePrompt && (
        <div style={{ marginBottom: 12, padding: "8px 10px", borderRadius: 8, background: "white", border: "1px solid #F0D0E0" }}>
          <div style={{ fontSize: 9, color: tokens.color.quaternary, marginBottom: 3, fontFamily: tokens.font.family }}>DALL-E 3 프롬프트 (토스 스타일 적용)</div>
          <div style={{ fontSize: 10, color: tokens.color.secondary, fontFamily: "monospace", lineHeight: 1.5, wordBreak: "break-all" }}>{dallePrompt}</div>
        </div>
      )}

      {/* 미리보기 */}
      {previewUrl && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: tokens.color.secondary, marginBottom: 6, fontFamily: tokens.font.family }}>미리보기</div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 10 }}>
            {/* 실제 배너 내 위치 시뮬레이션 */}
            <div style={{ background: "#F7F7F7", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "flex-end", gap: 8, border: "1px solid #E0E0E0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A", fontFamily: tokens.font.family, lineHeight: 1.3 }}>배너<br/>미리보기</div>
              <div style={{ width: 62, height: 65, overflow: "hidden", flexShrink: 0 }}>
                <img src={previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom" }} />
              </div>
            </div>
            {/* 원본 크기 */}
            <div style={{ fontSize: 10, color: tokens.color.quaternary, fontFamily: tokens.font.family }}>124×130px<br/>영역 기준</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => onApplyIllust(previewUrl)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1.5px solid ${tokens.color.brand}`, background: "transparent", color: tokens.color.brand, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: tokens.font.family }}>
              배너에 적용
            </button>
            <button onClick={generate}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "transparent", color: tokens.color.secondary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: tokens.font.family }}>
              다시 생성
            </button>
          </div>
        </div>
      )}

      {/* 스타일 가이드 요약 */}
      <div style={{ marginTop: 12, padding: "8px 10px", borderRadius: 8, background: "white", border: "1px solid #F0D0E0" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: tokens.color.secondary, marginBottom: 4, fontFamily: tokens.font.family }}>적용 스타일 가이드</div>
        {[
          "면 중심 플랫 벡터 + 소프트 레이어 그림자",
          "포인트 컬러 #FF5DAE, 최대 5색 이내",
          "배경 없음, 오브젝트 하단 고정",
          "둥근 형태 중심, 과도한 그라디언트 없음",
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: tokens.color.brand, flexShrink: 0 }} />
            <div style={{ fontSize: 10, color: tokens.color.quaternary, fontFamily: tokens.font.family }}>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sticky BG Panel 끝 ──

// ── AI Generation Panel ──────────────────────────────────────────────────
function AIPanel({ template, onApply, onApplyImage }) {
  const [tab, setTab] = useState("copy"); // "copy" | "image"
  // ── 카피 생성 상태 ──
  const [goal, setGoal] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copyError, setCopyError] = useState("");
  // ── 이미지 생성 상태 ──
  const [imgTopic, setImgTopic] = useState("");
  const [imgStyle, setImgStyle] = useState("figma");
  const [imgLoading, setImgLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgPrompt, setImgPrompt] = useState("");
  const [imgError, setImgError] = useState("");

  const tmpl = TEMPLATES[template];
  const hasImage = !!tmpl?.hasImage;

  // ── 카피 생성 ──────────────────────────────────────────────────────────
  const generateCopy = async () => {
    if (!goal.trim()) { setCopyError("프로모션 목표를 입력해 주세요."); return; }
    setCopyError(""); setLoading(true); setResult(null);
    const slotDesc = tmpl.slots.filter(s => s.type === "text").map(s => `- ${s.label}(${s.id}): 최대 ${s.maxLen}자`).join("\n");
    const personalRules = tmpl.id === "card-personal" ? `\n[개인화 배너 일러스트 규정]\n1. 추상적이거나 모호한 메타포는 절대 사용하지 않습니다.\n2. 면 중심(flat/solid) 일러스트 스타일만 사용합니다.\n3. 오브제 영역은 텍스트 영역을 침범하지 않아야 합니다.` : "";
    const systemPrompt = `당신은 U+ (LG U플러스) 브랜드의 배너 카피라이터입니다.\n브랜드 톤: 친근하고 신뢰감 있으며, 혜택을 명확히 전달합니다.${personalRules}\n슬롯 규격에 맞게 한국어 카피를 생성하고, 반드시 JSON으로만 응답하세요.`;
    const userPrompt = `[템플릿: ${tmpl.label}]\n슬롯 규격:\n${slotDesc}\n\n[프로모션 정보]\n목표: ${goal}\n키워드: ${keywords || "없음"}\n\n각 슬롯 id를 키로 하는 JSON 객체로 카피를 작성해 주세요.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages: [{ role: "user", content: userPrompt }] }),
      });
      const data = await res.json();
      const text = data.content?.find(c => c.type === "text")?.text || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      let suggestedBg = null;
      if (tmpl.category === "card") suggestedBg = matchPaletteByKeywords(keywords, goal);
      setResult({ ...parsed, _suggestedBg: suggestedBg });
    } catch { setCopyError("생성 중 오류가 발생했습니다."); }
    finally { setLoading(false); }
  };

  // ── 이미지 생성 ──────────────────────────────────────────────────────────
  const IMG_STYLES = [
    { id: "figma",   label: "Figma 원본", badge: "추천" },
    { id: "minimal", label: "미니멀" },
    { id: "illust",  label: "일러스트" },
    { id: "cute",    label: "큐트" },
  ];
  const generateImage = async () => {
    if (!imgTopic.trim()) { setImgError("이미지 주제를 입력해 주세요."); return; }
    setImgError(""); setImgLoading(true); setImgPreview(null); setImgPrompt("");
    const styleGuide = imgStyle === "figma"
      ? "Soft 3D flat illustration, layered bitmap blending, pink #FF5DAE accent, semi-transparent overlaps, gold sparkle stars, Korean fintech app promotional style"
      : { minimal: "minimalist flat icon, 2-3 colors", illust: "flat vector illustration", cute: "cute kawaii icon, rounded shapes" }[imgStyle];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 300,
          system: `You are a DALL-E 3 prompt engineer for Korean mobile app banner illustrations.\nStyle: ${styleGuide}\nReturn ONLY the English prompt string.`,
          messages: [{ role: "user", content: `Subject: ${imgTopic}` }],
        }),
      });
      const data = await res.json();
      const dp = data.content?.find(c => c.type === "text")?.text?.trim() || "";
      setImgPrompt(dp);
      const seed = encodeURIComponent(imgTopic.split(" ")[0]);
      setImgPreview(`https://source.unsplash.com/280x200/?${seed},minimal,white&sig=${Date.now()}`);
    } catch { setImgError("생성 중 오류가 발생했습니다."); }
    finally { setImgLoading(false); }
  };

  return (
    <div style={{ background: "#FFF8FB", border: "1px solid #F5D0E4", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
      {/* ── 헤더 ── */}
      <div style={{ padding: "14px 16px 0", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 16 }}>✨</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: tokens.color.primary, fontFamily: tokens.font.family }}>AI 에디터</span>
      </div>

      {/* ── 탭 ── */}
      <div style={{ display: "flex", borderBottom: "1px solid #F5D0E4", paddingLeft: 16 }}>
        {[
          { id: "copy",  label: "카피 생성" },
          ...(hasImage ? [{ id: "image", label: "이미지 생성" }] : []),
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: "8px 14px", border: "none", background: "transparent", borderBottom: tab === t.id ? `2px solid ${tokens.color.brand}` : "2px solid transparent", fontSize: 12, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? tokens.color.brand : tokens.color.secondary, cursor: "pointer", fontFamily: tokens.font.family, marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {/* ── 카피 생성 탭 ── */}
        {tab === "copy" && (
          <>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, display: "block", marginBottom: 5, fontFamily: tokens.font.family }}>프로모션 목표 *</label>
              <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="예: 요금제 변경 유도, 데이터 충전 혜택 강조"
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #E8C0D4", fontSize: 13, fontFamily: tokens.font.family, boxSizing: "border-box", outline: "none", background: "white" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, display: "block", marginBottom: 5, fontFamily: tokens.font.family }}>키워드 (선택)</label>
              <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="예: 스타벅스, 쿠폰, 데이터, 무제한"
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #E8C0D4", fontSize: 13, fontFamily: tokens.font.family, boxSizing: "border-box", outline: "none", background: "white" }} />
            </div>
            {copyError && <div style={{ fontSize: 11, color: "#C62828", marginBottom: 8, fontFamily: tokens.font.family }}>{copyError}</div>}
            <button onClick={generateCopy} disabled={loading}
              style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "none", background: loading ? "#F0A0C0" : tokens.color.brand, color: "white", fontSize: 13, fontWeight: 700, fontFamily: tokens.font.family, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "생성 중..." : "✨ 카피 생성하기"}
            </button>
            {result && (
              <div style={{ marginTop: 12, background: "white", borderRadius: 8, padding: 12, border: "1px solid #F0D0E0" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: tokens.color.secondary, marginBottom: 8, fontFamily: tokens.font.family }}>생성된 카피</div>
                {tmpl.slots.filter(s => s.type === "text").map(slot => (
                  <div key={slot.id} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 10, color: tokens.color.quaternary, fontFamily: tokens.font.family }}>{slot.label}</div>
                    <div style={{ fontSize: 13, color: tokens.color.primary, fontFamily: tokens.font.family, padding: "3px 0" }}>{result[slot.id] || "-"}</div>
                  </div>
                ))}
                {result._suggestedBg && (
                  <div style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, background: result._suggestedBg.hex, border: "1px solid rgba(0,0,0,0.07)" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#333", fontFamily: tokens.font.family }}>🎨 AI 추천 배경: {result._suggestedBg.name} {result._suggestedBg.hex}</div>
                  </div>
                )}
                <button onClick={() => onApply(result)}
                  style={{ marginTop: 8, width: "100%", padding: "8px 0", borderRadius: 8, border: `1.5px solid ${tokens.color.brand}`, background: "transparent", color: tokens.color.brand, fontSize: 13, fontWeight: 700, fontFamily: tokens.font.family, cursor: "pointer" }}>
                  에디터에 적용 {result._suggestedBg ? "(배경 포함)" : ""}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── 이미지 생성 탭 ── */}
        {tab === "image" && (
          <>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, display: "block", marginBottom: 5, fontFamily: tokens.font.family }}>이미지 주제 *</label>
              <input value={imgTopic} onChange={e => setImgTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generateImage()}
                placeholder="예: 스타벅스 커피잔, 선물박스, 스마트폰"
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #E8C0D4", fontSize: 13, fontFamily: tokens.font.family, boxSizing: "border-box", outline: "none", background: "white" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, display: "block", marginBottom: 6, fontFamily: tokens.font.family }}>스타일</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {IMG_STYLES.map(s => (
                  <div key={s.id} onClick={() => setImgStyle(s.id)}
                    style={{ padding: "7px 10px", borderRadius: 8, cursor: "pointer", position: "relative", border: imgStyle === s.id ? `1.5px solid ${s.id === "figma" ? "#FFD700" : tokens.color.brand}` : "1.5px solid #E8C0D4", background: imgStyle === s.id ? (s.id === "figma" ? "rgba(255,215,0,0.08)" : tokens.color.brandLight) : "white" }}>
                    {s.badge && <span style={{ position: "absolute", top: -6, right: 6, fontSize: 9, padding: "1px 5px", borderRadius: 8, background: "#FFD700", color: "#000", fontWeight: 700, fontFamily: tokens.font.family }}>{s.badge}</span>}
                    <div style={{ fontSize: 11, fontWeight: 600, color: imgStyle === s.id ? (s.id === "figma" ? "#B8860B" : tokens.color.brand) : tokens.color.secondary, fontFamily: tokens.font.family }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {imgError && <div style={{ fontSize: 11, color: "#C62828", marginBottom: 8, fontFamily: tokens.font.family }}>{imgError}</div>}
            <button onClick={generateImage} disabled={imgLoading}
              style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "none", background: imgLoading ? "#F0A0C0" : tokens.color.brand, color: "white", fontSize: 13, fontWeight: 700, fontFamily: tokens.font.family, cursor: imgLoading ? "not-allowed" : "pointer" }}>
              {imgLoading ? "생성 중..." : "🎨 이미지 생성하기"}
            </button>
            {imgPrompt && (
              <div style={{ marginTop: 10, padding: "7px 10px", borderRadius: 8, background: "white", border: "1px solid #F0D0E0" }}>
                <div style={{ fontSize: 9, color: tokens.color.quaternary, marginBottom: 3, fontFamily: tokens.font.family }}>DALL-E 프롬프트</div>
                <div style={{ fontSize: 10, color: tokens.color.secondary, fontFamily: "monospace", lineHeight: 1.5, wordBreak: "break-all" }}>{imgPrompt}</div>
              </div>
            )}
            {imgPreview && onApplyImage && (
              <div style={{ marginTop: 10 }}>
                <img src={imgPreview} alt="" style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 120, display: "block", marginBottom: 8 }} />
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => onApplyImage(imgPreview)}
                    style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1.5px solid ${tokens.color.brand}`, background: "transparent", color: tokens.color.brand, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: tokens.font.family }}>배너에 적용</button>
                  <button onClick={generateImage}
                    style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", color: tokens.color.secondary, fontSize: 11, cursor: "pointer", fontFamily: tokens.font.family }}>다시 생성</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Editor Panel ──────────────────────────────────────────────────────────
function EditorPanel({ template, slotValues, onChange, onBgChange, bgColor }) {
  const tmpl = TEMPLATES[template];
  const [rejection, setRejection] = useState(null);
  if (!tmpl) return null;

  const isCard = tmpl.category === "card";
  const isMain = tmpl.category === "main";
  const isBgFixed = !!tmpl.bgFixed;

  const handleBgChange = (hex) => {
    if (!isCard && !isMain) { onBgChange(hex); return; }
    if (isInPalette(hex)) { setRejection(null); onBgChange(hex); }
    else { setRejection({ tried: hex, nearest: findNearestPaletteColor(hex) }); }
  };

  const currentPaletteEntry = CARD_BG_PALETTE.find(p => p.hex.toLowerCase() === bgColor?.toLowerCase());

  // 팔레트 스와치 공통 렌더러
  const PaletteSwatches = () => (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 10 }}>
        {CARD_BG_PALETTE.map(p => (
          <div key={p.hex} onClick={() => { handleBgChange(p.hex); setRejection(null); }} style={{ cursor: "pointer" }}>
            <div style={{ height: 36, borderRadius: 8, background: p.hex, border: bgColor?.toLowerCase() === p.hex.toLowerCase() ? `2px solid ${tokens.color.brand}` : "1.5px solid rgba(0,0,0,0.1)", boxSizing: "border-box", boxShadow: bgColor?.toLowerCase() === p.hex.toLowerCase() ? `0 0 0 3px ${tokens.color.brandLight}` : "none" }} />
            <div style={{ fontSize: 10, color: tokens.color.quaternary, textAlign: "center", marginTop: 3, fontFamily: tokens.font.family, lineHeight: 1.2 }}>{p.name}</div>
          </div>
        ))}
      </div>
      {rejection && (
        <div style={{ marginBottom: 10, padding: "10px 12px", borderRadius: 8, background: "#FFF3F3", border: "1px solid #FFCDD2" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#C62828", marginBottom: 6, fontFamily: tokens.font.family }}>⛔ 승인되지 않은 색상입니다</div>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 8, fontFamily: tokens.font.family }}><span style={{ fontFamily: "monospace", fontWeight: 600 }}>{rejection.tried}</span>은 팔레트에 포함되지 않습니다.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: rejection.nearest.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: tokens.color.primary, fontFamily: tokens.font.family }}>{rejection.nearest.name}</div>
              <div style={{ fontSize: 11, color: tokens.color.quaternary, fontFamily: "monospace" }}>{rejection.nearest.hex}</div>
            </div>
          </div>
          <button onClick={() => { onBgChange(rejection.nearest.hex); setRejection(null); }}
            style={{ width: "100%", padding: "7px 0", borderRadius: 7, border: "none", background: "#C62828", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: tokens.font.family }}>
            {rejection.nearest.name} ({rejection.nearest.hex}) 으로 적용
          </button>
        </div>
      )}
      <div style={{ padding: "7px 10px", borderRadius: 8, background: "#F7F7F7", border: "1px solid #EBEBEB" }}>
        <div style={{ fontSize: 10, color: tokens.color.quaternary, fontFamily: tokens.font.family, lineHeight: 1.6 }}>
          ℹ {isCard ? "카드" : "메인"} 배너 배경은 승인된 8가지 팔레트 색상만 사용할 수 있습니다.
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: tokens.color.secondary, marginBottom: 12, fontFamily: tokens.font.family }}>텍스트 편집</div>
      {tmpl.slots.filter(s => s.type !== "illust").map(slot => {
        const val = slotValues[slot.id] ?? "";
        // 줄바꿈 허용: allowNewline 플래그 OR bottom-sheet title OR desc 슬롯
        const allowNewline = !!slot.allowNewline || (tmpl.id === "bottom-sheet" && slot.id === "title") || slot.id === "desc";
        const len = val.replace(/\n/g, "").length;
        const lineCount = (val.match(/\n/g) || []).length + 1;
        const over = len > slot.maxLen;
        return (
          <div key={slot.id} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 5 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, fontFamily: tokens.font.family }}>{slot.label}</label>
                {allowNewline && <span style={{ fontSize: 10, color: tokens.color.quaternary, marginLeft: 6, fontFamily: tokens.font.family }}>Enter = 줄바꿈</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {allowNewline && lineCount > 1 && <span style={{ fontSize: 10, color: "#7C3AED", fontFamily: tokens.font.family }}>{lineCount}줄</span>}
                <span style={{ fontSize: 11, color: over ? "#C62828" : tokens.color.quaternary, fontFamily: tokens.font.family }}>{len}/{slot.maxLen}</span>
              </div>
            </div>
            <textarea
              value={val}
              onChange={e => onChange(slot.id, e.target.value)}
              onKeyDown={e => { if (!allowNewline && e.key === "Enter") e.preventDefault(); }}
              rows={allowNewline ? 3 : (slot.maxLen > 20 ? 2 : 1)}
              placeholder={slot.placeholder}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${over ? "#EF9A9A" : "#E0E0E0"}`, fontSize: 13, fontFamily: tokens.font.family, boxSizing: "border-box", outline: "none", resize: "none", lineHeight: 1.5, color: tokens.color.primary }}
            />
            {allowNewline && (
              <div style={{ marginTop: 4, display: "flex", gap: 6 }}>
                <button onClick={() => onChange(slot.id, val + "\n")}
                  style={{ padding: "3px 10px", borderRadius: 6, border: "1px solid #E0E0E0", background: "white", fontSize: 11, cursor: "pointer", fontFamily: tokens.font.family, color: tokens.color.secondary }}>
                  ↵ 줄바꿈 삽입
                </button>
                {lineCount > 1 && (
                  <button onClick={() => onChange(slot.id, val.replace(/\n$/, ""))}
                    style={{ padding: "3px 10px", borderRadius: 6, border: "1px solid #EF9A9A", background: "#FFF5F5", fontSize: 11, cursor: "pointer", fontFamily: tokens.font.family, color: "#C62828" }}>
                    마지막 줄바꿈 삭제
                  </button>
                )}
              </div>
            )}
            {over && <div style={{ fontSize: 11, color: "#C62828", marginTop: 3, fontFamily: tokens.font.family }}>최대 {slot.maxLen}자를 초과했습니다</div>}
          </div>
        );
      })}

      {/* ── 배경 컬러 섹션 ── */}
      {isBgFixed ? (
        <div style={{ marginTop: 4, padding: "10px 12px", borderRadius: 8, background: "#1C1D3C", border: "1px solid #333" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: tokens.font.family, marginBottom: 4 }}>배경 컬러</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "#1C1D3C", border: "1px solid rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>#1C1D3C</span>
            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", fontFamily: tokens.font.family }}>Figma 원본 고정</span>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: tokens.color.secondary, fontFamily: tokens.font.family }}>배경 컬러</div>
            {(isCard || isMain) && (
              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: "#FDF6DD", color: "#9B7A00", fontWeight: 600, fontFamily: tokens.font.family }}>승인 팔레트 전용</span>
            )}
            {/* 현재 색상 미리보기 */}
            {bgColor && (
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: bgColor, border: "1px solid rgba(0,0,0,0.12)" }} />
                <span style={{ fontSize: 10, fontFamily: "monospace", color: tokens.color.quaternary }}>{bgColor}</span>
              </div>
            )}
          </div>
          {(isCard || isMain) ? <PaletteSwatches /> : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["#FFFFFF", "#F7F7F7", "#FFF8FB", "#E8F4FF", "#E8F5E9", "#FFF8E1"].map(c => (
                <div key={c} onClick={() => onBgChange(c)} style={{ width: 28, height: 28, borderRadius: 6, background: c, border: bgColor === c ? `2px solid ${tokens.color.brand}` : "1.5px solid #E0E0E0", cursor: "pointer", boxSizing: "border-box" }} />
              ))}
              <input type="color" value={bgColor || "#ffffff"} onChange={e => onBgChange(e.target.value)} style={{ width: 28, height: 28, padding: 0, border: "1.5px solid #E0E0E0", borderRadius: 6, cursor: "pointer" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Banner List Item ─────────────────────────────────────────────────────
function BannerCard({ banner, onSelect, onDelete, onStatusChange, isSelected }) {
  const tmpl = TEMPLATES[banner.templateId];
  const st = STATUS_COLORS[banner.status];

  return (
    <div
      onClick={() => onSelect(banner.id)}
      style={{
        background: "white",
        border: `1.5px solid ${isSelected ? "#3182F6" : "#E5E8EC"}`,
        borderRadius: 10,
        padding: "12px 14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "box-shadow 0.15s",
        boxShadow: isSelected ? "0 0 0 3px #EEF5FF" : "none",
      }}
    >
      {/* Mini preview */}
      <div style={{ flexShrink: 0 }}>
        <BannerPreview template={banner.templateId} slotValues={banner.slotValues} scale={0.28} bgColor={banner.bgColor} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A", fontFamily: tokens.font.family, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {banner.name}
          </div>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: st.bg, color: st.text, fontWeight: 600, fontFamily: tokens.font.family, flexShrink: 0 }}>{st.label}</span>
        </div>
        <div style={{ fontSize: 11, color: "#9EA6B2", fontFamily: tokens.font.family }}>{tmpl?.label} · {formatDate(banner.createdAt)}</div>
      </div>

      <div style={{ display: "flex", gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
        <select
          value={banner.status}
          onChange={e => onStatusChange(banner.id, e.target.value)}
          style={{ fontSize: 11, padding: "3px 6px", borderRadius: 6, border: "1px solid #E5E8EC", fontFamily: tokens.font.family, cursor: "pointer", background: "white", color: "#474747" }}
        >
          {Object.entries(STATUS_COLORS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <button onClick={() => onDelete(banner.id)} style={{ padding: "3px 8px", borderRadius: 6, border: "1px solid #FFCDD2", background: "#FFF5F5", color: "#C62828", fontSize: 11, cursor: "pointer", fontFamily: tokens.font.family }}>삭제</button>
      </div>
    </div>
  );
}

// ── Export Modal ─────────────────────────────────────────────────────────
function ExportModal({ banner, onClose, onFigmaExport }) {
  const tmpl = TEMPLATES[banner.templateId];
  const [figmaExporting, setFigmaExporting] = useState(false);
  const [figmaDone, setFigmaDone] = useState(false);

  const handleFigma = async () => {
    setFigmaExporting(true);
    await new Promise(r => setTimeout(r, 1800));
    setFigmaExporting(false);
    setFigmaDone(true);
    onFigmaExport(banner.id);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", borderRadius: 16, padding: 28, width: 420, boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: tokens.color.primary, fontFamily: tokens.font.family }}>배너 내보내기</div>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: tokens.color.quaternary }}>✕</button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <BannerPreview template={banner.templateId} slotValues={banner.slotValues} scale={0.7} bgColor={banner.bgColor} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, marginBottom: 10, fontFamily: tokens.font.family }}>이미지 다운로드</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["PNG (고해상도)", "JPG (최적화)"].map(fmt => (
              <button key={fmt} onClick={() => alert(`${fmt} 다운로드 기능은 실제 환경에서 html-to-image 라이브러리를 통해 구현됩니다.`)}
                style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: tokens.font.family, color: tokens.color.primary }}>
                ⬇ {fmt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, marginBottom: 10, fontFamily: tokens.font.family }}>Figma 라이브러리 전송</div>
          <div style={{ background: "#F7F7F7", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 11, color: tokens.color.quaternary, fontFamily: tokens.font.family }}>
            대상 파일: <span style={{ color: tokens.color.primary, fontWeight: 600 }}>AI 기록 / {tmpl?.label}</span><br />
            노드 ID: <span style={{ fontFamily: "monospace" }}>{tmpl?.figmaNodeId}</span>
          </div>
          {figmaDone ? (
            <div style={{ padding: "10px 0", textAlign: "center", fontSize: 13, color: "#2E7D32", fontWeight: 600, fontFamily: tokens.font.family }}>✅ Figma 라이브러리에 전송 완료!</div>
          ) : (
            <button onClick={handleFigma} disabled={figmaExporting}
              style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: figmaExporting ? "#CCC" : "#1C1C1E", color: "white", fontSize: 13, fontWeight: 700, cursor: figmaExporting ? "not-allowed" : "pointer", fontFamily: tokens.font.family }}>
              {figmaExporting ? "Figma에 전송 중..." : "🖼 Figma로 전송"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [openGroups, setOpenGroups] = useState({ card: true, main: true, sticky: true });
  const [selectedTemplateId, setSelectedTemplateId] = useState("bottom-sheet");
  const [banners, setBanners] = useState([
    { id: uid(), templateId: "bottom-sheet", name: "4월 요금제 변경 이벤트", slotValues: { subtitle: "4월 한정 특별 혜택", title: "지금 바꾸면 데이터가 2배", desc: "4.1 ~ 4.30 이벤트 기간 한정" }, status: "published", createdAt: Date.now() - 86400000 * 3, bgColor: "#FFFFFF" },
    { id: uid(), templateId: "card-medium", name: "스타벅스 쿠폰 카드 배너", slotValues: { eyebrow: "기간: 4.1 ~ 4.30", title: "스타벅스 라테 쿠폰 증정!" }, status: "review", createdAt: Date.now() - 86400000, bgColor: tokens.color.bgHigh },
    { id: uid(), templateId: "main-gift", name: "메인 기프트 배너 (초안)", slotValues: { title: "딱 맞는 요금제 변경으로", giftLabel: "맞춤 요금제 변경 혜택", giftTitle: "스타벅스 라테 쿠폰 증정!" }, status: "draft", createdAt: Date.now(), bgColor: "#F4F4EE" },
  ]);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [view, setView] = useState("list"); // "list" | "editor"
  const [exportTarget, setExportTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const selectedBanner = banners.find(b => b.id === selectedBannerId);
  const tmpl = selectedBanner ? TEMPLATES[selectedBanner.templateId] : null;

  const createNew = () => {
    const t = TEMPLATES[selectedTemplateId];
    // sticky-bg: 승인 팔레트 8종에서 랜덤 배경색 배정
    const STICKY_BG_PALETTE = ["#331413","#462914","#2F2714","#092817","#312253","#1C1D3C","#221932","#33001E"];
    const randomBg = t.id === "sticky-bg"
      ? STICKY_BG_PALETTE[Math.floor(Math.random() * STICKY_BG_PALETTE.length)]
      : t.bgColor;
    const nb = {
      id: uid(),
      templateId: selectedTemplateId,
      name: `새 ${t.label}`,
      slotValues: t.id === "sticky-bg" ? { customBg: randomBg } : {},
      status: "draft",
      createdAt: Date.now(),
      bgColor: randomBg,
    };
    setBanners(p => [nb, ...p]);
    setSelectedBannerId(nb.id);
    setView("editor");
  };

  const updateSlot = (slotId, val) => {
    setBanners(p => p.map(b => b.id === selectedBannerId ? { ...b, slotValues: { ...b.slotValues, [slotId]: val } } : b));
  };
  const updateBg = (c) => {
    setBanners(p => p.map(b => b.id === selectedBannerId ? { ...b, bgColor: c } : b));
  };
  const updateName = (v) => {
    setBanners(p => p.map(b => b.id === selectedBannerId ? { ...b, name: v } : b));
  };
  const applyAI = (result) => {
    const { _suggestedBg, ...slots } = result;
    setBanners(p => p.map(b => {
      if (b.id !== selectedBannerId) return b;
      const tmpl = TEMPLATES[b.templateId];
      const newBg = tmpl?.category === "card" && _suggestedBg ? _suggestedBg.hex : b.bgColor;
      return { ...b, slotValues: { ...b.slotValues, ...slots }, bgColor: newBg };
    }));
  };
  const deleteBanner = (id) => {
    setBanners(p => p.filter(b => b.id !== id));
    if (selectedBannerId === id) { setSelectedBannerId(null); setView("list"); }
  };
  const changeStatus = (id, s) => setBanners(p => p.map(b => b.id === id ? { ...b, status: s } : b));
  const handleFigmaExport = (id) => setBanners(p => p.map(b => b.id === id ? { ...b, figmaExportedAt: Date.now() } : b));

  // 현재 선택된 유형의 카테고리에 속한 배너만 표시 (유형 간 목록 비공유)
  const selectedCategory = TEMPLATES[selectedTemplateId]?.category;
  const categoryBanners = banners.filter(b => TEMPLATES[b.templateId]?.category === selectedCategory);

  const filteredBanners = categoryBanners.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || TEMPLATES[b.templateId]?.label.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: categoryBanners.length,
    published: categoryBanners.filter(b => b.status === "published").length,
    draft: categoryBanners.filter(b => b.status === "draft").length,
    review: categoryBanners.filter(b => b.status === "review").length,
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: tokens.font.family, background: "#F5F6F8", overflow: "hidden" }}>

      {/* ── Sidebar ── */}
      <div style={{ width: 220, background: "white", display: "flex", flexDirection: "column", flexShrink: 0, borderRight: "1px solid #E5E8EC" }}>
        {/* Logo */}
        <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid #F0F2F5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: tokens.color.brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>U+</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>배너 관리</div>
              <div style={{ fontSize: 10, color: "#9EA6B2" }}>Admin System</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#9EA6B2", padding: "0 16px 8px", letterSpacing: 0.6, textTransform: "uppercase" }}>배너 유형</div>
          {MENU.map(item => (
            <div key={item.id}>
              {item.isGroup ? (
                <>
                  <div
                    onClick={() => setOpenGroups(p => ({ ...p, [item.id]: !p[item.id] }))}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", cursor: "pointer", color: "#474747", fontSize: 13, fontWeight: 600 }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ fontSize: 14 }}>{item.icon}</span>{item.label}</span>
                    <span style={{ fontSize: 11, color: "#9EA6B2", transition: "transform 0.15s", display: "inline-block", transform: openGroups[item.id] ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
                  </div>
                  {openGroups[item.id] && item.children.map(child => (
                    <div
                      key={child.id}
                      onClick={() => { setSelectedTemplateId(child.id); setSelectedBannerId(null); setView("list"); }}
                      style={{
                        padding: "7px 16px 7px 36px",
                        cursor: "pointer",
                        fontSize: 13,
                        color: selectedTemplateId === child.id ? "#3182F6" : "#6B7684",
                        background: selectedTemplateId === child.id ? "#EEF5FF" : "transparent",
                        borderLeft: selectedTemplateId === child.id ? "2.5px solid #3182F6" : "2.5px solid transparent",
                        fontWeight: selectedTemplateId === child.id ? 600 : 400,
                      }}
                    >{child.label}</div>
                  ))}
                </>
              ) : (
                <div
                  onClick={() => { setSelectedTemplateId(item.id); setSelectedBannerId(null); setView("list"); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
                    color: selectedTemplateId === item.id ? "#3182F6" : "#6B7684",
                    background: selectedTemplateId === item.id ? "#EEF5FF" : "transparent",
                    borderLeft: selectedTemplateId === item.id ? "2.5px solid #3182F6" : "2.5px solid transparent",
                    fontWeight: selectedTemplateId === item.id ? 600 : 400,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.icon}</span>{item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div style={{ padding: "14px 16px", borderTop: "1px solid #F0F2F5" }}>
          <div style={{ fontSize: 10, color: "#9EA6B2", marginBottom: 8, textAlign: "center", letterSpacing: 0.4 }}>
            {TEMPLATES[selectedTemplateId]?.category?.toUpperCase()} 유형 현황
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[["전체", stats.total, "#6B7684"], ["게시됨", stats.published, "#00B493"], ["초안", stats.draft, "#F59E0B"], ["검토중", stats.review, "#3182F6"]].map(([k, v, c]) => (
              <div key={k} style={{ textAlign: "center", padding: "6px 0", background: "#F5F6F8", borderRadius: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: c }}>{v}</div>
                <div style={{ fontSize: 10, color: "#9EA6B2" }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "white", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E5E8EC", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {view === "editor" && (
              <button onClick={() => setView("list")} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: "#9EA6B2", padding: 0, lineHeight: 1 }}>‹</button>
            )}
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>
              {view === "editor" && selectedBanner ? (
                <input value={selectedBanner.name} onChange={e => updateName(e.target.value)}
                  style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", border: "none", outline: "none", background: "transparent", fontFamily: tokens.font.family, minWidth: 200 }} />
              ) : (
                TEMPLATES[selectedTemplateId]?.label || "배너 관리"
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "editor" && selectedBanner && (
              <>
                <select value={selectedBanner.status} onChange={e => changeStatus(selectedBanner.id, e.target.value)}
                  style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #E5E8EC", fontSize: 12, fontFamily: tokens.font.family, cursor: "pointer", color: "#474747", background: "white" }}>
                  {Object.entries(STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <button onClick={() => setExportTarget(selectedBanner)}
                  style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #E5E8EC", background: "white", color: "#474747", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: tokens.font.family }}>
                  ⬆ 내보내기
                </button>
              </>
            )}
            {view === "list" && (
              <button onClick={createNew}
                style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "#3182F6", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: tokens.font.family }}>
                + 새 배너
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        {view === "list" ? (
          <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
            {/* Search & filter */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9EA6B2", fontSize: 14 }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="배너 이름 검색..."
                  style={{ width: "100%", padding: "8px 12px 8px 30px", borderRadius: 8, border: "1px solid #E5E8EC", fontSize: 13, fontFamily: tokens.font.family, outline: "none", boxSizing: "border-box", background: "white" }} />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E8EC", fontSize: 13, fontFamily: tokens.font.family, cursor: "pointer", background: "white", color: "#474747" }}>
                <option value="all">전체 상태</option>
                {Object.entries(STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            {/* Template selector row */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7684", marginBottom: 10 }}>템플릿 선택</div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                {Object.values(TEMPLATES).filter(t => {
                  if (selectedTemplateId === "bottom-sheet") return t.id === "bottom-sheet";
                  if (["card-large","card-medium","card-small","card-personal"].includes(selectedTemplateId)) return t.category === "card";
                  if (["main-left","main-center","main-gift"].includes(selectedTemplateId)) return t.category === "main";
                  if (["sticky-no-bg","sticky-bg"].includes(selectedTemplateId)) return t.category === "sticky";
                  return true;
                }).map(t => (
                  <div key={t.id} onClick={() => setSelectedTemplateId(t.id)}
                    style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${selectedTemplateId === t.id ? "#3182F6" : "#E5E8EC"}`, background: selectedTemplateId === t.id ? "#EEF5FF" : "white", cursor: "pointer", whiteSpace: "nowrap", fontSize: 12, fontWeight: selectedTemplateId === t.id ? 600 : 400, color: selectedTemplateId === t.id ? "#3182F6" : "#6B7684", fontFamily: tokens.font.family, flexShrink: 0 }}>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Preview area */}
            <div style={{ background: "white", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, marginBottom: 12 }}>템플릿 미리보기</div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <BannerPreview template={selectedTemplateId} slotValues={{}} scale={0.6} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: tokens.color.primary, marginBottom: 6, fontFamily: tokens.font.family }}>{TEMPLATES[selectedTemplateId]?.label}</div>
                  <div style={{ fontSize: 12, color: tokens.color.quaternary, marginBottom: 4 }}>캔버스: {TEMPLATES[selectedTemplateId]?.canvasW} × {TEMPLATES[selectedTemplateId]?.canvasH}px</div>
                  <div style={{ fontSize: 12, color: tokens.color.quaternary, marginBottom: 12 }}>슬롯: {TEMPLATES[selectedTemplateId]?.slots.length}개</div>
                  <button onClick={createNew}
                    style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: tokens.color.brand, color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: tokens.font.family }}>
                    + 이 템플릿으로 생성
                  </button>
                </div>
              </div>
            </div>

            {/* Banner list */}
            <div style={{ fontSize: 12, fontWeight: 600, color: tokens.color.secondary, marginBottom: 12 }}>
              배너 목록 <span style={{ color: tokens.color.quaternary, fontWeight: 400 }}>({filteredBanners.length}개)</span>
            </div>
            {filteredBanners.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: tokens.color.quaternary, fontSize: 13, fontFamily: tokens.font.family }}>
                배너가 없습니다. 새 배너를 만들어 보세요.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filteredBanners.map(b => (
                  <BannerCard key={b.id} banner={b} isSelected={b.id === selectedBannerId}
                    onSelect={(id) => { setSelectedBannerId(id); setView("editor"); }}
                    onDelete={deleteBanner} onStatusChange={changeStatus} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Editor View ── */
          selectedBanner ? (
            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
              {/* Canvas area */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, overflowY: "auto", background: "#F5F6F8" }}>
                <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                  {[0.5, 0.7, 1.0].map(s => (
                    <button key={s} onClick={() => {}} style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #CCC", background: "white", fontSize: 11, cursor: "pointer", fontFamily: tokens.font.family }}>{Math.round(s * 100)}%</button>
                  ))}
                </div>
                <div style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)", borderRadius: 12 }}>
                  <BannerPreview template={selectedBanner.templateId} slotValues={selectedBanner.slotValues} scale={tmpl?.canvasH > 200 ? 0.9 : 1.1} bgColor={selectedBanner.bgColor} />
                </div>
                <div style={{ marginTop: 16, fontSize: 11, color: "#999", fontFamily: tokens.font.family }}>
                  {tmpl?.canvasW} × {tmpl?.canvasH}px · Figma Node: {tmpl?.figmaNodeId}
                </div>
              </div>

              {/* Right panel */}
              <div style={{ width: 320, background: selectedBanner.templateId === "sticky-bg" ? "#0D0E24" : "white", borderLeft: "1px solid #E5E8EC", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                  {selectedBanner.templateId === "bottom-sheet" ? (
                    <>
                      {/* 1. AI 에디터 */}
                      <AIPanel template={selectedBanner.templateId} onApply={applyAI}
                        onApplyImage={(url) => setBanners(p => p.map(b => b.id === selectedBannerId ? { ...b, slotValues: { ...b.slotValues, illustUrl: url } } : b))} />
                      {/* 2. 이미지 직접 업로드 */}
                      <ImageUploadPanel imageSize={{ w: 124, h: 130 }} currentUrl={selectedBanner.slotValues?.illustUrl}
                        onApply={(url) => setBanners(p => p.map(b => b.id === selectedBannerId ? { ...b, slotValues: { ...b.slotValues, illustUrl: url } } : b))} />
                      {/* 3. 텍스트 편집 */}
                      <EditorPanel template={selectedBanner.templateId} slotValues={selectedBanner.slotValues} onChange={updateSlot} onBgChange={updateBg} bgColor={selectedBanner.bgColor} />
                    </>
                  ) : selectedBanner.templateId === "card-personal" ? (
                    <>
                      {/* 1. AI 에디터 */}
                      <AIPanel template={selectedBanner.templateId} onApply={applyAI} />
                      {/* 2. 일러스트 라이브러리 */}
                      <PersonalIllustPanel
                        selectedId={selectedBanner.slotValues?.illustId}
                        onSelect={(id) => setBanners(p => p.map(b => b.id === selectedBannerId
                          ? { ...b, slotValues: { ...b.slotValues, illustId: id } } : b))}
                      />
                      {/* 3. 텍스트 편집 */}
                      <EditorPanel template={selectedBanner.templateId} slotValues={selectedBanner.slotValues} onChange={updateSlot} onBgChange={updateBg} bgColor={selectedBanner.bgColor} />
                    </>
                  ) : selectedBanner.templateId === "sticky-bg" ? (
                    <>
                      {/* 1. AI 에디터 (이미지 생성 탭 포함) */}
                      <StickyBgPanel
                        currentBg={selectedBanner.slotValues?.customBg || selectedBanner.bgColor || "#1C1D3C"}
                        onBgChange={(hex) => setBanners(p => p.map(b => b.id === selectedBannerId
                          ? { ...b, bgColor: hex, slotValues: { ...b.slotValues, customBg: hex } } : b))}
                        onApplyImage={(url) => setBanners(p => p.map(b => b.id === selectedBannerId
                          ? { ...b, slotValues: { ...b.slotValues, aiImageUrl: url } } : b))}
                        currentImageUrl={selectedBanner.slotValues?.aiImageUrl}
                      />
                      {/* 2. 이미지 직접 업로드 */}
                      <ImageUploadPanel imageSize={{ w: 72, h: 48 }} dark={true}
                        currentUrl={selectedBanner.slotValues?.aiImageUrl}
                        onApply={(url) => setBanners(p => p.map(b => b.id === selectedBannerId
                          ? { ...b, slotValues: { ...b.slotValues, aiImageUrl: url } } : b))} />
                      {/* 3. 텍스트 문구 편집 */}
                      <div style={{ background:"#12132A", border:"1px solid #2A2C52", borderRadius:12, padding:16 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.7)", marginBottom:10, fontFamily:tokens.font.family }}>텍스트 문구 편집</div>
                        {TEMPLATES["sticky-bg"].slots.filter(s => s.type === "text").map(slot => {
                          const val = selectedBanner.slotValues[slot.id] ?? "";
                          const over = val.length > slot.maxLen;
                          return (
                            <div key={slot.id}>
                              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                                <label style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.55)", fontFamily:tokens.font.family }}>{slot.label}</label>
                                <span style={{ fontSize:10, color: over ? "#FF6B6B" : "rgba(255,255,255,0.3)", fontFamily:tokens.font.family }}>{val.length}/{slot.maxLen}</span>
                              </div>
                              <textarea value={val} onChange={e => updateSlot(slot.id, e.target.value)} rows={1} placeholder={slot.placeholder}
                                style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:`1px solid ${over?"#FF6B6B":"#2A2C52"}`, fontSize:13, fontFamily:tokens.font.family, boxSizing:"border-box", outline:"none", resize:"none", lineHeight:1.5, color:"white", background:"#0D0E24" }} />
                              {over && <div style={{ fontSize:11, color:"#FF6B6B", marginTop:3, fontFamily:tokens.font.family }}>최대 {slot.maxLen}자 초과</div>}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : selectedBanner.templateId === "sticky-no-bg" ? (
                    <div>
                      {/* 1. AI 에디터 */}
                      <AIPanel template={selectedBanner.templateId} onApply={applyAI} />
                      {/* 2. 텍스트 편집 */}
                      <EditorPanel template={selectedBanner.templateId} slotValues={selectedBanner.slotValues} onChange={updateSlot} onBgChange={updateBg} bgColor={selectedBanner.bgColor} />
                    </div>
                  ) : (
                    <>
                      {/* 1. AI 에디터 (최상단) */}
                      <AIPanel
                        template={selectedBanner.templateId}
                        onApply={applyAI}
                        onApplyImage={TEMPLATES[selectedBanner.templateId]?.hasImage
                          ? (url) => setBanners(p => p.map(b => b.id === selectedBannerId ? { ...b, slotValues: { ...b.slotValues, illustUrl: url } } : b))
                          : null}
                      />
                      {/* 2. 이미지 직접 업로드 (AI 에디터 바로 아래, hasImage 배너만) */}
                      {TEMPLATES[selectedBanner.templateId]?.hasImage && (
                        <ImageUploadPanel
                          imageSize={(() => {
                            const id = selectedBanner.templateId;
                            if (id === "card-large")   return { w: 72,  h: 104 };
                            if (id === "card-medium")  return { w: 56,  h: 56  };
                            if (id === "main-left")    return { w: 280, h: 239 };
                            if (id === "main-center")  return { w: 280, h: 200 };
                            if (id === "main-gift")    return { w: 280, h: 200 };
                            if (id === "bottom-sheet") return { w: 124, h: 130 };
                            return null;
                          })()}
                          currentUrl={selectedBanner.slotValues?.illustUrl}
                          onApply={(url) => setBanners(p => p.map(b =>
                            b.id === selectedBannerId ? { ...b, slotValues: { ...b.slotValues, illustUrl: url } } : b
                          ))}
                        />
                      )}
                      {/* 3. 텍스트 편집 */}
                      <EditorPanel template={selectedBanner.templateId} slotValues={selectedBanner.slotValues} onChange={updateSlot} onBgChange={updateBg} bgColor={selectedBanner.bgColor} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* selectedBanner가 없으면 목록으로 자동 복귀 */
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#EAEAEA" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 14, color: "#999", fontFamily: tokens.font.family, marginBottom: 16 }}>배너를 찾을 수 없습니다</div>
                <button onClick={() => setView("list")}
                  style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: tokens.color.brand, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: tokens.font.family }}>
                  목록으로 돌아가기
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Export modal */}
      {exportTarget && (
        <ExportModal banner={exportTarget} onClose={() => setExportTarget(null)} onFigmaExport={handleFigmaExport} />
      )}
    </div>
  );
}
