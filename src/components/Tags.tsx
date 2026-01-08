"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface TagsProps {
  tags: string[];
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
`;

const Tag = styled.span`
  --height: 30px;
  --border-radius: calc(var(--height) / 2);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: smaller;
  font-style: italic;
  padding: 0 var(--space-3);
  white-space: nowrap;
  margin: 0;
  height: var(--height);
  background-color: var(--color-onPrimary);
  color: var(--color-primary);
  font-variation-settings: var(--font-semi-bold);
  line-height: 1px;

  border-radius: 3px;
  border: solid 3px var(--button-color);

  box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.2);

  transition: box-shadow 200ms ease-in-out;
`;

function TagsSkeletonComponent() {
  const containerStyle = {
    display: "flex",
    gap: "var(--space-1)",
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
