export default function SecureReport() {
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
          보안 리포트 UI 데모{' '}
          <span style={{ color: 'var(--text-type)', fontWeight: 500 }}>· 가상 서비스로 재구성</span>
        </h2>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          실무에서 설계한 상태 중심 카드, 디자인 토큰 테마, 접근성 위젯을 가상 서비스로 새로 만든 데모예요.
          오른쪽 아래 ‘데모 컨트롤’에서 로그인·회선·오류 상태와 테마를 바꿔볼 수 있어요.
        </p>
      </div>

      {/* 데모 미리보기 */}
      <iframe
        src={`${import.meta.env.BASE_URL}demo/secure-report/index.html`}
        title="보안 리포트 UI 데모"
        sandbox="allow-scripts allow-same-origin"
        style={{
          flex: 1,
          width: '100%',
          border: 0,
          background: '#f6f7f9',
        }}
      />
    </div>
  )
}
