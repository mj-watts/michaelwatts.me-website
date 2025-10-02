"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface Props {
  image: string;
  title: string;
  description: string;
  link: string;
  bgcolor: string;
}

const Container = styled.div<{ image: string; bgcolor: string }>`
  --rounded-border: var(--border-radius);
  --bgcolor: ${(props) => props.bgcolor};
  --textcolor: var(--color-primary);

  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--space-2);
  align-items: start;
  justify-content: start;
  height: 300px;
  width: 300px;
  border-radius: var(--rounded-border);
  color: var(--color-background);
  padding: var(--space-6);
  box-sizing: border-box;
  background-color: var(--bgcolor);
  background-image: 
    linear-gradient(var(--bgcolor), transparent),
    url(${(props) => props.image});
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  margin: 0;
  font-size: var(--font-size-md);
  font-family: var(--body-font);
  font-variation-settings: var(--font-semi-bold);
  line-height: 1.2;
  color: var(--bgcolor);
  filter: invert(1);
`;

const Description = styled.p`
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: 1.3;
  color: var(--bgcolor);
  filter: invert(1);
`;

const Link = styled.a`
  margin-top: auto;
  font-size: smaller;
  font-weight: 600;
  color: var(--color-onPrimary);
  font-variation-settings: var(--font-bold);
  background-color: var(--color-secondary);
  border-radius: var(--border-radius-sm);
  padding: var(--space-2) var(--space-4);
  transition: background-color 0.2s ease-in-out;

  &:hover {
  background-color: oklab(from var(--color-secondary) calc(l - 0.1) a b);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: var(--border-radius);
    opacity: 0;
    transition: box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  &:hover::before {
    box-shadow: 0 0 0 5px var(--bgcolor);
    opacity: 0.5;
  }
`;

function SkeletonComponent() {
  const containerStyle = {
    height: "300px",
    width: "300px",
    backgroundColor: "var(--color-skeleton)",
    borderRadius: "12px",
  };

  return <div style={containerStyle}></div>;
}

export default function RecommendedWork({
  image,
  title,
  description,
  link,
  bgcolor,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SkeletonComponent />;

  return (
    <Container image={image} bgcolor={bgcolor}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Link href={link}>View</Link>
    </Container>
  );
}
