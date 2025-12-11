import { MathProofPage } from "@/components/MathProofPage"
import { mathProofs } from "@/content/data/math"

export default function OrthogonalCurvesPage() {
  const proof = mathProofs.find((p) => p.id === "orthogonal-curves")
  
  if (!proof) {
    return <div>Proof not found</div>
  }

  return <MathProofPage proof={proof} />
}

