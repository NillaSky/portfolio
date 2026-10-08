export default function ComponentGuide() {
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
          공통 UI 컴포넌트 가이드{' '}
          <span style={{ color: 'var(--text-type)', fontWeight: 500 }}>· 샘플 데이터로 재구성</span>
        </h2>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          실무에서 만든 data-module / data-fn 공통 UI 체계를 샘플 데이터로 옮긴 가이드예요.
          각 섹션의 ‘마크업 트리’, ‘전체 코드’로 구조를 바로 확인할 수 있어요.
        </p>
      </div>

      {/* 가이드 미리보기 */}
      <iframe
        src={`${import.meta.env.BASE_URL}demo/component_guide.html`}
        title="공통 UI 컴포넌트 가이드"
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{
          flex: 1,
          width: '100%',
          border: 0,
          background: '#f7f8fa',
        }}
      />
    </div>
  )
}
