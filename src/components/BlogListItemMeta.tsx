"use client";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

interface Props {
  date: string | null;
  readTime: string;
}

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
`;

const Time = styled.time`
  font-size: smaller;
  opacity: 0.7;
  gap: var(--space-3);
`;

const Divider = styled.div`
  margin: 0 var(--space-3);
  opacity: 0.5;
`;

function SkeletonComponent() {
  const containerStyle = {
    width: "300px",
    height: "20px",
    backgroundColor: "var(--color-skeleton)",
    borderRadius: "12px",
    marginBottom: "var(--space-3)"
  };

  return <div style={containerStyle}></div>;
}

export default function BlogListItemMeta({ date, readTime }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <SkeletonComponent />;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : null;

  return (
    <Meta>
      {date ? (
        <Time dateTime={new Date(date).toISOString()}>{formattedDate}</Time>
      ) : null}
      {readTime ? (
        <>
          <Divider>•</Divider>

          <Time dateTime={`PT${readTime}M`}>{readTime} min read</Time>
        </>
      ) : null}
    </Meta>
  )
}
