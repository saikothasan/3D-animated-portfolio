import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react"

type NavControlsProps = {
  onRotate: (axis: string, direction: number) => void
}

const NavControls: React.FC<NavControlsProps> = ({ onRotate }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <Button variant="outline" size="icon" onClick={() => onRotate("y", 1)} className="mb-2">
        <ArrowUp className="h-4 w-4" />
      </Button>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={() => onRotate("x", -1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onRotate("x", 1)}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" size="icon" onClick={() => onRotate("y", -1)} className="mt-2">
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default NavControls

