export default function A11yChecklist() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-editor)',
      }}
    >
      {/* 컨텍스트 바 */}
      <div
        style={{
          flexShrink: 0,
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-color)',
          fontFamily: 'var(--font-ui)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          접근성 점검 체크 도구{' '}
          <span style={{ color: 'var(--text-type)', fontWeight: 500 }}>· 직접 만든 작업 도구</span>
        </h2>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          접근성 결함을 점검·개선하면서, 항목을 한눈에 보고 편하게 작업하려고 직접 만든 도구입니다.
          캡처 이미지는 고객사 화면이라 보안상 비공개 처리했습니다.
        </p>
      </div>

      {/* 도구 미리보기 */}
      <iframe
        src={`${import.meta.env.BASE_URL}accessibility_checklist.html`}
        title="웹 접근성 결함 체크리스트 도구"
        sandbox="allow-scripts allow-same-origin"
        style={{
          flex: 1,
          width: '100%',
          border: 0,
          background: '#f1f5f9',
        }}
      />
    </div>
  )
}
