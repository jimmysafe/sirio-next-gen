"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BuyCourseButton({
  courseId,
  ...props
}: ButtonProps & { courseId: number }) {
  return (
    <Link href={`/checkout/courses/${courseId}`}>
      <Button size="default" {...props}>
        <ArrowRight className="mr-2 size-4" />
        Acquista il Corso
      </Button>
    </Link>
  );
}
