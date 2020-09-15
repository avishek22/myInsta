import React, { Component } from "react";

import Stories from "react-insta-stories";

const stories = [
  {
    url: "https://example.com/pic2.jpg",
    duration: 5000,
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 30m ago",
      profileImage: "https://picsum.photos/100/100",
    },
    storyContent: {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "100%",
    },
  },
  {
    url: "https://example.com/pic2.jpg",
    duration: 5000,
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 30m ago",
      profileImage: "https://picsum.photos/100/100",
    },
  },
];

const Story = () => {
  return (
    <Stories
      stories={stories}
      defaultInterval={1500}
      width={432}
      height={768}
    />
  );
};

export default Story;
