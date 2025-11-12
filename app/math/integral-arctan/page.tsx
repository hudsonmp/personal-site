import { MathProofPage } from "@/components/MathProofPage"
import { mathProofs } from "@/content/data/math"

export default function IntegralArctanPage() {
  const proof = mathProofs.find((p) => p.id === "integral-arctan")
  
  if (!proof) {
    return <div>Proof not found</div>
  }

  return <MathProofPage proof={proof} />
}

