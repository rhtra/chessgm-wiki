import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="toolbar">
      <input
        className="input"
        placeholder="Search username…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
