"use client";

import "quill/dist/quill.snow.css";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";

export type RichTextEditorHandle = {
  getContent: () => string;
};

type Props = {
  initialContent?: string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, Props>(
  ({ initialContent }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (editorRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ font: [] }, { size: ["small", false, "large", "huge"] }],
              [
                { header: 1 },
                { header: 2 },
                { header: 3 },
                { header: 4 },
                { header: 5 },
                { header: 6 },
              ],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ script: "super" }, { script: "sub" }],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
          },
          placeholder: "Write something...",
        });

        // Set the initial HTML content *after* Quill is initialized
        if (initialContent) {
          quillRef.current.root.innerHTML = initialContent;
        }
      }

      return () => {
        quillRef.current = null;
      };
    }, [initialContent]); // react to changes in initialContent

    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (quillRef.current) {
          return quillRef.current.root.innerHTML;
        }
        return "";
      },
    }));

    return <div ref={editorRef} className="min-h-[300px]" />;
  }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
