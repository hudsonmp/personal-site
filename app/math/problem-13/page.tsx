import { MathProofPage } from "@/components/MathProofPage"
import { mathProofs } from "@/content/data/math"

export default function Problem13Page() {
  const proof = mathProofs.find((p) => p.id === "taylor-series-arcsin")
  
  if (!proof) {
    return <div>Proof not found</div>
  }

  return <MathProofPage proof={proof} />
}
