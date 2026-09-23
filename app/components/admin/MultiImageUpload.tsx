"use client";

import { useState } from "react";
import { X, GripVertical, Plus, Link2 } from "lucide-react";

interface ImageUrlListInputProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

// convert link share Google Drive biasa jadi direct-view link
function normalizeDriveUrl(url: string): string {
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url.trim();
}

export default function ImageUrlListInput({ value, onChange }: ImageUrlListInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    const normalized = normalizeDriveUrl(inputValue);
    onChange([...value, normalized]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const reordered = [...value];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);

    setDragIndex(index);
    onChange(reordered);
  };

  const handleDragEnd = () => setDragIndex(null);

  return (
    <div>
      <label className="mb-1 block text-xs text-[#77736d]">
        Link Foto Produk (paste link Google Drive){" "}
        {value.length > 1 && (
          <span className="text-[#8b4a2f]">— {value.length} foto, mode 360°</span>
        )}
      </label>

      <div className="flex gap-2">
        <input
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste link Google Drive lalu Enter"
          className="w-full border border-black/10 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 whitespace-nowrap bg-[#171717] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
        >
          <Plus size={13} />
          Tambah
        </button>
      </div>

      <p className="mt-1.5 text-[10px] text-[#8a867f]">
        Pastikan link Drive di-set "Anyone with the link" bisa lihat. Link share biasa otomatis dikonversi.
      </p>

      {value.length > 0 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {value.map((url, index) => (
            <div
              key={url + index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative aspect-square cursor-grab overflow-hidden border-2 bg-[#ebe7df] active:cursor-grabbing ${
                dragIndex === index ? "border-[#8b4a2f] opacity-50" : "border-black/10"
              }`}
            >
              <img
                src={url}
                alt={`Foto ${index + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23eee'/></svg>";
                }}
              />

              <span className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/70 text-[9px] font-semibold text-white">
                {index + 1}
              </span>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600"
              >
                <X size={10} />
              </button>

              <div className="absolute bottom-1 right-1 text-white/70">
                <GripVertical size={11} />
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="mt-3 flex items-center gap-2 border border-dashed border-black/10 px-3 py-4 text-[11px] text-[#8a867f]">
          <Link2 size={13} />
          Belum ada foto ditambahkan
        </div>
      )}
    </div>
  );
}