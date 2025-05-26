// components/EditorModal.tsx
"use client";

import React, { useRef } from "react";
import RichTextEditor, { RichTextEditorHandle } from "@/components/quill_editor/quill_editor";

type EditorModalProps = {
  initialContent: string;
  onClose: () => void;
  onSave: (key: string, content: string) => void;
  itemKey: string;
};

export default function EditorModal({
  initialContent,
  onClose,
  onSave,
  itemKey,
}: EditorModalProps) {
  const editorRef = useRef<RichTextEditorHandle>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      onSave(itemKey, content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary rounded-lg w-[90%] max-w-3xl p-5 shadow-lg">
        <RichTextEditor ref={editorRef} initialContent={initialContent} />

        <div className="mt-3 text-right">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 rounded border border-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-primary text-white font-bold hover:shadow-sm transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
