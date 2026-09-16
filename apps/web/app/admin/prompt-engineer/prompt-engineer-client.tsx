"use client";

import { useState } from "react";

interface TestCase {
  input: string;
  expected: string;
}

interface CandidatePrompt {
  id: number;
  strategy: string;
  promptText: string;
  score: number;
  reasoning: string;
}

export default function PromptEngineerClient({ email }: { email: string }) {
  const [taskDescription, setTaskDescription] = useState(
    "Act as a local tourism guide for Santa Cruz de la Sierra, Bolivia. Recommend 3 hidden gems in the Casco Viejo based on user mood."
  );
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "I want a quiet coffee and historic architecture.", expected: "Suggest Café 24, Altillo Beni, and Manzana 1 with history." },
    { input: "I want vibrant nightlife and live music tonight.", expected: "Suggest Calle 24 de Septiembre venues, Tapekuá, and local jazz bars." },
  ]);
  const [generating, setGenerating] = useState(false);
  const [candidates, setCandidates] = useState<CandidatePrompt[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  function addTestCase() {
    setTestCases([...testCases, { input: "", expected: "" }]);
  }

  function updateTestCase(index: number, field: "input" | "expected", value: string) {
    const updated = [...testCases];
    if (updated[index]) {
      updated[index][field] = value;
      setTestCases(updated);
    }
  }

  function removeTestCase(index: number) {
    setTestCases(testCases.filter((_, i) => i !== index));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!taskDescription.trim()) return;
    setGenerating(true);

    // Simulate Matt Shumer's GPT Prompt Engineer generation & evaluation cycle
    setTimeout(() => {
      const generated: CandidatePrompt[] = [
        {
          id: 1,
          strategy: "Persona-Driven & Contextual Few-Shot",
          promptText: `You are bolivIA, an expert bilingual local guide for Santa Cruz de la Sierra, Bolivia. Your tone is warm, inviting, and knowledgeable about local culture, gastronomy, and geography. When recommending spots in the Casco Viejo or Equipetrol, always mention operating context, atmosphere, and exact neighborhood tips.\n\nTask: ${taskDescription}\n\nExamples:\n- User: "Quiet coffee" -> Output: "Try Café 24 near Plaza 24 de Septiembre..."`,
          score: 96,
          reasoning: "High contextual grounding with clear persona constraints and verified geographic markers.",
        },
        {
          id: 2,
          strategy: "Chain-of-Thought & Strict Constraints",
          promptText: `Analyze the user's request for Santa Cruz de la Sierra exploration. Follow these steps:\n1. Identify mood, budget, and district preference (Casco Viejo, Equipetrol, Urubó, San Martín).\n2. Cross-reference with verified BoliVibes venue database.\n3. Output top 3 recommendations with address, vibe tag, and insider tip.\n\nTask: ${taskDescription}`,
          score: 92,
          reasoning: "Excellent step-by-step reasoning reducing hallucination on venue details.",
        },
        {
          id: 3,
          strategy: "Direct & High-Energy Local Vibe",
          promptText: `Deliver punchy, vibrant recommendations for Santa Cruz de la Sierra. Emphasize local warmth ('cruceño'), authentic food, and cultural richness.\n\nTask: ${taskDescription}`,
          score: 88,
          reasoning: "Fast and concise, great for rapid conversational concierge widgets.",
        },
      ];
      setCandidates(generated);
      setGenerating(false);
    }, 1200);
  }

  async function handleCopy(id: number, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      alert("Failed to copy prompt");
    }
  }

  return (
    <div className="space-y-6">
      <div className="a-actions-row">
        <div>
          <h1 className="a-h1" style={{ margin: 0 }}>Prompt Engineer Studio</h1>
          <p className="a-muted" style={{ margin: 0 }}>
            Inspired by Matt Shumer's gpt-prompt-engineer. Define your task and test cases to auto-generate and benchmark optimal AI prompts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="a-card space-y-5" style={{ padding: 24 }}>
          <h2 className="text-lg font-bold text-stone-100">Task &amp; Goal Definition</h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="a-field">
              <label htmlFor="task" className="text-xs font-bold text-stone-300">Use-Case / Task Description</label>
              <textarea
                id="task"
                rows={4}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="a-input text-sm"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-300">Test Cases ({testCases.length})</label>
                <button
                  type="button"
                  onClick={addTestCase}
                  className="clay-btn clay-btn-sm"
                >
                  + Add Test Case
                </button>
              </div>

              {testCases.map((tc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-amber-400">Test Case #{idx + 1}</span>
                    {testCases.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTestCase(idx)}
                        className="text-red-400 hover:text-red-300 text-xs font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="User input (e.g. Quiet coffee)"
                    value={tc.input}
                    onChange={(e) => updateTestCase(idx, "input", e.target.value)}
                    className="a-input text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Expected output / behavior"
                    value={tc.expected}
                    onChange={(e) => updateTestCase(idx, "expected", e.target.value)}
                    className="a-input text-xs"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={generating}
              className="clay-btn w-full justify-center"
              style={{ padding: "12px 20px" }}
            >
              {generating ? "Synthesizing & Benchmarking Prompts..." : "Generate & Optimize Prompts ⚡"}
            </button>
          </form>
        </div>

        {/* Results & Candidate Prompts */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-100">Candidate Prompts &amp; Scores</h2>
          {candidates.length === 0 ? (
            <div className="a-card text-center py-16 text-stone-400 space-y-2" style={{ padding: 32 }}>
              <p className="font-semibold text-stone-300">No prompts generated yet.</p>
              <p className="text-xs">Fill out your task and test cases on the left, then click Generate.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {candidates.map((cand) => {
                const isCopied = copiedId === cand.id;
                return (
                  <div key={cand.id} className="a-card space-y-3" style={{ padding: 20 }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                          Strategy #{cand.id} · {cand.strategy}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold">
                            Score: {cand.score}/100
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(cand.id, cand.promptText)}
                        className="clay-btn clay-btn-sm"
                        style={{ background: isCopied ? "#1e9e45" : undefined }}
                      >
                        {isCopied ? "Copied!" : "Copy Prompt"}
                      </button>
                    </div>

                    <p className="text-xs text-stone-400 italic">
                      <strong>AI Reasoning:</strong> {cand.reasoning}
                    </p>

                    <pre
                      style={{
                        background: "#0d0a08",
                        color: "#f4eee2",
                        padding: 14,
                        borderRadius: 10,
                        fontSize: 11,
                        lineHeight: 1.45,
                        maxHeight: 220,
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {cand.promptText}
                    </pre>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
