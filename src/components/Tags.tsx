"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface TagsProps {
  tags: string[];
  color: string;
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
`;

const Tag = styled.span<{ color: string }>`
  --height: 30px;
  --border-radius: calc(var(--height) / 2);
  --color: ${(props) => props.color};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: smaller;
  font-style: italic;
  padding: 0 var(--space-3);
  white-space: nowrap;
  margin: 0;
  height: var(--height);
  border-radius: var(--border-radius);
  background-color: var(--color);
  color: var(--color-background);
`;

const MoreTag = styled(Tag)`
  cursor: pointer;
  background-color: var(--color);
  color: var(--color-background);
  transition: background-color 0.1s, color 0.1s, transform 0.2s ease-in-out;
  transform: translateX(-33px);

  &:hover {
    color: var(--color-border);
    transform: translateX(-15px);
  }
`;

const BlurredPartialTag = styled(Tag)`
  width: 5px;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  background-image: linear-gradient(
    to right,
    var(--color),
    var(--color-background)
  );
  border: none;
  opacity: 0.6;
  transform: scale(0.7);
  box-shadow: 0 0 3px 6px var(--color) inset, 0 0 0 2px var(--color) inset;
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

export default function Tags({ tags, color }: TagsProps) {
  const [sortedTags, setSortedTags] = useState(tags || []);
  const [numberOfTagsToShow, setNumberOfTagsToShow] = useState(5);
  const [mounted, setMounted] = useState(false);

  const displayedTags = tags.slice(0, numberOfTagsToShow);
  const remainingTagCount = tags.length - numberOfTagsToShow;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSortedTags(displayedTags);
  }, [numberOfTagsToShow]);

  const handleViewAllTags = () => {
    setNumberOfTagsToShow(tags.length);
  };

  if (!mounted) return <TagsSkeletonComponent />;

  return (
    <TagsContainer>
      {sortedTags.map((tag) => (
        <Tag key={tag} color={color}>
          {tag}
        </Tag>
      ))}
      {remainingTagCount > 0 && (
        <>
          <BlurredPartialTag color={color} />
          <MoreTag color={color} onClick={handleViewAllTags}>
            +{remainingTagCount} more...
          </MoreTag>
        </>
      )}
    </TagsContainer>
  );
}
