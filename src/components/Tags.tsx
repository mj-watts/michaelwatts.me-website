"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface TagsProps {
  tags: string[];
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3xs);
`;

const Tag = styled.span`
  --height: 30px;
  --border-radius: calc(var(--height) / 2);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--step--1);
  padding: 0 var(--space-xs);
  white-space: nowrap;
  margin: 0;
  height: var(--height);
  background-color: oklab(from var(--color-onPrimary) l a b / 0.2);
  color: var(--color-onPrimary);
  font-variation-settings: var(--font-semi-bold);
  line-height: 1px;
`;

function TagsSkeletonComponent() {
  const containerStyle = {
    display: "flex",
    gap: "var(--space-3xs)",
    height: "30px",
    alignItems: "center",
  };

  const skeletonTagStyle = {
    width: "60px",
    height: "30px",
    borderRadius: "15px",
    background: "var(--color-skeleton)",
  };

  return (
    <div style={containerStyle}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={skeletonTagStyle}></div>
      ))}
    </div>
  );
}

export default function Tags({ tags }: TagsProps) {
  const [sortedTags, setSortedTags] = useState(tags || []);
  const [numberOfTagsToShow, setNumberOfTagsToShow] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSortedTags(sortedTags);
  }, [numberOfTagsToShow]);

  const handleViewAllTags = () => {
    setNumberOfTagsToShow(tags.length);
  };

  if (!mounted) return <TagsSkeletonComponent />;

  return (
    <TagsContainer>
      {sortedTags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagsContainer>
  );
}
