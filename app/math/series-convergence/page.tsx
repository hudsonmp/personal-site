import { MathProofPage } from "@/components/MathProofPage"
import { mathProofs } from "@/content/data/math"

export default function SeriesConvergencePage() {
  const proof = mathProofs.find((p) => p.id === "series-convergence-powers")
  
  if (!proof) {
    return <div>Proof not found</div>
  }

  return <MathProofPage proof={proof} />
}

