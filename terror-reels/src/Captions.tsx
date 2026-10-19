import React from "react";
import type { Caption } from "@remotion/captions";
import { useCurrentFrame, useVideoConfig } from "remotion";

type CaptionPage = { start: number; end: number };

const makePages = (count: number): CaptionPage[] => {
  const pages: CaptionPage[] = [];
  for (let start = 0; start < count; start += 6) {
    pages.push({ start, end: Math.min(start + 6, count) });
  }
  const last = pages[pages.length - 1];
  if (pages.length > 1 && last && last.end - last.start <= 2) {
    pages[pages.length - 2].end = last.end;
    pages.pop();
  }
  return pages;
};

export const Captions: React.FC<{ captions: Caption[]; text: string }> = ({
  captions,
  text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const active = captions.findIndex(
    (caption, index) =>
      ms >= caption.startMs && ms < (captions[index + 1]?.startMs ?? Infinity),
  );
  if (active < 0) return null;

  const page = makePages(captions.length).find(
    ({ start, end }) => active >= start && active < end,
  );
  if (!page) return null;
  const words = text.trim().split(/\s+/);
  const middle = page.start + Math.ceil((page.end - page.start) / 2);

  return (
    <div
      style={{
        position: "absolute",
        top: 1470,
        left: 90,
        right: 150,
        height: 200,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "16px 24px",
        background: "rgba(3, 7, 12, 0.94)",
        border: "1px solid #ffffff24",
        borderRadius: 18,
        textAlign: "center",
        fontSize: 52,
        fontWeight: 700,
        lineHeight: 1.45,
        wordSpacing: 10,
        textShadow: "0 2px 4px #000",
      }}
    >
      {[
        [page.start, middle],
        [middle, page.end],
      ].map(([start, end]) =>
        start < end ? (
          <div key={start} style={{ whiteSpace: "nowrap" }}>
            {captions.slice(start, end).map((caption, index) => {
              const wordIndex = start + index;
              return (
                <React.Fragment key={wordIndex}>
                  {index > 0 ? " " : null}
                  <span
                    style={{
                      color:
                        wordIndex === active && ms < caption.endMs
                          ? "#deff63"
                          : "#fff",
                    }}
                  >
                    {words.length === captions.length
                      ? words[wordIndex]
                      : caption.text.trim()}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        ) : null,
      )}
    </div>
  );
};
