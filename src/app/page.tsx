'use client';

import React, { useState } from 'react';
import { Switch } from 'cyberseeds-ui';

// 多言語対応のテキスト
const translations = {
  ja: {
    title: 'コエトリ - 音声抜粋編集',
    fileLabel: '音声ファイルを選択（mp3/wav/m4a）:',
    durationLabel: '抽出したい長さ（秒）:',
    submit: '送信',
    processing: '処理中...',
    resultTitle: '抽出された重要発言:',
    errorMessage: '処理に失敗しました',
    languageSwitch: 'English'
  },
  en: {
    title: 'Koetori - Audio Excerpt Editor',
    fileLabel: 'Select audio file (mp3/wav/m4a):',
    durationLabel: 'Desired excerpt length (seconds):',
    submit: 'Submit',
    processing: 'Processing...',
    resultTitle: 'Extracted Important Statements:',
    errorMessage: 'Processing failed',
    languageSwitch: '日本語'
  }
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(60);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('duration', duration.toString());

    const res = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data.result || t.errorMessage);
    setLoading(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>{t.title}</h1>

        {/* 言語切り替えスイッチ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--foreground)' }}>JA</span>
          <Switch
            checked={language === 'en'}
            onClick={toggleLanguage}
            color="blue"
            offLabel=''
            onLabel=''
          />
          <span style={{ fontSize: '0.875rem', color: 'var(--foreground)' }}>EN</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div>
          <label>{t.fileLabel}</label><br />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>{t.durationLabel}</label><br />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={10}
            max={300}
          />
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? t.processing : t.submit}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h2>{t.resultTitle}</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
