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
  --textcolor: oklab(from var(--color-onPrimary) calc(l * 3) a b);

  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--space-2);
  align-items: start;
  justify-content: start;
  aspect-ratio: 1;
  width: clamp(250px, 100%, 440px);
  border-radius: var(--rounded-border);
  color: var(--textcolor);
  padding: var(--space-6);
  box-sizing: border-box;
  background-color: var(--bgcolor);
  background-image: 
    linear-gradient(var(--bgcolor), transparent),
    url(${(props) => props.image});
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
  container-type: inline-size;
  overflow: hidden;
  transition: box-shadow 200ms ease-in-out;

  &:hover {
    box-shadow: 0 0 0 5px oklab(from var(--bgcolor) l a b / 0.5);
  }
`;

const TextWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: oklab(from var(--color-secondary) l a b / 0.2);
  padding: var(--space-6);
  border-bottom: 2px solid oklab(from var(--color-primary) l a b / 0.15);
  box-shadow: 0 0 30px rgba(0,0,0,0.2), 0 0 4px rgba(0,0,0,0.15);
`;

const Title = styled.h2`
  margin: 0;
  font-size: var(--font-size-lg);
  font-family: var(--body-font);
  font-variation-settings: var(--font-semi-bold);
  line-height: 1.2;
  color: var(--textcolor);
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.3;
  display: none;
  position: relative;

  @container(width > 300px) {
    display: block;
    margin-top: var(--space-4);
  }
`;

const Link = styled.a`
  margin-top: auto;
  font-size: smaller;
  font-weight: 600;
  color: var(--color-primary);
  font-variation-settings: var(--font-bold);
  background-color: var(--color-onPrimary);
  border-radius: var(--border-radius-sm);
  padding: var(--space-2) var(--space-4);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: oklab(from var(--color-onPrimary) calc(l - 0.1) a b);
  color: var(--color-secondary);
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
`;

function SkeletonComponent() {
  const containerStyle = {
    aspectRation: "1",
    width: "clamp(300px, 100%, 440px)",
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
      <TextWrap>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextWrap>
      <Link href={link}>View</Link>
    </Container>
  );
}
