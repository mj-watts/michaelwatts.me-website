"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface Props {
  image: string;
  title: string;
  description: string;
  bgcolor: string;
  link: string;
}

const Container = styled.div<{ image: string; bgcolor: string }>`
  --border-radius: 12px;
  --bgcolor: var(--color-onPrimary);
  --textcolor: var(--color-secondary);

  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--space-2);
  align-items: start;
  justify-content: start;
  height: 300px;
  width: 300px;
  border-radius: var(--border-radius);
  color: var(--color-background);
  padding: var(--space-6);
  box-sizing: border-box;
  background-color: var(--bgcolor);
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  margin: 0;
  font-size: var(--font-size-lg);
  font-family: var(--body-font);
  font-variation-settings: var(--font-semi-bold);
  line-height: 1.1;
  color: var(--textcolor);
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.2;
  color: var(--textcolor);
`;

const Link = styled.a`
  margin-top: auto;
  font-size: smaller;
  font-weight: 600;
  color: var(--textcolor);
  font-variation-settings: var(--font-bold);
  background-color: rgba(from var(--bgcolor) r g b / 0.8);
  border-radius: 0 6px 6px 0;
  padding: 0 var(--space-4) 0 var(--space-6);
  margin-left: calc(-1 * var(--space-6));
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(from var(--bgcolor) r g b / 1);
  }

  &:before {
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

  &:hover:before {
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
  bgcolor,
  link,
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
