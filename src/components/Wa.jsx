import { useState } from 'react';
import { MessageCircle, Send, Check } from 'lucide-react';

export default function WhatsAppForm() {
  const uiStyle = {
    wrapper: 'w-full max-w-md mx-auto',
    card: 'rounded-2xl shadow-xs border border-white/30 bg-white/20 backdrop-blur-md p-6',
    header: 'mb-4 text-center flex flex-col items-center',
    title: 'text-3xl text-base-content font-medium bg-clip-text',
    subtitle: 'text-sm text-white/80',
    label: 'block text-sm font-medium mb-1 text-white/90',
    input:
      'w-full rounded-xl border border-white/40 bg-white/10 text-white placeholder-white/50 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition',
    inputError: 'border-red-500 focus:ring-red-400 placeholder-red-300',
    textarea:
      'w-full rounded-xl border border-white/40 bg-white/10 text-white placeholder-white/50 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none min-h-[6rem]',
    button:
      'w-full shadow-xs bg-primary text-white font-semibold py-2 rounded-full hover:opacity-90 transition flex items-center justify-center gap-2',
    resultWrapper: 'mt-4',
    resultBox:
      'bg-white/10 border border-white/30 rounded-xl p-3 text-sm break-all text-white',
    resultLink: 'underline hover:text-blue-300',
    copyButton:
      'mt-2 w-full border border-white/40 text-white rounded-full py-1 hover:bg-white/20 transition flex items-center justify-center gap-2',
  };

  const uiText = {
    title: 'Wa.me Link',
    subtitle: 'Ezpz Pokokna!',
    phoneLabel: 'WhatsApp Number',
    phonePlaceholder: 'Example: 6281234567890',
    phoneError: 'Please enter a WhatsApp number',
    msgLabel: 'Message',
    msgPlaceholder: 'Type your message here',
    btnGenerate: 'Generate Link',
    resultLabel: 'Result:',
    btnCopy: 'Copy Link',
    alertCopied: 'Copied!',
  };

  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  function generateLink() {
    if (!phone.trim()) {
      setError(true);
      setResult('');
      return;
    }
    setError(false);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}${
      message ? `?text=${encodedMessage}` : ''
    }`;
    setResult(url);
  }

  async function copyLink() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={uiStyle.wrapper}>
      <div className={uiStyle.card}>
        <header className={uiStyle.header}>
          <MessageCircle className="w-10 h-10 text-primary mb-2 animate-bounce" />
          <h1 className={uiStyle.title}>{uiText.title}</h1>
          <p className={uiStyle.subtitle}>{uiText.subtitle}</p>
        </header>

        <div className="mb-4">
          <label className={uiStyle.label}>{uiText.phoneLabel}</label>
          <input
            type="text"
            className={`${uiStyle.input} ${error ? uiStyle.inputError : ''}`}
            placeholder={error ? uiText.phoneError : uiText.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={() => setError(false)}
          />
        </div>

        <div className="mb-4">
          <label className={uiStyle.label}>{uiText.msgLabel}</label>
          <textarea
            className={uiStyle.textarea}
            placeholder={uiText.msgPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className={uiStyle.button} onClick={generateLink}>
          <Send className="w-4 h-4" />
          {uiText.btnGenerate}
        </button>

        {result && (
          <div className={uiStyle.resultWrapper}>
            <p className={uiStyle.label}>{uiText.resultLabel}</p>
            <div className={uiStyle.resultBox}>
              <a href={result} target="_blank" className={uiStyle.resultLink}>
                {result}
              </a>
            </div>
            <button className={uiStyle.copyButton} onClick={copyLink}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  {uiText.alertCopied}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {uiText.btnCopy}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
