import { useEffect, useRef } from "react";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view";
import { basicSetup } from "codemirror";
import socket from "../socketService";

const CodeEditor = ({ value, roomId }: any) => {
  console.log('code', value);
  const editor = useRef<HTMLDivElement | null>(null);
  const view = useRef<any>();
  
  useEffect(() => {
    if (!editor.current) return;

    view.current = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          EditorView.updateListener.of(({ state }) => {
            console.log('editor updates :  ',state.doc.toString(), roomId)
            socket.emit('CODE_CHANGED', { codeValue: state.doc.toString(), roomId })
          }),
          basicSetup,
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          foldGutter(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          crosshairCursor(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          lineNumbers(),
          javascript(),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
          ]),
        ],
      }),
      parent: editor.current,
    });

    return () => {
      view.current.destroy();
      view.current = null;
    };
  }, []);

  useEffect(() => {
    if(view.current && view.current.state.doc.toString() !== value) {
      setTimeout(() => {
        view.current.dispatch({
        changes: {
          from: 0,
          to: view.current.state.doc.length,
          insert: value
        }
      })
    },1000);
    
  }},[value])

  return <div ref={editor} />;
};

export { CodeEditor };
