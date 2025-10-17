import { Translator } from 'components/i18n';

export default function Disclaimer() {
  return (
    <div
      className="disclaimer"
      style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none'
      }}
    >
      <div className="text-xs text-muted-foreground">
        <Translator path="chat.disclaimer" />
      </div>
    </div>
  );
}
