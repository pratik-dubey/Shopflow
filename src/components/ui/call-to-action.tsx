import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function CTA() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col text-center
  bg-[radial-gradient(35%_80%_at_50%_0%,hsl(var(--color-foreground)/0.08),transparent)]
  p-4 lg:p-14 gap-8 items-center">

          {/* <div>
            <Badge>Get started</Badge>
          </div> */}
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Try Shopflow today!
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              Solving all your product research doubts at once , no more head-ache for choosing the efficient deal !
            </p>
          </div>
<div className="flex flex-row gap-4">
  <Button asChild className="gap-4">
    <Link href="/chat">
      Get Started <MoveRight className="w-4 h-4" />
    </Link>
  </Button>
</div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
