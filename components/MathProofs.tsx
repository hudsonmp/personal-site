"use client"

import { useEffect } from "react"
import { MathProof } from "@/content/data/math"

interface MathProofsProps {
  proofs: MathProof[]
}

export function MathProofs({ proofs }: MathProofsProps) {
  useEffect(() => {
    // Configure MathJax
    if (typeof window !== "undefined" && !(window as any).MathJax) {
      const configScript = document.createElement("script")
      configScript.type = "text/javascript"
      configScript.text = `
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
            processEscapes: true,
            processEnvironments: true
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
          }
        };
      `
      document.head.appendChild(configScript)

      // Load MathJax
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    // Typeset math when content changes
    if (typeof window !== "undefined" && (window as any).MathJax) {
      setTimeout(() => {
        ;(window as any).MathJax.typesetPromise?.()
      }, 100)
    }
  }, [proofs])

  return (
    <div className="space-y-4">
      {proofs.length > 0 ? (
        proofs.map((proof) => (
          <div key={proof.id} className="border-l-2 border-muted pl-4 py-3">
            <div className="text-base font-medium mb-1">{proof.title}</div>
            <div className="text-xs text-muted-foreground mb-2">{proof.date}</div>
            <div
              className="text-sm text-muted-foreground prose prose-sm max-w-none mb-3"
              dangerouslySetInnerHTML={{ __html: proof.problem }}
            />
            {proof.fileUrl && (
              <a
                href={proof.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View Full Solution
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No proofs yet...</p>
      )}
    </div>
  )
}

