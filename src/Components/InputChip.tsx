// @ts-nocheck
import React from "react";
import styled from "styled-components";

const Chip = styled.div`
  display: flex;
  width: auto;
  border-radius: 4px;
  gap: 4px;
  padding: 4px;
`;
const ProfilePic = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
interface IChipCompontProps {
  onClick: () => void;
  text: string;
  imageUrl: string;
}
export default function ChipCompont(props) {
  const { onClick, text, imageUrl } = props; //image to do
  return (
    <Chip>
      <ProfilePic src={imageUrl} />
      <div style={{ whiteSpace: "nowrap" }}>{text}</div>
      <div onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          viewBox="0 0 384 512"
        >
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </div>
    </Chip>
  );
}
