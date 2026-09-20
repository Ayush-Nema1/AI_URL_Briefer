import React, { useState } from "react";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function List({ items }) {
  if (!items?.length) {
    return <p className="muted">Not available.</p>;
  }

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Analysis failed.");
      }

      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const report = data?.report;

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">WEBBRIEF</p>

          <h1>Understand a website from its URL.</h1>

          <p className="sub">
            The URL is parsed first, the main website is identified, then its
            requested page or section is analyzed separately.
          </p>
        </div>
      </header>

      <form className="search" onSubmit={analyze}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://leetcode.com"
          type="url"
          required
        />

        <button disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

     {error && (
  <div className={error.includes("AI service") ? "aiBusy" : "error"}>
    {error}
  </div>
)}

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <span>Reading public page and preparing report...</span>
        </div>
      )}

      {report && (
        <div className="report">
          <div className="urlLine">{data.url}</div>

          <Section title="Website Overview">
            <p>{report.websiteOverview}</p>
          </Section>

          <Section title="Website Purpose">
            <p>{report.websitePurpose}</p>
          </Section>

          <Section title="Requested Page / Section">
            <h3>{report.requestedPage?.name}</h3>

            <p>
              <strong>Purpose:</strong>{" "}
              {report.requestedPage?.purpose}
            </p>

            <p>{report.requestedPage?.summary}</p>
          </Section>

          <Section title="Key Points">
            <List items={report.keyPoints} />
          </Section>

          <Section title="Content / Data Type">
            <p>{report.contentType || "Not available."}</p>
          </Section>

          <div className="grid">
            <Section title="Target Audience">
              <List items={report.targetAudience} />
            </Section>

            <Section title="Main Topics">
              <List items={report.topics} />
            </Section>
          </div>

          <Section title="Trust & Authenticity">
            <div className="trustLabel">
              {report.trust?.label || "Not independently verified"}
            </div>

            <h4>Positive signals</h4>
            <List items={report.trust?.positiveSignals} />

            <h4>Cautions</h4>
            <List items={report.trust?.cautions} />
          </Section>

          <Section title="Advice">
            <List items={report.advice} />
          </Section>

          {report.limitations?.length > 0 && (
            <Section title="Limitations">
              <List items={report.limitations} />
            </Section>
          )}
        </div>
      )}
    </main>
  );
}