export default function WhatsAppForm() {
  const uiText = {
    title: 'WhatsApp Link Generator',
    subtitle: 'Isian we deuh rungsing',
    phoneLabel: 'Nomor WhatsApp',
    phonePlaceholder: 'Contoh: 6281234567890',
    msgLabel: 'Pesan',
    msgPlaceholder: 'Tulis pesan di sini',
    btnGenerate: 'Buat Link',
    resultLabel: 'Hasil:',
    btnCopy: 'Copy Link',
    alertNoPhone: 'Eta nomor isisan!',
    alertCopied: 'Done, jms!',
  };

  const uiStyle = {
    card: 'card w-full max-w-md bg-base-100 shadow-xl',
    cardBody: 'card-body space-y-4',
    title: 'card-title text-xl text-center',
    subtitle: 'text-sm text-base-content/60 text-center',
    label: 'label-text',
    input: 'input input-bordered w-full',
    textarea: 'textarea textarea-bordered w-full h-32',
    buttonGenerate: 'btn btn-primary w-full',
    resultWrapper: 'my-4',
    resultLabel: 'label-text font-semibold',
    resultBox:
      'textarea textarea-bordered w-full h-auto min-h-[3rem] break-words',
    buttonCopy: 'btn btn-outline btn-sm mt-2',
    link: 'link link-primary break-all border',
  };

  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  function generateLink() {
    if (!phone.trim()) {
      alert(uiText.alertNoPhone);
      return;
    }
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}${
      message ? '?text=' + encodedMessage : ''
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
    <div className={uiStyle.card}>
      <div className={uiStyle.cardBody}>
        <header>
          <h1 className={uiStyle.title}>{uiText.title}</h1>
          <p className={uiStyle.subtitle}>{uiText.subtitle}</p>
        </header>

        {/* Input Nomor */}
        <div className="form-control">
          <label className="label">
            <span className={uiStyle.label}>{uiText.phoneLabel}</span>
          </label>
          <input
            type="text"
            className={uiStyle.input}
            placeholder={uiText.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Input Pesan */}
        <div className="form-control">
          <label className="label">
            <span className={uiStyle.label}>{uiText.msgLabel}</span>
          </label>
          <textarea
            className={uiStyle.textarea}
            placeholder={uiText.msgPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className={uiStyle.buttonGenerate} onClick={generateLink}>
          {uiText.btnGenerate}
        </button>

        {/* Hasil */}
        {result && (
          <div className={uiStyle.resultWrapper}>
            <label className="label">
              <span className={uiStyle.resultLabel}>{uiText.resultLabel}</span>
            </label>
            <div className={uiStyle.resultBox}>
              <a href={result} target="_blank" className={uiStyle.link}>
                {result}
              </a>
            </div>
            <button className={uiStyle.buttonCopy} onClick={copyLink}>
              {copied ? uiText.alertCopied : uiText.btnCopy}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
