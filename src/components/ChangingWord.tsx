"use client";

import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";

const Span = styled.span`
  color: var(--color-secondary);
`;

const randomWords = [
  "good",
  "bonza",
  "great",
  "da bomb",
  "the bee's knees",
  "wunderbar",
  "wundervoll",
];

export default function ChangingWord() {
  const [word, setWord] = useState("");

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * randomWords.length);
    setWord(randomWords[index]);
  }, []);

  useEffect(() => {
    const interval = setInterval(shuffle, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [shuffle]);

  return <Span>{word}</Span>;
}
