import { ChatMessageInput } from "../chatMessageInput/ChatMessageInput";

type Props = {
    disabled: boolean;
    onSendMessage: ( message: string) => void;
}
export const Footer = ({ disabled, onSendMessage }: Props) => {
  return (
    <footer className="w-full border-t border-t-gray-600 p-2">
      <div className="max-w-4xl m-auto">
        <ChatMessageInput
            disabled={disabled} 
            onSend={onSendMessage} 
        />
        <div className="pt-3 text-center text-xs text-gray-300">
          Feito pelo Victor Rony. Permitida a cópia e uso para qualquer fim.
          <br />
          <a href="https://b7web.com.br/fullstack" className="underline">
            Quer aprender a programar? Click aqui{" "}
          </a>
        </div>
      </div>
    </footer>
  );
};