"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface Props {
  image: string;
  text: string;
  footer: string;
}

const RecommendationContainer = styled.div`
  --color: var(--color-onPrimary);
  --size: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-m);
  margin: calc(var(--space-2xl) * 1.5) 0 var(--space-2xl);
  background-color: var(--color);
  padding: var(--space-2xl);
  border-radius: 12px;
  max-width: 500px;
  box-sizing: border-box;
  position: relative;
`;

const ProfilePicture = styled.div`
  position: absolute;
  top: 0;
  transform: translateY(calc(var(--size) * -1 / 1.5));
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 6px var(--color);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background-color: var(--color);
    mix-blend-mode: color;
    opacity: 0.2;
  }
`;

const Image = styled.img`
  width: var(--size);
  height: var(--size);
  object-fit: contain;
`;

const Blockquote = styled.blockquote`
  margin: 0;
  font-style: italic;
  text-align: center;
  color: var(--color-secondary);

  p {
    margin: 0 0 var(--space-xs) 0;
    font-size: smaller;
  }

  footer {
    font-size: smaller;
    font-variation-settings: var(--font-semi-bold);
    font-style: normal;
    margin-top: var(--space-m);
    color: var(--color-text-secondary);
  }
`;

function SkeletonComponent() {
  const containerStyle = {
    width: "500px",
    height: "400px",
    backgroundColor: "var(--color-skeleton)",
    borderRadius: "12px",
  };

  return <div style={containerStyle}></div>;
}

export default function Recommendation({ image, text, footer }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SkeletonComponent />;

  return (
    <RecommendationContainer>
      <ProfilePicture>
        <Image src={image} alt={footer} />
      </ProfilePicture>
      <Blockquote>
        <p>"{text}"</p>
        <footer>{footer}</footer>
      </Blockquote>
    </RecommendationContainer>
  );
}
