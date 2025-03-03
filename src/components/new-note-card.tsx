import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value === "") {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    onNoteCreated(content);
    setContent("");
    setShouldShowOnBoarding(true);
    toast.success("Nota salva com sucesso!");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 text-left rounded-md outline-none bg-slate-700 p-5 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex flex-col flex-1" onSubmit={handleSaveNote}>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className="text-lime-400 font-medium hover:underline">
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se prefirir,{" "}
                  <button
                    onClick={handleStartEditor}
                    className="text-lime-400 font-medium hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent outline-none resize-none flex-1"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:bg-lime-500"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
