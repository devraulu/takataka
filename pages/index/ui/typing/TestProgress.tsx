import React from "react";
import { useAtomValue } from "jotai";
import { hasTestStartedAtom, textAtom, typedAtom } from "#root/atoms/typing";

function TestProgress() {
  const text = useAtomValue(textAtom);
  const typed = useAtomValue(typedAtom);
  const hasTestStarted = useAtomValue(hasTestStartedAtom);

  if (!hasTestStarted) return null;

  return (
    <div className="text-2xl font-bold text-main">
      {typed.length - 1}/{text.split(" ").length}
    </div>
  );
}

export default TestProgress;
