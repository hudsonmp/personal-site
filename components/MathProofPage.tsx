"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { MathProof } from "@/content/data/math"

interface MathProofPageProps {
  proof: MathProof
}

export function MathProofPage({ proof }: MathProofPageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
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

      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== "undefined" && (window as any).MathJax) {
      setTimeout(() => {
        ;(window as any).MathJax.typesetPromise?.()
      }, 100)
    }
  }, [proof, mounted])

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          {proof.texFile && (
            <a
              href={`/math/${proof.texFile}`}
              download
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              Download LaTeX Source
            </a>
          )}
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <h1>{proof.title}</h1>
          <p>Hudson Mitchell-Pullman</p>
          <p>{proof.date}</p>
          <p className="text-muted-foreground">Problem source: Art of Problem Solving (AoPS)</p>

          <h2>Problem</h2>
          {mounted ? (
            <div dangerouslySetInnerHTML={{ __html: proof.problem }} />
          ) : (
            <div>{proof.problem}</div>
          )}

          {proof.solution && (
            <>
              <h2>Solution</h2>
              {mounted ? (
                <div dangerouslySetInnerHTML={{ __html: proof.solution }} />
              ) : (
                <div>{proof.solution}</div>
              )}
            </>
          )}
        </article>
      </div>
    </div>
  )
}

