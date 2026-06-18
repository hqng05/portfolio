import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 200000]
const ACCOUNT = '0352818145'
const ACCOUNT_NAME = 'hqng05'

const CRYPTO = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    color: '#f7931a',
    icon: '₿',
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    address: 'LbTjMGN7gELw4KbeyQf6cTCq859hD18guE',
    color: '#345d9d',
    icon: 'Ł',
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    color: '#26a17b',
    icon: '₮',
    network: 'ERC20 / BEP20',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    color: '#627eea',
    icon: 'Ξ',
  },
]

/* ═══════════════════════════════════════════
   TOAST COMPONENT
   ═══════════════════════════════════════════ */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="nuoihuy-toast"
        >
          <span style={{ fontSize: 18 }}>✅</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════ */
function Section({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`section ${className}`}
    >
      {children}
    </motion.section>
  )
}

/* ═══════════════════════════════════════════
   CRYPTO CARD
   ═══════════════════════════════════════════ */
function CryptoCard({ crypto }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(crypto.address)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = crypto.address
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const truncated = crypto.address.slice(0, 10) + '…' + crypto.address.slice(-6)

  return (
    <motion.div
      className="glass glass--hover"
      style={{ padding: '28px', height: '100%' }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: `${crypto.color}20`,
            border: `2px solid ${crypto.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 800,
            color: crypto.color,
            flexShrink: 0,
          }}
        >
          {crypto.icon}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            {crypto.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
            {crypto.symbol}{crypto.network ? ` · ${crypto.network}` : ''}
          </div>
        </div>
      </div>

      {/* Address */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '16px',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 13,
          color: 'var(--text-secondary)',
          wordBreak: 'break-all',
          lineHeight: 1.5,
        }}
      >
        {truncated}
      </div>

      {/* Copy Button */}
      <motion.button
        onClick={handleCopy}
        className="btn"
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '10px 20px',
          fontSize: 14,
          background: copied
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : 'var(--glass-bg)',
          border: `1px solid ${copied ? '#10b981' : 'var(--glass-border)'}`,
          color: copied ? '#fff' : 'var(--text-primary)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {copied ? '✓ Copied!' : '📋 Copy Address'}
      </motion.button>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Nuoihuy() {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [qrVisible, setQrVisible] = useState(false)
  const [coffeeCount, setCoffeeCount] = useState(0)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const showToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 2200)
  }

  const handlePresetAmount = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
    setQrVisible(true)
    setCoffeeCount((c) => c + 1)
    showToast('QR code generated! Cảm ơn bạn 💜')
  }

  const handleGenerateQR = () => {
    const val = parseInt(customAmount.replace(/[^0-9]/g, ''), 10)
    if (!val || val < 1000) {
      showToast('Vui lòng nhập số tiền hợp lệ (tối thiểu 1,000₫)')
      return
    }
    setSelectedAmount(val)
    setQrVisible(true)
    setCoffeeCount((c) => c + 1)
    showToast('QR code generated! Cảm ơn bạn 💜')
  }

  const qrUrl = selectedAmount
    ? `https://img.vietqr.io/image/MB-${ACCOUNT}-compact.svg?amount=${selectedAmount}&addInfo=tysm<3&accountName=${ACCOUNT_NAME}`
    : ''

  const formattedAmount = selectedAmount
    ? selectedAmount.toLocaleString('vi-VN') + '₫'
    : ''

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="section"
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: '120px',
          paddingBottom: '40px',
        }}
      >
        <div className="container">
          {/* Coffee illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
            style={{ marginBottom: '28px' }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(244,114,182,0.15))',
                border: '2px solid rgba(167,139,250,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56,
                margin: '0 auto',
                position: 'relative',
              }}
            >
              ☕
              {/* Floating hearts */}
              <motion.span
                style={{ position: 'absolute', top: -8, right: -4, fontSize: 20 }}
                animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                💜
              </motion.span>
              <motion.span
                style={{ position: 'absolute', bottom: -4, left: -8, fontSize: 16 }}
                animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'rgba(244, 114, 182, 0.1)',
              border: '1px solid rgba(244, 114, 182, 0.2)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--accent-3)',
              letterSpacing: '0.5px',
              marginBottom: '20px',
            }}
          >
            💖 Nuoihuy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Buy Me a <span className="gradient-text">Coffee</span>
            <br />
            <span style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Mua cho tớ một ly cà phê nè
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{
              fontSize: 17,
              color: 'var(--text-muted)',
              maxWidth: 520,
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            Nếu bạn thấy những gì tớ làm có ích, hãy mua cho tớ một ly cà phê nhé!
            <br />
            <span style={{ fontSize: 14 }}>Every little bit keeps me coding ☕💜</span>
          </motion.p>

          {/* Coffee counter */}
          {coffeeCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="nuoihuy-counter"
            >
              <span style={{ fontSize: 20 }}>☕</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>
                × {coffeeCount} {coffeeCount === 1 ? 'coffee' : 'coffees'} counted!
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══ BANK TRANSFER ═══ */}
      <Section>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section__label" style={{ justifyContent: 'center' }}>
              Bank Transfer
            </span>
            <h2 className="section__title" style={{ margin: '0 auto 16px' }}>
              Chuyển khoản <span className="gradient-text">ngân hàng</span>
            </h2>
            <p className="section__desc" style={{ margin: '0 auto', textAlign: 'center' }}>
              Quét mã QR bằng app ngân hàng để chuyển khoản nhanh chóng
            </p>
          </div>

          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            {/* Bank info card */}
            <div className="glass" style={{ padding: '28px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, #1a3c6e, #2563eb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 900,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  MB
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                    MB Bank
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Tài khoản: {ACCOUNT}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Chủ tài khoản: {ACCOUNT_NAME}
                  </div>
                </div>
              </div>
            </div>

            {/* Amount buttons */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Chọn số tiền / Select amount
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {PRESET_AMOUNTS.map((amount) => (
                  <motion.button
                    key={amount}
                    onClick={() => handlePresetAmount(amount)}
                    className="btn"
                    style={{
                      padding: '12px 24px',
                      fontSize: 15,
                      fontWeight: 700,
                      background:
                        selectedAmount === amount && !customAmount
                          ? 'var(--accent-gradient)'
                          : 'var(--glass-bg)',
                      border: `1px solid ${
                        selectedAmount === amount && !customAmount
                          ? 'rgba(167,139,250,0.5)'
                          : 'var(--glass-border)'
                      }`,
                      color:
                        selectedAmount === amount && !customAmount
                          ? '#fff'
                          : 'var(--text-primary)',
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {(amount / 1000).toLocaleString('vi-VN')}K
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom amount */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Hoặc nhập số tiền / Or enter custom amount
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={customAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '')
                    setCustomAmount(val ? parseInt(val, 10).toLocaleString('vi-VN') : '')
                  }}
                  placeholder="Ví dụ: 50,000"
                  className="nuoihuy-input"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    fontSize: 15,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                />
                <motion.button
                  onClick={handleGenerateQR}
                  className="btn btn--primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Generate QR
                </motion.button>
              </div>
            </div>

            {/* QR Code */}
            <AnimatePresence>
              {qrVisible && selectedAmount && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="nuoihuy-qr"
                >
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Quét mã để thanh toán {formattedAmount}
                    </span>
                  </div>
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={qrUrl}
                      alt={`VietQR ${formattedAmount}`}
                      style={{ width: 220, height: 220, display: 'block' }}
                    />
                  </div>
                  <p style={{ textAlign: 'center', marginTop: '12px', fontSize: 12, color: 'var(--text-muted)' }}>
                    Số tiền: <strong style={{ color: 'var(--text-primary)' }}>{formattedAmount}</strong> · Nội dung: tysm &lt;3
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ═══ CRYPTO ═══ */}
      <Section>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section__label" style={{ justifyContent: 'center' }}>
              Cryptocurrency
            </span>
            <h2 className="section__title" style={{ margin: '0 auto 16px' }}>
              Tiền <span className="gradient-text">điện tử</span>
            </h2>
            <p className="section__desc" style={{ margin: '0 auto', textAlign: 'center' }}>
              Hỗ trợ qua crypto — chọn đồng tiền bạn muốn donate
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {CRYPTO.map((crypto, i) => (
              <motion.div
                key={crypto.symbol}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <CryptoCard crypto={crypto} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ THANK YOU ═══ */}
      <Section>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <div style={{ fontSize: 48, marginBottom: '20px' }}>💜</div>
              <h2 className="section__title" style={{ marginBottom: '16px' }}>
                Cảm ơn bạn! <span className="gradient-text">Thank you!</span>
              </h2>
              <p className="section__desc" style={{ margin: '0 auto', textAlign: 'center' }}>
                Mỗi ly cà phề bạn mua cho tớ đều giúp tớ có thêm năng lượng để tiếp tục tạo ra những thứ hay ho.
                <br /><br />
                <em style={{ color: 'var(--text-muted)' }}>
                  Every coffee you buy gives me energy to keep building cool stuff.
                </em>
              </p>

              {coffeeCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    marginTop: '32px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '100px',
                    background: 'rgba(167,139,250,0.1)',
                    border: '1px solid rgba(167,139,250,0.2)',
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                    style={{ fontSize: 24, display: 'inline-block' }}
                  >
                    ☕
                  </motion.span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-1)' }}>
                    {coffeeCount} coffee{coffeeCount !== 1 ? 's' : ''} of love sent!
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══ TOAST ═══ */}
      <Toast message={toast.message} visible={toast.visible} />
    </>
  )
}
